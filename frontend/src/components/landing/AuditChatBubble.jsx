import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/api";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";

const INITIAL_GREETING =
  "Hey, I'm Aurvie — Aurvyz's AI consultant. I'll run a quick 5-step audit of your business and send you 3 tailored recommendations. Ready? First — what industry are you in or what does your business do?";

export default function AuditChatBubble({ open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (v) => {
    const next = typeof v === "function" ? v(open) : v;
    if (onOpenChange) onOpenChange(next);
    setInternalOpen(next);
  };
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    { role: "assistant", content: INITIAL_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setSending(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/audit-chat`, {
        session_id: sessionId,
        history: messages, // prior turns (everything before this user msg)
        message: text,
      });
      if (data.session_id && !sessionId) setSessionId(data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      // NOTE: do NOT set `completed` from data.captured_email — the report-email
      // form below the audit card is the one source of truth for completion.
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Sorry, I had trouble connecting. Mind trying that again?";
      setMessages((m) => [
        ...m,
        { role: "assistant", content: typeof msg === "string" ? msg : "Connection error." },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating bubble — sits above the Emergent badge */}
      <button
        data-testid="audit-chat-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI audit chat"
        className={`fixed right-4 z-[60] grid place-items-center w-14 h-14 rounded-full shadow-xl border border-[#2EC4B6]/40 transition-all duration-300 ${
          open
            ? "bg-white text-[#0B3C5D]"
            : "bg-[#0B3C5D] text-white hover:scale-105"
        }`}
        style={{ bottom: "76px" }}
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <Bot className="w-6 h-6 text-[#2EC4B6]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#2EC4B6] ring-2 ring-white animate-pulse" />
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          data-testid="audit-chat-panel"
          className="fixed right-4 z-[59] w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[80vh] rounded-2xl bg-white border border-[#0B3C5D]/15 shadow-2xl flex flex-col overflow-hidden"
          style={{ bottom: "150px" }}
        >
          {/* Header */}
          <div className="bg-[#0B3C5D] text-white px-5 py-4 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white/10 grid place-items-center border border-white/15">
              <Sparkles className="w-4 h-4 text-[#2EC4B6]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#2EC4B6] ring-2 ring-[#0B3C5D]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-sm">Aurvie</div>
              <div className="text-[11px] text-white/60">
                Aurvyz AI Consultant · online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            data-testid="audit-chat-messages"
            className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[#F7F9FB]"
          >
            {messages.map((m, i) => (
              <ChatBubble
                key={i}
                role={m.role}
                content={m.content}
                sessionId={sessionId}
                emailCaptured={completed}
                onEmailCaptured={() => setCompleted(true)}
              />
            ))}
            {sending && (
              <div className="flex items-center gap-2 text-xs text-[#4B5563]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Aurvie is thinking...
              </div>
            )}
            {completed && (
              <div className="text-[11px] text-center text-[#0B3C5D]/60 pt-2">
                ✓ Report sent. The team will reach out shortly.
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            className="border-t border-[#0B3C5D]/10 p-3 bg-white flex items-center gap-2"
          >
            <Input
              data-testid="audit-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={completed ? "Conversation complete." : "Type your reply..."}
              disabled={sending || completed}
              className="border-[#0B3C5D]/15 focus-visible:ring-[#328CC1] h-10"
            />
            <Button
              type="submit"
              data-testid="audit-chat-send"
              disabled={sending || completed || !input.trim()}
              className="h-10 w-10 p-0 rounded-full bg-[#0B3C5D] hover:bg-[#08304a]"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

function ChatBubble({ role, content }) {
  const isUser = role === "user";
  const isReport = !isUser && /🚨|💡\s\*\*High-Impact|🛠️|📈|⚡\s\*\*Next Step/.test(content);

  if (isReport) {
    return (
      <div className="flex justify-start" data-testid="chat-msg-report">
        <AuditReport content={content} />
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      data-testid={`chat-msg-${role}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-[#0B3C5D] text-white rounded-br-sm whitespace-pre-wrap"
            : "bg-white text-[#1F2937] border border-[#0B3C5D]/10 rounded-bl-sm"
        }`}
      >
        {isUser ? content : <RichText text={content} />}
      </div>
    </div>
  );
}

/** Render plain text with **bold** markdown support and preserved newlines. */
function RichText({ text }) {
  const lines = text.split("\n");
  return (
    <div className="whitespace-pre-wrap">
      {lines.map((line, i) => (
        <span key={i}>
          {renderInline(line)}
          {i < lines.length - 1 && "\n"}
        </span>
      ))}
    </div>
  );
}

function renderInline(line) {
  // Split by **bold** markers
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#0B3C5D]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

/** Parse and render a structured audit report as a premium card. */
function AuditReport({ content, sessionId, emailCaptured, onEmailCaptured }) {
  const sections = parseReport(content);
  return (
    <div
      data-testid="audit-report-card"
      className="w-full max-w-[92%] rounded-2xl border border-[#2EC4B6]/40 bg-gradient-to-br from-white to-[#F7F9FB] shadow-md overflow-hidden"
    >
      <div className="bg-[#0B3C5D] text-white px-4 py-3">
        <div className="text-[10px] tracking-[0.22em] uppercase text-[#2EC4B6] font-semibold">
          Aurvyz · Audit Report
        </div>
        <div className="font-display text-base font-semibold mt-0.5">
          Your tailored growth plan
        </div>
      </div>
      <div className="p-4 space-y-4">
        {sections.map((s, i) => (
          <ReportSection key={i} section={s} />
        ))}
        {sessionId && (
          <EmailReportBlock
            sessionId={sessionId}
            captured={emailCaptured}
            onCaptured={onEmailCaptured}
          />
        )}
      </div>
    </div>
  );
}

function EmailReportBlock({ sessionId, captured, onCaptured }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(captured);
  const [note, setNote] = useState("");

  if (done || captured) {
    return (
      <div
        data-testid="email-report-success"
        className="rounded-xl border border-[#2EC4B6]/40 bg-[#2EC4B6]/10 p-3.5 text-sm text-[#0B3C5D]"
      >
        <div className="font-semibold flex items-center gap-2">
          ✓ Report sent.
        </div>
        <div className="text-[12px] text-[#1F2937]/80 mt-1">
          {note || "Check your inbox in a moment. Our team will follow up within 1 business day."}
        </div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/audit-chat/email-report`, {
        session_id: sessionId,
        email: email.trim(),
        name: name.trim() || null,
      });
      setNote(data?.note || "");
      if (data?.email_sent) {
        setDone(true);
        if (onCaptured) onCaptured();
      }
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setNote(typeof detail === "string" ? detail : "Couldn't send — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      data-testid="email-report-form"
      className="rounded-xl border border-[#0B3C5D]/15 bg-white p-3.5"
    >
      <div className="text-[11px] tracking-[0.18em] uppercase font-semibold text-[#0B3C5D]/80 mb-2 flex items-center gap-2">
        📥 Email me this report
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          data-testid="email-report-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-9 text-sm border-[#0B3C5D]/15"
        />
        <Input
          data-testid="email-report-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="h-9 text-sm border-[#0B3C5D]/15"
        />
      </div>
      <Button
        type="submit"
        data-testid="email-report-submit"
        disabled={submitting || !email.trim()}
        className="mt-2.5 h-9 w-full rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white text-sm"
      >
        {submitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Sending...
          </>
        ) : (
          "Send the report"
        )}
      </Button>
      {note && (
        <div className="mt-2 text-[11px] text-[#4B5563]">{note}</div>
      )}
    </form>
  );
}

function ReportSection({ section }) {
  const accents = {
    "🚨": { bg: "bg-red-50", border: "border-red-100", icon: "text-red-500" },
    "💡": { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-500" },
    "🛠️": { bg: "bg-[#F7F9FB]", border: "border-[#0B3C5D]/10", icon: "text-[#0B3C5D]" },
    "📈": { bg: "bg-[#2EC4B6]/10", border: "border-[#2EC4B6]/30", icon: "text-[#0B3C5D]" },
    "⚡": { bg: "bg-[#0B3C5D]", border: "border-[#0B3C5D]", icon: "text-white" },
    "🚀": { bg: "bg-[#EEF6FF]", border: "border-[#328CC1]/20", icon: "text-[#0B3C5D]" },
  };
  const a = accents[section.emoji] || accents["🛠️"];
  const isCallout = section.emoji === "⚡";
  return (
    <div
      className={`rounded-xl border ${a.border} ${a.bg} p-3.5 ${
        isCallout ? "text-white" : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold ${
          isCallout ? "text-[#2EC4B6]" : "text-[#0B3C5D]/80"
        }`}
      >
        <span className="text-base">{section.emoji}</span>
        {section.title}
      </div>
      {section.bullets.length > 0 ? (
        <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className={`flex gap-2 ${isCallout ? "text-white/90" : "text-[#1F2937]"}`}
            >
              <span
                className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                  isCallout ? "bg-[#2EC4B6]" : "bg-[#328CC1]"
                }`}
              />
              <span>{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`mt-2 text-[13px] leading-relaxed ${
            isCallout ? "text-white/90" : "text-[#1F2937]"
          }`}
        >
          {renderInline(section.body)}
        </p>
      )}
    </div>
  );
}

const SECTION_RE = /^(🚨|💡|🛠️|📈|⚡|🚀)\s*\*?\*?(.+?)\*?\*?$/u;

function parseReport(text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const raw of lines) {
    const line = raw.trim();
    const m = line.match(SECTION_RE);
    if (m) {
      if (current) sections.push(current);
      current = { emoji: m[1], title: m[2].replace(/\*\*/g, "").trim(), bullets: [], body: "" };
      continue;
    }
    if (!current) continue;
    if (!line) continue;
    if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*")) {
      const cleaned = line.replace(/^[•\-\*]\s*/, "").trim();
      // Skip empty placeholders, dashes, or template markers
      if (!cleaned || /^[-–—.]+$/.test(cleaned) || /^\[.*\]$/.test(cleaned)) continue;
      current.bullets.push(cleaned);
    } else {
      // Skip template placeholder lines
      if (/^\[.*\]$/.test(line)) continue;
      current.body = current.body ? `${current.body} ${line}` : line;
    }
  }
  if (current) sections.push(current);
  // If a section has zero content, drop it so the card doesn't render an empty tile
  return sections.filter((s) => s.bullets.length > 0 || s.body.trim().length > 0);
}
