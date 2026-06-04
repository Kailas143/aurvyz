import { Stethoscope, ShoppingBag, Truck, Users, Rocket, Briefcase, Building2, Monitor, Globe } from "lucide-react";
import { motion } from "framer-motion";

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
            / For Every Industry
          </div>
          <h2
            data-testid="use-cases-headline"
            className="font-display mt-4 text-3xl sm:text-5xl font-bold text-[#0B3C5D] leading-[1.08] tracking-tight"
          >
            Transformative AI for every business tier.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#4B5563] max-w-xl leading-relaxed">
            We provide custom solutions across all industries. Our vision is to make powerful AI capabilities accessible to every business owner, without the burden of massive enterprise costs.
          </p>
        </div>

        {/* Graphical Representation */}
        <div className="mt-12 sm:mt-16 relative w-full h-[400px] sm:h-[500px] rounded-3xl bg-[#F7F9FB] border border-[#0B3C5D]/10 overflow-hidden flex items-center justify-center">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,60,93,0.06)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#2EC4B6]/10 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#328CC1]/10 rounded-full blur-[60px]" />

          {/* Orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] border border-[#0B3C5D]/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[650px] h-[420px] sm:h-[650px] border border-[#0B3C5D]/5 rounded-full" />

          {/* Central Node */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-[0_0_40px_rgba(46,196,182,0.2)] border border-[#2EC4B6]/30 flex flex-col items-center justify-center"
          >
            <span className="font-display font-bold text-[#0B3C5D] text-lg sm:text-2xl tracking-tight leading-none">
              Aurvyz<span className="text-[#2EC4B6]">.</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#328CC1] tracking-widest uppercase mt-1">Core</span>
          </motion.div>

          {/* Floating Industry Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="absolute top-[15%] sm:top-[20%] left-[10%] sm:left-[15%] px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <Stethoscope className="w-4 h-4 text-[#2EC4B6]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">Healthcare</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="absolute bottom-[15%] sm:bottom-[20%] right-[10%] sm:right-[15%] px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <ShoppingBag className="w-4 h-4 text-[#328CC1]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">E-commerce</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="absolute top-[25%] sm:top-[30%] right-[5%] sm:right-[15%] px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <Truck className="w-4 h-4 text-[#2EC4B6]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">Logistics</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="absolute bottom-[25%] sm:bottom-[30%] left-[5%] sm:left-[15%] px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <Briefcase className="w-4 h-4 text-[#328CC1]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">Finance & Consulting</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="absolute top-[8%] sm:top-[12%] left-1/2 -translate-x-1/2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <Rocket className="w-4 h-4 text-[#2EC4B6]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">Startups</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="absolute bottom-[8%] sm:bottom-[12%] left-1/2 -translate-x-1/2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 flex items-center gap-2 z-10"
          >
            <Building2 className="w-4 h-4 text-[#328CC1]" />
            <span className="text-xs sm:text-sm font-bold text-[#0B3C5D]">Real Estate</span>
          </motion.div>
          
          {/* Generic/Global badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
            className="absolute hidden sm:flex top-[50%] -translate-y-1/2 left-[5%] px-4 py-2.5 bg-[#0B3C5D] rounded-full shadow-lg border border-[#0B3C5D]/5 items-center gap-2 z-10"
          >
            <Globe className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Your Industry</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
            className="absolute hidden sm:flex top-[50%] -translate-y-1/2 right-[5%] px-4 py-2.5 bg-white rounded-full shadow-lg border border-[#0B3C5D]/5 items-center gap-2 z-10"
          >
            <Monitor className="w-4 h-4 text-[#2EC4B6]" />
            <span className="text-sm font-bold text-[#0B3C5D]">SaaS & Tech</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
