import { ArrowRight, Clock, Box } from "lucide-react";
import { motion } from "framer-motion";

const floatingAnimation = {
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const BrowserWindow = ({ url, imgSrc, imgAlt, isDark = true }) => {
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden border ${isDark ? 'border-white/10 bg-[#0B1120]' : 'border-[#0B3C5D]/10 bg-white'} shadow-2xl flex flex-col`}>
      {/* Top Bar */}
      <div className={`h-10 flex items-center px-4 border-b ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-[#0B3C5D]/5 bg-[#F7F9FB]'}`}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
        </div>
        <div className={`mx-auto px-6 py-1 rounded-md text-[10px] font-mono tracking-wider ${isDark ? 'bg-black/40 text-white/40' : 'bg-white text-[#0B3C5D]/40 border border-[#0B3C5D]/5'}`}>
          {url}
        </div>
        <div className="w-10" /> {/* Spacer to center URL */}
      </div>
      {/* Content */}
      <div className={`relative flex-1 ${isDark ? 'bg-[#0B1120]' : 'bg-white'}`}>
        <img 
          src={imgSrc} 
          alt={imgAlt} 
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
};

export default function LivePrototypes() {
  return (
    <section id="live-prototypes" className="py-16 sm:py-24 bg-[#0A0F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/10 border border-[#2EC4B6]/20 text-[#2EC4B6] text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <Box className="w-3 h-3" />
              Portfolio Showcase
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
            >
              Real Systems. <span className="text-[#2EC4B6]">Real Business Problems.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-slate-400 mt-4 max-w-2xl"
            >
              Explore fully functional, interactive mockups of workflows and customized internal systems we've shipped to production.
            </motion.p>
          </div>
          
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#audit" 
            className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white text-sm font-bold hover:bg-white/5 hover:border-white/20 transition-all shrink-0"
          >
            Request Similar Build <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* --- ROW 1: Clinic AI --- */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Left Text Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-[#111827] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#2EC4B6] text-[#0A0F1C] text-[10px] font-black uppercase tracking-widest">
                Flagship Prototype
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white/5 text-white/70 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                <Clock className="w-3 h-3 text-[#2EC4B6]" />
                Delivered in 18 hours
              </span>
            </div>
            
            <h4 className="font-display text-3xl sm:text-4xl font-black text-white leading-[1.1] mb-6">
              Clinic AI <span className="text-[#2EC4B6]">Operations System.</span>
            </h4>
            
            <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
              Reduce appointment coordination, patient intake work, and administrative overhead with a unified clinic operations platform.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {["Front-desk", "Patient Intake", "Real-time Pulse"].map((tag) => (
                <div key={tag} className="px-3 py-1.5 rounded-sm bg-[#0A0F1C] border border-white/10 text-[11px] font-semibold text-slate-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#2EC4B6]/50" />
                  {tag}
                </div>
              ))}
            </div>
            
            <div>
              <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/demo-lab" 
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl bg-[#2EC4B6] text-[#0A0F1C] font-black text-sm hover:shadow-[0_0_20px_rgba(46,196,182,0.3)] transition-all"
              >
                  Explore Live Prototype <ArrowRight className="w-4 h-4" />
              </motion.a>
              <p className="mt-4 text-xs text-slate-500 max-w-[280px]">
                Click on the dynamic dashboard right-hand card to test live actions.
              </p>
            </div>
          </motion.div>
          
          {/* Right Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-[#111827] border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 relative group"
          >
            <BrowserWindow 
              url="app.clinicos.ai/sys/hub"
              imgSrc="/assets/clinic-demo.png"
              imgAlt="Interface of ClinicOS"
              isDark={true}
            />
            {/* Hover overlay hint */}
            <div className="absolute top-10 right-10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/20 border border-[#2EC4B6]/50 text-[#2EC4B6] text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" /> Simulator Active
                </span>
            </div>
          </motion.div>
        </div>

        {/* --- ROW 2: Global Admissions --- */}
        <div className="grid lg:grid-cols-12 gap-6 mb-8">
          {/* Left Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-[#0B3C5D]/10 rounded-3xl p-4 sm:p-6 lg:p-8 order-2 lg:order-1 relative group"
          >
            <BrowserWindow 
              url="admissions.globaluni.edu/pipeline"
              imgSrc="/assets/global-admissions-demo.png"
              imgAlt="Interface of Global Admissions OS"
              isDark={false}
            />
            {/* Hover overlay hint */}
            <div className="absolute top-10 right-10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Live Connected
                </span>
            </div>
          </motion.div>

          {/* Right Text Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-white border border-[#0B3C5D]/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-center order-1 lg:order-2"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest">
                Latest Deployment
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#0B3C5D]/5 text-[#0B3C5D]/70 text-[10px] font-bold uppercase tracking-widest border border-[#0B3C5D]/10">
                <Clock className="w-3 h-3 text-indigo-600" />
                Delivered in 24 hours
              </span>
            </div>
            
            <h4 className="font-display text-3xl sm:text-4xl font-black text-[#0B3C5D] leading-[1.1] mb-6">
              Global Admissions <span className="text-indigo-600">AI Application.</span>
            </h4>
            
            <p className="text-[#4B5563] leading-relaxed mb-8 text-sm sm:text-base">
              Eliminate manual student eligibility checks and counselor follow-ups with an automated student processing system.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {["AI Counselor", "University Pipeline", "WhatsApp Automations"].map((tag) => (
                <div key={tag} className="px-3 py-1.5 rounded-sm bg-white border border-[#0B3C5D]/10 text-[11px] font-semibold text-[#0B3C5D] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-400" />
                  {tag}
                </div>
              ))}
            </div>
            
            <div>
              <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/demo-lab" 
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B3C5D] text-white font-black text-sm hover:shadow-[0_0_20px_rgba(11,60,93,0.2)] transition-all"
              >
                  Explore Live Prototype <ArrowRight className="w-4 h-4" />
              </motion.a>
              <p className="mt-4 text-xs text-slate-500 max-w-[280px]">
                Simulated pipeline works completely. Approve records or load alternative student records inside the simulator.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- ROW 3: Sales Outreach --- */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Text Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-[#111827] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-center"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#328CC1] text-white text-[10px] font-black uppercase tracking-widest">
                Internal Management
              </span>
            </div>
            
            <h4 className="font-display text-3xl sm:text-4xl font-black text-white leading-[1.1] mb-6">
              Scale your sales outreach <span className="text-[#328CC1]">without the manual work.</span>
            </h4>
            
            <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
              Stop wasting hours on manual outreach and dropped follow-ups. This automated system generates personalized emails, tracks engagement, and handles follow-ups for you.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {['Automated Outreach', 'Lead Tracking', 'Email Sequences'].map((tag) => (
                <div key={tag} className="px-3 py-1.5 rounded-sm bg-[#0A0F1C] border border-white/10 text-[11px] font-semibold text-slate-300 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#328CC1]/50" />
                  {tag}
                </div>
              ))}
            </div>
            
            <div>
              <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://autolead-frontend-145662328298.asia-south1.run.app/" 
                  target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl bg-[#328CC1] text-white font-black text-sm hover:shadow-[0_0_20px_rgba(50,140,193,0.3)] transition-all"
              >
                  Launch Platform <ArrowRight className="w-4 h-4" />
              </motion.a>
              <p className="mt-4 text-xs text-slate-500 max-w-[280px]">
                Click on the shell triggers on the dashboard mock to generate emails dynamically.
              </p>
            </div>
          </motion.div>
          
          {/* Right Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-[#111827] border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 relative group"
          >
            <BrowserWindow 
              url="campaigns.aurvyz.ai/drafts"
              imgSrc="/assets/aurvyz-platform-dashboard.png"
              imgAlt="Aurvyz Outreach Dashboard"
              isDark={true}
            />
             {/* Hover overlay hint */}
             <div className="absolute top-10 right-10 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#328CC1]/20 border border-[#328CC1]/50 text-[#328CC1] text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#328CC1] animate-pulse" /> UI Active. Click.
                </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
