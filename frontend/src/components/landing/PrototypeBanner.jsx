import { ArrowRight, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrototypeBanner({ onStartAudit }) {
  return (
    <section
      data-testid="prototype-banner"
      className="py-12 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative rounded-[2rem] bg-[#0B3C5D] p-8 sm:p-12 overflow-hidden shadow-2xl group">
          {/* Animated decorative elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2EC4B6]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2EC4B6]/25 transition-colors duration-700" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#328CC1]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Zero Risk Engagement
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                Stop guessing. Start seeing. <br className="hidden sm:block" />
                <span className="text-[#2EC4B6]">Claim Your 24-Hour Prototype.</span>
              </h2>
              <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed">
                We'll build a functional prototype of your idea within 24 hours. No upfront cost, no strings attached. See it working before you spend a dime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
              <div className="flex flex-col items-center sm:items-end gap-2">
                <Button
                  onClick={onStartAudit}
                  data-testid="claim-prototype-btn"
                  className="h-14 px-8 rounded-full bg-[#2EC4B6] text-[#0B3C5D] hover:bg-[#26b0a4] text-base font-bold shadow-[0_10px_30px_-10px_rgba(46,196,182,0.5)] hover:-translate-y-1 transition-all w-full sm:w-auto"
                >
                  Claim My Prototype
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-wider">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
