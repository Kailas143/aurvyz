"use client";

import { useState } from "react";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import BookingModal from "@/components/landing/BookingModal";
import AuditChatBubble from "@/components/landing/AuditChatBubble";

export default function PrivacyPolicy() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const openAuditChat = () => setChatOpen(true);

  return (
    <main
      data-testid="privacy-page"
      className="min-h-screen bg-[#F7F9FB] text-[#1F2937] pt-32 pb-24"
    >
      <Nav onBookCall={openBooking} onStartAudit={openAuditChat} />
      
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#0B3C5D] tracking-tight mb-8">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-[#4B5563] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#0B3C5D] mb-4">Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name</li>
              <li>Email</li>
              <li>Phone Number</li>
              <li>Business Information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0B3C5D] mb-4">How We Use Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to inquiries</li>
              <li>Provide audits</li>
              <li>Schedule consultations</li>
              <li>Improve services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0B3C5D] mb-4">Data Sharing</h2>
            <p>We do not sell personal information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0B3C5D] mb-4">Contact</h2>
            <p>
              If you have any questions, contact us at{" "}
              <a href="mailto:hello@aurvyz.com" className="text-[#2EC4B6] hover:underline">
                hello@aurvyz.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <div className="mt-24">
        <Footer onBookCall={openBooking} onStartAudit={openAuditChat} />
      </div>
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
      <AuditChatBubble open={chatOpen} onOpenChange={setChatOpen} onBookCall={openBooking} />
    </main>
  );
}
