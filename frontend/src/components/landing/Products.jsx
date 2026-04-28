import { ArrowRight, Bot, Stethoscope, BarChart3 } from "lucide-react";

const DASH_IMG =
  "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB0ZWNoJTIwc29mdHdhcmUlMjBkYXNoYm9hcmQlMjBVSXxlbnwwfHx8fDE3NzczMTQ2NzV8MA&ixlib=rb-4.1.0&q=85";

const products = [
  {
    icon: Bot,
    tag: "AI Workflow Automation",
    name: "FlowMind",
    desc: "We can build a system that plugs into your existing tools and automates multi-step workflows across intake, operations, follow-ups, and reporting.",
    metrics: [
      { k: "24/7", v: "workflow orchestration" },
      { k: "Multi-step", v: "process automation" },
    ],
  },
  {
    icon: Stethoscope,
    tag: "Smart Business System",
    name: "ClinicOS",
    desc: "A solution designed to unify bookings, reminders, records, billing, and AI-assisted front-desk support for clinic teams.",
    metrics: [
      { k: "Unified", v: "clinic operations" },
      { k: "AI-assisted", v: "front-desk support" },
    ],
  },
  {
    icon: BarChart3,
    tag: "Analytics SaaS",
    name: "InsightIQ",
    desc: "We can build a metrics workspace that turns raw business data into dashboards, anomaly alerts, and clear AI-generated weekly summaries.",
    metrics: [
      { k: "Real-time", v: "performance visibility" },
      { k: "Connected", v: "data reporting" },
    ],
  },
];

export default function Products() {
  return (
    <section
      id="products"
      data-testid="products-section"
      className="relative py-24 sm:py-32 bg-white border-y border-[#0B3C5D]/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / Solutions
            </div>
            <h2
              data-testid="products-headline"
              className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Solutions We Can Build for You
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-xl leading-relaxed">
              These are examples of AI systems we design and build based on your
              business needs.
            </p>
          </div>
        </div>

        {/* Flagship product card */}
        <div
          data-testid="flagship-product"
          className="relative rounded-3xl overflow-hidden border border-[#0B3C5D]/10 bg-[#0B3C5D] text-white p-8 sm:p-12 grid md:grid-cols-12 gap-8 items-center nx-beam"
        >
          <div className="md:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] text-[11px] tracking-widest uppercase">
              Example Solution
            </div>
            <h3 className="font-display mt-5 text-3xl sm:text-4xl font-bold leading-tight">
              FlowMind-style automation for <span className="text-[#2EC4B6]">high-volume workflows</span>.
            </h3>
            <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
              We can build a system that connects your stack and automates
              routing, intake, follow-ups, and reporting around the workflows
              that matter most to your team.
            </p>
            <div className="mt-7 flex flex-wrap gap-6 text-xs text-white/60">
              <div>
                <div className="font-display text-2xl text-white font-bold">CRM</div>
                connected systems
              </div>
              <div>
                <div className="font-display text-2xl text-white font-bold">Ops</div>
                workflow automation
              </div>
              <div>
                <div className="font-display text-2xl text-white font-bold">AI</div>
                assisted decisioning
              </div>
            </div>
          </div>
          <div className="md:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={DASH_IMG}
                alt="FlowMind dashboard"
                className="w-full h-[280px] md:h-[340px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3C5D]/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <div
              key={i}
              data-testid={`product-card-${i}`}
              className="group relative bg-[#F7F9FB] rounded-2xl p-7 border border-[#0B3C5D]/10 hover:-translate-y-1 hover:shadow-xl hover:border-[#2EC4B6]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white border border-[#0B3C5D]/10 grid place-items-center text-[#0B3C5D]">
                  <p.icon className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <span className="text-[10px] tracking-widest uppercase text-[#328CC1] font-semibold">
                  {p.tag}
                </span>
              </div>
              <h4 className="font-display mt-5 text-xl font-semibold text-[#0B3C5D]">
                {p.name}
              </h4>
              <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                {p.desc}
              </p>
              <div className="mt-5 flex gap-4 pt-5 border-t border-[#0B3C5D]/10">
                {p.metrics.map((m, j) => (
                  <div key={j}>
                    <div className="font-display text-lg font-bold text-[#0B3C5D]">
                      {m.k}
                    </div>
                    <div className="text-[11px] text-[#4B5563]">{m.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#0B3C5D] group-hover:text-[#2EC4B6] transition-colors">
                Explore the capability
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
