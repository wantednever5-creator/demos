// src/components/prem-bandhan/Hero.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Share2, Star } from "lucide-react";
import {
  PB_HERO_MEDIA,
  PB_SPECS,
  PREM_VENUE,
  applyPremFallback,
  buildPremFamilyShareUrl,
} from "@/lib/premBandhanData";

export default function Hero() {
  const [sharedFeedback, setSharedFeedback] = useState(false);

  const handleShareToFamilyGroup = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : PREM_VENUE.mapsUrl;
    const shareUrl = buildPremFamilyShareUrl(currentUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setSharedFeedback(true);
    setTimeout(() => setSharedFeedback(false), 2400);
  };

  return (
    <section id="top" className="relative bg-[#FDFBF7]">
      {/* Full-Bleed Editorial Hero */}
      <div className="relative min-h-[85vh] flex items-center justify-center text-center pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PB_HERO_MEDIA.image}
            alt={PB_HERO_MEDIA.alt}
            onError={(e) => applyPremFallback(e, PB_HERO_MEDIA.fallbackImage)}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#231015]/60 via-[#231015]/48 to-[#231015]/82" />
        </div>

        <div className="relative max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 flex flex-col items-center"
          >
            {/* Rating + Location Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PREM_VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white hover:bg-white/25 transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-[#F4D5A3] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#F4D5A3]" />
                  {PREM_VENUE.rating}
                </span>
                <span className="text-white/90">
                  ({PREM_VENUE.reviewCount} Google Reviews)
                </span>
              </a>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/95 bg-black/25 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#F4D5A3]" />
                Lal Danth Bypass Rd, Malli Bamori • Haldwani
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-medium leading-[1.08] tracking-tight text-white">
              Timeless Weddings &{" "}
              <span className="italic text-[#F4D5A3]">Joyful</span> Family
              Gatherings.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/88 max-w-2xl leading-relaxed">
              Prem Bandhan brings together a sprawling wedding lawn, centralized
              AC banquet hall, private family suites, and easy Lal Danth Bypass
              parking—with direct, zero-commission bookings.
            </p>

            {/* Clean Pill CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href="#availability"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FDFBF7] text-[#23191B] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20"
              >
                Check Date Availability
                <ArrowRight className="w-4 h-4 text-[#5E1928]" />
              </a>

              <button
                type="button"
                onClick={handleShareToFamilyGroup}
                className="px-6 py-3.5 rounded-full bg-white/14 hover:bg-white/24 backdrop-blur-md border border-white/30 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {sharedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Ready to Share on WhatsApp
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#F4D5A3]" />
                    Share to Family WhatsApp Group
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elevated Spec Strip */}
      <div className="relative z-10 -mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="rounded-3xl bg-white border border-[#EDE4DA] shadow-[0_20px_50px_-15px_rgba(94,25,40,0.09)] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-[#EFE7DE]"
        >
          {PB_SPECS.map((spec, index) => (
            <div key={spec.label} className={index > 0 ? "lg:pl-6" : ""}>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A797C] font-medium">
                {spec.label}
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191B] mt-1">
                {spec.value}
              </div>
              <div className="text-xs text-[#B38A58] font-medium mt-0.5">
                {spec.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}