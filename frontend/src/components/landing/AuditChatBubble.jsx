import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/api";
import { Bot, X, Send, Sparkles, Loader2, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_GREETING =
  "Hey, I'm Aurvie — Aurvyz's AI consultant. I'll run a quick 5-step audit of your business and send you 3 tailored recommendations. Ready? First — what industry are you in or what does your business do?";

const panelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const messageVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

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
        history: messages,
        message: text,
      });
      if (data.session_id && !sessionId) setSessionId(data.session_id);
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
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
      {/* Floating bubble */}
      <motion.button
        data-testid="audit-chat-bubble"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300, delay: 1 }}
        aria-label="Open AI audit chat"
        className={`fixed right-6 z-[60] grid place-items-center w-16 h-16 rounded-full shadow-[0_15px_35px_-5px_rgba(11,60,93,0.3)] border border-[#2EC4B6]/40 transition-colors duration-300 ${
          open
            ? "bg-white text-[#0B3C5D]"
            : "bg-[#0B3C5D] text-white"
        }`}
        style={{ bottom: "76px" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot className="w-7 h-7 text-[#2EC4B6]" />
              <motion.span 
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#2EC4B6] ring-2 ring-white" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="audit-chat-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-6 z-[59] w-[calc(100vw-3rem)] sm:w-[420px] h-[600px] max-h-[85vh] rounded-[2rem] bg-white border border-[#0B3C5D]/10 shadow-[0_20px_60px_-10px_rgba(11,60,93,0.3)] flex flex-col overflow-hidden"
            style={{ bottom: "155px" }}
          >
            {/* Header */}
            <div className="bg-[#0B3C5D] text-white px-6 py-5 flex items-center gap-4 border-b border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2EC4B6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md grid place-items-center border border-white/15 overflow-hidden">
                  <Sparkles className="w-5 h-5 text-[#2EC4B6]" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#2EC4B6] ring-2 ring-[#0B3C5D]" />
              </div>
              
              <div className="flex-1 min-w-0 z-10">
                <div className="font-display font-bold text-base leading-tight">Aurvie</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
                  <div className="text-[11px] text-white/60 font-medium uppercase tracking-wider">
                    AI Consultant · Live
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              data-testid="audit-chat-messages"
              className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-[#F8FAFC] custom-scrollbar"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ChatBubble
                    role={m.role}
                    content={m.content}
                    sessionId={sessionId}
                    emailCaptured={completed}
                    onEmailCaptured={() => setCompleted(true)}
                  />
                </motion.div>
              ))}
              
              {sending && (
                <motion.div 
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-[#0B3C5D]/10 shadow-sm max-w-[160px] glass-panel"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map(dot => (
                      <motion.span
                        key={dot}
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#328CC1]"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-[#328CC1] uppercase tracking-[0.2em]">Thinking</span>
                </motion.div>
              )}
              
              {completed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] font-bold text-center text-[#0B3C5D]/40 pt-2 uppercase tracking-widest"
                >
                  ✓ Conversation Concluded
                </motion.div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white border-t border-[#0B3C5D]/5">
              <form
                onSubmit={send}
                className="relative flex items-center group"
              >
                <Input
                  data-testid="audit-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={completed ? "Report delivered" : "Type your message..."}
                  disabled={sending || completed}
                  className="pl-5 pr-14 h-14 border-[#0B3C5D]/10 focus-visible:ring-[#328CC1] rounded-2xl bg-[#F8FAFC] text-sm font-medium transition-all group-focus-within:bg-white group-focus-within:shadow-lg group-focus-within:shadow-[#0B3C5D]/5"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <Button
                    type="submit"
                    data-testid="audit-chat-send"
                    disabled={sending || completed || !input.trim()}
                    className="h-10 w-10 p-0 rounded-xl bg-[#0B3C5D] hover:bg-[#08304a] shadow-lg shadow-[#0B3C5D]/10 disabled:opacity-30 disabled:shadow-none transition-all"
                  >
                    {sending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
              <div className="mt-3 flex justify-center">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#0B3C5D]/30 uppercase tracking-[0.2em]">
                  <ShieldCheck className="w-3 h-3" />
                  Secure AI Infrastructure
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ role, content, sessionId, emailCaptured, onEmailCaptured }) {
  const isUser = role === "user";
  const isReport = !isUser && /🚨|💡\s\*\*High-Impact|🛠️|📈|⚡\s\*\*Next Step/.test(content);

  if (isReport) {
    return (
      <div className="flex justify-start w-full" data-testid="chat-msg-report">
        <AuditReport 
          content={content} 
          sessionId={sessionId} 
          emailCaptured={emailCaptured} 
          onEmailCaptured={onEmailCaptured} 
        />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      data-testid={`chat-msg-${role}`}
    >
      <div
        className={`max-w-[88%] rounded-3xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-[#0B3C5D] text-white rounded-br-sm shadow-[0_5px_15px_-3px_rgba(11,60,93,0.2)]"
            : "bg-white text-[#1F2937] border border-[#0B3C5D]/5 rounded-bl-sm"
        }`}
      >
        {isUser ? content : <RichText text={content} />}
      </div>
    </div>
  );
}

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
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-[#0B3C5D]">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function AuditReport({ content, sessionId, emailCaptured, onEmailCaptured }) {
  const sections = parseReport(content);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      data-testid="audit-report-card"
      className="w-full rounded-[2rem] border border-[#2EC4B6]/30 bg-white shadow-xl shadow-[#0B3C5D]/5 overflow-hidden"
    >
      <div className="bg-[#0B3C5D] text-white px-6 py-4 relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-16 h-16" />
        </div>
        <div className="text-[10px] tracking-[0.25em] uppercase text-[#2EC4B6] font-black">
          Aurvyz · Executive Report
        </div>
        <div className="font-display text-lg font-black mt-1">
          Growth & Strategy Audit
        </div>
      </div>
      <div className="p-5 space-y-4 bg-gradient-to-br from-white to-[#F8FAFC]">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <ReportSection section={s} />
          </motion.div>
        ))}
        {sessionId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sections.length * 0.1 + 0.5 }}
          >
            <EmailReportBlock
              sessionId={sessionId}
              captured={emailCaptured}
              onCaptured={onEmailCaptured}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        data-testid="email-report-success"
        className="rounded-2xl border border-[#2EC4B6]/40 bg-[#2EC4B6]/5 p-5 text-sm text-[#0B3C5D]"
      >
        <div className="font-bold flex items-center gap-2 text-base">
          <div className="h-6 w-6 rounded-full bg-[#2EC4B6] text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          Success! Report Dispatched.
        </div>
        <div className="text-[12px] text-[#4B5563] mt-2 leading-relaxed">
          {note || "We've sent the strategic report to your inbox. A product specialist will follow up within 24 hours to discuss execution."}
        </div>
      </motion.div>
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
      setNote(typeof detail === "string" ? detail : "Submission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-testid="email-report-form"
      className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 shadow-sm"
    >
      <div className="text-[11px] tracking-[0.2em] uppercase font-black text-[#0B3C5D] mb-4 flex items-center gap-2">
        <MessageSquareText className="w-4 h-4 text-[#328CC1]" />
        Finalize & Receive Report
      </div>
      <div className="space-y-3">
        <Input
          data-testid="email-report-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact Name"
          className="h-11 border-[#0B3C5D]/10 rounded-xl"
        />
        <Input
          data-testid="email-report-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Business Email Address"
          className="h-11 border-[#0B3C5D]/10 rounded-xl"
        />
      </div>
      <Button
        type="submit"
        data-testid="email-report-submit"
        disabled={submitting || !email.trim()}
        className="mt-4 h-12 w-full rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white font-bold transition-all shadow-lg shadow-[#0B3C5D]/10"
      >
        {submitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Unlock Strategy Guide"
        )}
      </Button>
      {note && (
        <div className="mt-3 text-[11px] text-[#E11D48] font-medium text-center">{note}</div>
      )}
    </motion.form>
  );
}

function ReportSection({ section }) {
  const accents = {
    "🚨": { bg: "bg-red-50/50", border: "border-red-100", icon: "text-red-500" },
    "💡": { bg: "bg-amber-50/50", border: "border-amber-100", icon: "text-amber-500" },
    "🛠️": { bg: "bg-[#F8FAFC]", border: "border-[#0B3C5D]/5", icon: "text-[#0B3C5D]" },
    "📈": { bg: "bg-[#2EC4B6]/5", border: "border-[#2EC4B6]/20", icon: "text-[#0B3C5D]" },
    "⚡": { bg: "bg-[#0B3C5D]", border: "border-[#0B3C5D]", icon: "text-white" },
    "🚀": { bg: "bg-blue-50/50", border: "border-blue-100", icon: "text-blue-500" },
  };
  const a = accents[section.emoji] || accents["🛠️"];
  const isCallout = section.emoji === "⚡";
  return (
    <div
      className={`rounded-2xl border ${a.border} ${a.bg} p-4 transition-all hover:shadow-md ${
        isCallout ? "text-white" : ""
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-black ${
          isCallout ? "text-[#2EC4B6]" : "text-[#0B3C5D]/70"
        }`}
      >
        <span className="text-lg">{section.emoji}</span>
        {section.title}
      </div>
      {section.bullets.length > 0 ? (
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed">
          {section.bullets.map((b, i) => (
            <li
              key={i}
              className={`flex gap-3 ${isCallout ? "text-white/90" : "text-[#334155]"}`}
            >
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                  isCallout ? "bg-[#2EC4B6]" : "bg-[#2EC4B6]"
                }`}
              />
              <span className="font-medium">{renderInline(b)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`mt-3 text-[13px] leading-relaxed font-medium ${
            isCallout ? "text-white/90" : "text-[#334155]"
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
      if (!cleaned || /^[-–—.]+$/.test(cleaned) || /^\[.*\]$/.test(cleaned)) continue;
      current.bullets.push(cleaned);
    } else {
      if (/^\[.*\]$/.test(line)) continue;
      current.body = current.body ? `${current.body} ${line}` : line;
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.bullets.length > 0 || s.body.trim().length > 0);
}

function ShieldCheck({ className }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

