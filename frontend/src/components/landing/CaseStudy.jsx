import { ArrowRight, CheckCircle, TrendingUp, Timer, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CASE_IMG = "/assets/case-study-automation.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

export default function CaseStudy() {
  const scrollToCTA = () => {
    const el = document.querySelector("#cta");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* Image side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#0B3C5D]/10 shadow-2xl group">
              <img
                src={CASE_IMG}
                alt="AI Workflow Automation Dashboard"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/80 via-[#0B3C5D]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6] font-semibold">
                    Automation · Workflows
                  </div>
                  <div className="font-display text-xl font-semibold mt-1">
                    Sample Use Case
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold">
              / Example Solution
            </motion.div>
            <motion.h2
              data-testid="case-headline"
              variants={fadeInUp}
              className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3C5D] leading-[1.1] tracking-tight"
            >
              How an AI system can automate bookings and improve efficiency.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-5 text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl text-base">
              Many businesses lose hours to manual processes, scattered data, and inefficient workflows. We design AI-powered systems that streamline operations, automate repetitive tasks, and bring everything into one intelligent workflow.
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { k: "↑ Up to 60%", v: "Operational efficiency potential" },
                { k: "↓ Reduced", v: "Less time spent on repetitive tasks" },
                { k: "⚡ Faster", v: "Improved response and execution speed" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[#0B3C5D]/10 bg-white p-5 hover:border-[#328CC1]/30 hover:shadow-lg transition-all shadow-sm flex flex-col justify-center"
                >
                  <div className="font-display text-xl font-bold text-[#0B3C5D]">
                    {m.k}
                  </div>
                  <div className="text-xs text-[#4B5563] mt-2 leading-relaxed">{m.v}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#F7F9FB] border border-[#0B3C5D]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <Zap className="w-32 h-32" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#0B3C5D]">
                Example: AI Booking & AI Application
              </h3>
              <p className="mt-2 text-sm text-[#4B5563] mb-5">
                We can build a system that:
              </p>
              <motion.ul variants={staggerContainer} className="space-y-3.5 relative z-10">
                {[
                  "Automates booking and scheduling",
                  "Sends smart reminders and follow-ups",
                  "Centralizes data into one dashboard",
                  "Reduces manual coordination and errors",
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    variants={{
                      initial: { opacity: 0, x: -10 },
                      whileInView: { opacity: 1, x: 0 }
                    }}
                    className="flex items-start gap-3 text-sm text-[#1F2937]"
                  >
                    <CheckCircle className="w-5 h-5 text-[#2EC4B6] shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <div className="mt-7 pt-5 border-t border-[#0B3C5D]/10 flex items-start gap-3 relative z-10">
                <div className="px-2 py-0.5 rounded bg-[#0B3C5D]/10 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-wider mt-0.5 shrink-0">
                  Note
                </div>
                <p className="text-[13px] text-[#4B5563] italic">
                  This is a sample solution based on common business workflows — customized for each client.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <Button
                onClick={scrollToCTA}
                className="group h-14 px-8 rounded-full bg-[#0B3C5D] hover:bg-[#08304a] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-base font-bold"
              >
                See what we can build for your business
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
