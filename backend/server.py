from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Resend)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', '')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Create the main app without a prefix
app = FastAPI(title="Nexora AI — Landing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    message: Optional[str] = Field(default=None, max_length=2000)
    lead_type: str = Field(default="audit")  # "audit" | "call" | "demo" | "contact"
    source: Optional[str] = Field(default="landing_page", max_length=80)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    lead_type: str = "audit"
    source: Optional[str] = "landing_page"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Email helpers ----------
def _lead_email_html(lead: Lead) -> str:
    pretty_type = {
        "audit": "Free Business Audit",
        "call": "Book a Call",
        "demo": "Request Demo",
        "contact": "Contact",
    }.get(lead.lead_type, lead.lead_type.title())

    def row(label: str, value: str) -> str:
        return (
            f'<tr><td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;'
            f'color:#4B5563;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:140px;">{label}</td>'
            f'<td style="padding:10px 16px;border-bottom:1px solid #e5e7eb;color:#1F2937;font-size:14px;">{value}</td></tr>'
        )

    return f"""
<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F9FB;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FB;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <tr><td style="background:#0B3C5D;padding:22px 24px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2EC4B6;">Nexora AI · New Lead</div>
          <div style="font-size:20px;font-weight:700;margin-top:6px;">{pretty_type}</div>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            {row("Name", lead.name)}
            {row("Email", f'<a href="mailto:{lead.email}" style="color:#328CC1;text-decoration:none;">{lead.email}</a>')}
            {row("Company", lead.company or "—")}
            {row("Type", pretty_type)}
            {row("Source", lead.source or "—")}
            {row("Received", lead.created_at.strftime("%b %d, %Y · %H:%M UTC"))}
          </table>
        </td></tr>
        <tr><td style="padding:4px 20px 20px 20px;">
          <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#4B5563;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;color:#1F2937;line-height:1.6;padding:14px 16px;background:#F7F9FB;border:1px solid #e5e7eb;border-radius:10px;white-space:pre-wrap;">{(lead.message or "— (no message provided)")}</div>
        </td></tr>
        <tr><td style="padding:4px 20px 26px 20px;">
          <a href="mailto:{lead.email}?subject=Re:%20Your%20Nexora%20{pretty_type}%20request"
             style="display:inline-block;background:#0B3C5D;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;">
            Reply to {lead.name.split(' ')[0]}
          </a>
          <div style="font-size:11px;color:#9CA3AF;margin-top:14px;">Golden-hour follow-ups convert ~3× better. This lead is fresh.</div>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Nexora AI · Lead notification</div>
    </td></tr>
  </table>
</body></html>
"""


def send_lead_notification(lead: Lead) -> None:
    """Synchronous send; invoked via FastAPI BackgroundTasks so it never blocks the response."""
    if not RESEND_API_KEY or not NOTIFY_EMAIL:
        logger.info("Resend not configured (missing RESEND_API_KEY or NOTIFY_EMAIL). Skipping email.")
        return
    try:
        subject = f"[Nexora Lead] {lead.lead_type.title()} · {lead.name}"
        params = {
            "from": f"Nexora AI <{SENDER_EMAIL}>",
            "to": [NOTIFY_EMAIL],
            "reply_to": lead.email,
            "subject": subject,
            "html": _lead_email_html(lead),
        }
        result = resend.Emails.send(params)
        logger.info(f"Lead notification sent: id={result.get('id')} to={NOTIFY_EMAIL}")
    except Exception as e:
        logger.error(f"Resend failed for lead {lead.email}: {e}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Nexora AI API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate, background_tasks: BackgroundTasks):
    allowed_types = {"audit", "call", "demo", "contact"}
    if payload.lead_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid lead_type")

    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"New lead captured: {lead.email} ({lead.lead_type})")

    # Fire-and-forget email notification
    background_tasks.add_task(send_lead_notification, lead)

    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    limit = max(1, min(limit, 500))
    cursor = db.leads.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(limit)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
