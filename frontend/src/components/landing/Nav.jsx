"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#why-aurvyz", label: "Why Aurvyz" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/demo-lab", label: "Demo Lab" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/#how-it-works", label: "Process" },
  { href: "/#case-study", label: "Work" },
  { href: "/insights", label: "Insights" },
];

export default function Nav({ onBookCall }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href) => (e) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/", "");
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href.startsWith("#")) {
       const el = document.querySelector(href);
       if (el) {
         e.preventDefault();
         el.scrollIntoView({ behavior: "smooth", block: "start" });
       }
    }
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
          href="/"
          data-testid="nav-logo"
          className="flex items-center gap-2 group"
        >
          <span className="relative grid place-items-center w-10 h-10 rounded-[12px] bg-[#0B3C5D] overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <path 
                d="M50,20 L30,80 M50,20 L70,80 M38,60 L62,60" 
                fill="none" 
                stroke="#2EC4B6" 
                strokeWidth="10" 
                strokeLinecap="round" 
              />
              <motion.circle 
                cx="50" cy="50" r="2" fill="#2EC4B6"
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
            <span className="absolute inset-0 rounded-[12px] ring-1 ring-white/10 pointer-events-none" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-bold text-[#0B3C5D] text-lg tracking-tight">
              Aurvyz<span className="text-[#2EC4B6]">.</span>AI
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.18em] uppercase text-[#0B3C5D]/55">
              Operational Systems Company
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={navigate(l.href)}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-sm font-medium text-[#1F2937]/80 hover:text-[#0B3C5D] transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#2EC4B6] group-hover:w-full transition-all duration-300" />
            </a>
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
            asChild
            className="bg-[#0B3C5D] hover:bg-[#08304a] text-white rounded-full px-5 h-10 shadow-sm"
          >
            <a href="/#audit" onClick={navigate("/#audit")}>Free Audit</a>
          </Button>
          <button
            className="md:hidden ml-2 p-2 text-[#0B3C5D] rounded-md hover:bg-[#0B3C5D]/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#F7F9FB] border-b border-[#0B3C5D]/10"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={navigate(l.href)}
                  className="text-base font-medium text-[#1F2937] hover:text-[#0B3C5D] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onBookCall) onBookCall(e);
                }}
                className="sm:hidden text-left text-base font-medium text-[#1F2937] hover:text-[#0B3C5D] transition-colors"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
