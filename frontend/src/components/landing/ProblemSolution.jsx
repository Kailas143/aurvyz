import { AlertTriangle, Clock, TrendingDown, Unplug, CheckCircle2, ArrowRight } from "lucide-react";

const problems = [
  {
    icon: Unplug,
    title: "Disconnected Systems",
    body: "Tools that don't talk to each other. Data lives in silos. Teams patch it with spreadsheets.",
  },
  {
    icon: Clock,
    title: "Manual Overload",
    body: "Hours lost to copy-paste work. Your best people doing work a workflow agent should own.",
  },
];

const pillars = [
  {
    title: "Builder DNA",
    body: "We launch our own AI products. That expertise flows into every client system we engineer.",
  },
  {
    title: "Product Thinking",
    body: "No one-off code. We treat your business like a product: clear users, sharp metrics, iterative releases.",
  },
];

export default function ProblemSolution() {
  return (
    <section id="why-aurvyz" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: The Problem */}
          <div className="relative">
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold mb-4">
              / The Challenge
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3C5D] leading-tight">
              Legacy software is the <span className="text-[#4B5563]">ceiling</span> on your growth.
            </h2>
            <p className="mt-6 text-base text-[#4B5563] leading-relaxed">
              Most businesses are held back by legacy tools that require manual management instead of driving automatic growth.
            </p>

            <div className="mt-10 space-y-6">
              {problems.map((p, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#F7F9FB] border border-[#0B3C5D]/5">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3C5D]">{p.title}</h4>
                    <p className="text-sm text-[#4B5563] mt-1">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Solution / Positioning */}
          <div className="relative p-8 sm:p-12 rounded-[2rem] bg-[#0B3C5D] text-white shadow-2xl overflow-hidden">
            <div aria-hidden className="absolute -top-24 -right-24 w-64 h-64 bg-[#2EC4B6]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-xs tracking-[0.22em] uppercase text-[#2EC4B6] font-semibold mb-4">
                / Our Approach
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight">
                Engineering <span className="text-[#2EC4B6]">architectures of leverage</span>.
              </h3>
              <p className="mt-6 text-white/70 leading-relaxed">
                We don't just build software; we engineer the operational infrastructure that becomes the foundation of your growth. Strategic assets designed to gain value as you scale.
              </p>

              <div className="mt-10 space-y-8">
                {pillars.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2EC4B6]" />
                      <h4 className="font-bold text-lg">{item.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-white/60 ml-8 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B3C5D] bg-white/10" />
                   ))}
                </div>
                <div className="text-xs text-white/40">
                  Trusted by forward-thinking teams.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
