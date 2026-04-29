import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall, Sparkles, Gift } from "lucide-react";

const HERO_IMG =
  "/assets/hero-aurvyz-ai-studio.png";

export default function Hero({ onBookCall, onStartAudit }) {
  const scrollTo = (id) => () => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,60,93,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,60,93,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 30% 20%, #000 40%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: content */}
        <div className="lg:col-span-7 nx-rise">
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full border border-[#0B3C5D]/15 bg-white/70 backdrop-blur-sm text-xs font-semibold text-[#0B3C5D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
            <span>From idea to working solution in days - not months.</span>
            <span className="text-[#0B3C5D]/35">|</span>
            <span>A Complete AI Driven Studio</span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B3C5D] leading-[1.05] tracking-tight"
          >
            Future-Ready Systems.
            <br className="hidden sm:block" />{" "}
            <span className="nx-gradient-text">Built on Trust.</span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-6 text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed"
          >
            We design and build AI-powered systems that automate your workflows, reduce manual effort, and help your business scale faster.
          </p>

          <div
            data-testid="hero-pricing-guarantee"
            className="mt-6 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 p-2 pr-5 rounded-2xl sm:rounded-full bg-gradient-to-r from-white to-[#F7F9FB] border border-[#0B3C5D]/10 shadow-[0_4px_20px_-4px_rgba(11,60,93,0.08)] hover:shadow-[0_8px_30px_-4px_rgba(11,60,93,0.12)] hover:border-[#2EC4B6]/50 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2EC4B6]/0 via-[#2EC4B6]/10 to-[#2EC4B6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-[#0B3C5D] text-[#2EC4B6] shadow-inner relative z-10">
              <Gift className="w-5 h-5" strokeWidth={2} />
            </span>
            <span className="text-[15px] leading-snug text-[#1F2937] relative z-10">
              <span className="font-bold text-[#0B3C5D]">We don’t charge upfront for ideas.</span>
              <br className="sm:hidden" />
              <span className="text-[#4B5563] sm:ml-1">We only charge once you see a working prototype.</span>
            </span>
          </div>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button
              data-testid="hero-cta-audit"
              onClick={scrollTo("#cta")}
              className="h-12 px-7 rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Free Business Audit
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              data-testid="hero-cta-start-audit"
              onClick={onStartAudit}
              className="h-12 px-7 rounded-full bg-[#2EC4B6] text-[#0B3C5D] hover:bg-[#26b0a4] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Start AI Audit
            </Button>
            <Button
              data-testid="hero-cta-call"
              onClick={onBookCall}
              variant="outline"
              className="h-12 px-7 rounded-full border-[#0B3C5D]/25 text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              Book a Call
            </Button>
          </div>

          {/* Trust bar */}
          <div className="mt-12 flex items-center gap-6 text-xs text-[#4B5563]">
            <div className="flex -space-x-2">
              {["#0B3C5D", "#328CC1", "#2EC4B6"].map((c, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#F7F9FB]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div>
              <span className="font-semibold text-[#0B3C5D]">40+ teams</span>{" "}
              automated & scaled with Aurvyz systems.
            </div>
          </div>
        </div>

        {/* Right: floating visual */}
        <div className="lg:col-span-5 relative nx-rise" style={{ animationDelay: "0.15s" }}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#328CC1]/20 via-transparent to-[#2EC4B6]/25 blur-2xl" />
            <div className="absolute inset-x-8 -bottom-5 h-10 rounded-full bg-[#0B3C5D]/15 blur-2xl" />
            <div className="relative rounded-[28px] overflow-hidden border border-[#0B3C5D]/10 bg-[#071120] shadow-[0_30px_90px_rgba(11,60,93,0.22)]">
              <img
                src={HERO_IMG}
                alt="Aurvyz AI systems dashboard and automation showcase"
                className="w-full h-[360px] sm:h-[500px] object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/10 via-transparent to-white/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
