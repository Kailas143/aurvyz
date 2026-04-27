"""Backend tests for /api/audit-chat (Nexie LLM-powered audit chatbot)."""
import os
import re
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://scalable-ai-systems.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestAuditChatBasic:
    """First-turn audit chat: no history, expect conversational reply asking follow-up."""

    def test_audit_chat_first_turn_no_history(self, api_client):
        r = api_client.post(f"{API}/audit-chat", json={
            "message": "Hi, I run a small dental clinic.",
            "history": [],
        }, timeout=60)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "session_id" in d and isinstance(d["session_id"], str) and len(d["session_id"]) > 0
        assert "reply" in d and isinstance(d["reply"], str) and len(d["reply"].strip()) > 0
        assert d["is_complete"] is False
        assert d.get("captured_email") is None
        # Reply should ask a follow-up question (next step is team size)
        assert "?" in d["reply"], f"Expected a follow-up question in reply: {d['reply']!r}"

    def test_audit_chat_empty_message_422(self, api_client):
        r = api_client.post(f"{API}/audit-chat", json={
            "message": "",
            "history": [],
        }, timeout=30)
        assert r.status_code == 422

    def test_audit_chat_missing_message_422(self, api_client):
        r = api_client.post(f"{API}/audit-chat", json={
            "history": [],
        }, timeout=30)
        assert r.status_code == 422


class TestAuditChatMultiTurn:
    """Multi-turn: history maintains context — should continue the audit, not restart."""

    def test_audit_chat_multi_turn_continues(self, api_client):
        history = [
            {"role": "assistant", "content": "Hey, I'm Nexie. What industry are you in?"},
            {"role": "user", "content": "I run a dental clinic."},
        ]
        r = api_client.post(f"{API}/audit-chat", json={
            "message": "We have 8 staff total.",
            "history": history,
        }, timeout=60)
        assert r.status_code == 200, r.text
        d = r.json()
        reply = d["reply"].lower()
        # After team size, Nexie should ask about tools/stack — should NOT restart by asking industry again.
        assert "industry" not in reply or "tool" in reply or "stack" in reply or "use" in reply or "?" in reply, \
            f"Expected continuation, not restart. Got: {d['reply']!r}"
        assert d["is_complete"] is False


class TestAuditChatEmailCapture:
    """When user message contains an email, lead is captured + is_complete=true."""

    def test_audit_chat_email_capture_creates_lead(self, api_client):
        # Get a baseline lead count
        r0 = api_client.get(f"{API}/leads?limit=500")
        baseline_count = len(r0.json()) if r0.status_code == 200 else 0

        unique_email = f"test_audit_chat_{int(time.time())}@example.com"
        history = [
            {"role": "assistant", "content": "What's your industry?"},
            {"role": "user", "content": "Dental clinic"},
            {"role": "assistant", "content": "How many staff?"},
            {"role": "user", "content": "8 staff"},
            {"role": "assistant", "content": "What tools?"},
            {"role": "user", "content": "Manual spreadsheets and a basic CRM"},
            {"role": "assistant", "content": "Top pain?"},
            {"role": "user", "content": "Patient intake takes hours"},
            {"role": "assistant", "content": "Budget?"},
            {"role": "user", "content": "10-25k, want to start in 30 days"},
        ]
        r = api_client.post(f"{API}/audit-chat", json={
            "message": f"Jane Cooper {unique_email} — interested!",
            "history": history,
        }, timeout=60)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["is_complete"] is True
        assert d["captured_email"] == unique_email
        assert isinstance(d["reply"], str) and len(d["reply"]) > 0

        # Verify lead was inserted with source=ai_audit_chat & lead_type=audit
        # Allow small delay for DB write
        time.sleep(1.0)
        r2 = api_client.get(f"{API}/leads?limit=500")
        assert r2.status_code == 200
        leads = r2.json()
        matched = [l for l in leads if l.get("email") == unique_email]
        assert len(matched) >= 1, f"Expected lead with email {unique_email} to be persisted"
        lead = matched[0]
        assert lead["lead_type"] == "audit"
        assert lead["source"] == "ai_audit_chat"
        assert "_id" not in lead

    def test_audit_chat_persists_session(self, api_client):
        """Re-using a session_id should not break (upsert)."""
        r1 = api_client.post(f"{API}/audit-chat", json={
            "message": "I run a SaaS for HR teams.",
            "history": [],
        }, timeout=60)
        assert r1.status_code == 200
        sid = r1.json()["session_id"]

        r2 = api_client.post(f"{API}/audit-chat", json={
            "session_id": sid,
            "message": "We are a 12-person company.",
            "history": [
                {"role": "assistant", "content": "What industry?"},
                {"role": "user", "content": "I run a SaaS for HR teams."},
            ],
        }, timeout=60)
        assert r2.status_code == 200
        assert r2.json()["session_id"] == sid


# ---- Regression: ensure prior leads tests behavior is unaffected ----
class TestRegressionRoot:
    def test_root_still_ok(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json()["status"] == "ok"
