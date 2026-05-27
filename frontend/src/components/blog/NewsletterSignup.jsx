import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export function NewsletterSignup() {
  return (
    <section className="bg-gray-900 dark:bg-black py-20 px-6 rounded-3xl my-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Systems Thinking, Delivered Weekly.
        </h2>
        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
          Join 8,400+ engineering and operations leaders receiving our latest insights on AI workflows, automated systems, and operational scaling.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8" onSubmit={(e) => e.preventDefault()}>
          <Input 
            type="email" 
            placeholder="Enter your work email" 
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 px-6 rounded-full focus-visible:ring-blue-500"
            required
          />
          <Button type="submit" className="h-12 px-8 rounded-full bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg">
            Subscribe
          </Button>
        </form>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-blue-400" />
            </div>
            <span>No spam, ever.</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-blue-400" />
            </div>
            <span>Unsubscribe anytime.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
