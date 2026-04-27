import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall, Activity, Bot, LineChart } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1770321428577-4446e5cb7bab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMDNkJTIwZ2VvbWV0cmljJTIwc2hhcGVzJTIwYmx1ZXxlbnwwfHx8fDE3NzczMTQ2NzR8MA&ixlib=rb-4.1.0&q=85";

export default function Hero() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0B3C5D]/15 bg-white/70 backdrop-blur-sm text-xs tracking-widest uppercase text-[#0B3C5D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
            Product-Driven AI Studio
          </div>

          <h1
            data-testid="hero-headline"
            className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B3C5D] leading-[1.05] tracking-tight"
          >
            Building{" "}
            <span className="nx-gradient-text">AI-Powered Products</span>
            <br className="hidden sm:block" /> & Automation Systems for
            <br className="hidden sm:block" /> Modern Businesses.
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-6 text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed"
          >
            We don't just build software — we create scalable products and
            automation systems that help businesses grow faster and operate
            smarter.
          </p>

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
              data-testid="hero-cta-call"
              onClick={scrollTo("#cta")}
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
              automated & scaled with Nexora systems.
            </div>
          </div>
        </div>

        {/* Right: floating visual */}
        <div className="lg:col-span-5 relative nx-rise" style={{ animationDelay: "0.15s" }}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-[#328CC1]/15 via-transparent to-[#2EC4B6]/20 blur-2xl" />
            <div className="relative rounded-[24px] overflow-hidden border border-[#0B3C5D]/10 nx-beam bg-white">
              <img
                src={HERO_IMG}
                alt="Abstract AI geometry"
                className="w-full h-[360px] sm:h-[460px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/35 via-transparent to-transparent" />
            </div>

            {/* Floating metric card */}
            <div
              data-testid="hero-metric-card"
              className="absolute -left-4 bottom-8 sm:-left-10 sm:bottom-12 bg-white rounded-2xl border border-[#0B3C5D]/10 shadow-xl p-4 w-56"
            >
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#328CC1]">
                <Activity className="w-3.5 h-3.5" />
                Live Automation
              </div>
              <div className="font-display text-2xl font-bold text-[#0B3C5D] mt-1">
                +62%
              </div>
              <div className="text-xs text-[#4B5563]">
                Ops efficiency for client cohort, QoQ
              </div>
            </div>

            {/* Floating product pill */}
            <div className="absolute -right-3 top-6 sm:-right-6 sm:top-10 bg-[#0B3C5D] text-white rounded-2xl shadow-xl p-4 w-56">
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#2EC4B6]">
                <Bot className="w-3.5 h-3.5" />
                AI Product
              </div>
              <div className="font-display text-base font-semibold mt-1">
                FlowMind
              </div>
              <div className="text-xs text-white/70">
                Autonomous workflow agent
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-white/70">
                <LineChart className="w-3 h-3 text-[#2EC4B6]" />
                Deployed in 12 orgs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
