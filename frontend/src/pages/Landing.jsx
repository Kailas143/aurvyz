import { useState } from "react";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import Positioning from "@/components/landing/Positioning";
import Problem from "@/components/landing/Problem";
import Services from "@/components/landing/Services";
import PrototypeBanner from "@/components/landing/PrototypeBanner";
import Products from "@/components/landing/Products";
import UseCases from "@/components/landing/UseCases";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import CaseStudy from "@/components/landing/CaseStudy";
import Testimonials from "@/components/landing/Testimonials";
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
      <Positioning />
      <Problem />
      <Services />
      <PrototypeBanner onStartAudit={openAuditChat} />
      <Products />
      <UseCases />
      <HowItWorks />
      <Benefits />
      <CaseStudy />
      <Testimonials />
      <CTASection onBookCall={openBooking} onStartAudit={openAuditChat} />
      <Footer onBookCall={openBooking} onStartAudit={openAuditChat} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <AuditChatBubble open={chatOpen} onOpenChange={setChatOpen} />
    </main>
  );
}
