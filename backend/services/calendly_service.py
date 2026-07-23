"""Calendly polling service for syncing scheduled bookings into leads."""
from __future__ import annotations

import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Any, Callable, Dict, List, Optional

import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler

logger = logging.getLogger(__name__)

CALENDLY_API_BASE = "https://api.calendly.com"

SendConfirmationEmail = Callable[..., None]


class CalendlyService:
    def __init__(
        self,
        *,
        personal_access_token: Optional[str] = None,
        api_base: str = CALENDLY_API_BASE,
    ) -> None:
        self.personal_access_token = personal_access_token or os.environ.get("CALENDLY_PAT", "")
        self.api_base = api_base.rstrip("/")
        self.user_uri: Optional[str] = os.environ.get("CALENDLY_USER_URI") or None

    def _refresh_from_env(self) -> None:
        if not self.personal_access_token:
            self.personal_access_token = (
                os.environ.get("CALENDLY_PAT", "")
                or os.environ.get("CALENDLY_PERSONAL_ACCESS_TOKEN", "")
            )
        if not self.user_uri:
            self.user_uri = os.environ.get("CALENDLY_USER_URI") or None

    @property
    def configured(self) -> bool:
        self._refresh_from_env()
        return bool(self.personal_access_token)

    async def poll_once(
        self,
        db,
        send_confirmation_email: Optional[SendConfirmationEmail] = None,
    ) -> Dict[str, Any]:
        self._refresh_from_env()
        if not self.configured:
            return {
                "ok": False,
                "error": "CALENDLY_PAT or CALENDLY_PERSONAL_ACCESS_TOKEN not configured",
                "matched": 0,
            }

        summary = {
            "ok": True,
            "events": 0,
            "invitees": 0,
            "matched": 0,
            "newly_scheduled": 0,
            "errors": [],
        }

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                user_uri = await self._resolve_user_uri(client)
                events = await self._list_events(client, user_uri)
                summary["events"] = len(events)

                for event in events:
                    event_uri = event.get("uri", "")
                    event_uuid = event_uri.rstrip("/").split("/")[-1] if event_uri else ""
                    try:
                        invitees = await self._list_invitees(client, event_uri)
                    except Exception as exc:
                        summary["errors"].append(f"invitees fetch failed for {event_uri}: {exc}")
                        continue

                    summary["invitees"] += len(invitees)
                    for invitee in invitees:
                        matched = await self._sync_invitee(
                            db=db,
                            event=event,
                            event_uuid=event_uuid,
                            invitee=invitee,
                            send_confirmation_email=send_confirmation_email,
                            summary=summary,
                        )
                        if matched:
                            summary["matched"] += 1

        except httpx.HTTPStatusError as exc:
            summary["ok"] = False
            summary["error"] = (
                f"Calendly HTTP {exc.response.status_code}: {exc.response.text[:200]}"
            )
        except Exception as exc:
            summary["ok"] = False
            summary["error"] = f"polling failed: {exc}"

        if summary.get("newly_scheduled"):
            logger.info("Calendly poll: %s", summary)
        return summary

    async def _sync_invitee(
        self,
        *,
        db,
        event: dict,
        event_uuid: str,
        invitee: dict,
        send_confirmation_email: Optional[SendConfirmationEmail],
        summary: Dict[str, Any],
    ) -> bool:
        email = (invitee.get("email") or "").lower()
        if not email:
            return False

        lead_doc = await db.find_lead_by_email(email, lead_type="call")
        if not lead_doc:
            lead_doc = await db.find_lead_by_email(email)
        if not lead_doc:
            lead_doc = await self._create_direct_lead(db, email, invitee, summary)
            if not lead_doc:
                return False

        bookings = lead_doc.get("calendly_bookings") or []
        if any(booking.get("event_uuid") == event_uuid for booking in bookings):
            return True

        booking_record = self._build_booking_record(event, invitee, event_uuid)
        updated_bookings = [*bookings, booking_record]
        await db.update_lead(
            lead_doc["id"],
            {
                "scheduled": True,
                "scheduled_at": event.get("start_time"),
                "calendly_bookings": updated_bookings,
            },
        )
        summary["newly_scheduled"] += 1

        if send_confirmation_email:
            try:
                html = self._format_confirmation_html(
                    lead_email=email,
                    lead_name=lead_doc.get("name") or invitee.get("name") or email,
                    event=event,
                    invitee=invitee,
                )
                send_confirmation_email(
                    subject=(
                        f"[Aurvyz] {lead_doc.get('name', email)} scheduled"
                        f" - {event.get('name', 'Meeting')}"
                    ),
                    html=html,
                    reply_to=email,
                )
            except Exception as exc:
                summary["errors"].append(f"email send failed for {email}: {exc}")

        return True

    async def _create_direct_lead(self, db, email: str, invitee: dict, summary: Dict[str, Any]):
        try:
            from server import Lead  # late import to avoid circular import at module load

            new_lead = Lead(
                name=invitee.get("name") or email.split("@")[0],
                email=email,
                lead_type="call",
                source="calendly_direct",
            )
            new_doc = new_lead.model_dump()
            await db.insert_lead(new_doc)
            logger.info("Calendly: created direct lead for %s", email)
            return new_doc
        except Exception as exc:
            summary["errors"].append(f"create-lead failed for {email}: {exc}")
            return None

    async def _resolve_user_uri(self, client: httpx.AsyncClient) -> str:
        self._refresh_from_env()
        if self.user_uri:
            return self.user_uri
        data = await self._get(client, "/users/me")
        self.user_uri = data["resource"]["uri"]
        logger.info("Calendly user URI resolved: %s", self.user_uri)
        return self.user_uri

    async def _list_events(self, client: httpx.AsyncClient, user_uri: str) -> List[dict]:
        now = datetime.now(timezone.utc)
        params = {
            "user": user_uri,
            "min_start_time": (now - timedelta(days=1)).isoformat().replace("+00:00", "Z"),
            "max_start_time": (now + timedelta(days=60)).isoformat().replace("+00:00", "Z"),
            "status": "active",
            "count": 100,
        }
        return await self._paginate(client, "/scheduled_events", params=params)

    async def _list_invitees(self, client: httpx.AsyncClient, event_uri: str) -> List[dict]:
        path = event_uri.replace(self.api_base, "")
        return await self._paginate(client, f"{path}/invitees", params={"count": 100})

    async def _paginate(
        self,
        client: httpx.AsyncClient,
        path: str,
        *,
        params: Optional[dict] = None,
    ) -> List[dict]:
        items: List[dict] = []
        page_params = dict(params or {})
        while True:
            data = await self._get(client, path, params=page_params)
            items.extend(data.get("collection", []))
            next_page_token = ((data.get("pagination") or {}).get("next_page_token"))
            if not next_page_token:
                break
            page_params["page_token"] = next_page_token
        return items

    async def _get(
        self,
        client: httpx.AsyncClient,
        path: str,
        params: Optional[dict] = None,
    ) -> dict:
        response = await client.get(
            f"{self.api_base}{path}",
            headers={
                "Authorization": f"Bearer {self.personal_access_token}",
                "Content-Type": "application/json",
            },
            params=params,
        )
        response.raise_for_status()
        return response.json()

    def _build_booking_record(self, event: dict, invitee: dict, event_uuid: str) -> dict:
        location = event.get("location") or {}
        return {
            "event_uuid": event_uuid,
            "event_uri": event.get("uri"),
            "event_name": event.get("name"),
            "start_time": event.get("start_time"),
            "end_time": event.get("end_time"),
            "status": event.get("status"),
            "invitee_email": (invitee.get("email") or "").lower(),
            "invitee_name": invitee.get("name"),
            "join_url": self._extract_join_url(location),
            "location": location,
            "cancel_url": invitee.get("cancel_url"),
            "reschedule_url": invitee.get("reschedule_url"),
            "tracking": invitee.get("tracking"),
            "questions_and_answers": invitee.get("questions_and_answers") or [],
            "synced_at": datetime.now(timezone.utc).isoformat(),
        }

    def _extract_join_url(self, location: Any) -> str:
        if isinstance(location, dict):
            return location.get("join_url") or location.get("location") or ""
        if isinstance(location, str):
            return location
        return ""

    def _format_confirmation_html(
        self,
        *,
        lead_email: str,
        lead_name: str,
        event: dict,
        invitee: dict,
    ) -> str:
        start = event.get("start_time", "")
        end = event.get("end_time", "")
        name = event.get("name", "Meeting")
        join_url = self._extract_join_url(event.get("location") or {})
        invitee_email = invitee.get("email", lead_email)
        reschedule_url = invitee.get("reschedule_url", "")

        return f"""
<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F9FB;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FB;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <tr><td style="background:#0B3C5D;padding:22px 24px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2EC4B6;">Aurvyz · Booking Confirmed</div>
          <div style="font-size:20px;font-weight:700;margin-top:6px;">{lead_name} just scheduled - {name}</div>
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
          <div style="font-size:11px;color:#9CA3AF;margin-top:14px;">Lead funnel updated - submitted to scheduled tracked.</div>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Aurvyz · Calendly polling</div>
    </td></tr>
  </table>
</body></html>
"""


def _poll_minutes() -> int:
    try:
        return int(os.environ.get("CALENDLY_POLL_MINUTES", "10"))
    except ValueError:
        return 10


_service = CalendlyService()
_scheduler: Optional[AsyncIOScheduler] = None


async def poll_calendly_once(
    db,
    send_confirmation_email: Optional[SendConfirmationEmail] = None,
) -> Dict[str, Any]:
    return await _service.poll_once(db, send_confirmation_email)


def start_scheduler(db, send_confirmation_email: SendConfirmationEmail) -> Optional[AsyncIOScheduler]:
    global _scheduler
    if _scheduler and _scheduler.running:
        return _scheduler
    if not _service.configured:
        logger.info(
            "Calendly polling skipped: CALENDLY_PAT not set. "
            "Frontend booking still works; add CALENDLY_PAT to enable lead sync."
        )
        return None

    scheduler = AsyncIOScheduler(timezone="UTC")

    async def _job() -> None:
        try:
            await _service.poll_once(db, send_confirmation_email)
        except Exception as exc:
            logger.error("Calendly poll job error: %s", exc)

    poll_min = _poll_minutes()
    scheduler.add_job(
        _job,
        "interval",
        minutes=poll_min,
        id="calendly_poll",
        next_run_time=datetime.now(timezone.utc) + timedelta(seconds=30),
        max_instances=1,
        coalesce=True,
    )
    scheduler.start()
    _scheduler = scheduler
    logger.info("Calendly scheduler started (every %s min, first run in 30s).", poll_min)
    return scheduler


def stop_scheduler() -> None:
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
        logger.info("Calendly scheduler stopped.")
        _scheduler = None
