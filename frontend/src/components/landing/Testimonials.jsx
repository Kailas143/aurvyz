import { Zap, Eye, CheckCircle } from "lucide-react";

const cards = [
  {
    title: "Built in days, not months",
    description: "We move fast so you can validate and launch quickly.",
    icon: Zap,
  },
  {
    title: "You see before you pay",
    description: "We create a working prototype first — so there are no surprises.",
    icon: Eye,
  },
  {
    title: "Systems that actually work",
    description: "We design solutions around real workflows, not generic tools.",
    icon: CheckCircle,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative py-24 sm:py-32 bg-white border-y border-[#0B3C5D]/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <h2
              data-testid="testimonials-headline"
              className="font-display text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Built for teams ready to move faster.
            </h2>
            <p className="mt-6 text-lg text-[#4B5563] leading-relaxed">
              We design and build intelligent systems that automate workflows, reduce manual effort, and help businesses scale with confidence.
            </p>
            <p className="mt-3 text-lg font-semibold text-[#0B3C5D]">
              Every solution is custom-built — no templates, no shortcuts.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4B5563] max-w-xs md:text-right md:justify-end">
            <span className="font-medium text-[#0B3C5D]">
              Focused on real outcomes — speed, clarity, and reliability.
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div
              key={i}
              data-testid={`card-${i}`}
              className="group relative bg-[#F7F9FB] rounded-2xl p-7 border border-[#0B3C5D]/10 hover:-translate-y-1 hover:shadow-xl hover:border-[#2EC4B6]/40 transition-all duration-300 flex flex-col"
            >
              <c.icon className="w-7 h-7 text-[#2EC4B6] mb-4" strokeWidth={1.5} />
              <h3 className="font-display font-semibold text-lg text-[#0B3C5D] mb-3">
                {c.title}
              </h3>
              <p className="text-[#4B5563] leading-relaxed text-[15px] flex-1">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
