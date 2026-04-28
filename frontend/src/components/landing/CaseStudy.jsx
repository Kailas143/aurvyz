import { Quote } from "lucide-react";

const CASE_IMG =
  "https://images.pexels.com/photos/7108269/pexels-photo-7108269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      className="relative py-24 sm:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Image side */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#0B3C5D]/10 shadow-xl">
              <img
                src={CASE_IMG}
                alt="Case study — clinic operations"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6]">
                    Healthcare · ClinicOS
                  </div>
                  <div className="font-display text-xl font-semibold mt-1">
                    Regional Dental Group
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-bold">+60%</div>
                  <div className="text-[11px] text-white/70">efficiency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / Case Study
            </div>
            <h2
              data-testid="case-headline"
              className="font-display mt-4 text-3xl sm:text-4xl font-bold text-[#0B3C5D] leading-[1.1] tracking-tight"
            >
              How we helped a clinic automate bookings and lift efficiency by 60%.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              A regional dental group was losing hours to phone-based bookings,
              manual reminders and fragmented records. We deployed ClinicOS —
              our vertical SaaS + custom automation layer — and rewired their
              front desk around an AI assistant and a single patient timeline.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "+60%", v: "operational efficiency" },
                { k: "−45%", v: "no-show rate" },
                { k: "3×", v: "online bookings" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5"
                >
                  <div className="font-display text-2xl font-bold text-[#0B3C5D]">
                    {m.k}
                  </div>
                  <div className="text-xs text-[#4B5563] mt-1">{m.v}</div>
                </div>
              ))}
            </div>

            <figure className="mt-9 relative pl-6 border-l-2 border-[#2EC4B6]">
              <Quote className="absolute -left-3 -top-2 w-5 h-5 text-[#2EC4B6] bg-[#F7F9FB]" />
              <blockquote className="text-[#1F2937] italic leading-relaxed">
                “Aurvyz didn't just give us software — they gave us a system.
                Our ops team finally has time to focus on patients again.”
              </blockquote>
              <figcaption className="mt-3 text-xs text-[#4B5563]">
                — Director of Operations, Regional Dental Group
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
