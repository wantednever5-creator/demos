// src/components/HeroShowroom.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Share2, Star } from "lucide-react";
import {
  HERO_MEDIA,
  KEY_SPECS,
  VENUE,
  applyImageFallback,
  buildFamilyShareWhatsAppUrl,
} from "@/lib/venueData";

export default function HeroShowroom() {
  const [sharedFeedback, setSharedFeedback] = useState(false);

  const handleShareToFamilyGroup = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : VENUE.mapsUrl;
    const shareUrl = buildFamilyShareWhatsAppUrl(currentUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setSharedFeedback(true);
    setTimeout(() => setSharedFeedback(false), 2400);
  };

  return (
    <section id="top" className="relative bg-[#FAF8F5]">
      {/* Full-Bleed Image Stage */}
      <div className="relative min-h-[84vh] flex items-end pt-36 pb-24 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_MEDIA.image}
            alt={HERO_MEDIA.alt}
            onError={(e) => applyImageFallback(e, HERO_MEDIA.fallbackImage)}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161310]/85 via-[#161310]/40 to-[#161310]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161310]/70 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            {/* Soft Frosted Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={VENUE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white hover:bg-white/25 transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-[#F4D59A] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#F4D59A]" />
                  {VENUE.rating}
                </span>
                <span className="text-white/85">
                  ({VENUE.reviewCount} Google Reviews)
                </span>
              </a>

              <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-white/90 bg-black/25 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#F4D59A]" />
                Tedhi Pulia, Kathgodam • Haldwani
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.06] tracking-tight text-white">
              Where Haldwani's{" "}
              <span className="italic text-[#F4D59A]">Grandest</span> Celebrations
              Unfold.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl leading-relaxed">
              An expansive open-air wedding lawn, centralized AC banquet hall,
              family suites, and effortless highway parking on Bareilly–Nainital
              Road—with direct, zero-commission bookings.
            </p>

            {/* Clean Pill CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#availability"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1F1C18] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20"
              >
                Check Date Availability
                <ArrowRight className="w-4 h-4 text-[#1C3B2E]" />
              </a>

              <button
                type="button"
                onClick={handleShareToFamilyGroup}
                className="px-6 py-3.5 rounded-full bg-white/12 hover:bg-white/22 backdrop-blur-md border border-white/30 text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
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

      {/* Floating Elevated Spec Strip */}
      <div className="relative z-10 -mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="rounded-3xl bg-white border border-stone-200/80 shadow-[0_20px_50px_-15px_rgba(31,28,24,0.1)] p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-stone-200/80"
        >
          {KEY_SPECS.map((spec, index) => (
            <div
              key={spec.label}
              className={index > 0 ? "lg:pl-6" : ""}
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-stone-500 font-medium">
                {spec.label}
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-semibold text-[#1F1C18] mt-1">
                {spec.value}
              </div>
              <div className="text-xs text-[#9A7B4F] font-medium mt-0.5">
                {spec.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}