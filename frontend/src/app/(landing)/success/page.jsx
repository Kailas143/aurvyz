"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-[#F7F9FB] px-4 text-center">
      <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full space-y-6">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-[#2EC4B6]" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1F2937]">
          Request Received!
        </h1>
        <p className="text-xl text-gray-600 font-light">
          Thank you for reaching out. The Aurvyz engineering team will review your request and be in touch shortly.
        </p>
        <div className="pt-8">
          <Link href="/">
            <Button size="lg" className="bg-[#0B3C5D] hover:bg-[#072b44] text-white rounded-full px-8">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
