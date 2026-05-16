import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";
import { ArrowRight, ShieldCheck, CalendarCheck2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const initialState = {
  name: "",
  email: "",
  company: "",
  message: "",
  lead_type: "audit",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const floatingAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function CTASection({ onBookCall }) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handle = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e, type) => {
    e.preventDefault();
    const lead_type = type || form.lead_type;

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/leads`, {
        ...form,
        lead_type,
        source: "landing_page",
      });
      toast.success(
        lead_type === "call"
          ? "Call request received — we'll reach out within 24h."
          : "Audit request received — check your inbox within 1 business day."
      );
      setForm(initialState);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        "Something went wrong. Please try again in a moment.";
      toast.error(typeof detail === "string" ? detail : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="cta"
      data-testid="cta-section"
      className="relative py-16 sm:py-20 bg-[#0B3C5D] text-white overflow-hidden"
    >
      <motion.div
        aria-hidden
        variants={floatingAnimation}
        animate="animate"
        className="absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full bg-[#328CC1]/30 blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        variants={floatingAnimation}
        animate="animate"
        className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-[#2EC4B6]/20 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left: copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="text-xs tracking-[0.22em] uppercase text-[#2EC4B6] font-semibold">
            / Start Here
          </div>
          <h2
            data-testid="cta-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-black leading-[1.05] tracking-tight"
          >
            Get a free audit of your AI systems.
          </h2>
          <p className="mt-5 text-white/70 text-base leading-relaxed max-w-md">
            Share a few details and our product team will return a tailored
            report: what to automate first, what to rebuild, and the fastest
            path to measurable ROI.
          </p>

          <motion.ul 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.1 } }
            }}
            className="mt-8 space-y-3 text-sm text-white/80"
          >
            {[
              { icon: ShieldCheck, t: "No-obligation, confidential review" },
              { icon: CalendarCheck2, t: "Response within 1 business day" },
              { icon: Sparkles, t: "Delivered by product engineers, not SDRs" },
            ].map((x, i) => (
              <motion.li 
                key={i} 
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 grid place-items-center text-[#2EC4B6]">
                  <x.icon className="w-4 h-4" />
                </span>
                {x.t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={(e) => submit(e)}
          data-testid="audit-form"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 bg-white text-[#1F2937] rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/10"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                Full Name*
              </label>
              <Input
                data-testid="form-name"
                value={form.name}
                onChange={handle("name")}
                placeholder="Jane Doe"
                className="mt-1 h-12 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1] rounded-xl"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                Work Email*
              </label>
              <Input
                data-testid="form-email"
                type="email"
                value={form.email}
                onChange={handle("email")}
                placeholder="jane@company.com"
                className="mt-1 h-12 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1] rounded-xl"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                Company
              </label>
              <Input
                data-testid="form-company"
                value={form.company}
                onChange={handle("company")}
                placeholder="Acme Inc."
                className="mt-1 h-12 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1] rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                What would you like to automate or build?
              </label>
              <Textarea
                data-testid="form-message"
                value={form.message}
                onChange={handle("message")}
                placeholder="e.g. Automate client intake, build an internal AI assistant, modernize our ERP..."
                className="mt-1 min-h-[120px] border-[#0B3C5D]/15 focus-visible:ring-[#328CC1] rounded-xl"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              data-testid="submit-audit"
              disabled={submitting}
              className="h-14 px-8 rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white flex-1 shadow-xl hover:shadow-2xl transition-all font-bold text-base"
            >
              {submitting ? "Sending..." : "Get Free Audit"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              type="button"
              data-testid="submit-call"
              onClick={onBookCall}
              disabled={submitting}
              variant="outline"
              className="h-14 px-8 rounded-full border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-white flex-1 shadow-sm font-bold text-base transition-all"
            >
              Book a Call
            </Button>
          </div>

          <p className="mt-6 text-[11px] text-[#4B5563] text-center">
            By submitting you agree to be contacted by the Aurvyz team. We
            never share your details.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
