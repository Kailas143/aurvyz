import { Globe, Database, BrainCircuit, Workflow, ArrowRight, Bot, Stethoscope, BarChart3, Clock, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Globe,
    title: "Web Systems",
    desc: "Strategic, high-conversion engines engineered to be the digital front-end of your operational stack.",
  },
  {
    icon: Database,
    title: "Custom ERPs",
    desc: "Architected to unify finance, inventory, and logic into a single, proprietary source of truth.",
  },
  {
    icon: BrainCircuit,
    title: "Operating Modules",
    desc: "Custom AI modules that plug directly into your workflows to handle decision-heavy tasks at scale.",
  },
  {
    icon: Workflow,
    title: "Workflow Systems",
    desc: "Engineered systems that replace manual overhead with observable, compounding business logic.",
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
            Engineered AI systems for <br className="hidden sm:block" />
            <span className="nx-gradient-text">growing businesses.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            We don't just build apps. We build the operating systems of modern, performance-driven organizations.
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

        {/* Examples / Solutions Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#0B3C5D]">The Aurvyz Demo Lab</h3>
            <p className="text-sm text-[#4B5563] mt-2">Explore live interactive prototypes of systems we've engineered.</p>
          </motion.div>
          <div className="hidden md:block h-[1px] flex-1 mx-8 bg-[#0B3C5D]/10" />
          <motion.a 
            whileHover={{ x: 5 }}
            href="/demo-lab" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B3C5D] hover:text-[#2EC4B6] transition-colors"
          >
            Visit Demo Lab <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Flagship solution / Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 relative rounded-3xl overflow-hidden bg-[#0B3C5D] text-white p-8 sm:p-12 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2EC4B6]/10 to-transparent pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-6">
                <motion.span 
                  variants={floatingAnimation}
                  animate="animate"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] text-[10px] font-bold uppercase tracking-widest"
                >
                Flagship Prototype
                </motion.span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    <Clock className="w-3 h-3 text-[#2EC4B6]" />
                    Delivered in 18 hours
                </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-black leading-tight">
              Clinic AI <span className="text-[#2EC4B6]">Operations System</span>.
            </h4>
            <p className="mt-6 text-white/70 leading-relaxed max-w-lg text-base">
              A comprehensive operational OS for medical clinics. We unified patient intake, AI-driven records, and scheduling into a single high-performance interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {["AI Front-desk", "Patient Intake", "Real-time Pulse"].map((tag, i) => (
                <motion.div 
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
                <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/demo-lab" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-bold text-sm hover:shadow-lg transition-all shadow-[#2EC4B6]/20"
                >
                    View in Demo Lab <ArrowRight className="w-4 h-4" />
                </motion.a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#2EC4B6]/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/assets/clinic-demo.png" 
                alt="Interface of ClinicOS, a medical operations stack with AI front-desk and patient records" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Transition Divider */}
        <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#0B3C5D]/10 to-transparent" />
            <BrainCircuit className="w-5 h-5 text-[#328CC1] opacity-30" />
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#0B3C5D]/10 to-transparent" />
        </div>
        
        {/* Flagship solution 2 / Global Admissions OS */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 relative rounded-3xl overflow-hidden bg-white border border-[#0B3C5D]/10 p-8 sm:p-12 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#328CC1]/5 to-transparent pointer-events-none" />
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-[#328CC1]/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative rounded-2xl overflow-hidden border border-[#0B3C5D]/5 shadow-2xl">
              <img 
                src="/assets/global-admissions-demo.png" 
                alt="Global Admissions Infrastructure showing AI-driven student eligibility pipeline" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3C5D]/5 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-widest">
                Latest Deployment
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#328CC1]/10 text-[#0B3C5D] text-[10px] font-bold uppercase tracking-widest border border-[#328CC1]/10">
                    <Clock className="w-3 h-3 text-[#328CC1]" />
                    Delivered in 24 hours
                </span>
            </div>
            <h4 className="font-display text-3xl sm:text-4xl font-black text-[#0B3C5D] leading-tight">
              Global Admissions <span className="nx-gradient-text">AI Application</span>.
            </h4>
            <p className="mt-6 text-[#4B5563] leading-relaxed max-w-lg text-base">
              A comprehensive system for education consultancies. We automated eligibility checks with Gemini AI and built a proactive counselor assistant to drive enrollment growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {["AI Counselor", "University Pipeline", "WhatsApp Automations"].map((tag, i) => (
                <motion.div 
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-4 py-2 rounded-xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-xs font-semibold text-[#0B3C5D]"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
            <div className="mt-10">
                <motion.a 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="/demo-lab" 
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B3C5D] text-white font-bold text-base hover:shadow-xl transition-all"
                >
                    View in Demo Lab <ArrowRight className="w-4 h-4" />
                </motion.a>
            </div>
          </div>
        </motion.div>


        {/* Solutions Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {solutions.map((s, i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-3xl bg-white border border-[#0B3C5D]/10 hover:shadow-xl transition-all overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <s.icon className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                <span className="text-[10px] tracking-widest uppercase text-[#328CC1] font-bold">
                  {s.tag}
                </span>
                <h4 className="font-display text-xl font-bold text-[#0B3C5D] mt-3">{s.name}</h4>
                <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0B3C5D] group-hover:text-[#2EC4B6] transition-colors">
                  Explore Capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
               </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
