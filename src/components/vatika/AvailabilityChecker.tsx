// src/components/AvailabilityChecker.tsx
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
import { VENUE, buildAvailabilityWhatsAppUrl } from "@/lib/venueData";

const EVENT_TYPES = [
  "Wedding & Reception",
  "Engagement / Ring Ceremony",
  "Sangeet / Haldi",
  "Corporate Conference / Meet",
  "Birthday / Anniversary",
] as const;

const GUEST_BRACKETS = [
  "100 – 250 Guests",
  "250 – 500 Guests",
  "500 – 800 Guests",
  "800 – 1,000+ Guests",
] as const;

const SPACE_OPTIONS = [
  "Lawn + AC Hall (Full Venue)",
  "Grand Wedding Lawn Only",
  "Royal AC Banquet Hall Only",
] as const;

export default function AvailabilityChecker() {
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
    const url = buildAvailabilityWhatsAppUrl({
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
    <section id="availability" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Direct Booking Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
                Instant Availability Checker
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1F1C18] leading-[1.08]">
                Check Open Dates Directly With Management.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Skip listing aggregators and third-party commissions. Pick your
                preferred date and guest count to send a clear, ready-to-confirm
                inquiry straight to Vatika's booking desk on WhatsApp.
              </p>
            </div>

            {/* Clean Benefit Cards */}
            <div className="space-y-3 pt-1">
              {[
                {
                  title: "Zero Middleman Commission",
                  desc: "Speak directly with Vatika's management for transparent hall & lawn packages.",
                },
                {
                  title: "Instant Date Confirmation",
                  desc: "Your preferred date, occasion, and guest count arrive cleanly formatted in one message.",
                },
                {
                  title: "Priority Site Tour Scheduling",
                  desc: "Reserve a walkthrough slot at Tedhi Pulia, Kathgodam before peak dates lock out.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-stone-200/75 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#1C3B2E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F1C18]">
                      {item.title}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Phone Strip */}
            <div className="p-5 rounded-2xl bg-[#1C3B2E] text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#E8CFA1] font-medium">
                  Direct Booking Desk
                </div>
                <div className="text-lg font-semibold mt-0.5 tracking-wide">
                  {VENUE.phoneDisplay}
                </div>
              </div>
              <a
                href={VENUE.telHref}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#1F1C18] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1C3B2E]" />
                Call Now
              </a>
            </div>
          </div>

          {/* RIGHT: Elevated White Inquiry Card */}
          <form
            onSubmit={handleWhatsAppSubmit}
            className="lg:col-span-7 rounded-3xl bg-white border border-stone-200/80 p-6 sm:p-9 space-y-6 shadow-[0_24px_60px_-20px_rgba(31,28,24,0.09)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1F1C18]">
                  Quick Availability Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Takes 15 seconds — opens directly in WhatsApp
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDF5F0] text-xs font-semibold text-[#1C3B2E]">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct to Venue
              </span>
            </div>

            {/* Row 1: Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  maxLength={50}
                  className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#1C3B2E] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1F1C18] placeholder:text-stone-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-2">
                  Preferred Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#9A7B4F] pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#1C3B2E] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-[#1F1C18] focus:outline-none transition-colors [color-scheme:light]"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Event Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2.5">
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
                          ? "bg-[#1C3B2E] text-white border-[#1C3B2E] font-medium shadow-sm"
                          : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Expected Guests */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#9A7B4F]" />
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
                          ? "bg-[#F4EFE6] text-[#1F1C18] border-[#9A7B4F] font-semibold"
                          : "bg-[#FAF8F5] text-stone-600 border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {bracket}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Space Preference */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2.5">
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
                          ? "bg-[#EDF5F0] text-[#1C3B2E] border-[#1C3B2E] font-semibold"
                          : "bg-[#FAF8F5] text-stone-600 border-stone-200 hover:border-stone-400"
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
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Special Requirement{" "}
                <span className="font-normal text-stone-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need rooms for outstation relatives, veg catering, daytime Haldi..."
                maxLength={140}
                className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-[#1C3B2E] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#1F1C18] placeholder:text-stone-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Live Pre-Filled Summary Preview */}
            <div className="rounded-2xl bg-[#F4F7F5] border border-[#1C3B2E]/15 px-4 py-3.5 text-xs text-stone-600">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#1C3B2E]">
                Ready to Send to {VENUE.phoneDisplay}
              </div>
              <div className="mt-1 text-stone-700">
                <strong className="text-[#1F1C18]">{eventType}</strong> •{" "}
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