import { Clock3, TrendingUp, Cog, Zap, Rocket } from "lucide-react";

const benefits = [
  { icon: Rocket, k: "Prototype First", v: "See a working version of your system before you commit to full development." },
  { icon: Clock3, k: "No Upfront Risk", v: "We build the initial prototype on our dime. You only pay when you decide to proceed." },
  { icon: Cog, k: "Custom-Built Solutions", v: "Software tailored precisely to your workflows, not shoehorned into generic templates." },
  { icon: Zap, k: "Fast Delivery", v: "From first call to a working prototype in 24 hours. Full deployment in weeks, not months." },
  { icon: TrendingUp, k: "Direct Technical Team", v: "Work directly with the engineers building your system. No account managers playing telephone." },
  { icon: Rocket, k: "Long-Term Support", v: "We maintain, monitor, and scale your systems as your business grows." },
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
              / Why Aurvyz
            </div>
            <h2
              data-testid="benefits-headline"
              className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Why Businesses Choose Aurvyz.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-md leading-relaxed">
              We eliminate the risk of custom software development with rapid prototypes and clear, outcome-driven engineering.
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
