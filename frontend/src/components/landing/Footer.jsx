import { Mail, Linkedin, Sparkles, ArrowUpRight, Phone } from "lucide-react";

export default function Footer({ onBookCall }) {
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
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-white overflow-hidden border border-white/15">
                <img src="/assets/logo.png" alt="Aurvyz AI Logo" className="w-full h-full object-cover" />
              </span>
              <span className="font-display font-bold text-xl">
                Aurvyz<span className="text-[#2EC4B6]">.</span>AI
              </span>
            </div>
            <p className="mt-6 text-sm text-white/65 max-w-md leading-relaxed">
              A product-driven **Operational Systems Company**. We engineer the 
              infrastructure that helps growing businesses scale faster with 
              future-ready operational systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@aurvyz.com"
                data-testid="footer-email"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#2EC4B6]" />
                hello@aurvyz.com
              </a>
              <a
                href="tel:+918281066965"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2EC4B6]" />
                +91 82810 66965
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
                    onClick={scrollTo("#why-aurvyz")}
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
                    onClick={scrollTo("#capabilities")}
                    className="hover:text-white"
                  >
                    Capabilities
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] tracking-widest uppercase text-[#2EC4B6] font-semibold">
                What We Engineer
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>Operational Workflows</li>
                <li>Custom ERP Systems</li>
                <li>AI Operating Modules</li>
                <li>Scale Infrastructure</li>
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
                    Free Systems Audit
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={onBookCall}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Book a Call
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Aurvyz AI. All rights reserved.</div>
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
