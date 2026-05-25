import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";
import { ArrowRight, CalendarCheck2, Loader2, ChevronLeft } from "lucide-react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/kailasvs94/30min";

/**
 * Two-step booking modal:
 *  1) Intake form (name, email, company, notes)  -> saves lead to /api/leads (type=call)
 *  2) Calendly iframe, prefilled with the intake data
 */
export default function BookingModal({ open, onOpenChange }) {
  const [step, setStep] = useState("intake"); // 'intake' | 'booking'
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    if (!open) {
      // small delay for close animation before resetting
      const t = setTimeout(() => {
        setStep("intake");
        setSubmitting(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handle = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const calendlySrc = useMemo(() => {
    const params = new URLSearchParams();
    params.set("hide_gdpr_banner", "1");
    params.set("primary_color", "0b3c5d");
    if (form.name) params.set("name", form.name);
    if (form.email) params.set("email", form.email);
    // a1 is Calendly's first custom question (usually "Company" or similar)
    const notes = [form.company, form.message].filter(Boolean).join(" · ");
    if (notes) params.set("a1", notes);
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [form]);

  const submitIntake = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/leads`, {
        ...form,
        lead_type: "call",
        source: "booking_modal",
      });
      toast.success("Details saved — pick a time below.");
      setStep("booking");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Couldn't reach the backend. Check NEXT_PUBLIC_BACKEND_URL or your local API server."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="booking-modal"
        className="max-w-3xl p-0 border-[#0B3C5D]/15 rounded-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">Book a Call</DialogTitle>
        <DialogDescription className="sr-only">
          Share a few details and pick a time for a 30-minute intro call.
        </DialogDescription>

        {step === "intake" && (
          <div className="p-7 sm:p-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-[#2EC4B6]/15 text-[#0B3C5D] grid place-items-center border border-[#2EC4B6]/40">
                <CalendarCheck2 className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
                / Book a 30-min Intro Call
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3C5D] tracking-tight">
              Let's find 30 minutes that work for you.
            </h3>
            <p className="mt-2 text-sm text-[#4B5563]">
              Share a few details so we come prepared. You'll pick a time on
              the next step.
            </p>

            <form onSubmit={submitIntake} className="mt-6 grid sm:grid-cols-2 gap-4" data-testid="booking-intake-form">
              <div>
                <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                  Full Name*
                </label>
                <Input
                  data-testid="booking-name"
                  value={form.name}
                  onChange={handle("name")}
                  placeholder="Jane Doe"
                  className="mt-1 h-11 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1]"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                  Work Email*
                </label>
                <Input
                  data-testid="booking-email"
                  type="email"
                  value={form.email}
                  onChange={handle("email")}
                  placeholder="jane@company.com"
                  className="mt-1 h-11 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1]"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                  Company
                </label>
                <Input
                  data-testid="booking-company"
                  value={form.company}
                  onChange={handle("company")}
                  placeholder="Acme Inc."
                  className="mt-1 h-11 border-[#0B3C5D]/15 focus-visible:ring-[#328CC1]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#0B3C5D] tracking-wide">
                  Topic / Notes
                </label>
                <Textarea
                  data-testid="booking-notes"
                  value={form.message}
                  onChange={handle("message")}
                  placeholder="What would you like to discuss?"
                  className="mt-1 min-h-[96px] border-[#0B3C5D]/15 focus-visible:ring-[#328CC1]"
                />
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-1">
                <Button
                  type="submit"
                  data-testid="booking-next"
                  disabled={submitting}
                  className="h-11 px-6 rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Continue to Calendar
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className="mt-4 text-[11px] text-[#4B5563]">
              No hard sell. 30 minutes · free · confidential.
            </p>
          </div>
        )}

        {step === "booking" && (
          <div className="flex flex-col" data-testid="booking-calendar">
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-[#0B3C5D]/10 bg-[#F7F9FB]">
              <button
                onClick={() => setStep("intake")}
                data-testid="booking-back"
                className="inline-flex items-center gap-1 text-sm text-[#0B3C5D] hover:text-[#2EC4B6] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Edit details
              </button>
              <div className="text-[11px] tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
                Step 2 · Pick a time
              </div>
            </div>
            <iframe
              title="Calendly booking"
              src={calendlySrc}
              className="w-full"
              style={{ height: "680px", border: "0" }}
              loading="lazy"
              data-testid="booking-iframe"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
