from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
import asyncio
import resend
from emergentintegrations.llm.chat import LlmChat, UserMessage
from calendly_poll import poll_calendly_once, start_scheduler, stop_scheduler


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

# LLM
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
LLM_PROVIDER = "anthropic"
LLM_MODEL = "claude-sonnet-4-5-20250929"

NEXORA_SYSTEM_PROMPT = """You are "Nexie", the senior AI consultant for Nexora AI — a product-driven AI automation company that builds AI products and custom software for modern businesses.

Your goal: run a CONVERSATIONAL AUDIT in 5 short steps, then deliver a tailored audit report and capture the user's email.

CONVERSATION FLOW (ask ONE question per turn, never bundle):
1) Greet briefly, then ask: what industry / what does their business do?
2) Ask team size (rough range is fine).
3) Ask what tools / stack they use today (CRM, ERP, manual spreadsheets, etc).
4) Ask what their #1 operational pain or bottleneck is right now.
5) Ask their rough budget range or timeline urgency.

After step 5, you MUST output the audit report using this EXACT template (keep emojis, keep section headings, keep bullet style):

🚨 **Key Challenges Identified**
• [Challenge specific to their answers]
• [Challenge]
• [Challenge]

💡 **High-Impact Opportunities**
• [Opportunity → expected outcome, e.g. "reduce manual work by 50%"]
• [Opportunity → outcome]
• [Opportunity → outcome]

🛠️ **Recommended Solution**
[1–2 sentences naming the Nexora-built solution: pick from FlowMind (workflow automation), ClinicOS (clinic SaaS), InsightIQ (analytics), or a custom Website / ERP / AI Application / Business Automation. Be specific to their industry.]

📈 **Expected Impact**
• [Concrete metric — e.g. "Save 8+ hours/week"]
• [Concrete metric]
• [Concrete metric]

⚡ **Next Step**
[Always one short, complete sentence — e.g. "Book a quick demo to see this in action and we'll have a working prototype within 7 days." — never leave this empty or use placeholder dashes.]

After producing the report, STOP. Do NOT add any text, paragraph, or follow-up question after the ⚡ section. The user will use a built-in email form below the report card to receive a copy and start a conversation. If the user later asks something or sends an email in chat, simply confirm warmly in 1 sentence: "Got it — the team will reach out within 1 business day."

RULES:
- Ask ONE question per turn before the report. Never combine the audit report with another question.
- Use ONLY the emojis 🚨 💡 🛠️ 📈 ⚡ inside the report. No other emojis anywhere else in the conversation.
- Keep replies before the report under 100 words. The report itself can be longer.
- Be concise, professional, confident. Never apologise unless you genuinely don't have info.
- Don't recommend competitors. Always frame around what Nexora can build.
- The ⚡ Next Step section MUST contain a real, complete sentence — never blank, never just dashes or template markers."""


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
    lead_type: str = Field(default="audit")  # audit | call | demo | contact
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


class ChatTurn(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class AuditChatRequest(BaseModel):
    session_id: Optional[str] = None
    history: List[ChatTurn] = Field(default_factory=list)
    message: str = Field(min_length=1, max_length=2000)


class AuditChatResponse(BaseModel):
    session_id: str
    reply: str
    is_complete: bool = False
    captured_email: Optional[EmailStr] = None


EMAIL_RE = re.compile(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")


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


def send_calendly_confirmation_email(subject: str, html: str, reply_to: Optional[str] = None) -> None:
    """Sync send used by the Calendly polling scheduler."""
    if not RESEND_API_KEY or not NOTIFY_EMAIL:
        logger.info("Resend not configured. Skipping Calendly confirmation email.")
        return
    try:
        params = {
            "from": f"Nexora AI <{SENDER_EMAIL}>",
            "to": [NOTIFY_EMAIL],
            "subject": subject,
            "html": html,
        }
        if reply_to:
            params["reply_to"] = reply_to
        result = resend.Emails.send(params)
        logger.info(f"Calendly confirmation email sent: id={result.get('id')}")
    except Exception as e:
        logger.error(f"Resend (Calendly confirm) failed: {e}")


# ---------- Audit chat helpers ----------
def _build_contextual_system(history: List[ChatTurn]) -> str:
    if not history:
        return NEXORA_SYSTEM_PROMPT
    lines = [NEXORA_SYSTEM_PROMPT, "", "--- Conversation so far ---"]
    for t in history:
        speaker = "User" if t.role == "user" else "Nexie"
        lines.append(f"{speaker}: {t.content}")
    lines.append("--- End of prior conversation ---")
    lines.append("Now produce ONLY your next reply (do not repeat prior turns).")
    return "\n".join(lines)


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


@api_router.post("/audit-chat", response_model=AuditChatResponse)
async def audit_chat(payload: AuditChatRequest, background_tasks: BackgroundTasks):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=503, detail="Chat unavailable: LLM key not configured")

    session_id = payload.session_id or str(uuid.uuid4())
    system_message = _build_contextual_system(payload.history)

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=system_message,
        ).with_model(LLM_PROVIDER, LLM_MODEL)
        reply = await chat.send_message(UserMessage(text=payload.message))
        if not isinstance(reply, str):
            reply = str(reply)
    except Exception as e:
        logger.error(f"Audit chat LLM error: {e}")
        raise HTTPException(status_code=502, detail="LLM service error")

    captured_email = None
    match = EMAIL_RE.search(payload.message)
    if match:
        captured_email = match.group(0).lower()

    is_complete = bool(captured_email)

    doc = {
        "session_id": session_id,
        "history": [t.model_dump() for t in payload.history]
        + [{"role": "user", "content": payload.message},
           {"role": "assistant", "content": reply}],
        "captured_email": captured_email,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.audit_chats.update_one(
        {"session_id": session_id}, {"$set": doc}, upsert=True
    )

    if captured_email:
        try:
            transcript = "\n".join(
                f"{t.role.title()}: {t.content}" for t in payload.history
            ) + f"\nUser: {payload.message}\nNexie: {reply}"
            lead = Lead(
                name=(payload.message.split('\n')[0][:80] or "Audit Chat User"),
                email=captured_email,
                company=None,
                message=f"[AI Audit Chat]\n\n{transcript[:1800]}",
                lead_type="audit",
                source="ai_audit_chat",
            )
            lead_doc = lead.model_dump()
            lead_doc['created_at'] = lead_doc['created_at'].isoformat()
            await db.leads.insert_one(lead_doc)
            background_tasks.add_task(send_lead_notification, lead)
            logger.info(f"AI chat captured lead: {captured_email}")
        except Exception as e:
            logger.error(f"Failed to persist lead from chat {session_id}: {e}")

    return AuditChatResponse(
        session_id=session_id,
        reply=reply,
        is_complete=is_complete,
        captured_email=captured_email,
    )


@api_router.post("/calendly/poll-now")
async def calendly_poll_now():
    """Manual trigger for the Calendly polling job (admin/debug)."""
    summary = await poll_calendly_once(db, send_calendly_confirmation_email)
    return summary


# ---------- Audit Report Email ----------
class EmailReportRequest(BaseModel):
    session_id: str
    email: EmailStr
    name: Optional[str] = Field(default=None, max_length=120)
    company: Optional[str] = Field(default=None, max_length=160)


REPORT_MARKER_RE = re.compile(r"🚨|💡\s*\*\*High-Impact|🛠️|📈|⚡\s*\*\*Next Step")


def _parse_audit_report(text: str) -> List[dict]:
    """Parse a report body into [{emoji, title, bullets, body}, ...]."""
    section_re = re.compile(r"^(🚨|💡|🛠️|📈|⚡)\s*\*?\*?(.+?)\*?\*?$", re.UNICODE)
    sections: List[dict] = []
    current: Optional[dict] = None
    for raw in text.split("\n"):
        line = raw.strip()
        m = section_re.match(line)
        if m:
            if current:
                sections.append(current)
            current = {
                "emoji": m.group(1),
                "title": m.group(2).replace("**", "").strip(),
                "bullets": [],
                "body": "",
            }
            continue
        if not current or not line:
            continue
        if line.startswith(("•", "-", "*")):
            current["bullets"].append(re.sub(r"^[•\-\*]\s*", "", line))
        else:
            current["body"] = (current["body"] + " " + line).strip()
    if current:
        sections.append(current)
    return sections


def _md_inline(text: str) -> str:
    """Convert **bold** to <strong> and HTML-escape angle brackets."""
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", safe)


def _audit_report_email_html(name: str, sections: List[dict]) -> str:
    palette = {
        "🚨": ("#FEF2F2", "#FCA5A5", "#B91C1C"),
        "💡": ("#FFFBEB", "#FCD34D", "#92400E"),
        "🛠️": ("#F7F9FB", "#0B3C5D33", "#0B3C5D"),
        "📈": ("#ECFDF5", "#2EC4B666", "#0B3C5D"),
        "⚡": ("#0B3C5D", "#0B3C5D", "#FFFFFF"),
    }
    blocks = []
    for s in sections:
        bg, br, fg = palette.get(s["emoji"], palette["🛠️"])
        is_dark = s["emoji"] == "⚡"
        title_html = f'<div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:700;color:{("#2EC4B6" if is_dark else fg)};margin-bottom:8px;"><span style="font-size:14px;margin-right:6px;">{s["emoji"]}</span>{_md_inline(s["title"])}</div>'
        if s["bullets"]:
            items = "".join(
                f'<li style="margin:4px 0;color:{fg};font-size:14px;line-height:1.55;">{_md_inline(b)}</li>'
                for b in s["bullets"]
            )
            content = f'<ul style="margin:0;padding-left:18px;">{items}</ul>'
        else:
            content = f'<p style="margin:0;color:{fg};font-size:14px;line-height:1.55;">{_md_inline(s["body"])}</p>'
        blocks.append(
            f'<div style="background:{bg};border:1px solid {br};border-radius:12px;padding:14px 16px;margin-bottom:10px;">{title_html}{content}</div>'
        )
    body = "".join(blocks) or '<p style="color:#4B5563;">No report content found.</p>'

    return f"""
<!doctype html>
<html><body style="margin:0;padding:0;background:#F7F9FB;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F9FB;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <tr><td style="background:#0B3C5D;padding:24px 26px;color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#2EC4B6;font-weight:700;">Nexora · Audit Report</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px;">Hi {name or "there"} — your tailored growth plan</div>
          <div style="font-size:13px;color:#ffffffaa;margin-top:6px;">Generated by Nexie, Nexora's AI consultant. Our team will reach out within 1 business day.</div>
        </td></tr>
        <tr><td style="padding:18px 22px;">
          {body}
        </td></tr>
        <tr><td style="padding:0 22px 22px 22px;">
          <a href="mailto:hello@nexora.ai?subject=Re:%20My%20Nexora%20Audit%20Report"
             style="display:inline-block;background:#2EC4B6;color:#0B3C5D;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;">
            Reply to start your 7-day MVP
          </a>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Nexora AI · hello@nexora.ai</div>
    </td></tr>
  </table>
</body></html>
"""


def send_audit_report_email(to_email: str, name: str, html: str) -> dict:
    """Send the audit report to the user. Returns {ok, id?, error?}."""
    if not RESEND_API_KEY:
        return {"ok": False, "error": "Resend not configured"}
    try:
        params = {
            "from": f"Nexora AI <{SENDER_EMAIL}>",
            "to": [to_email],
            "subject": "Your Nexora AI audit report",
            "html": html,
        }
        if NOTIFY_EMAIL:
            params["bcc"] = [NOTIFY_EMAIL]
        result = resend.Emails.send(params)
        return {"ok": True, "id": result.get("id")}
    except Exception as e:
        return {"ok": False, "error": str(e)}


@api_router.post("/audit-chat/email-report")
async def audit_chat_email_report(payload: EmailReportRequest, background_tasks: BackgroundTasks):
    chat_doc = await db.audit_chats.find_one(
        {"session_id": payload.session_id}, {"_id": 0}
    )
    if not chat_doc:
        raise HTTPException(status_code=404, detail="Chat session not found")

    history = chat_doc.get("history", [])
    report_text = ""
    for turn in reversed(history):
        if turn.get("role") == "assistant" and REPORT_MARKER_RE.search(turn.get("content", "")):
            report_text = turn["content"]
            break
    if not report_text:
        raise HTTPException(status_code=400, detail="No audit report found in this session yet")

    sections = _parse_audit_report(report_text)
    name = (payload.name or "").strip() or "there"
    html = _audit_report_email_html(name, sections)

    # Try sending the report to the user. In Resend test-mode this can fail (only owner-email allowed).
    send_result = await asyncio.to_thread(
        send_audit_report_email, payload.email, name, html
    )

    # Persist as a Lead (idempotent on session+email — update if exists)
    existing = await db.leads.find_one(
        {"email": payload.email, "source": "ai_audit_chat"}, {"_id": 0}
    )
    if not existing:
        lead = Lead(
            name=payload.name or "AI Audit Lead",
            email=payload.email,
            company=payload.company,
            message=f"[AI Audit Chat — emailed report]\n\n{report_text[:1800]}",
            lead_type="audit",
            source="ai_audit_chat",
        )
        lead_doc = lead.model_dump()
        lead_doc["created_at"] = lead_doc["created_at"].isoformat()
        await db.leads.insert_one(lead_doc)
        background_tasks.add_task(send_lead_notification, lead)
        logger.info(f"Audit report emailed: lead={payload.email}")

    # Update audit_chat with captured email for traceability
    await db.audit_chats.update_one(
        {"session_id": payload.session_id},
        {"$set": {"captured_email": payload.email, "report_emailed": send_result.get("ok", False)}},
    )

    return {
        "ok": True,
        "email_sent": send_result.get("ok", False),
        "email_id": send_result.get("id"),
        "note": (
            "Report emailed successfully."
            if send_result.get("ok")
            else "Saved your details — our team will email the report shortly."
        ),
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def _startup_scheduler():
    start_scheduler(db, send_calendly_confirmation_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    stop_scheduler()
    client.close()
