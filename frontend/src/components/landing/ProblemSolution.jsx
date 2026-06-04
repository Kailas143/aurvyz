import { AlertTriangle, Clock, TrendingDown, Unplug, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: Unplug,
    title: "Disconnected Tools",
    body: "Your data is scattered across multiple apps, spreadsheets, and chat conversations. Teams spend time searching for information instead of getting work done.",
  },
  {
    icon: Clock,
    title: "Too Much Manual Work",
    body: "Repetitive tasks, follow-ups, data entry, and reporting consume valuable time that could be spent serving customers and growing the business.",
  },
];

const pillars = [
  {
    title: "Built Around Your Workflow",
    body: "No generic software or one-size-fits-all templates. Every system is tailored to your processes, team, and goals.",
  },
  {
    title: "Fast, Practical Execution",
    body: "We move quickly. Start with a prototype, validate the solution, and then scale it into a production-ready system.",
  },
  {
    title: "Technology That Grows With You",
    body: "From simple workflow automation to advanced AI systems, we build solutions that save time today and support your growth tomorrow.",
  },
];

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
      staggerChildren: 0.2
    }
  },
  viewport: { once: true }
};

export default function ProblemSolution() {
  return (
    <section id="why-aurvyz" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: The Problem */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <motion.div variants={fadeInUp} className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold mb-4">
              / The Problem
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3C5D] leading-[1.1] tracking-tight">
              Growing a business shouldn't mean doing <span className="text-[#4B5563]">more manual work.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 text-base text-[#4B5563] leading-relaxed">
              Many businesses still rely on spreadsheets, disconnected tools, and repetitive processes that slow teams down and create unnecessary complexity.
            </motion.p>

            <motion.div variants={staggerContainer} className="mt-10 space-y-6">
              {problems.map((p, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="flex gap-4 p-5 rounded-2xl bg-[#F7F9FB] border border-[#0B3C5D]/5 transition-colors hover:border-[#328CC1]/30 hover:bg-white hover:shadow-xl hover:shadow-[#0B3C5D]/5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B3C5D]">{p.title}</h4>
                    <p className="text-sm text-[#4B5563] mt-1">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: The Solution / Positioning */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-8 sm:p-12 rounded-[2rem] bg-[#0B3C5D] text-white shadow-2xl overflow-hidden"
          >
            <div aria-hidden className="absolute -top-24 -right-24 w-64 h-64 bg-[#2EC4B6]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="text-xs tracking-[0.22em] uppercase text-[#2EC4B6] font-semibold mb-4">
                / Our Solution
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-black leading-tight">
                We build systems that help your business <span className="text-[#2EC4B6]">run smarter.</span>
              </h3>
              <p className="mt-6 text-white/70 leading-relaxed text-base">
                Aurvyz creates custom software, AI assistants, and automation systems designed around the way your business actually works.
              </p>

              <div className="mt-10 space-y-8">
                {pillars.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2EC4B6]/10 text-[#2EC4B6]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-white/60 ml-9 leading-relaxed">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-12 pt-8 border-t border-white/10 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0B3C5D] bg-white/10" />
                   ))}
                </div>
                <div className="text-xs text-white/40">
                  Trusted by forward-thinking teams.
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
