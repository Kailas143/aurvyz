"""Calendly polling — fetches scheduled events from Calendly v2 API and matches
them to existing leads in MongoDB. Works on free Calendly plans (no webhooks).

Public surface:
  - poll_calendly_once(db, send_email_fn) -> dict summary
  - start_scheduler(app, db, send_email_fn)
"""
from __future__ import annotations

import logging
import os
import asyncio
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Callable

import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler

logger = logging.getLogger(__name__)

CALENDLY_API_BASE = "https://api.calendly.com"


def _get_pat() -> str:
    return os.environ.get("CALENDLY_PAT", "")


def _poll_minutes() -> int:
    try:
        return int(os.environ.get("CALENDLY_POLL_MINUTES", "10"))
    except ValueError:
        return 10


# Cached user URI — first request resolves it
_user_uri_cache: Optional[str] = None
_scheduler: Optional[AsyncIOScheduler] = None


async def _get(client: httpx.AsyncClient, path: str, params: Optional[dict] = None) -> dict:
    headers = {"Authorization": f"Bearer {_get_pat()}", "Content-Type": "application/json"}
    r = await client.get(f"{CALENDLY_API_BASE}{path}", headers=headers, params=params, timeout=20.0)
    r.raise_for_status()
    return r.json()


async def _resolve_user_uri(client: httpx.AsyncClient) -> str:
    global _user_uri_cache
    if _user_uri_cache:
        return _user_uri_cache
    data = await _get(client, "/users/me")
    _user_uri_cache = data["resource"]["uri"]
    logger.info(f"Calendly user URI resolved: {_user_uri_cache}")
    return _user_uri_cache


async def _list_events(client: httpx.AsyncClient, user_uri: str) -> List[dict]:
    """Fetch active events from the past 1 day to next 60 days."""
    now = datetime.now(timezone.utc)
    params = {
        "user": user_uri,
        "min_start_time": (now - timedelta(days=1)).isoformat().replace("+00:00", "Z"),
        "max_start_time": (now + timedelta(days=60)).isoformat().replace("+00:00", "Z"),
        "status": "active",
        "count": 100,
    }
    data = await _get(client, "/scheduled_events", params=params)
    return data.get("collection", [])


async def _list_invitees(client: httpx.AsyncClient, event_uri: str) -> List[dict]:
    # event_uri is full URL; strip base
    path = event_uri.replace(CALENDLY_API_BASE, "")
    data = await _get(client, f"{path}/invitees", params={"count": 100})
    return data.get("collection", [])


def _format_confirmation_html(lead_email: str, lead_name: str, event: dict, invitee: dict) -> str:
    start = event.get("start_time", "")
    end = event.get("end_time", "")
    name = event.get("name", "Meeting")
    join_url = ""
    location = event.get("location") or {}
    if isinstance(location, dict):
        join_url = location.get("join_url") or location.get("location") or ""
    invitee_email = invitee.get("email", lead_email)
    reschedule_url = invitee.get("reschedule_url", "")

    return f"""
<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F9FB;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FB;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <tr><td style="background:#0B3C5D;padding:22px 24px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2EC4B6;">Nexora AI · Booking Confirmed</div>
          <div style="font-size:20px;font-weight:700;margin-top:6px;">{lead_name} just scheduled — {name}</div>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#4B5563;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:140px;">Lead</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1F2937;font-size:14px;">{lead_name} &lt;<a href="mailto:{invitee_email}" style="color:#328CC1;text-decoration:none;">{invitee_email}</a>&gt;</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#4B5563;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Start</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1F2937;font-size:14px;">{start}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#4B5563;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">End</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1F2937;font-size:14px;">{end}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#4B5563;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Event</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1F2937;font-size:14px;">{name}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:6px 20px 26px 20px;">
          {f'<a href="{join_url}" style="display:inline-block;background:#0B3C5D;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;margin-right:8px;">Join Meeting</a>' if join_url else ''}
          {f'<a href="{reschedule_url}" style="display:inline-block;background:#F7F9FB;color:#0B3C5D;text-decoration:none;font-weight:600;font-size:13px;padding:10px 18px;border-radius:999px;border:1px solid #0B3C5D33;">Reschedule</a>' if reschedule_url else ''}
          <div style="font-size:11px;color:#9CA3AF;margin-top:14px;">Lead funnel updated · "submitted → scheduled" tracked.</div>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Nexora AI · Calendly polling</div>
    </td></tr>
  </table>
</body></html>
"""


async def poll_calendly_once(db, send_confirmation_email: Optional[Callable] = None) -> Dict[str, Any]:
    """Run one polling cycle. Returns summary dict.

    Matches each Calendly invitee to a Lead in MongoDB by email, marks the lead
    as scheduled, and (if not already notified) sends a confirmation email.
    """
    if not _get_pat():
        return {"ok": False, "error": "CALENDLY_PAT not configured", "matched": 0}

    summary = {"ok": True, "events": 0, "invitees": 0, "matched": 0, "newly_scheduled": 0, "errors": []}

    try:
        async with httpx.AsyncClient() as client:
            user_uri = await _resolve_user_uri(client)
            events = await _list_events(client, user_uri)
            summary["events"] = len(events)

            for event in events:
                event_uri = event.get("uri", "")
                event_uuid = event_uri.rstrip("/").split("/")[-1] if event_uri else ""
                try:
                    invitees = await _list_invitees(client, event_uri)
                except Exception as e:
                    summary["errors"].append(f"invitees fetch failed for {event_uri}: {e}")
                    continue
                summary["invitees"] += len(invitees)

                for invitee in invitees:
                    email = (invitee.get("email") or "").lower()
                    if not email:
                        continue

                    # Find a matching lead — prefer call/booking_modal type, else any
                    lead_doc = await db.leads.find_one(
                        {"email": email, "lead_type": "call"}, {"_id": 0}
                    )
                    if not lead_doc:
                        lead_doc = await db.leads.find_one({"email": email}, {"_id": 0})
                    if not lead_doc:
                        # Calendly booking from someone who never used our form — create a lead
                        try:
                            from server import Lead  # late import to avoid circular
                            new_lead = Lead(
                                name=invitee.get("name") or email.split("@")[0],
                                email=email,
                                lead_type="call",
                                source="calendly_direct",
                            )
                            new_doc = new_lead.model_dump()
                            new_doc["created_at"] = new_doc["created_at"].isoformat()
                            await db.leads.insert_one(new_doc)
                            lead_doc = new_doc
                            logger.info(f"Calendly: created direct lead for {email}")
                        except Exception as e:
                            summary["errors"].append(f"create-lead failed for {email}: {e}")
                            continue

                    summary["matched"] += 1

                    # Skip if already marked scheduled for this exact event
                    bookings = lead_doc.get("calendly_bookings") or []
                    if any(b.get("event_uuid") == event_uuid for b in bookings):
                        continue

                    booking_record = {
                        "event_uuid": event_uuid,
                        "event_uri": event_uri,
                        "event_name": event.get("name"),
                        "start_time": event.get("start_time"),
                        "end_time": event.get("end_time"),
                        "status": event.get("status"),
                        "invitee_email": email,
                        "invitee_name": invitee.get("name"),
                        "join_url": (event.get("location") or {}).get("join_url"),
                        "cancel_url": invitee.get("cancel_url"),
                        "reschedule_url": invitee.get("reschedule_url"),
                        "synced_at": datetime.now(timezone.utc).isoformat(),
                    }

                    await db.leads.update_one(
                        {"id": lead_doc["id"]},
                        {
                            "$set": {
                                "scheduled": True,
                                "scheduled_at": event.get("start_time"),
                            },
                            "$push": {"calendly_bookings": booking_record},
                        },
                    )
                    summary["newly_scheduled"] += 1

                    if send_confirmation_email:
                        try:
                            html = _format_confirmation_html(
                                lead_email=email,
                                lead_name=lead_doc.get("name") or invitee.get("name") or email,
                                event=event,
                                invitee=invitee,
                            )
                            send_confirmation_email(
                                subject=f"[Nexora] {lead_doc.get('name', email)} scheduled — {event.get('name', 'Meeting')}",
                                html=html,
                                reply_to=email,
                            )
                        except Exception as e:
                            summary["errors"].append(f"email send failed for {email}: {e}")

    except httpx.HTTPStatusError as e:
        summary["ok"] = False
        summary["error"] = f"Calendly HTTP {e.response.status_code}: {e.response.text[:200]}"
    except Exception as e:
        summary["ok"] = False
        summary["error"] = f"polling failed: {e}"

    if summary.get("newly_scheduled"):
        logger.info(f"Calendly poll: {summary}")
    return summary


def start_scheduler(db, send_confirmation_email: Callable) -> AsyncIOScheduler:
    """Start the APScheduler running poll_calendly_once every CALENDLY_POLL_MINUTES."""
    global _scheduler
    if _scheduler and _scheduler.running:
        return _scheduler
    if not _get_pat():
        logger.warning("Calendly polling disabled: CALENDLY_PAT not set.")
        return None  # type: ignore
    sched = AsyncIOScheduler(timezone="UTC")

    async def _job():
        try:
            await poll_calendly_once(db, send_confirmation_email)
        except Exception as e:
            logger.error(f"Calendly poll job error: {e}")

    poll_min = _poll_minutes()
    sched.add_job(_job, "interval", minutes=poll_min, id="calendly_poll",
                  next_run_time=datetime.now(timezone.utc) + timedelta(seconds=30),
                  max_instances=1, coalesce=True)
    sched.start()
    _scheduler = sched
    logger.info(f"Calendly scheduler started (every {poll_min} min, first run in 30s).")
    return sched


def stop_scheduler():
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        logger.info("Calendly scheduler stopped.")
        _scheduler = None
