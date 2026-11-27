// src/components/brijmohan/AvailabilityForm.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  BM_VENUE,
  buildBmAvailabilityWhatsAppUrl,
} from "@/lib/brijmohanData";

const EVENT_TYPES = [
  "Wedding & Reception",
  "Engagement / Ring Ceremony",
  "Sangeet / Haldi",
  "Corporate Meet / Conference",
  "Birthday / Anniversary",
] as const;

const GUEST_BRACKETS = [
  "100 – 250 Guests",
  "250 – 500 Guests",
  "500 – 750 Guests",
  "750 – 1,000+ Guests",
] as const;

const SPACE_OPTIONS = [
  "Palace Hall + Lawn (Full Venue)",
  "Grand Palace AC Hall Only",
  "Evening Celebration Lawn Only",
] as const;

export default function AvailabilityForm() {
  const [guestName, setGuestName] = useState("");
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState<string>(GUEST_BRACKETS[1]);
  const [spacePreference, setSpacePreference] = useState<string>(
    SPACE_OPTIONS[0]
  );
  const [notes, setNotes] = useState("");

  const minDate = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }, []);

  const formattedDatePreview = useMemo(() => {
    if (!eventDate) return "Flexible / Not selected yet";
    return new Date(eventDate + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [eventDate]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildBmAvailabilityWhatsAppUrl({
      guestName,
      eventType,
      eventDate,
      guestCount,
      spacePreference,
      notes,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="availability"
      className="py-20 sm:py-28 bg-white border-t border-[#ECE8DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Direct Booking Value */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
                1-Click WhatsApp Availability
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#17202D] leading-[1.08]">
                Check Open Dates Straight With Management.
              </h2>
              <p className="text-sm sm:text-base text-[#525E6E] leading-relaxed">
                Book directly with Brijmohan Palace Banquet—zero portal
                commissions, clear hall & lawn packages, and simple Google
                Pay booking confirmation.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                {
                  title: "Zero Middleman Commissions",
                  desc: "Deal directly with management for honest pricing on peak and off-season dates.",
                },
                {
                  title: "Google Pay & Instant Receipts",
                  desc: "Reserve your auspicious date easily via Google Pay / UPI once confirmed.",
                },
                {
                  title: "Free Guest Parking Included",
                  desc: "Dedicated on-site parking lot on Gas Godam Rd keeps arrival stress-free.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E6E2D8]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#162B47] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#17202D]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#647182] mt-0.5 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone Card */}
            <div className="p-5 rounded-2xl bg-[#162B47] text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#F0D59E] font-medium">
                  Direct Booking Desk
                </div>
                <div className="text-lg font-semibold mt-0.5 tracking-wide">
                  {BM_VENUE.phoneDisplay}
                </div>
              </div>
              <a
                href={BM_VENUE.telHref}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-[#17202D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#162B47]" />
                Call Now
              </a>
            </div>
          </div>

          {/* RIGHT: Interactive Inquiry Card */}
          <form
            onSubmit={handleWhatsAppSubmit}
            className="lg:col-span-7 rounded-3xl bg-[#FAF9F6] border border-[#E6E2D8] p-6 sm:p-9 space-y-6 shadow-[0_24px_60px_-20px_rgba(22,43,71,0.08)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E8E4DA]">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#17202D]">
                  Quick Date Availability Check
                </h3>
                <p className="text-xs sm:text-sm text-[#647182] mt-0.5">
                  Takes 15 seconds — opens directly in WhatsApp
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3F9] text-xs font-semibold text-[#162B47]">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct to Venue
              </span>
            </div>

            {/* Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A5565] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rohit Bisht"
                  maxLength={50}
                  className="w-full bg-white border border-[#E0DCD2] focus:border-[#162B47] rounded-xl px-4 py-3 text-sm text-[#17202D] placeholder:text-[#98A2B0] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5565] mb-2">
                  Preferred Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#AE8952] pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white border border-[#E0DCD2] focus:border-[#162B47] rounded-xl pl-10 pr-4 py-3 text-sm text-[#17202D] focus:outline-none transition-colors [color-scheme:light]"
                  />
                </div>
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold text-[#4A5565] mb-2.5">
                Occasion / Event Type
              </label>
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((type) => {
                  const active = eventType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm border transition-all cursor-pointer ${
                        active
                          ? "bg-[#162B47] text-white border-[#162B47] font-medium shadow-sm"
                          : "bg-white text-[#4A5565] border-[#E0DCD2] hover:border-[#AE8952]"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-xs font-semibold text-[#4A5565] mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#AE8952]" />
                Expected Guest Count
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {GUEST_BRACKETS.map((bracket) => {
                  const active = guestCount === bracket;
                  return (
                    <button
                      key={bracket}
                      type="button"
                      onClick={() => setGuestCount(bracket)}
                      className={`px-3 py-2.5 rounded-xl text-xs border text-center transition-all cursor-pointer ${
                        active
                          ? "bg-[#F7F1E4] text-[#17202D] border-[#AE8952] font-semibold"
                          : "bg-white text-[#525E6E] border-[#E0DCD2] hover:border-[#AE8952]"
                      }`}
                    >
                      {bracket}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Space Preference */}
            <div>
              <label className="block text-xs font-semibold text-[#4A5565] mb-2.5">
                Preferred Space
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SPACE_OPTIONS.map((space) => {
                  const active = spacePreference === space;
                  return (
                    <button
                      key={space}
                      type="button"
                      onClick={() => setSpacePreference(space)}
                      className={`px-3.5 py-3 rounded-xl text-xs border text-left transition-all cursor-pointer ${
                        active
                          ? "bg-[#EEF3F9] text-[#162B47] border-[#162B47] font-semibold"
                          : "bg-white text-[#525E6E] border-[#E0DCD2] hover:border-[#AE8952]"
                      }`}
                    >
                      {space}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <label className="block text-xs font-semibold text-[#4A5565] mb-2">
                Special Requirement{" "}
                <span className="font-normal text-[#8A95A5]">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Pure veg catering, daytime Haldi, outstation family rooms..."
                maxLength={140}
                className="w-full bg-white border border-[#E0DCD2] focus:border-[#162B47] rounded-xl px-4 py-3 text-sm text-[#17202D] placeholder:text-[#98A2B0] focus:outline-none transition-colors"
              />
            </div>

            {/* Pre-Filled Summary */}
            <div className="rounded-2xl bg-[#EEF3F9] border border-[#162B47]/15 px-4 py-3.5 text-xs text-[#4A5565]">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#162B47]">
                Ready to Send to {BM_VENUE.phoneDisplay}
              </div>
              <div className="mt-1 text-[#2C3644]">
                <strong className="text-[#17202D]">{eventType}</strong> •{" "}
                {formattedDatePreview} • {guestCount}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#1C7C46] hover:bg-[#166639] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#1C7C46]/20"
            >
              <MessageCircle className="w-5 h-5" />
              Check Availability on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}