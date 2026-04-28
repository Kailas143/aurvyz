import { Rocket, Layers, Infinity as InfinityIcon } from "lucide-react";

const pillars = [
  {
    icon: Rocket,
    title: "We build & launch our own AI products",
    body: "Real products shipped to real customers — not just client decks. That builder DNA flows into every engagement.",
  },
  {
    icon: Layers,
    title: "Product thinking on every solution",
    body: "We treat your business like a product: clear users, sharp metrics, iterative releases. No one-off throwaway code.",
  },
  {
    icon: InfinityIcon,
    title: "Built for scale — not quick fixes",
    body: "Architected for growth from day one. Your systems should compound value as you scale, not collapse under it.",
  },
];

export default function Positioning() {
  return (
    <section
      id="positioning"
      data-testid="positioning-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl">
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
            / Positioning
          </div>
          <h2
            data-testid="positioning-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
          >
            More than a service agency —
            <br />
            <span className="text-[#1F2937]">
              a <span className="nx-gradient-text">product-driven</span> company.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed">
            Most agencies rent their expertise. We build it. Aurvyz is a
            studio where AI products and client systems are engineered by the
            same team, with the same standard.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <div
              key={i}
              data-testid={`positioning-pillar-${i}`}
              className="group relative bg-white rounded-2xl border border-[#0B3C5D]/10 p-8 hover:-translate-y-1 hover:shadow-xl hover:border-[#328CC1]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#0B3C5D]/5 grid place-items-center text-[#0B3C5D] group-hover:bg-[#2EC4B6]/15 group-hover:text-[#0B3C5D] transition-colors">
                  <p.icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <span className="font-display text-xs text-[#0B3C5D]/40">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display mt-6 text-lg font-semibold text-[#0B3C5D] leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
