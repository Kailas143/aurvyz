from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone
import asyncio
import httpx
from calendly_poll import poll_calendly_once, start_scheduler, stop_scheduler
from database import Database
from services.llm_service import GeminiAuditChatService


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
db = Database()

# Configuration (from env)
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'hello@aurvyz.com')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL', 'hello@aurvyz.com')

# LLM
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')
GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash')
audit_chat_service = GeminiAuditChatService(
    api_key=GEMINI_API_KEY,
    model=GEMINI_MODEL,
)

AURVYZ_SYSTEM_PROMPT = """You are "Aurvie", the senior AI consultant for Aurvyz — a product-driven AI automation company that builds AI products and custom software for modern businesses.

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
[1–2 sentences naming the Aurvyz-built solution: pick from FlowMind (workflow automation), ClinicOS (clinic SaaS), InsightIQ (analytics), or a custom Website / ERP / AI Application / Business Automation. Be specific to their industry.]

📈 **Expected Impact**
• [Concrete metric — e.g. "Save 8+ hours/week"]
• [Concrete metric]
• [Concrete metric]

🚀 **How This Would Work For You**
[Generate a simple 3–4 step workflow showing the manual → automated transformation grounded in THEIR specific industry/problem. Each step on its own line as a bullet starting with "•". Make it concrete (name the channel, system, action). Examples:
For a dental clinic:
• Patient books appointment online via your website
• System auto-confirms + sends SMS/email reminders
• Data syncs to your patient records and billing
• Staff freed from phone tag — focus on chair-side care
For a SaaS startup:
• Lead signs up → routed to ClinicOS-style intake bot
• AI agent qualifies, segments, and assigns next action
• CRM + Slack get auto-updated with full context
• Sales team only sees ready-to-close conversations
Make it specific to the user's answers. Use 3–4 bullets, no fewer than 3. The first bullet is the user/customer action, the last is the outcome benefit.]

⚡ **Next Step**
[Always exactly one short CTA sentence inviting the user to connect with Aurvyz — e.g. "Book a call with Aurvyz to review these opportunities and map out your fastest path to launch." Never use bullets in this section.]

After producing the report (including the 🚀 section), STOP. Do NOT add any text, paragraph, or follow-up question after the 🚀 section. The user will use a built-in email form below the report card to receive a copy and start a conversation. If the user later asks something or sends an email in chat, simply confirm warmly in 1 sentence: "Got it — the team will reach out within 1 business day."

RULES:
- Ask ONE question per turn before the report. Never combine the audit report with another question.
- Use ONLY the emojis 🚨 💡 🛠️ 📈 ⚡ 🚀 inside the report. No other emojis anywhere else in the conversation.
- Keep replies before the report under 100 words. The report itself can be longer.
- Be concise, professional, confident. Never apologise unless you genuinely don't have info.
- Don't recommend competitors. Always frame around what Aurvyz can build.
- The ⚡ Next Step section MUST contain exactly one real CTA sentence about booking a call or connecting with Aurvyz — never bullets, never workflow steps, never blank.
- The 🚀 section MUST have 3–4 concrete bullets specific to the user's industry — never generic, never just "step 1, step 2"."""


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Create the main app without a prefix
app = FastAPI(title="Aurvyz — Landing API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
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
NEXT_STEP_RE = re.compile(
    r"(⚡\s*\*\*Next Step\*\*\s*)(.*?)(?=\n\s*(?:🚨|💡|🛠️|📈|🚀)\s*\*\*|\Z)",
    re.DOTALL,
)
WORKFLOW_RE = re.compile(
    r"(🚀\s*\*\*How This Would Work For You\*\*\s*)(.*?)(?=\n\s*(?:🚨|💡|🛠️|📈|⚡)\s*\*\*|\Z)",
    re.DOTALL,
)
CALL_INTENT_RE = re.compile(
    r"\b(book|schedule|arrange|set up|want)\b.{0,24}\b(call|demo|meeting)\b|\b(book a call|schedule a call|book demo|schedule demo)\b",
    re.IGNORECASE,
)
CONTACT_INTENT_RE = re.compile(
    r"\b(contact me|reach out|talk to us|talk to me|speak to us|speak to me|connect with us|connect me)\b",
    re.IGNORECASE,
)


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
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#2EC4B6;">Aurvyz · New Lead</div>
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
          <a href="mailto:{lead.email}?subject=Re:%20Your%20Aurvyz%20{pretty_type}%20request"
             style="display:inline-block;background:#0B3C5D;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:999px;">
            Reply to {lead.name.split(' ')[0]}
          </a>
          <div style="font-size:11px;color:#9CA3AF;margin-top:14px;">Golden-hour follow-ups convert ~3× better. This lead is fresh.</div>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Aurvyz · Lead notification</div>
    </td></tr>
  </table>
</body></html>
"""


def _normalize_audit_report_next_step(text: str) -> str:
    """Ensure the audit report CTA stays a single Aurvyz call-to-action sentence."""
    if "⚡ **Next Step**" not in text:
        return text

    normalized_cta = (
        "Book a call with Aurvyz to review these opportunities and map out your fastest path to launch."
    )
    return NEXT_STEP_RE.sub(rf"\1{normalized_cta}\n\n", text)


def _reorder_audit_report_sections(text: str) -> str:
    """Keep workflow before next-step CTA in the final rendered report."""
    if "🚀 **How This Would Work For You**" not in text or "⚡ **Next Step**" not in text:
        return text

    workflow_match = WORKFLOW_RE.search(text)
    next_step_match = NEXT_STEP_RE.search(text)
    if not workflow_match or not next_step_match:
        return text

    if workflow_match.start() < next_step_match.start():
        return text

    workflow_block = workflow_match.group(0).strip()
    next_step_block = next_step_match.group(0).strip()
    prefix = text[:next_step_match.start()]
    middle = text[next_step_match.end():workflow_match.start()]
    suffix = text[workflow_match.end():]
    return f"{prefix}{workflow_block}\n\n{next_step_block}{middle}{suffix}"


def _extract_email_from_text(text: str) -> Optional[str]:
    match = EMAIL_RE.search(text or "")
    return match.group(0).lower() if match else None


def _extract_email_from_history(history: List[ChatTurn]) -> Optional[str]:
    for turn in reversed(history):
        email = _extract_email_from_text(turn.content)
        if email:
            return email
    return None


def _classify_chat_intent(message: str) -> Optional[str]:
    if CALL_INTENT_RE.search(message or ""):
        return "call"
    if CONTACT_INTENT_RE.search(message or ""):
        return "contact"
    return None


def _build_missing_email_reply(intent: str) -> str:
    if intent == "call":
        return (
            "Absolutely — I can help schedule a short call with the Aurvyz team. "
            "Please share your email address and we will reach out to arrange a time."
        )
    return (
        "Absolutely — please share your email address and the Aurvyz team will contact you within 1 business day."
    )


def _build_chat_transcript(history: List[ChatTurn], message: str, reply: str) -> str:
    prior = "\n".join(f"{t.role.title()}: {t.content}" for t in history)
    suffix = f"User: {message}\nAurvie: {reply}"
    return f"{prior}\n{suffix}".strip()


def _infer_chat_lead_name(email: str, history: List[ChatTurn], message: str) -> str:
    text = (message or "").split("\n")[0].strip()
    if email and email in text:
        text = text.replace(email, "").replace("—", " ").replace("-", " ").strip(" ,")
    if text:
        return text[:80]

    for turn in history:
        if turn.role != "user":
            continue
        content = turn.content.strip().split("\n")[0]
        if content and "@" not in content:
            return content[:80]
    return (email.split("@")[0] if email else "Audit Chat User")[:80]


async def _upsert_ai_audit_chat_lead(
    db,
    *,
    email: str,
    name: str,
    transcript: str,
    lead_type: str,
    company: Optional[str] = None,
) -> Lead:
    existing = await db.find_lead_by_email(email, source="ai_audit_chat")

    message = f"[AI Audit Chat - {lead_type}]\n\n{transcript[:1800]}"
    if existing:
        update_data = {
            "message": message,
            "lead_type": lead_type,
            "source": "ai_audit_chat",
        }
        # Only update name/company if the new values are not placeholders or empty
        if name and name not in ["AI Audit Lead", "Audit Chat User"]:
            update_data["name"] = name
        if company:
            update_data["company"] = company

        await db.update_lead(existing["id"], update_data)
        created_at = existing.get("created_at")
        return Lead(
            id=existing["id"],
            name=existing.get("name") or name,
            email=email,
            company=existing.get("company") or company,
            message=message,
            lead_type=lead_type,
            source="ai_audit_chat",
            created_at=created_at or datetime.now(timezone.utc),
        )

    lead = Lead(
        name=name,
        email=email,
        company=company,
        message=message,
        lead_type=lead_type,
        source="ai_audit_chat",
    )
    lead_doc = lead.model_dump()
    await db.insert_lead(lead_doc)
    return lead


def _send_resend_email(to_email: str, subject: str, html_content: str, reply_to: Optional[str] = None) -> bool:
    """Send an email via Resend HTTP API."""
    resend_api_key = os.environ.get("RESEND_API_KEY")
    if not resend_api_key:
        logger.warning("Resend API key not configured. Check RESEND_API_KEY in .env. Skipping email.")
        return False
        
    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {resend_api_key.strip()}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "from": f"Aurvyz <{SENDER_EMAIL}>",
        "to": [to_email],
        "subject": subject,
        "html": html_content,
    }
    
    if reply_to:
        payload["reply_to"] = reply_to
        
    try:
        # Note: Running sync httpx inside an async/sync hybrid app can be blocking if not careful, 
        # but since the previous smtplib was blocking too, this maintains the same pattern.
        with httpx.Client(timeout=15.0) as client:
            response = client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            logger.info(f"Resend email delivered to {to_email}: {response.json().get('id')}")
            return True
    except Exception as e:
        logger.error(f"Resend API error sending to {to_email}: {e}")
        return False


def send_lead_notification(lead: Lead) -> None:
    """Send an email notification to the team for every new lead captured."""
    html = _lead_email_html(lead)
    subject = f"New Lead: {lead.name} ({lead.lead_type.title()})"
    success = _send_resend_email(NOTIFY_EMAIL, subject, html, reply_to=lead.email)
    if success:
        logger.info(f"Lead notification sent to {NOTIFY_EMAIL} for {lead.email}")
    else:
        logger.info(f"Lead capture logged (notification failed): {lead.email}")


def send_calendly_confirmation_email(subject: str, html: str, reply_to: Optional[str] = None) -> None:
    """Relay Calendly booking confirmations to the team email."""
    _send_resend_email(NOTIFY_EMAIL, subject, html, reply_to=reply_to)
    logger.info(f"Calendly confirmation relayed to {NOTIFY_EMAIL}: {subject}")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Aurvyz API", "status": "ok"}


@api_router.get("/analytics")
async def get_analytics():
    return await db.fetch_analytics()


class Author(BaseModel):
    name: str
    role: str
    avatar: str

class ArticleModel(BaseModel):
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    author: Author
    publishedAt: str
    readingTime: str
    imageUrl: str
    tags: List[str]
    featured: bool

class PrototypeModel(BaseModel):
    id: str
    title: str
    industry: str
    buildTime: str
    techStack: List[str]
    summary: str
    thumbnailUrl: str
    demoUrl: str
    walkthroughUrl: str

class ScheduledArticleModel(BaseModel):
    id: str
    title: str
    status: str
    publishDate: Optional[str] = None
    author: str
    category: str

class ArticleCreate(BaseModel):
    title: str
    content: str
    category: str
    slug: str
    excerpt: Optional[str] = ""
    imageUrl: Optional[str] = None

class SEOAnalyzeRequest(BaseModel):
    title: str
    content: str


@api_router.get("/articles", response_model=List[ArticleModel])
async def get_articles():
    return await db.fetch_articles()

@api_router.get("/articles/{slug}", response_model=ArticleModel)
async def get_article_by_slug(slug: str):
    article = await db.fetch_article_by_slug(slug)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@api_router.get("/categories")
async def get_categories():
    return await db.fetch_categories()

@api_router.get("/prototypes", response_model=List[PrototypeModel])
async def get_prototypes():
    return await db.fetch_prototypes()

@api_router.get("/scheduled-articles", response_model=List[ScheduledArticleModel])
async def get_scheduled_articles():
    return await db.fetch_scheduled_articles()

@api_router.post("/articles", response_model=ArticleModel)
async def create_article(payload: ArticleCreate):
    excerpt = payload.excerpt or (payload.content[:150] + "..." if len(payload.content) > 150 else payload.content)
    image_url = payload.imageUrl or "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    article_doc = {
        "id": str(uuid.uuid4()),
        "slug": payload.slug,
        "title": payload.title,
        "excerpt": excerpt,
        "content": payload.content,
        "category": payload.category,
        "author": {
            "name": "Admin User",
            "role": "Author",
            "avatar": "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        },
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "readingTime": f"{max(1, len(payload.content) // 1000)} min read",
        "imageUrl": image_url,
        "tags": [payload.category],
        "featured": False
    }
    return await db.create_article(article_doc)

@api_router.delete("/articles/{article_id}")
async def delete_article(article_id: str):
    deleted = await db.delete_article(article_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"ok": True, "message": "Article deleted successfully"}

@api_router.post("/seo-analyze")
async def analyze_seo(payload: SEOAnalyzeRequest):
    try:
        existing_titles = await db.fetch_article_titles()
        report = await audit_chat_service.generate_seo_report(payload.title, payload.content, existing_titles=existing_titles)
        return report
    except Exception as e:
        logger.error(f"SEO analysis failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate SEO report")


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate, background_tasks: BackgroundTasks):
    allowed_types = {"audit", "call", "demo", "contact"}
    if payload.lead_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid lead_type")

    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    await db.insert_lead(doc)
    logger.info(f"New lead captured: {lead.email} ({lead.lead_type})")

    background_tasks.add_task(send_lead_notification, lead)

    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    limit = max(1, min(limit, 500))
    return await db.list_leads(limit)


@api_router.post("/audit-chat", response_model=AuditChatResponse)
async def audit_chat(payload: AuditChatRequest, background_tasks: BackgroundTasks):
    if not audit_chat_service.configured:
        raise HTTPException(status_code=503, detail="Chat unavailable: GEMINI_API_KEY not configured")

    session_id = payload.session_id or str(uuid.uuid4())
    existing_chat = await db.get_audit_chat(session_id)

    try:
        reply = await audit_chat_service.generate_reply(
            system_prompt=AURVYZ_SYSTEM_PROMPT,
            history=payload.history,
            message=payload.message,
        )
        reply = _normalize_audit_report_next_step(reply)
        reply = _reorder_audit_report_sections(reply)
    except Exception as e:
        logger.error(f"Audit chat Gemini error: {e}")
        raise HTTPException(status_code=502, detail="LLM service error")

    captured_email = (
        _extract_email_from_text(payload.message)
        or (existing_chat or {}).get("captured_email")
        or _extract_email_from_history(payload.history)
    )
    chat_intent = _classify_chat_intent(payload.message)
    if chat_intent and not captured_email:
        reply = _build_missing_email_reply(chat_intent)
    transcript = _build_chat_transcript(payload.history, payload.message, reply)

    is_complete = bool(captured_email)

    doc = {
        "session_id": session_id,
        "history": [t.model_dump() for t in payload.history]
        + [{"role": "user", "content": payload.message},
           {"role": "assistant", "content": reply}],
        "captured_email": captured_email,
        "latest_intent": chat_intent,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.upsert_audit_chat(
        session_id=session_id,
        history=doc["history"],
        captured_email=doc["captured_email"],
        latest_intent=doc["latest_intent"],
        updated_at=doc["updated_at"],
    )

    if captured_email:
        try:
            lead_type = chat_intent or "audit"
            lead = await _upsert_ai_audit_chat_lead(
                db,
                email=captured_email,
                name=_infer_chat_lead_name(captured_email, payload.history, payload.message),
                transcript=transcript,
                lead_type=lead_type,
            )
            if chat_intent or not (existing_chat or {}).get("captured_email"):
                background_tasks.add_task(send_lead_notification, lead)
                logger.info("AI chat lead notified: %s (%s)", captured_email, lead_type)
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


REPORT_MARKER_RE = re.compile(r"^(?:🚨|💡|🛠️|📈|⚡|🚀)\s*\*\*", re.MULTILINE)


def _parse_audit_report(text: str) -> List[dict]:
    """Parse a report body into [{emoji, title, bullets, body}, ...]."""
    section_re = re.compile(r"^(🚨|💡|🛠️|📈|⚡|🚀)\s*\*?\*?(.+?)\*?\*?$", re.UNICODE)
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
        "🚀": ("#EEF6FF", "#328CC144", "#0B3C5D"),
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
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#2EC4B6;font-weight:700;">Aurvyz · Audit Report</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px;">Hi {name or "there"} — your tailored growth plan</div>
          <div style="font-size:13px;color:#ffffffaa;margin-top:6px;">Generated by Aurvie, Aurvyz's AI consultant. Our team will reach out within 1 business day.</div>
        </td></tr>
        <tr><td style="padding:18px 22px;">
          {body}
        </td></tr>
        <tr><td style="padding:0 22px 22px 22px;">
          <a href="mailto:{SENDER_EMAIL}?subject=Re:%20My%20Aurvyz%20Audit%20Report"
             style="display:inline-block;background:#2EC4B6;color:#0B3C5D;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px;">
            Reply to start your 7-day MVP
          </a>
        </td></tr>
      </table>
      <div style="font-size:11px;color:#9CA3AF;margin-top:16px;">Aurvyz · {SENDER_EMAIL}</div>
    </td></tr>
  </table>
</body></html>
"""


def send_audit_report_email(to_email: str, name: str, html: str) -> dict:
    """Send the generated audit report to the user's email."""
    success = _send_resend_email(to_email, f"Your Aurvyz Audit Report — {name}", html)
    if success:
        return {"ok": True, "id": f"smtp_{int(datetime.now().timestamp())}"}
    return {"ok": False, "error": "SMTP delivery failed. Check server logs."}


@api_router.post("/audit-chat/email-report")
async def audit_chat_email_report(payload: EmailReportRequest, background_tasks: BackgroundTasks):
    chat_doc = await db.get_audit_chat(payload.session_id)
    if not chat_doc:
        raise HTTPException(status_code=404, detail="Chat session not found")

    history = chat_doc.get("history", [])
    report_text = ""
    for turn in reversed(history):
        if not isinstance(turn, dict) or turn.get("role") != "assistant":
            continue
        content = turn.get("content", "")
        if REPORT_MARKER_RE.search(content) or _parse_audit_report(content):
            report_text = content
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

    # Reconstruct the full chat transcript for the team notification
    full_transcript = "\n".join([
        f"{(t.get('role', '') if isinstance(t, dict) else '').title()}: {(t.get('content', '') if isinstance(t, dict) else str(t))}"
        for t in history
    ])
    
    # Always update/create the Lead with the latest full transcript and notify the team
    lead = await _upsert_ai_audit_chat_lead(
        db,
        email=payload.email,
        name=payload.name or "AI Audit Lead",
        company=payload.company,
        transcript=full_transcript,
        lead_type="audit",
    )
    
    background_tasks.add_task(send_lead_notification, lead)
    logger.info(f"Audit report emailed and team notified: lead={payload.email}")

    # Update audit_chat with captured email for traceability
    await db.update_audit_chat_report_state(
        session_id=payload.session_id,
        captured_email=payload.email,
        report_emailed=send_result.get("ok", False),
    )

    return {
        "ok": True,
        "email_sent": send_result.get("ok", False),
        "email_id": send_result.get("id"),
        "error": send_result.get("error"),
        "note": (
            "Report emailed successfully."
            if send_result.get("ok")
            else (send_result.get("error") or "Saved your details — our team will email the report shortly.")
        ),
    }


# Include the router in the main app
app.include_router(api_router)

env_cors = os.environ.get('CORS_ORIGINS', '')
allowed_origins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://aurvyz.com',
    'https://www.aurvyz.com'
]
if env_cors:
    allowed_origins.extend([origin.strip() for origin in env_cors.split(',') if origin.strip()])

# Remove duplicates
allowed_origins = list(set(allowed_origins))

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def _startup_scheduler():
    await db.connect()
    await db.init_schema()
    start_scheduler(db, send_calendly_confirmation_email)


@app.on_event("shutdown")
async def shutdown_db_client():
    stop_scheduler()
    await db.close()
