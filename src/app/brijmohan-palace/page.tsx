// src/app/brijmohan-palace/page.tsx
import Navbar from "@/components/brijmohan/Navbar";
import Hero from "@/components/brijmohan/Hero";
import Spaces from "@/components/brijmohan/Spaces";
import Gallery from "@/components/brijmohan/Gallery";
import BanquetUtilitySuite from "@/components/shared/BanquetUtilitySuite";
import AvailabilityForm from "@/components/brijmohan/AvailabilityForm";
import EventsAndReviews from "@/components/brijmohan/EventsAndReviews";
import Footer from "@/components/brijmohan/Footer";
import { MessageCircle, Phone } from "lucide-react";
import { BM_VENUE } from "@/lib/brijmohanData";

export default function BrijmohanPalacePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#17202D]">
      <Navbar />
      <main>
        <Hero />
        <Spaces />
        <Gallery />
        <BanquetUtilitySuite
          venue={{
            id: "brijmohan-palace",
            name: BM_VENUE.name,
            shortAddress: BM_VENUE.shortAddress,
            phoneDisplay: BM_VENUE.phoneDisplay,
            telHref: BM_VENUE.telHref,
            whatsappNumber: BM_VENUE.whatsappNumber,
            theme: "sapphire",
          }}
        />
        <AvailabilityForm />
        <EventsAndReviews />
      </main>
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E6E2D8] px-4 py-3 grid grid-cols-2 gap-3 shadow-[0_-8px_30px_rgba(22,43,71,0.08)]">
        <a
          href={BM_VENUE.telHref}
          className="py-2.5 rounded-full border border-[#DCD7CC] text-[#17202D] text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#162B47]" />
          Call Venue
        </a>
        <a
          href="#planner"
          className="py-2.5 rounded-full bg-[#162B47] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Plan Event
        </a>
      </div>
    </div>
  );
}