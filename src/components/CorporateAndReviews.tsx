// src/components/CorporateAndReviews.tsx
"use client";

import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import { GOOGLE_REVIEWS, OFF_SEASON_EVENTS, VENUE } from "@/lib/venueData";

export default function CorporateAndReviews() {
  return (
    <>
      {/* SECTION A: OFF-SEASON & CORPORATE EVENTS */}
      <section
        id="corporate"
        className="py-20 sm:py-28 bg-white border-t border-stone-200/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
                Year-Round & Corporate Events
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1F1C18] leading-tight">
                Beyond Wedding Season. Built for Every Occasion.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Whether you are hosting a Kumaon regional dealer meet, a
                milestone anniversary, or an intimate daytime Haldi, Vatika
                offers flexible half-day and full-day packages.
              </p>
            </div>

            <a
              href="#availability"
              className="self-start md:self-auto px-6 py-3 rounded-full border border-stone-300 hover:border-[#1C3B2E] hover:bg-[#1C3B2E] hover:text-white text-xs sm:text-sm font-semibold text-[#1F1C18] inline-flex items-center gap-2 transition-colors"
            >
              Inquire for Corporate Rates
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFF_SEASON_EVENTS.map((ev) => (
              <div
                key={ev.code}
                className="rounded-3xl bg-[#FAF8F5] border border-stone-200/80 hover:border-[#9A7B4F]/60 hover:shadow-md p-7 flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-3.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] font-semibold text-[#9A7B4F]">
                    {ev.capacity}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1C18] leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {ev.detail}
                  </p>
                </div>

                <a
                  href="#availability"
                  className="pt-4 border-t border-stone-200/80 text-xs font-semibold text-[#1C3B2E] hover:text-[#9A7B4F] inline-flex items-center gap-1.5 transition-colors"
                >
                  Check Open Dates <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: GOOGLE REVIEWS (4.7★) + LOCATION & MAP */}
      <section
        id="reviews"
        className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-stone-200/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Reviews Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
                Trusted by Haldwani Families
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1F1C18]">
                Rated {VENUE.rating} ★ on Google Maps
              </h2>
            </div>

            <a
              href={VENUE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white border border-stone-200 hover:border-[#9A7B4F] text-xs sm:text-sm font-medium text-[#1F1C18] inline-flex items-center gap-2 shadow-sm transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-[#B8893E] font-semibold">
                <Star className="w-4 h-4 fill-[#C99A49] text-[#C99A49]" />
                {VENUE.rating}
              </span>
              <span className="text-stone-600">
                Read all {VENUE.reviewCount} reviews
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>

          {/* 3 Clean Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-3xl bg-white border border-stone-200/80 p-7 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#C99A49] text-[#C99A49]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <div className="text-sm font-semibold text-[#1F1C18]">
                    {review.author}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {review.event} • Verified Guest
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location & Full-Color Embedded Google Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-stone-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(31,28,24,0.08)] overflow-hidden">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
                  Prime Highway Location
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F1C18]">
                  Easy to Find for Every Guest.
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Directly situated on the Bareilly–Nainital Highway opposite
                  the LIC Building at Tedhi Pulia—convenient for local Haldwani
                  guests as well as outstation families arriving via Kathgodam.
                </p>

                <div className="space-y-3 pt-2 text-sm">
                  <div className="flex items-start gap-3 text-stone-700">
                    <MapPin className="w-4 h-4 text-[#1C3B2E] shrink-0 mt-1" />
                    <span>{VENUE.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <Navigation className="w-4 h-4 text-[#9A7B4F] shrink-0" />
                    <span>Google Plus Code: {VENUE.plusCode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#1F1C18]">
                    <Phone className="w-4 h-4 text-[#1C3B2E] shrink-0" />
                    <a
                      href={VENUE.telHref}
                      className="hover:text-[#9A7B4F] transition-colors"
                    >
                      {VENUE.phoneDisplay} ({VENUE.phoneRaw})
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#1C3B2E] hover:bg-[#152E24] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={VENUE.telHref}
                  className="px-5 py-3 rounded-full border border-stone-300 hover:border-[#1C3B2E] text-[#1F1C18] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1C3B2E]" />
                  Call Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[340px] lg:min-h-[440px] bg-stone-100">
              <iframe
                title="Vatika Banquet & Lawns Haldwani Google Map"
                src={VENUE.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] lg:min-h-[440px] border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}