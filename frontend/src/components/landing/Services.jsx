import { Globe, Database, BrainCircuit, Workflow, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "High-conversion, brand-forward websites engineered for performance and qualified pipeline — not vanity metrics.",
    span: "md:col-span-5",
    tone: "light",
  },
  {
    icon: Database,
    title: "ERP Systems",
    desc: "Custom ERPs that unify finance, ops, inventory and customer data into one single source of truth.",
    span: "md:col-span-3",
    tone: "light",
  },
  {
    icon: BrainCircuit,
    title: "AI Applications",
    desc: "LLM-powered copilots, agents and internal tools tailored to your workflows, your data, your brand.",
    span: "md:col-span-3",
    tone: "dark",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    desc: "Systems that replace manual work — from lead intake to billing — with reliable, observable automations.",
    span: "md:col-span-5",
    tone: "light",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / What We Do
            </div>
            <h2
              data-testid="services-headline"
              className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Four engineered capabilities.
              <br /> One compounding system.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#4B5563] max-w-md">
            Each service is a building block. Combined, they become the
            operating system of a modern, AI-native business.
          </p>
        </div>

        <div className="grid md:grid-cols-8 gap-5">
          {services.map((s, i) => {
            const isDark = s.tone === "dark";
            return (
              <div
                key={i}
                data-testid={`service-card-${i}`}
                className={`${s.span} group relative rounded-2xl p-8 border transition-all duration-300 overflow-hidden ${
                  isDark
                    ? "bg-[#0B3C5D] text-white border-[#0B3C5D] hover:-translate-y-1 hover:shadow-2xl"
                    : "bg-white text-[#1F2937] border-[#0B3C5D]/10 hover:-translate-y-1 hover:shadow-xl hover:border-[#328CC1]/40"
                }`}
              >
                {isDark && (
                  <div
                    aria-hidden
                    className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-[#2EC4B6]/20 blur-3xl"
                  />
                )}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl grid place-items-center ${
                      isDark
                        ? "bg-white/10 text-[#2EC4B6] border border-white/15"
                        : "bg-[#0B3C5D]/5 text-[#0B3C5D] border border-[#0B3C5D]/10"
                    }`}
                  >
                    <s.icon className="w-5 h-5" strokeWidth={1.6} />
                  </div>
                  <ArrowUpRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isDark ? "text-[#2EC4B6]" : "text-[#0B3C5D]/40"
                    }`}
                  />
                </div>
                <h3
                  className={`relative font-display text-xl sm:text-2xl font-semibold mt-6 leading-tight ${
                    isDark ? "" : "text-[#0B3C5D]"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`relative mt-3 text-sm leading-relaxed ${
                    isDark ? "text-white/70" : "text-[#4B5563]"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
