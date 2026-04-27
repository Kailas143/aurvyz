"""Backend tests for Nexora AI landing page API (leads endpoint)."""
import os
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://scalable-ai-systems.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
class TestRoot:
    def test_root_returns_message_and_status(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data and "status" in data
        assert data["status"] == "ok"


# ---- POST /api/leads ----
class TestLeadsCreate:
    def test_create_lead_valid(self, api_client):
        payload = {
            "name": "TEST_Jane Doe",
            "email": "test_jane@example.com",
            "company": "TEST_Acme",
            "message": "Automate client intake",
            "lead_type": "audit",
        }
        r = api_client.post(f"{API}/leads", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "_id" not in data
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["message"] == payload["message"]
        assert data["lead_type"] == "audit"
        # created_at should be ISO parseable
        assert "created_at" in data
        datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))

    def test_create_lead_invalid_email(self, api_client):
        r = api_client.post(f"{API}/leads", json={
            "name": "TEST_Bad", "email": "not-an-email", "lead_type": "audit"
        })
        assert r.status_code == 422

    def test_create_lead_invalid_lead_type(self, api_client):
        r = api_client.post(f"{API}/leads", json={
            "name": "TEST_Bad", "email": "test_ok@example.com", "lead_type": "spam"
        })
        assert r.status_code == 400

    def test_create_lead_missing_name(self, api_client):
        r = api_client.post(f"{API}/leads", json={
            "email": "test_ok@example.com", "lead_type": "audit"
        })
        assert r.status_code == 422

    def test_create_lead_missing_email(self, api_client):
        r = api_client.post(f"{API}/leads", json={
            "name": "TEST_NoEmail", "lead_type": "audit"
        })
        assert r.status_code == 422

    @pytest.mark.parametrize("lead_type", ["audit", "call", "demo", "contact"])
    def test_create_lead_allowed_types(self, api_client, lead_type):
        r = api_client.post(f"{API}/leads", json={
            "name": f"TEST_{lead_type}",
            "email": f"test_{lead_type}@example.com",
            "lead_type": lead_type,
        })
        assert r.status_code == 201
        assert r.json()["lead_type"] == lead_type


# ---- Background email task / Resend integration ----
class TestLeadsBackgroundEmail:
    def test_create_lead_response_is_fast(self, api_client):
        """POST /api/leads must return quickly (< 3s) — Resend send must be in BackgroundTasks, not blocking."""
        import time
        t0 = time.time()
        r = api_client.post(f"{API}/leads", json={
            "name": "TEST_FastResponse",
            "email": "test_fast@example.com",
            "lead_type": "contact",
            "source": "pytest_bg",
        })
        elapsed = time.time() - t0
        assert r.status_code == 201
        assert elapsed < 3.0, f"POST /api/leads took {elapsed:.2f}s — Resend likely blocking response"

    def test_create_lead_call_type_with_booking_modal_source(self, api_client):
        """Booking modal posts lead_type='call' + source='booking_modal' — must succeed."""
        r = api_client.post(f"{API}/leads", json={
            "name": "TEST_BookingModal",
            "email": "test_booking@example.com",
            "company": "TEST_BookCo",
            "message": "Want to discuss intake automation",
            "lead_type": "call",
            "source": "booking_modal",
        })
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["lead_type"] == "call"
        assert d["source"] == "booking_modal"


# ---- GET /api/leads ----
class TestLeadsList:
    def test_list_leads_no_id_leak_and_sorted(self, api_client):
        # ensure at least 2 leads exist
        for i in range(2):
            api_client.post(f"{API}/leads", json={
                "name": f"TEST_SortCheck{i}",
                "email": f"test_sort{i}@example.com",
                "lead_type": "audit",
            })
        r = api_client.get(f"{API}/leads")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 2
        for it in items:
            assert "_id" not in it
            assert "id" in it and "created_at" in it
        # sorted desc by created_at
        ts = [datetime.fromisoformat(it["created_at"].replace("Z", "+00:00")) for it in items]
        assert ts == sorted(ts, reverse=True)
