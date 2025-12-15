"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";
import BookingForm from "@/components/BookingForm";
import BookingCalendar from "@/components/BookingCalendar";
import { TabType } from "@/types/booking";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("booking");

  return (
    <div className="min-h-screen bg-[#121213]">
      {/* Subtle Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#48D0FF]/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Tabs */}
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Content */}
          <div className="mt-6">
            {activeTab === "booking" ? <BookingForm /> : <BookingCalendar />}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2b] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm text-[#F2F3F4]/40">
                Library Hall Booking System
              </span>
              <span className="text-sm text-[#F2F3F4]/40">
                © 2025 LOCUS
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
