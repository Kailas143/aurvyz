import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const links = [
  { href: "#positioning", label: "Company" },
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#how", label: "Process" },
  { href: "#case-study", label: "Work" },
];

export default function Nav({ onBookCall }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => () => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#F7F9FB]/80 border-b border-[#0B3C5D]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <a
          href="#top"
          data-testid="nav-logo"
          className="flex items-center gap-2 group"
        >
          <span className="relative grid place-items-center w-9 h-9 rounded-[10px] bg-[#0B3C5D] text-white">
            <Sparkles className="w-4 h-4 text-[#2EC4B6]" />
            <span className="absolute inset-0 rounded-[10px] ring-1 ring-[#2EC4B6]/40" />
          </span>
          <span className="font-display font-bold text-[#0B3C5D] text-lg tracking-tight">
            Nexora<span className="text-[#2EC4B6]">.</span>AI
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={scrollTo(l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm text-[#1F2937]/80 hover:text-[#0B3C5D] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#2EC4B6] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onBookCall}
            data-testid="nav-cta-call"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#0B3C5D]/80 hover:text-[#0B3C5D] transition-colors px-3 h-10 rounded-full"
          >
            Book a Call
          </button>
          <Button
            data-testid="nav-cta-audit"
            onClick={scrollTo("#cta")}
            className="bg-[#0B3C5D] hover:bg-[#08304a] text-white rounded-full px-5 h-10 shadow-sm"
          >
            Free Audit
          </Button>
        </div>
      </div>
    </header>
  );
}
