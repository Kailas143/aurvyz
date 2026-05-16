import { Clock3, TrendingUp, Cog, Zap, Rocket } from "lucide-react";

const benefits = [
  { icon: Rocket, k: "Ship in 7 Days", v: "Rapid MVP development so you see a working solution in one week — scope-dependent, never rushed on quality." },
  { icon: Clock3, k: "Save Time", v: "Reclaim 20–40 hours per week by automating repetitive, manual workflows." },
  { icon: TrendingUp, k: "Increase Revenue", v: "Higher-converting systems and products that compound pipeline quarter over quarter." },
  { icon: Cog, k: "Reduce Manual Work", v: "Your team stops copy-pasting and starts compounding — with AI agents doing the grunt work." },
  { icon: Zap, k: "Improve Efficiency", v: "Real-time data, fewer errors, faster decisions. Ops that scale without scaling headcount." },
];

export default function Benefits() {
  return (
    <section
      id="benefits"
      data-testid="benefits-section"
      className="relative py-16 sm:py-20 bg-white border-y border-[#0B3C5D]/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / The Impact
            </div>
            <h2
              data-testid="benefits-headline"
              className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Outcomes you can
              <br />
              <span className="nx-gradient-text">actually measure</span>.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-md leading-relaxed">
              We align on metrics before we align on scope. Every engagement is
              tied to business outcomes, not deliverables.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                data-testid={`benefit-${i}`}
                className="group relative bg-[#F7F9FB] rounded-2xl p-7 border border-[#0B3C5D]/10 hover:-translate-y-1 hover:border-[#2EC4B6]/50 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#2EC4B6]/15 text-[#0B3C5D] grid place-items-center border border-[#2EC4B6]/30">
                  <b.icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-[#0B3C5D]">
                  {b.k}
                </h3>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                  {b.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
