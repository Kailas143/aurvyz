import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Nexora rebuilt our ops layer in under a week. We replaced three vendors and our front-desk team got eight hours of their week back — immediately.",
    name: "Dr. Priya Menon",
    role: "Director, Regional Dental Group",
    initials: "PM",
    accent: "#0B3C5D",
  },
  {
    quote:
      "We came in expecting an agency. We got a product team. Their AI agent now handles 70% of our customer intake without a single drop in conversion.",
    name: "Marcus Hale",
    role: "Founder, ShopOrbit (DTC ecom)",
    initials: "MH",
    accent: "#328CC1",
  },
  {
    quote:
      "The 7-day MVP wasn't a tagline — it was the actual delivery. We had a working internal copilot live by day six and rolled it out company-wide by month-end.",
    name: "Aisha Okafor",
    role: "Head of Operations, Kestrel Logistics",
    initials: "AO",
    accent: "#2EC4B6",
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
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / Trusted By
            </div>
            <h2
              data-testid="testimonials-headline"
              className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
            >
              Operators who shipped with us.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#4B5563]">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#2EC4B6] text-[#2EC4B6]"
                />
              ))}
            </div>
            <span className="font-medium text-[#0B3C5D]">4.9/5</span>
            <span>across 40+ engagements</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="group relative bg-[#F7F9FB] rounded-2xl p-7 border border-[#0B3C5D]/10 hover:-translate-y-1 hover:shadow-xl hover:border-[#2EC4B6]/40 transition-all duration-300 flex flex-col"
            >
              <Quote className="w-7 h-7 text-[#2EC4B6] mb-4" strokeWidth={1.5} />
              <blockquote className="text-[#1F2937] leading-relaxed text-[15px] flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-[#0B3C5D]/10 flex items-center gap-3">
                <span
                  className="grid place-items-center w-10 h-10 rounded-full text-white font-display font-bold text-sm"
                  style={{ background: t.accent }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="font-display font-semibold text-sm text-[#0B3C5D]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#4B5563]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
