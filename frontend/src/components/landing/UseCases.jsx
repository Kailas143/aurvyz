import { Stethoscope, ShoppingBag, Truck, Users, Rocket, CheckCircle2 } from "lucide-react";

const useCases = [
  {
    industry: "Clinics",
    icon: Stethoscope,
    features: ["Patient booking", "Records management", "Billing automation"],
  },
  {
    industry: "E-commerce",
    icon: ShoppingBag,
    features: ["Custom order management", "Supplier sync", "Returns portal"],
  },
  {
    industry: "Logistics",
    icon: Truck,
    features: ["Dispatch system", "Delivery tracking", "Invoice automation"],
  },
  {
    industry: "Service Businesses",
    icon: Users,
    features: ["CRM", "Lead tracking", "Staff scheduling"],
  },
  {
    industry: "Startups",
    icon: Rocket,
    features: ["MVPs", "Internal dashboards", "AI assistants"],
  },
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      data-testid="use-cases-section"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#2EC4B6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#328CC1]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
            / Industry Experience
          </div>
          <h2
            data-testid="use-cases-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
          >
            We've Will Built Systems For...
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-xl leading-relaxed">
            Industry-specific solutions engineered for scale. We don't just build software; we build the operating systems of modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <div
              key={i}
              data-testid={`use-case-card-${uc.industry.toLowerCase().replace(/\s+/g, '-')}`}
              className={`group relative p-8 rounded-3xl border border-[#0B3C5D]/10 bg-[#F7F9FB] hover:bg-white hover:shadow-[0_20px_50px_rgba(11,60,93,0.1)] hover:border-[#2EC4B6]/30 transition-all duration-500 ${i === 3 ? "lg:col-start-1" : ""
                }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#0B3C5D]/5 flex items-center justify-center text-[#0B3C5D] group-hover:bg-[#0B3C5D] group-hover:text-white transition-all duration-500 shadow-sm">
                  <uc.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0B3C5D]">
                  {uc.industry}
                </h3>
              </div>

              <ul className="space-y-4">
                {uc.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#2EC4B6] flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-[#0B3C5D] transition-colors">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-2 text-[11px] font-bold text-[#328CC1] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span>View Capability</span>
                <div className="w-8 h-[1px] bg-[#328CC1]/30 group-hover:w-12 transition-all duration-500" />
              </div>
            </div>
          ))}

          {/* Contact Card to fill the 6th slot */}
          <div className="group relative p-8 rounded-3xl border border-dashed border-[#0B3C5D]/20 bg-transparent flex flex-col items-center justify-center text-center hover:border-[#2EC4B6]/50 transition-all duration-500">
            <h4 className="font-display text-lg font-semibold text-[#0B3C5D]/60 group-hover:text-[#0B3C5D]">
              Your Industry Next?
            </h4>
            <p className="mt-2 text-sm text-[#4B5563]/70 group-hover:text-[#4B5563]">
              We build custom AI systems for unique business challenges.
            </p>
            <button className="mt-6 text-sm font-bold text-[#2EC4B6] hover:text-[#0B3C5D] transition-colors">
              Talk to an Engineer →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
