import { Search, Lightbulb, Hammer, Trophy, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Analyze your business",
    desc: "We audit your current stack, workflows and bottlenecks — grounded in your actual data, not generic templates.",
    when: "Day 1",
  },
  {
    icon: Lightbulb,
    title: "Identify opportunities",
    desc: "We isolate the 20% of workflows driving 80% of the leverage — and design the automation + product layer around them.",
    when: "Day 2",
  },
  {
    icon: Hammer,
    title: "Build the solution",
    desc: "Our product + engineering team ships end-to-end: architecture, UX, AI integration, QA and deployment.",
    when: "Day 3–6",
  },
  {
    icon: Trophy,
    title: "Deliver measurable results",
    desc: "You track real outcomes on a shared dashboard — hours saved, revenue lifted, errors reduced. No vague deliverables.",
    when: "Day 7",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      data-testid="how-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
            / How It Works
          </div>
          <h2
            data-testid="how-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
          >
            From idea to execution in
            <span className="nx-gradient-text"> 7 days</span>.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            Four steps from first call to compounding results. Rapid MVP
            delivery — no mystery, no scope creep, no vague timelines.
          </p>

          <div
            data-testid="how-speed-banner"
            className="mt-7 inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[#0B3C5D]/10 shadow-sm"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0B3C5D] text-[#2EC4B6]">
              <Zap className="w-3.5 h-3.5" strokeWidth={2.2} />
            </span>
            <span className="text-sm text-[#1F2937]">
              <span className="font-semibold text-[#0B3C5D]">
                7-day working solution
              </span>
              <span className="text-[#4B5563]">
                {" "}· delivered by a senior product team · scope-dependent
              </span>
            </span>
          </div>
        </div>

        {/* Steps with connecting line */}
        <div className="relative mt-16">
          {/* animated dashed line - desktop only */}
          <svg
            aria-hidden
            className="hidden lg:block absolute top-[46px] left-0 right-0 w-full h-4 nx-flow"
            preserveAspectRatio="none"
            viewBox="0 0 1000 20"
          >
            <defs>
              <linearGradient id="nx-line" x1="0" x2="1">
                <stop offset="0" stopColor="#328CC1" />
                <stop offset="1" stopColor="#2EC4B6" />
              </linearGradient>
            </defs>
            <path
              d="M 40 10 L 960 10"
              stroke="url(#nx-line)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                data-testid={`how-step-${i}`}
                className="relative"
              >
                <div className="relative w-[92px] h-[92px] rounded-2xl bg-white border border-[#0B3C5D]/10 grid place-items-center text-[#0B3C5D] shadow-sm mb-6">
                  <s.icon className="w-8 h-8" strokeWidth={1.4} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-display font-bold text-sm grid place-items-center shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#0B3C5D]">
                  {s.title}
                </h3>
                <div
                  data-testid={`how-step-${i}-timeline`}
                  className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2EC4B6]/15 text-[#0B3C5D] text-[11px] font-semibold tracking-wide"
                >
                  <Zap className="w-3 h-3" strokeWidth={2.4} />
                  {s.when}
                </div>
                <p className="mt-3 text-sm text-[#4B5563] leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
