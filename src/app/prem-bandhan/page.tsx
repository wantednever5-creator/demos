// src/app/prem-bandhan/page.tsx
import Navbar from "@/components/prem-bandhan/Navbar";
import Hero from "@/components/prem-bandhan/Hero";
import Spaces from "@/components/prem-bandhan/Spaces";
import Gallery from "@/components/prem-bandhan/Gallery";
import BanquetUtilitySuite from "@/components/shared/BanquetUtilitySuite";
import AvailabilityForm from "@/components/prem-bandhan/AvailabilityForm";
import EventsAndReviews from "@/components/prem-bandhan/EventsAndReviews";
import Footer from "@/components/prem-bandhan/Footer";
import { MessageCircle, Phone } from "lucide-react";
import { PREM_VENUE } from "@/lib/premBandhanData";

export default function PremBandhanPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#23191B]">
      <Navbar />
      <main>
        <Hero />
        <Spaces />
        <Gallery />
        <BanquetUtilitySuite
          venue={{
            id: "prem-bandhan",
            name: PREM_VENUE.name,
            shortAddress: PREM_VENUE.shortAddress,
            phoneDisplay: PREM_VENUE.phoneDisplay,
            telHref: PREM_VENUE.telHref,
            whatsappNumber: PREM_VENUE.whatsappNumber,
            theme: "burgundy",
          }}
        />
        <AvailabilityForm />
        <EventsAndReviews />
      </main>
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE4DA] px-4 py-3 grid grid-cols-2 gap-3 shadow-[0_-8px_30px_rgba(94,25,40,0.08)]">
        <a
          href={PREM_VENUE.telHref}
          className="py-2.5 rounded-full border border-[#DFD4C8] text-[#23191B] text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#5E1928]" />
          Call Venue
        </a>
        <a
          href="#planner"
          className="py-2.5 rounded-full bg-[#5E1928] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Plan Event
        </a>
      </div>
    </div>
  );
}