import { AlertTriangle, Clock, TrendingDown, Unplug } from "lucide-react";

const issues = [
  {
    icon: Unplug,
    title: "Outdated, disconnected systems",
    body: "Tools that don't talk to each other. Data lives in silos. Teams patch it with spreadsheets.",
  },
  {
    icon: Clock,
    title: "Manual processes eat days",
    body: "Hours lost to copy-paste work. Your best people doing work a workflow agent should own.",
  },
  {
    icon: TrendingDown,
    title: "Websites that don't convert",
    body: "Generic templates. Weak positioning. Traffic that never turns into revenue or qualified leads.",
  },
  {
    icon: AlertTriangle,
    title: "No automation, no scalability",
    body: "Growth breaks your ops. Every new customer adds friction instead of helping you scale faster.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      data-testid="problem-section"
      className="relative py-24 sm:py-32 bg-[#0B3C5D] text-white overflow-hidden"
    >
      {/* Ambient accent */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#328CC1]/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#2EC4B6]/15 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.22em] uppercase text-[#2EC4B6] font-semibold">
            / The Problem
          </div>
          <h2
            data-testid="problem-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-bold leading-[1.08] tracking-tight"
          >
            The stack is broken. Your growth pays the price.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Modern businesses are stuck running on yesterday's software. The
            result? Lost revenue, burned-out teams and a ceiling on every KPI.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {issues.map((x, i) => (
            <div
              key={i}
              data-testid={`problem-item-${i}`}
              className="group relative rounded-2xl p-7 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#2EC4B6]/40 transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#2EC4B6]/15 text-[#2EC4B6] grid place-items-center border border-[#2EC4B6]/25">
                  <x.icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {x.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {x.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
