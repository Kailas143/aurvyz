from __future__ import annotations

import logging
import os
from typing import List, Optional

import httpx
from pydantic import BaseModel

logger = logging.getLogger(__name__)

GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta"
DEFAULT_GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")


class ChatTurnLike(BaseModel):
    role: str
    content: str


class GeminiAuditChatService:
    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        timeout: float = 45.0,
    ) -> None:
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY", "")
        self.model = model or DEFAULT_GEMINI_MODEL
        self.timeout = timeout

    @property
    def configured(self) -> bool:
        return bool(self.api_key)

    async def generate_reply(
        self,
        *,
        system_prompt: str,
        history: List[ChatTurnLike],
        message: str,
    ) -> str:
        if not self.configured:
            raise RuntimeError("GEMINI_API_KEY not configured")

        payload = {
            "systemInstruction": {
                "parts": [{"text": system_prompt}],
            },
            "contents": self._build_contents(history, message),
            "generationConfig": {
                "temperature": 0.6,
                "topP": 0.9,
                "maxOutputTokens": 900,
            },
        }
        url = f"{GEMINI_API_BASE}/models/{self.model}:generateContent"

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                url,
                params={"key": self.api_key},
                json=payload,
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()
            data = response.json()

        text = self._extract_text(data)
        if not text:
            logger.error("Gemini returned no text payload: %s", data)
            raise RuntimeError("Empty Gemini response")
        return text.strip()

    def _build_contents(self, history: List[ChatTurnLike], message: str) -> List[dict]:
        contents: List[dict] = []
        for turn in history:
            role = "model" if turn.role == "assistant" else "user"
            contents.append({"role": role, "parts": [{"text": turn.content}]})
        contents.append({"role": "user", "parts": [{"text": message}]})
        return contents

    def _extract_text(self, data: dict) -> str:
        candidates = data.get("candidates") or []
        for candidate in candidates:
            content = candidate.get("content") or {}
            parts = content.get("parts") or []
            texts = [part.get("text", "") for part in parts if part.get("text")]
            if texts:
                return "\n".join(texts)
        return ""
