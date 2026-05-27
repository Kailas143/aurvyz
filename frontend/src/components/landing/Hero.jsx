import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Play, Activity, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const wordAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const StaggeredText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <motion.div 
      variants={staggerContainer} 
      initial="initial" 
      animate="animate" 
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordAnimation}
          className="inline-block mr-[0.2em] last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Hero({ onBookCall, onStartAudit }) {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-[#F5F5F5]"
    >
      {/* Background Decor */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "linear-gradient(rgba(11,60,93,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(11,60,93,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* UPPER GRID: Headline Only */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-12 lg:mb-16">
          <div className="lg:col-span-12">
            <h1 className="sr-only">Aurvyz AI — Future-Ready AI Operational Systems</h1>
            <h2
              data-testid="hero-headline"
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black text-[#0B3C5D] leading-[1] tracking-tight mb-2"
            >
              <StaggeredText text="Future-Ready AI" />
              <motion.span 
                variants={wordAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
                className="text-[#328CC1] block"
              >
                Operational Systems.
              </motion.span>
            </h2>
          </div>
        </div>

        {/* LOWER GRID: Graphic & Content */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          
          {/* Animated 3D Graphic */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2EC4B6]/20 via-transparent to-transparent rounded-full blur-3xl" />
              
              {/* Complex SVG Logo Animation */}
              <svg viewBox="0 0 200 200" className="w-full h-full max-w-[400px]">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2EC4B6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#0B3C5D', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M40,60 L160,60 L160,140 L40,140 Z"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.g
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Abstract A-Shape representing Aurvyz / AI */}
                  <motion.g
                    animate={{ 
                      filter: ["drop-shadow(0 0 2px #2EC4B6)", "drop-shadow(0 0 10px #2EC4B6)", "drop-shadow(0 0 2px #2EC4B6)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path 
                      d="M100,40 L60,160 M100,40 L140,160 M75,120 L125,120" 
                      fill="none" 
                      stroke="#0B3C5D" 
                      strokeWidth="22" 
                      strokeLinecap="round" 
                      className="opacity-20"
                    />
                    <motion.path 
                      d="M100,40 L60,160 M100,40 L140,160 M75,120 L125,120" 
                      fill="none" 
                      stroke="#2EC4B6" 
                      strokeWidth="20" 
                      strokeLinecap="round" 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </motion.g>
                </motion.g>
                
                {/* AI Neural Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={`node-${i}`}
                    cx="100"
                    cy="100"
                    r="3"
                    fill="#2EC4B6"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      translateX: [(Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160],
                      translateY: [(Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160],
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      delay: i * 0.4 
                    }}
                  />
                ))}
              </svg>

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 p-4 rounded-2xl bg-white shadow-xl border border-[#0B3C5D]/5 backdrop-blur-md"
              >
                <Cpu className="w-6 h-6 text-[#2EC4B6]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column Content */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-xl"
            >
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-2xl text-[#4B5563] leading-relaxed mb-10"
              >
                We design and engineer high-performance <span className="font-bold">AI systems</span> that automate operations, reduce manual work, and <span className="font-bold text-[#0B3C5D]">deliver interactive prototypes in under 24 hours.</span>
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Button
                  data-testid="hero-cta-start-audit"
                  onClick={onStartAudit}
                  className="h-16 px-10 rounded-2xl bg-[#0B3C5D] text-white hover:bg-[#08304a] shadow-2xl transition-all w-full sm:w-auto font-black text-lg flex items-center justify-between gap-4 group"
                >
                  Get Free AI Audit
                  <div className="w-8 h-8 rounded-lg bg-[#2EC4B6] flex items-center justify-center text-[#0B3C5D] group-hover:rotate-45 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
                
                <Button
                  data-testid="hero-cta-call"
                  onClick={onBookCall}
                  variant="outline"
                  className="h-16 px-10 rounded-2xl border-[#0B3C5D]/10 text-[#0B3C5D] hover:bg-white hover:border-[#0B3C5D]/20 transition-all w-full sm:w-auto font-black text-lg flex items-center justify-between gap-4"
                >
                  Work with us
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-[#0B3C5D]">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
