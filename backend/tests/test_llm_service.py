"""Focused unit tests for the Gemini-backed audit chat service."""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from services.llm_service import GeminiAuditChatService


class _FakeResponse:
    def __init__(self, payload: dict):
        self._payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict:
        return self._payload


class _FakeAsyncClient:
    def __init__(self, *, payload: dict, capture: dict):
        self._payload = payload
        self._capture = capture

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def post(self, url, *, params=None, json=None, headers=None):
        self._capture["url"] = url
        self._capture["params"] = params
        self._capture["json"] = json
        self._capture["headers"] = headers
        return _FakeResponse(self._payload)


def test_generate_reply_builds_gemini_request_and_extracts_text(monkeypatch):
    capture = {}
    payload = {
        "candidates": [
            {
                "content": {
                    "parts": [
                        {"text": "What tools are you using today?"},
                    ]
                }
            }
        ]
    }

    def fake_client_factory(*args, **kwargs):
        capture["timeout"] = kwargs.get("timeout")
        return _FakeAsyncClient(payload=payload, capture=capture)

    monkeypatch.setattr("services.llm_service.httpx.AsyncClient", fake_client_factory)

    service = GeminiAuditChatService(api_key="gemini-test-key", model="gemini-test-model")
    reply = asyncio.run(
        service.generate_reply(
            system_prompt="System prompt",
            history=[
                {"role": "assistant", "content": "What industry are you in?"},
                {"role": "user", "content": "Dental clinic"},
            ],
            message="We have 8 staff.",
        )
    )

    assert reply == "What tools are you using today?"
    assert capture["url"].endswith("/models/gemini-test-model:generateContent")
    assert capture["params"] == {"key": "gemini-test-key"}
    assert capture["headers"] == {"Content-Type": "application/json"}
    assert capture["timeout"] == 45.0

    body = capture["json"]
    assert body["systemInstruction"]["parts"] == [{"text": "System prompt"}]
    assert body["contents"] == [
        {"role": "model", "parts": [{"text": "What industry are you in?"}]},
        {"role": "user", "parts": [{"text": "Dental clinic"}]},
        {"role": "user", "parts": [{"text": "We have 8 staff."}]},
    ]
    assert body["generationConfig"]["maxOutputTokens"] == 900


def test_generate_reply_raises_when_gemini_returns_no_text(monkeypatch):
    def fake_client_factory(*args, **kwargs):
        return _FakeAsyncClient(payload={"candidates": [{"content": {"parts": [{}]}}]}, capture={})

    monkeypatch.setattr("services.llm_service.httpx.AsyncClient", fake_client_factory)

    service = GeminiAuditChatService(api_key="gemini-test-key")
    with pytest.raises(RuntimeError, match="Empty Gemini response"):
        asyncio.run(
            service.generate_reply(
                system_prompt="System prompt",
                history=[],
                message="Hello",
            )
        )
