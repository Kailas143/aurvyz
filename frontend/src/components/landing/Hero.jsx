import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Gift, ShieldCheck, Zap } from "lucide-react";

const HERO_IMG = "/assets/hero-aurvyz-ai-studio.png";

export default function Hero({ onBookCall, onStartAudit }) {
  const scrollTo = (id) => () => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-32 pb-24 sm:pt-48 sm:pb-40 overflow-hidden"
    >
      {/* Subtle grid & ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "linear-gradient(rgba(11,60,93,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,60,93,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 30% 20%, #000 40%, transparent 80%)",
          }}
        />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#328CC1]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-[#2EC4B6]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:items-center lg:text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="nx-rise inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0B3C5D]/10 bg-white/50 backdrop-blur-md text-[11px] font-bold text-[#0B3C5D] uppercase tracking-widest mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#2EC4B6] shadow-[0_0_8px_#2EC4B6]" />
            AI-Powered Operational Systems
          </div>

          <h1
            data-testid="hero-headline"
            className="nx-rise font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0B3C5D] leading-[1.05] tracking-tight"
            style={{ animationDelay: '0.1s' }}
          >
            Future-Ready AI <br className="hidden sm:block" />
            <span className="nx-gradient-text">Operational Systems.</span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="nx-rise mt-8 text-base sm:text-xl text-[#4B5563] max-w-2xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            We design and engineer high-performance **AI systems** that automate operations, reduce manual work, and <span className="font-bold text-[#0B3C5D]">deliver interactive prototypes in under 24 hours.</span>
          </p>

          {/* Pricing Highlight */}
          <div
            data-testid="hero-pricing-guarantee"
            className="nx-rise mt-10 inline-flex items-center gap-4 p-1.5 pr-6 rounded-full bg-white border border-[#0B3C5D]/5 shadow-xl shadow-[#0B3C5D]/5 group hover:border-[#2EC4B6]/30 transition-all duration-500"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0B3C5D] text-[#2EC4B6]">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-[#1F2937]">
              Your vision is our investment. <span className="font-bold text-[#0B3C5D]">Pay only after validating a working prototype.</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="nx-rise mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto" style={{ animationDelay: '0.4s' }}>
            <Button
              data-testid="hero-cta-start-audit"
              onClick={onStartAudit}
              className="h-14 px-8 rounded-full bg-[#0B3C5D] text-white hover:bg-[#08304a] shadow-xl shadow-[#0B3C5D]/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all w-full sm:w-auto font-bold text-base"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Free AI Audit
            </Button>
            <Button
              data-testid="hero-cta-call"
              onClick={onBookCall}
              variant="outline"
              className="h-14 px-8 rounded-full border-[#0B3C5D]/15 text-[#0B3C5D] hover:bg-[#F7F9FB] transition-all w-full sm:w-auto font-bold text-base bg-white/50 backdrop-blur-sm"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Trust bar */}
          <div className="nx-rise mt-16 flex items-center gap-6 text-xs text-[#4B5563] font-medium" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2EC4B6]" />
              24-Hour Prototype Delivery
            </div>
            <div className="w-px h-4 bg-[#0B3C5D]/10" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
              Zero Upfront Risk
            </div>
            <div className="w-px h-4 bg-[#0B3C5D]/10" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
              Built for Real Operations
            </div>
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="nx-rise mt-20 relative max-w-5xl mx-auto" style={{ animationDelay: '0.6s' }}>
          <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#328CC1]/10 via-transparent to-[#2EC4B6]/10 blur-2xl" />
          <div className="relative rounded-[32px] overflow-hidden border border-[#0B3C5D]/10 bg-[#0B3C5D] shadow-[0_40px_100px_-20px_rgba(11,60,93,0.3)] group">
            <div className="absolute top-6 right-6 z-20 hidden sm:flex flex-col items-center gap-2 px-5 py-4 rounded-3xl bg-[#0B3C5D]/80 backdrop-blur-xl border border-white/10 shadow-2xl animate-pulse">
              <Zap className="w-6 h-6 text-[#2EC4B6] fill-[#2EC4B6]" />
              <div className="text-[10px] font-bold text-white uppercase tracking-[0.2em] text-center leading-tight">
                24 Hour<br />Delivery
              </div>
            </div>
            <img
              src={HERO_IMG}
              alt="Aurvyz AI-powered operational architecture dashboard showing real-time automation metrics"
              className="w-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
