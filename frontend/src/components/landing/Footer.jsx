import { Mail, Linkedin, Sparkles, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollTo = (id) => () => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#0B3C5D] text-white pt-24 pb-10 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2EC4B6]/60 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 border border-white/15">
                <Sparkles className="w-4 h-4 text-[#2EC4B6]" />
              </span>
              <span className="font-display font-bold text-xl">
                Nexora<span className="text-[#2EC4B6]">.</span>AI
              </span>
            </div>
            <p className="mt-6 text-sm text-white/65 max-w-md leading-relaxed">
              A product-driven AI automation company. We build AI products and
              custom software that help businesses grow faster and operate
              smarter.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href="mailto:hello@nexora.ai"
                data-testid="footer-email"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#2EC4B6]" />
                hello@nexora.ai
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-testid="footer-linkedin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#2EC4B6]" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6] font-semibold">
                Company
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>
                  <button
                    onClick={scrollTo("#positioning")}
                    className="hover:text-white"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollTo("#case-study")}
                    className="hover:text-white"
                  >
                    Work
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollTo("#products")}
                    className="hover:text-white"
                  >
                    Products
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6] font-semibold">
                Services
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>Website Development</li>
                <li>ERP Systems</li>
                <li>AI Applications</li>
                <li>Business Automation</li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6] font-semibold">
                Get Started
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>
                  <button
                    onClick={scrollTo("#cta")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Free Audit
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollTo("#cta")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Book a Call
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollTo("#cta")}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Request Demo
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Nexora AI. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
