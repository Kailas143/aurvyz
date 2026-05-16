import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Aurvyz didn't just build an app; they engineered an operating system that unified our entire clinic. We saw a 40% reduction in manual admin work within the first month.",
    author: "Dr. Sarah Chen",
    role: "Director, Metro Health Group",
    stars: 5,
  },
  {
    quote: "The speed of execution was incredible. We had a fully functional AI-driven admissions pipeline in 24 hours. It's now the backbone of our student outreach.",
    author: "James Miller",
    role: "Head of Operations, Global Admissions",
    stars: 5,
  },
  {
    quote: "They have a 'Builder DNA' that is rare to find. They treat your business problems like their own and engineer architectures that scale.",
    author: "Elena Rodriguez",
    role: "Founder, Fintech Frontier",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold mb-4">
            / Social Proof
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-tight">
            Trusted by the leaders <br />
            <span className="nx-gradient-text">building the future.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="relative p-8 rounded-3xl bg-white border border-[#0B3C5D]/5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="absolute top-6 right-8 opacity-5">
                <Quote className="w-12 h-12 text-[#0B3C5D]" />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#2EC4B6] text-[#2EC4B6]" />
                ))}
              </div>
              <p className="text-[#4B5563] leading-relaxed italic mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-[#0B3C5D]/5">
                <div className="w-10 h-10 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center font-bold text-[#0B3C5D] text-xs">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-[#0B3C5D] text-sm">{t.author}</h4>
                  <p className="text-[11px] text-[#4B5563] uppercase tracking-wider font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
