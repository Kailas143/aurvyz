import { useState } from "react";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Positioning from "@/components/landing/Positioning";
import Problem from "@/components/landing/Problem";
import Services from "@/components/landing/Services";
import Products from "@/components/landing/Products";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import CaseStudy from "@/components/landing/CaseStudy";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";

export default function Landing() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <main
      data-testid="landing-page"
      className="min-h-screen bg-[#F7F9FB] text-[#1F2937]"
    >
      <Nav onBookCall={openBooking} />
      <Hero onBookCall={openBooking} />
      <Positioning />
      <Problem />
      <Services />
      <Products />
      <HowItWorks />
      <Benefits />
      <CaseStudy />
      <CTASection onBookCall={openBooking} />
      <Footer onBookCall={openBooking} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </main>
  );
}
