"use client";

import { useState } from "react";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ExternalLink, Sparkles } from "lucide-react";

export default function DemoLab() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <main className="min-h-screen bg-[#F7F9FB] text-[#1F2937]">
      <Nav onBookCall={openBooking} />
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(rgba(11,60,93,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(11,60,93,0.07) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[#328CC1]/5 rounded-full blur-[140px]" />
        
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 text-center">
            <div className="nx-rise inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0B3C5D]/10 bg-[#0B3C5D]/5 text-[11px] font-bold text-[#0B3C5D] uppercase tracking-widest mb-8">
                <Sparkles className="w-3 h-3 text-[#2EC4B6]" />
                Aurvyz Demo Lab
            </div>
            <h1 className="nx-rise font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0B3C5D] leading-[1.1] tracking-tight">
                See the systems we can <br />
                <span className="nx-gradient-text">build for your business.</span>
            </h1>
            <p className="nx-rise mt-8 text-lg sm:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.1s' }}>
                Explore live interactive prototypes of custom operational systems we've engineered. <span className="font-bold text-[#0B3C5D]">We deliver working prototypes in under 24 hours</span> to validate your vision instantly.
            </p>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                
                {/* Global Admissions OS */}
                <div className="nx-rise group relative rounded-[40px] bg-white border border-[#0B3C5D]/10 p-4 shadow-2xl shadow-[#0B3C5D]/5 hover:shadow-3xl hover:border-[#2EC4B6]/30 transition-all duration-500 overflow-hidden" style={{ animationDelay: '0.1s' }}>
                    <div className="relative rounded-[32px] overflow-hidden aspect-video border border-[#0B3C5D]/5 bg-[#0B3C5D]">
                        <img 
                            src="/assets/global-admissions-demo.png" 
                            alt="Global Admissions OS Demo" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/90 via-[#0B3C5D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                             <a 
                                href="/prototypes"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-bold text-base shadow-2xl hover:scale-105 active:scale-95 transition-all"
                             >
                                View Prototype <ExternalLink className="w-4 h-4" />
                             </a>
                        </div>
                    </div>
                    
                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div>
                                <div className="text-[10px] tracking-widest uppercase text-[#328CC1] font-bold mb-2">Education Consultancy OS</div>
                                <h3 className="font-display text-3xl font-bold text-[#0B3C5D]">Global Admissions OS</h3>
                                <p className="text-lg text-[#2EC4B6] font-semibold mt-1">AI-driven Study Abroad Ops</p>
                            </div>
                            <div className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#2EC4B6]" />
                                Built in 24 hours
                            </div>
                        </div>
                        
                        <p className="text-[#4B5563] leading-relaxed mb-10 text-base">
                            A comprehensive system that transforms study abroad operations. Featuring a real Gemini-powered Eligibility Analyzer, visual University Pipeline, proactive AI Counselor Assistant, and a WhatsApp Automation portal for seamless lead management.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#0B3C5D]/5">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Core Tech</div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Gemini AI</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Pipeline UI</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">WhatsApp API</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Outcome</div>
                                <div className="text-xs font-semibold text-[#0B3C5D]">10x Faster Eligibility Checks</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nx-rise group relative rounded-[40px] bg-white border border-[#0B3C5D]/10 p-4 shadow-2xl shadow-[#0B3C5D]/5 hover:shadow-3xl hover:border-[#2EC4B6]/30 transition-all duration-500 overflow-hidden" style={{ animationDelay: '0.2s' }}>
                    <div className="relative rounded-[32px] overflow-hidden aspect-video border border-[#0B3C5D]/5 bg-[#0B3C5D]">
                        <img 
                            src="/assets/clinic-demo.png" 
                            alt="Clinic AI System Demo" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/90 via-[#0B3C5D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                             <a 
                                href="/prototypes"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-bold text-base shadow-2xl hover:scale-105 active:scale-95 transition-all"
                             >
                                View Prototype <ExternalLink className="w-4 h-4" />
                             </a>
                        </div>
                    </div>
                    
                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div>
                                <div className="text-[10px] tracking-widest uppercase text-[#328CC1] font-bold mb-2">Clinic Operations OS</div>
                                <h3 className="font-display text-3xl font-bold text-[#0B3C5D]">Clinic AI System</h3>
                                <p className="text-lg text-[#2EC4B6] font-semibold mt-1">Reduce admin work by 70%</p>
                            </div>
                            <div className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#2EC4B6]" />
                                Delivered in 18 hours
                            </div>
                        </div>
                        
                        <p className="text-[#4B5563] leading-relaxed mb-10 text-base">
                            A comprehensive operational OS for medical clinics. We unified patient intake, AI-driven records, scheduling, and billing into a single source of truth. Features real-time operational pulse and automated patient routing.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#0B3C5D]/5">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Core Tech</div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs font-semibold text-[#0B3C5D]">AI Logic</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Custom ERP</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Workflow Engine</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Outcome</div>
                                <div className="text-xs font-semibold text-[#0B3C5D]">Zero Manual Entry</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BillFlow AI System */}
                <div className="nx-rise group relative rounded-[40px] bg-white border border-[#0B3C5D]/10 p-4 shadow-2xl shadow-[#0B3C5D]/5 hover:shadow-3xl hover:border-[#2EC4B6]/30 transition-all duration-500 overflow-hidden" style={{ animationDelay: '0.3s' }}>
                    <div className="relative rounded-[32px] overflow-hidden aspect-video border border-[#0B3C5D]/5 bg-[#0B3C5D]">
                        <img 
                            src="/assets/billflow-demo.png" 
                            alt="BillFlow AI System Demo" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/90 via-[#0B3C5D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                             <a 
                                href="/prototypes"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2EC4B6] text-[#0B3C5D] font-bold text-base shadow-2xl hover:scale-105 active:scale-95 transition-all"
                             >
                                View Prototype <ExternalLink className="w-4 h-4" />
                             </a>
                        </div>
                    </div>
                    
                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                            <div>
                                <div className="text-[10px] tracking-widest uppercase text-[#328CC1] font-bold mb-2">Finance Automation</div>
                                <h3 className="font-display text-3xl font-bold text-[#0B3C5D]">BillFlow AI</h3>
                                <p className="text-lg text-[#2EC4B6] font-semibold mt-1">Automated Invoice Approval</p>
                            </div>
                            <div className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0B3C5D]/5 border border-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-bold uppercase tracking-wider">
                                <Clock className="w-4 h-4 text-[#2EC4B6]" />
                                Delivered in 12 hours
                            </div>
                        </div>
                        
                        <p className="text-[#4B5563] leading-relaxed mb-10 text-base">
                            An AI-powered invoice management system that automates document extraction and approval workflows. Features Gemini AI analysis, side-by-side review mode, and instant dashboard synchronization.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#0B3C5D]/5">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Core Tech</div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Gemini AI</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Next.js</span>
                                    <span className="text-xs text-[#4B5563]/40">•</span>
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Intelligent OCR</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-[#4B5563]/60 font-bold mb-2">Outcome</div>
                                <div className="text-xs font-semibold text-[#0B3C5D]">98% Extraction Accuracy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder / CTA Card */}
                <div className="nx-rise relative rounded-[40px] border-2 border-dashed border-[#0B3C5D]/15 bg-[#0B3C5D]/[0.02] p-12 lg:p-16 flex flex-col items-center justify-center text-center group" style={{ animationDelay: '0.4s' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#328CC1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-8 text-[#0B3C5D] group-hover:scale-110 transition-transform duration-500">
                            <Sparkles className="w-10 h-10 text-[#2EC4B6]" />
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B3C5D]">Your Custom System Next</h3>
                        <p className="text-base text-[#4B5563] mt-4 max-w-sm leading-relaxed">
                            We design and build operational prototypes based on your unique business needs. Rapid engineering, built for performance.
                        </p>
                        <Button 
                            onClick={openBooking}
                            className="mt-10 h-14 px-10 rounded-full bg-[#0B3C5D] text-white font-bold text-base shadow-xl shadow-[#0B3C5D]/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            Request Custom Demo
                        </Button>
                    </div>
                </div>

            </div>
        </div>
      </section>

      <Footer onBookCall={openBooking} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </main>
  );
}
