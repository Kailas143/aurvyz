"use client";

import { useState } from "react";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import AurvyzShowcase from "@/components/landing/AurvyzShowcase";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Capabilities from "@/components/landing/Capabilities";
import UseCases from "@/components/landing/UseCases";
import HowItWorks from "@/components/landing/HowItWorks";
import PrototypeBanner from "@/components/landing/PrototypeBanner";
import Benefits from "@/components/landing/Benefits";
import CaseStudy from "@/components/landing/CaseStudy";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";
import AuditChatBubble from "@/components/landing/AuditChatBubble";

export default function Landing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const openAuditChat = () => setChatOpen(true);

  return (
    <main
      data-testid="landing-page"
      className="min-h-screen bg-[#F7F9FB] text-[#1F2937]"
    >
      <Nav onBookCall={openBooking} onStartAudit={openAuditChat} />
      <Hero onBookCall={openBooking} onStartAudit={openAuditChat} />
      <Logos />
      <ProblemSolution />
      <Capabilities />
      <UseCases />
      <HowItWorks />
      <PrototypeBanner onStartAudit={openAuditChat} />
      <Benefits />
      <CaseStudy />
      <AurvyzShowcase />
      <CTASection onBookCall={openBooking} onStartAudit={openAuditChat} />
      <Footer onBookCall={openBooking} onStartAudit={openAuditChat} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <AuditChatBubble open={chatOpen} onOpenChange={setChatOpen} onBookCall={openBooking} />
    </main>
  );
}
