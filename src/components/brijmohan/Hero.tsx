// src/components/brijmohan/Hero.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Check,
  MapPin,
  Share2,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import {
  BM_HERO_MEDIA,
  BM_SPECS,
  BM_VENUE,
  applyBmFallback,
  buildBmFamilyShareUrl,
} from "@/lib/brijmohanData";

export default function Hero() {
  const [sharedFeedback, setSharedFeedback] = useState(false);

  const handleShareToFamilyGroup = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : BM_VENUE.mapsUrl;
    const shareUrl = buildBmFamilyShareUrl(currentUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setSharedFeedback(true);
    setTimeout(() => setSharedFeedback(false), 2400);
  };

  return (
    <section id="top" className="relative bg-[#FAF9F6]">
      <div className="relative min-h-[86vh] flex items-end pt-36 pb-24 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BM_HERO_MEDIA.image}
            alt={BM_HERO_MEDIA.alt}
            onError={(e) => applyBmFallback(e, BM_HERO_MEDIA.fallbackImage)}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D192B]/90 via-[#0D192B]/48 to-[#0D192B]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D192B]/80 via-[#0D192B]/25 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            {/* Perfect 5.0★ + Location Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BM_VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white hover:bg-white/25 transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-[#F4D59A] font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#F4D59A]" />
                  {BM_VENUE.rating} Perfect Rating
                </span>
                <span className="text-white/85">
                  ({BM_VENUE.reviewCount} Google Reviews)
                </span>
              </a>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/95 bg-black/25 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#F4D59A]" />
                Gas Godam Rd, Kusumkhera South • Haldwani
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[66px] font-medium leading-[1.08] tracking-tight text-white">
              Haldwani's{" "}
              <span className="italic text-[#F4D59A]">5-Star Rated</span> Palace
              for Grand Celebrations.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/88 max-w-2xl leading-relaxed">
              Experience effortless wedding hospitality at Brijmohan Palace
              Banquet—complete with an elegant AC hall, celebration lawn, free
              on-site parking lot, and transparent direct bookings with Google
              Pay convenience.
            </p>

            {/* Verified Google Amenities Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-medium text-white/95">
                <Car className="w-3.5 h-3.5 text-[#F4D59A]" />
                Free Parking Lot
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-medium text-white/95">
                <Smartphone className="w-3.5 h-3.5 text-[#F4D59A]" />
                Google Pay Accepted
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-medium text-white/95">
                <Sparkles className="w-3.5 h-3.5 text-[#F4D59A]" />
                Gender-Neutral Restrooms
              </span>
            </div>

            {/* Clean Pill CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#planner"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF9F6] text-[#17202D] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/25"
              >
                Plan Menu & Book Visit
                <ArrowRight className="w-4 h-4 text-[#162B47]" />
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
                    <Share2 className="w-4 h-4 text-[#F4D59A]" />
                    Share to Family WhatsApp Group
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Pearl-White Spec Strip */}
      <div className="relative z-10 -mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="rounded-3xl bg-white border border-[#E6E2D8] shadow-[0_20px_50px_-15px_rgba(22,43,71,0.1)] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-[#ECE8DF]"
        >
          {BM_SPECS.map((spec, index) => (
            <div key={spec.label} className={index > 0 ? "lg:pl-6" : ""}>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#758191] font-medium">
                {spec.label}
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#17202D] mt-1">
                {spec.value}
              </div>
              <div className="text-xs text-[#AE8952] font-medium mt-0.5">
                {spec.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}