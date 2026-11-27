// src/components/brijmohan/EventsAndReviews.tsx
"use client";

import React from "react";
import {
  ArrowUpRight,
  Car,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import {
  BM_OFF_SEASON_EVENTS,
  BM_REVIEWS,
  BM_VENUE,
} from "@/lib/brijmohanData";

export default function EventsAndReviews() {
  return (
    <>
      {/* SECTION A: OFF-SEASON & CORPORATE BOOKINGS */}
      <section
        id="events"
        className="py-20 sm:py-28 bg-[#FAF9F6] border-t border-[#ECE8DF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
                Year-Round & Corporate Bookings
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#17202D] leading-tight">
                Beyond Wedding Season. Ready for Every Gathering.
              </h2>
              <p className="text-sm sm:text-base text-[#525E6E] leading-relaxed">
                From Kusumkhera business meets and family anniversaries to
                daytime Haldi and engagement celebrations, Brijmohan Palace
                offers flexible direct packages year-round.
              </p>
            </div>

            <a
              href="#availability"
              className="self-start md:self-auto px-6 py-3 rounded-full border border-[#DCD7CC] hover:border-[#162B47] hover:bg-[#162B47] hover:text-white text-xs sm:text-sm font-semibold text-[#17202D] inline-flex items-center gap-2 transition-colors"
            >
              Inquire for Off-Season Dates
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BM_OFF_SEASON_EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl bg-white border border-[#E6E2D8] hover:border-[#AE8952] hover:shadow-md p-7 flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-3.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E0DCD2] text-[11px] font-semibold text-[#AE8952]">
                    {ev.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#17202D] leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-[#525E6E] leading-relaxed">
                    {ev.detail}
                  </p>
                </div>

                <a
                  href="#availability"
                  className="pt-4 border-t border-[#F0EDE6] text-xs font-semibold text-[#162B47] hover:text-[#AE8952] inline-flex items-center gap-1.5 transition-colors"
                >
                  Check Open Dates <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: 5.0★ GOOGLE REVIEWS (49) + VERIFIED AMENITIES + MAP */}
      <section
        id="reviews"
        className="py-20 sm:py-28 bg-white border-t border-[#ECE8DF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
                Perfect Reputation in Haldwani
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#17202D]">
                Rated {BM_VENUE.rating} ★ Across {BM_VENUE.reviewCount} Reviews
              </h2>
            </div>

            <a
              href={BM_VENUE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-[#FAF9F6] border border-[#E0DCD2] hover:border-[#AE8952] text-xs sm:text-sm font-medium text-[#17202D] inline-flex items-center gap-2 shadow-sm transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-[#AE8952] font-bold">
                <Star className="w-4 h-4 fill-[#C99A49] text-[#C99A49]" />
                {BM_VENUE.rating}
              </span>
              <span className="text-[#525E6E]">
                Read all {BM_VENUE.reviewCount} Google reviews
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8A95A5]" />
            </a>
          </div>

          {/* 3 Verified Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BM_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-3xl bg-[#FAF9F6] border border-[#E6E2D8] p-7 flex flex-col justify-between space-y-6"
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
                  <p className="text-sm text-[#3D4B5C] leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECE8DF]">
                  <div className="text-sm font-semibold text-[#17202D]">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#758191] mt-0.5">
                    {review.event} • Verified Guest
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Verified Venue Amenities Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#EEF3F9] border border-[#162B47]/15 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Car className="w-5 h-5 text-[#162B47]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#17202D]">
                  Free Parking Lot
                </div>
                <div className="text-xs text-[#525E6E]">
                  Dedicated on-site guest parking
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#EEF3F9] border border-[#162B47]/15 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Smartphone className="w-5 h-5 text-[#162B47]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#17202D]">
                  Google Pay Accepted
                </div>
                <div className="text-xs text-[#525E6E]">
                  Simple digital UPI payments
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#EEF3F9] border border-[#162B47]/15 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#162B47]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#17202D]">
                  Gender-Neutral Restrooms
                </div>
                <div className="text-xs text-[#525E6E]">
                  Clean, inclusive guest facilities
                </div>
              </div>
            </div>
          </div>

          {/* Location & Full-Color Embedded Google Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[#E6E2D8] bg-[#FAF9F6] shadow-[0_24px_60px_-20px_rgba(22,43,71,0.08)] overflow-hidden">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
                  Easy-to-Reach Location
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#17202D]">
                  Gas Godam Rd, Kusumkhera South.
                </h3>
                <p className="text-sm text-[#525E6E] leading-relaxed">
                  Situated in Shiv Puram Phase-I, Shiv Puram Colony with a
                  dedicated free parking lot—making arrival smooth for both
                  local Haldwani families and outstation guests.
                </p>

                <div className="space-y-3 pt-2 text-sm">
                  <div className="flex items-start gap-3 text-[#2C3644]">
                    <MapPin className="w-4 h-4 text-[#162B47] shrink-0 mt-1" />
                    <span>{BM_VENUE.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#647182]">
                    <Navigation className="w-4 h-4 text-[#AE8952] shrink-0" />
                    <span>Google Plus Code: {BM_VENUE.plusCode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#17202D]">
                    <Phone className="w-4 h-4 text-[#162B47] shrink-0" />
                    <a
                      href={BM_VENUE.telHref}
                      className="hover:text-[#AE8952] transition-colors"
                    >
                      {BM_VENUE.phoneDisplay} ({BM_VENUE.phoneRaw})
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={BM_VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#162B47] hover:bg-[#0F1F35] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={BM_VENUE.telHref}
                  className="px-5 py-3 rounded-full border border-[#DCD7CC] bg-white hover:border-[#162B47] text-[#17202D] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#162B47]" />
                  Call Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[340px] lg:min-h-[440px] bg-[#ECEAE4]">
              <iframe
                title="Brijmohan Palace Banquet Haldwani Google Map"
                src={BM_VENUE.mapsEmbedUrl}
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