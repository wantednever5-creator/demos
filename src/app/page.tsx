// src/app/page.tsx
import Navbar from "@/components/Navbar";
import HeroShowroom from "@/components/HeroShowroom";
import SpacesShowcase from "@/components/SpacesShowcase";
import GalleryStrip from "@/components/GalleryStrip";
import AvailabilityChecker from "@/components/AvailabilityChecker";
import CorporateAndReviews from "@/components/CorporateAndReviews";
import Footer from "@/components/Footer";
import { Phone, MessageCircle } from "lucide-react";
import { VENUE } from "@/lib/venueData";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1C18]">
      <Navbar />
      <main>
        <HeroShowroom />
        <SpacesShowcase />
        <GalleryStrip />
        <AvailabilityChecker />
        <CorporateAndReviews />
      </main>
      <Footer />

      {/* Clean Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 grid grid-cols-2 gap-3 shadow-[0_-8px_30px_rgba(31,28,24,0.08)]">
        <a
          href={VENUE.telHref}
          className="py-2.5 rounded-full border border-stone-300 text-[#1F1C18] text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#1C3B2E]" />
          Call Venue
        </a>
        <a
          href="#availability"
          className="py-2.5 rounded-full bg-[#1C3B2E] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Check Date
        </a>
      </div>
    </div>
  );
}