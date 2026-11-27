// src/components/prem-bandhan/Footer.tsx
"use client";

import React from "react";
import {
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { PREM_VENUE } from "@/lib/premBandhanData";

export default function Footer() {
  const agencyWhatsApp = `https://wa.me/${PREM_VENUE.agency.whatsapp}?text=${encodeURIComponent(
    "Hi Tapecut Studios team, I checked the Prem Bandhan website prototype. Let's discuss making this live for us!"
  )}`;

  return (
    <footer className="bg-[#3A0F19] text-[#FAF3EC] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-base font-semibold text-[#F4D5A3]">
                PB
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-white">
                  {PREM_VENUE.name}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#F2D5AB]">
                  {PREM_VENUE.locationTag} • {PREM_VENUE.rating} ★ (
                  {PREM_VENUE.reviewCount} Reviews)
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/75 max-w-md leading-relaxed pt-1">
              {PREM_VENUE.address}
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-white/90">
              <a
                href={PREM_VENUE.telHref}
                className="inline-flex items-center gap-1.5 hover:text-[#F4D5A3] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4D5A3]" />
                {PREM_VENUE.phoneDisplay}
              </a>
              <a
                href={PREM_VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#F4D5A3] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F4D5A3]" />
                {PREM_VENUE.plusCode}
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F2D5AB]">
              Explore Venue
            </div>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a href="#spaces" className="hover:text-white transition-colors">
                  Wedding Lawn & AC Hall
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Venue Photo Tour
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  Corporate & Off-Season Events
                </a>
              </li>
              <li>
                <a
                  href="#availability"
                  className="hover:text-white transition-colors"
                >
                  Check Date Availability
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F2D5AB]">
              Direct Booking
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Book directly with Prem Bandhan management for clear pricing and
              zero portal commissions.
            </p>
            <a
              href="#availability"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FDFBF7] text-[#23191B] text-xs font-semibold transition-colors"
            >
              Inquire Now
            </a>
          </div>
        </div>

        {/* Prototype Attribution Card */}
        <div className="rounded-2xl bg-white/[0.07] border border-white/15 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F4D5A3]">
              <Sparkles className="w-3.5 h-3.5" />
              Custom Website Prototype Preview
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Crafted for{" "}
              <strong className="text-white">{PREM_VENUE.name}</strong> by{" "}
              <a
                href={PREM_VENUE.agency.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4D5A3] underline underline-offset-2 font-medium hover:text-white"
              >
                {PREM_VENUE.agency.name}
              </a>
              . Curated preview images shown here can be swapped with your
              venue's own photography before launch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={agencyWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#2CE070] text-[#081C10] text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Message {PREM_VENUE.agency.name}
            </a>
            <a
              href={PREM_VENUE.agency.site}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full border border-white/25 hover:bg-white/10 text-xs font-medium text-white inline-flex items-center gap-1.5 transition-colors"
            >
              {PREM_VENUE.agency.siteDisplay}
              <ExternalLink className="w-3.5 h-3.5 text-[#F4D5A3]" />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} {PREM_VENUE.name}, Haldwani. Website
          Prototype by {PREM_VENUE.agency.name}.
        </div>
      </div>
    </footer>
  );
}