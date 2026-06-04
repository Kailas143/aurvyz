import { Globe, Database, BrainCircuit, Workflow, ArrowRight, Bot, Stethoscope, BarChart3, Clock, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Globe,
    title: "Custom Software Tailored to Your Workflow",
    desc: "Strategic, high-conversion systems built specifically for how your business actually runs.",
  },
  {
    icon: Database,
    title: "Unify Your Business Data",
    desc: "Bring your finance, inventory, and operations into a single, easy-to-use platform.",
  },
  {
    icon: BrainCircuit,
    title: "Automate Decisions & Repetitive Tasks",
    desc: "Custom AI modules that handle your time-consuming tasks so your team can focus on growth.",
  },
  {
    icon: Workflow,
    title: "Scale Without Expanding Headcount",
    desc: "Replace manual overhead with automated workflows that work 24/7.",
  },
];

const solutions = [
  {
    icon: Stethoscope,
    name: "ClinicOS",
    desc: "Unifies bookings, records, and AI front-desk for clinic teams.",
    tag: "Business OS",
  },
  {
    icon: ReceiptText,
    name: "BillFlow AI",
    desc: "AI-powered invoice analysis and approval workflow system.",
    tag: "Finance AI",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
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

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-16 sm:py-20 bg-[#F7F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-10"
        >
          <div className="text-xs tracking-[0.22em] uppercase text-[#328CC1] font-semibold mb-4">
            / Capabilities & Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#0B3C5D] leading-[1.1] tracking-tight">
            Custom systems built for <br className="hidden sm:block" />
            <span className="nx-gradient-text">growing businesses.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            We build the software systems that automate workflows, reduce manual effort, and help organizations scale.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {capabilities.map((c, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-white border border-[#0B3C5D]/5 hover:border-[#2EC4B6]/30 hover:shadow-xl hover:shadow-[#0B3C5D]/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/5 text-[#0B3C5D] flex items-center justify-center mb-6 group-hover:bg-[#0B3C5D] group-hover:text-white transition-colors">
                <c.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-bold text-[#0B3C5D] text-lg mb-2">{c.title}</h4>
              <p className="text-sm text-[#4B5563] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>



      </div>
    </section>
  );
}
