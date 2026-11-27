// src/components/brijmohan/Footer.tsx
"use client";

import React from "react";
import {
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { BM_VENUE } from "@/lib/brijmohanData";

export default function Footer() {
  const agencyWhatsApp = `https://wa.me/${BM_VENUE.agency.whatsapp}?text=${encodeURIComponent(
    "Hi Tapecut Studios team, I checked the Brijmohan Palace Banquet website prototype. Let's discuss making this live for us!"
  )}`;

  return (
    <footer className="bg-[#0F1F35] text-[#F4F2EC] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-serif text-base font-semibold text-[#F4D59A]">
                BP
              </div>
              <div>
                <div className="font-serif text-2xl font-semibold text-white">
                  {BM_VENUE.name}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#F0D59E]">
                  {BM_VENUE.locationTag} • {BM_VENUE.rating} ★ (
                  {BM_VENUE.reviewCount} Reviews)
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/75 max-w-md leading-relaxed pt-1">
              {BM_VENUE.address}
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs text-white/90">
              <a
                href={BM_VENUE.telHref}
                className="inline-flex items-center gap-1.5 hover:text-[#F4D59A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4D59A]" />
                {BM_VENUE.phoneDisplay}
              </a>
              <a
                href={BM_VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#F4D59A] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F4D59A]" />
                {BM_VENUE.plusCode}
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F0D59E]">
              Explore Venue
            </div>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a href="#spaces" className="hover:text-white transition-colors">
                  Palace Hall & Lawn
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Venue Photo Tour
                </a>
              </li>
              <li>
                <a href="#planner" className="hover:text-white transition-colors">
                  Food Menu & Visit Planner
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
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F0D59E]">
              Direct Booking
            </div>
            <p className="text-sm text-white/75 leading-relaxed">
              Book straight with Brijmohan Palace management with Google Pay
              support, free guest parking, and zero portal commissions.
            </p>
            <a
              href="#availability"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-[#17202D] text-xs font-semibold transition-colors"
            >
              Inquire Now
            </a>
          </div>
        </div>

        {/* Anonymous Tapecut Studios Prototype Banner */}
        <div className="rounded-2xl bg-white/[0.07] border border-white/15 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F4D59A]">
              <Sparkles className="w-3.5 h-3.5" />
              Custom Website Prototype Preview
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Crafted for{" "}
              <strong className="text-white">{BM_VENUE.name}</strong> by{" "}
              <a
                href={BM_VENUE.agency.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F4D59A] underline underline-offset-2 font-medium hover:text-white"
              >
                {BM_VENUE.agency.name}
              </a>
              . Preview photos shown here will be replaced with your venue's
              real photography upon launch.
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
              Message {BM_VENUE.agency.name}
            </a>
            <a
              href={BM_VENUE.agency.site}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full border border-white/25 hover:bg-white/10 text-xs font-medium text-white inline-flex items-center gap-1.5 transition-colors"
            >
              {BM_VENUE.agency.siteDisplay}
              <ExternalLink className="w-3.5 h-3.5 text-[#F4D59A]" />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} {BM_VENUE.name}, Haldwani. Website
          Prototype by {BM_VENUE.agency.name}.
        </div>
      </div>
    </footer>
  );
}