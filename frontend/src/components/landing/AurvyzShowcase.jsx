import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Mail, Clock, Zap, Target, Layers, Cpu, Globe } from "lucide-react";

export default function AurvyzShowcase() {
  const LIVE_URL = "https://autolead-frontend-145662328298.asia-south1.run.app/";
  const DASH_IMG = "/assets/aurvyz-platform-dashboard.png";

  return (
    <section 
      id="aurvyz-platform"
      className="relative py-24 sm:py-32 overflow-hidden bg-[#020617]"
    >
      {/* Midnight Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(50,140,193,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_20%_100%,rgba(46,196,182,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="nx-rise">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/10 border border-[#2EC4B6]/20 text-[#2EC4B6] text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#2EC4B6] animate-pulse" />
              Live Project • Production Ready
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              Automate your outreach with <span className="text-[#2EC4B6]">surgical precision.</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              Aurvyz uses Gemini 2.5 Flash to generate hyper-personalized cold emails, track engagement, and handle follow-ups automatically. A production-ready system designed to scale personalized outreach while maintaining a human touch.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#2EC4B6]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Multi-Step Funnels</h4>
                  <p className="text-xs text-slate-500 mt-1">Unlimited sequences: Intro ➔ Value ➔ Re-engagement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#2EC4B6]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Intelligent Stop-on-Reply</h4>
                  <p className="text-xs text-slate-500 mt-1">Monitors replies and halts future steps automatically.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#2EC4B6]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Smart Send Windows</h4>
                  <p className="text-xs text-slate-500 mt-1">Define precise hours to hit inboxes when leads are active.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#2EC4B6]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Gemini 2.5 Flash</h4>
                  <p className="text-xs text-slate-500 mt-1">Hyper-personalized lines that feel genuinely human.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                asChild
                className="h-14 px-8 rounded-full bg-[#2EC4B6] text-[#020617] hover:bg-[#26b0a4] font-bold text-base shadow-[0_10px_30px_-10px_rgba(46,196,182,0.5)] hover:-translate-y-1 transition-all w-full sm:w-auto"
              >
                <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">
                  Launch Platform
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020617] bg-slate-800" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Joined by 50+ growth teams</span>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-12 flex flex-wrap gap-3">
              {['FastAPI', 'Celery', 'Redis', 'Cloud Run', 'Gemini 2.5 Flash'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-500 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Dashboard Preview */}
          <div className="relative lg:h-[600px] flex items-center justify-center nx-rise" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-4 bg-gradient-to-br from-[#328CC1]/20 via-transparent to-[#2EC4B6]/20 blur-3xl opacity-50" />
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-black/50 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
              <img 
                src={DASH_IMG} 
                alt="Aurvyz Outreach Dashboard" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
              />
              
              {/* Glass Overlays for extra "premium" feel */}
              <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2EC4B6]/20 flex items-center justify-center text-[#2EC4B6]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Engine Status</div>
                    <div className="text-xs text-white font-bold">Scaling Out...</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-ping" />
                  <div className="text-xs text-white font-medium tracking-tight">Real-time Webhook Active</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
