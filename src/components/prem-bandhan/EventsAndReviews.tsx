// src/components/prem-bandhan/EventsAndReviews.tsx
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
import {
  PB_OFF_SEASON_EVENTS,
  PB_REVIEWS,
  PREM_VENUE,
} from "@/lib/premBandhanData";

export default function EventsAndReviews() {
  return (
    <>
      {/* SECTION A: YEAR-ROUND & CORPORATE EVENTS */}
      <section
        id="events"
        className="py-20 sm:py-28 bg-white border-t border-[#EFE7DE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
                Year-Round & Corporate Bookings
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#23191B] leading-tight">
                More Than Weddings. Ready Every Season.
              </h2>
              <p className="text-sm sm:text-base text-[#635357] leading-relaxed">
                From corporate conferences and institutional seminars to
                daytime Haldi functions and milestone anniversaries, Prem
                Bandhan adapts effortlessly to every gathering size.
              </p>
            </div>

            <a
              href="#availability"
              className="self-start md:self-auto px-6 py-3 rounded-full border border-[#DFD4C8] hover:border-[#5E1928] hover:bg-[#5E1928] hover:text-white text-xs sm:text-sm font-semibold text-[#23191B] inline-flex items-center gap-2 transition-colors"
            >
              Inquire for Off-Season Dates
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PB_OFF_SEASON_EVENTS.map((ev) => (
              <div
                key={ev.title}
                className="rounded-3xl bg-[#FDFBF7] border border-[#EDE4DA] hover:border-[#B38A58] hover:shadow-md p-7 flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-3.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#E6DCD1] text-[11px] font-semibold text-[#B38A58]">
                    {ev.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#23191B] leading-snug">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-[#635357] leading-relaxed">
                    {ev.detail}
                  </p>
                </div>

                <a
                  href="#availability"
                  className="pt-4 border-t border-[#EFE7DE] text-xs font-semibold text-[#5E1928] hover:text-[#B38A58] inline-flex items-center gap-1.5 transition-colors"
                >
                  Check Open Dates <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B: 4.7★ GOOGLE REVIEWS (91) + EMBEDDED MAP */}
      <section
        id="reviews"
        className="py-20 sm:py-28 bg-[#FDFBF7] border-t border-[#EFE7DE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
                Loved Across Haldwani
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#23191B]">
                Rated {PREM_VENUE.rating} ★ by {PREM_VENUE.reviewCount} Guests
              </h2>
            </div>

            <a
              href={PREM_VENUE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white border border-[#E6DCD1] hover:border-[#B38A58] text-xs sm:text-sm font-medium text-[#23191B] inline-flex items-center gap-2 shadow-sm transition-colors"
            >
              <span className="inline-flex items-center gap-1 text-[#B38A58] font-semibold">
                <Star className="w-4 h-4 fill-[#C99A49] text-[#C99A49]" />
                {PREM_VENUE.rating}
              </span>
              <span className="text-[#5C4D50]">
                Read all {PREM_VENUE.reviewCount} Google reviews
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9A8A8D]" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PB_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-3xl bg-white border border-[#EDE4DA] p-7 flex flex-col justify-between space-y-6 shadow-sm"
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
                  <p className="text-sm text-[#4A3C3F] leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4ECE3]">
                  <div className="text-sm font-semibold text-[#23191B]">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#8A797C] mt-0.5">
                    {review.event} • Verified Guest
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location & Full-Color Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[#EDE4DA] bg-white shadow-[0_24px_60px_-20px_rgba(94,25,40,0.08)] overflow-hidden">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
                  Bypass Accessibility
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#23191B]">
                  Effortless Arrival on Lal Danth Bypass.
                </h3>
                <p className="text-sm text-[#635357] leading-relaxed">
                  Located near Primary School in Malli Bamori, Shiv Puri right
                  off Lal Danth Bypass Road—giving families smooth entry and
                  exit without inner-city congestion.
                </p>

                <div className="space-y-3 pt-2 text-sm">
                  <div className="flex items-start gap-3 text-[#3A2D30]">
                    <MapPin className="w-4 h-4 text-[#5E1928] shrink-0 mt-1" />
                    <span>{PREM_VENUE.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#7A696C]">
                    <Navigation className="w-4 h-4 text-[#B38A58] shrink-0" />
                    <span>Google Plus Code: {PREM_VENUE.plusCode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-[#23191B]">
                    <Phone className="w-4 h-4 text-[#5E1928] shrink-0" />
                    <a
                      href={PREM_VENUE.telHref}
                      className="hover:text-[#B38A58] transition-colors"
                    >
                      {PREM_VENUE.phoneDisplay} ({PREM_VENUE.phoneRaw})
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={PREM_VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#5E1928] hover:bg-[#49121F] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PREM_VENUE.telHref}
                  className="px-5 py-3 rounded-full border border-[#DFD4C8] hover:border-[#5E1928] text-[#23191B] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#5E1928]" />
                  Call Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[340px] lg:min-h-[440px] bg-[#F5EFE8]">
              <iframe
                title="Prem Bandhan Haldwani Google Map"
                src={PREM_VENUE.mapsEmbedUrl}
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