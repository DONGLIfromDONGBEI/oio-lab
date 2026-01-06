"use client";

import { Hero } from "@/components/Hero";
import { BookingTabs } from "@/components/BookingTabs";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden selection:bg-[#537FE7]/30 selection:text-white">
      <LanguageSwitcher />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 flex flex-col z-10">
        
        {/* Hero Section: Left Aligned */}
        <div className="w-full flex justify-start">
          <Hero />
        </div>

        {/* Booking Tabs: Left Aligned, Reduced Top Margin */}
        <div className="w-full flex justify-center mt-2">
           <BookingTabs />
        </div>

      </div>
      
      <Footer />
      
      {/* Background Ambient Effects - Obsidian Dark Mode */}
      <div className="fixed inset-0 -z-20 h-full w-full bg-[#0b0c0e]" />
      <div className="fixed top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#1c1d21] to-transparent -z-10 opacity-40" />
    </main>
  );
}
