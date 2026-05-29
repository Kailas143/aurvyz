"use client";

import { useState } from "react";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import BookingModal from "@/components/landing/BookingModal";
import AuditChatBubble from "@/components/landing/AuditChatBubble";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CampaignLanding({ params }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  const openBooking = () => setBookingOpen(true);
  const openAuditChat = () => setChatOpen(true);

  // You can use params.campaign to fetch specific copy later, 
  // currently defaults to the AI Automation Audit strategy.

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-[#0B3C5D] text-white py-20 px-4 flex justify-center border-b-[8px] border-[#2EC4B6]">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-800 text-blue-200 text-sm font-semibold tracking-wide uppercase mb-4">
            Free Technical Audit
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Stop Wasting Time on <br className="hidden md:block"/> Manual Operations.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            Get a comprehensive AI Automation Audit and discover exactly how your business can save <strong className="text-white font-semibold">10+ hours a week</strong> using custom workflows.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-[#2EC4B6] hover:bg-[#25a89c] text-white font-bold text-lg px-10 py-7 rounded-full shadow-lg shadow-[#2EC4B6]/20 transition-all hover:scale-105"
              onClick={openBooking}
            >
              Claim Your Free Audit
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white font-semibold text-lg px-10 py-7 rounded-full"
              onClick={openAuditChat}
            >
              Chat with AI Now
            </Button>
          </div>
          
          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2EC4B6]"/> 100% Free Consultation</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2EC4B6]"/> No Technical Skills Required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#2EC4B6]"/> Custom Action Plan</div>
          </div>
        </div>
      </section>
      
      {/* Social Proof / Benefits */}
      <div className="bg-white py-12">
        <Benefits />
      </div>

      {/* Process / How it Works */}
      <div className="bg-[#F7F9FB] border-y border-gray-100">
        <HowItWorks />
      </div>

      {/* Final CTA */}
      <section className="bg-white py-24 px-4 text-center flex justify-center">
        <div className="max-w-2xl mx-auto space-y-8 bg-gray-50 p-12 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937]">Ready to Scale Your Operations?</h2>
          <p className="text-lg text-gray-600">
            Book a 15-minute discovery call with our engineering team to map out your fastest path to ROI. No sales pressure, just actionable technical advice.
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              className="bg-[#0B3C5D] hover:bg-[#072b44] text-white font-bold text-lg px-10 py-7 rounded-full shadow-lg transition-all hover:scale-105"
              onClick={openBooking}
            >
              Schedule Discovery Call
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <AuditChatBubble open={chatOpen} onOpenChange={setChatOpen} onBookCall={openBooking} />
    </div>
  );
}
