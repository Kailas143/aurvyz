"""Focused unit tests for Calendly pagination and lead-sync behavior."""
from __future__ import annotations

import asyncio
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from services.calendly_service import CalendlyService


class _FakeLeadsCollection:
    def __init__(self, docs):
        self.docs = docs
        self.update_calls = []
        self.insert_calls = []

    async def find_one(self, query, projection=None):
        for doc in self.docs:
            if all(doc.get(key) == value for key, value in query.items()):
                return doc
        return None

    async def update_one(self, query, update):
        self.update_calls.append((query, update))
        for doc in self.docs:
            if all(doc.get(key) == value for key, value in query.items()):
                for key, value in update.get("$set", {}).items():
                    doc[key] = value
                for key, value in update.get("$push", {}).items():
                    doc.setdefault(key, []).append(value)
                return

    async def insert_one(self, doc):
        self.insert_calls.append(doc)
        self.docs.append(doc)


class _FakeDB:
    def __init__(self, docs):
        self.leads = _FakeLeadsCollection(docs)


def test_paginate_follows_next_page_token():
    service = CalendlyService(personal_access_token="token")
    calls = []

    async def fake_get(client, path, params=None):
        calls.append((path, dict(params or {})))
        if len(calls) == 1:
            return {
                "collection": [{"uri": "page-1-event"}],
                "pagination": {"next_page_token": "next-token"},
            }
        return {
            "collection": [{"uri": "page-2-event"}],
            "pagination": {},
        }

    service._get = fake_get  # type: ignore[method-assign]

    items = asyncio.run(service._paginate(client=None, path="/scheduled_events", params={"count": 100}))

    assert items == [{"uri": "page-1-event"}, {"uri": "page-2-event"}]
    assert calls == [
        ("/scheduled_events", {"count": 100}),
        ("/scheduled_events", {"count": 100, "page_token": "next-token"}),
    ]


def test_poll_once_updates_matching_lead_from_paginated_invitees():
    service = CalendlyService(personal_access_token="token")
    db = _FakeDB(
        [
            {
                "id": "lead-1",
                "email": "jane@example.com",
                "name": "Jane",
                "lead_type": "call",
                "calendly_bookings": [],
            }
        ]
    )
    sent_emails = []

    async def fake_resolve_user_uri(client):
        return "https://api.calendly.com/users/test-user"

    async def fake_list_events(client, user_uri):
        assert user_uri.endswith("test-user")
        return [
            {
                "uri": "https://api.calendly.com/scheduled_events/event-123",
                "name": "Intro Call",
                "start_time": "2026-05-01T10:00:00Z",
                "end_time": "2026-05-01T10:30:00Z",
                "status": "active",
                "location": {"join_url": "https://meet.example.com/room"},
            }
        ]

    async def fake_list_invitees(client, event_uri):
        assert event_uri.endswith("event-123")
        return [
            {
                "email": "jane@example.com",
                "name": "Jane",
                "reschedule_url": "https://calendly.com/reschedule/1",
                "cancel_url": "https://calendly.com/cancel/1",
            },
            {
                "email": "",
                "name": "No Email",
            },
        ]

    service._resolve_user_uri = fake_resolve_user_uri  # type: ignore[method-assign]
    service._list_events = fake_list_events  # type: ignore[method-assign]
    service._list_invitees = fake_list_invitees  # type: ignore[method-assign]

    def fake_send_confirmation_email(**kwargs):
        sent_emails.append(kwargs)

    summary = asyncio.run(service.poll_once(db, fake_send_confirmation_email))

    assert summary["ok"] is True
    assert summary["events"] == 1
    assert summary["invitees"] == 2
    assert summary["matched"] == 1
    assert summary["newly_scheduled"] == 1
    assert summary["errors"] == []

    lead = db.leads.docs[0]
    assert lead["scheduled"] is True
    assert lead["scheduled_at"] == "2026-05-01T10:00:00Z"
    assert len(lead["calendly_bookings"]) == 1
    booking = lead["calendly_bookings"][0]
    assert booking["event_uuid"] == "event-123"
    assert booking["invitee_email"] == "jane@example.com"
    assert booking["join_url"] == "https://meet.example.com/room"
    assert booking["reschedule_url"] == "https://calendly.com/reschedule/1"

    assert len(db.leads.update_calls) == 1
    assert len(sent_emails) == 1
    assert sent_emails[0]["reply_to"] == "jane@example.com"
    assert "Intro Call" in sent_emails[0]["subject"]
