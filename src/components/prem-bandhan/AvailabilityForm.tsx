// src/components/prem-bandhan/AvailabilityForm.tsx
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
  PREM_VENUE,
  buildPremAvailabilityWhatsAppUrl,
} from "@/lib/premBandhanData";

const EVENT_TYPES = [
  "Wedding & Reception",
  "Engagement / Ring Ceremony",
  "Sangeet / Haldi",
  "Corporate Meet / Seminar",
  "Anniversary / Birthday",
] as const;

const GUEST_BRACKETS = [
  "150 – 300 Guests",
  "300 – 500 Guests",
  "500 – 800 Guests",
  "800 – 1,000+ Guests",
] as const;

const SPACE_OPTIONS = [
  "Lawn + AC Hall (Full Venue)",
  "Prem Bandhan Lawn Only",
  "Imperial AC Hall Only",
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
    const url = buildPremAvailabilityWhatsAppUrl({
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
    <section id="availability" className="py-20 sm:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: Direct Booking Value */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
                1-Click WhatsApp Availability
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#23191B] leading-[1.08]">
                Confirm Open Dates Straight With Management.
              </h2>
              <p className="text-sm sm:text-base text-[#635357] leading-relaxed">
                Avoid listing aggregators and hidden commissions. Select your
                preferred date and guest count to message Prem Bandhan's
                booking desk directly on WhatsApp.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                {
                  title: "Direct, Zero-Commission Rates",
                  desc: "Talk straight to Prem Bandhan management for honest hall, lawn, and room packages.",
                },
                {
                  title: "Structured Inquiry in One Tap",
                  desc: "Your date, occasion, and guest estimate arrive clearly formatted—saving back-and-forth calls.",
                },
                {
                  title: "Priority Venue Walkthrough",
                  desc: "Book a family visit at Lal Danth Bypass Rd before auspicious wedding dates fill up.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EDE4DA] shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#5E1928] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#23191B]">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#756468] mt-0.5 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Booking Phone Card */}
            <div className="p-5 rounded-2xl bg-[#5E1928] text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#F2D5AB] font-medium">
                  Direct Booking Desk
                </div>
                <div className="text-lg font-semibold mt-0.5 tracking-wide">
                  {PREM_VENUE.phoneDisplay}
                </div>
              </div>
              <a
                href={PREM_VENUE.telHref}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FDFBF7] text-[#23191B] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#5E1928]" />
                Call Now
              </a>
            </div>
          </div>

          {/* RIGHT: Interactive Inquiry Card */}
          <form
            onSubmit={handleWhatsAppSubmit}
            className="lg:col-span-7 rounded-3xl bg-white border border-[#EDE4DA] p-6 sm:p-9 space-y-6 shadow-[0_24px_60px_-20px_rgba(94,25,40,0.09)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F3ECE4]">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#23191B]">
                  Quick Availability Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-[#7A696C] mt-0.5">
                  Takes 15 seconds — sends straight to WhatsApp
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0F2] text-xs font-semibold text-[#5E1928]">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct to Venue
              </span>
            </div>

            {/* Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#544649] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Gaurav Joshi"
                  maxLength={50}
                  className="w-full bg-[#FDFBF7] border border-[#E6DCD1] focus:border-[#5E1928] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#23191B] placeholder:text-[#A5979A] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#544649] mb-2">
                  Preferred Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#B38A58] pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E6DCD1] focus:border-[#5E1928] focus:bg-white rounded-xl pl-10 pr-4 py-3 text-sm text-[#23191B] focus:outline-none transition-colors [color-scheme:light]"
                  />
                </div>
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold text-[#544649] mb-2.5">
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
                          ? "bg-[#5E1928] text-white border-[#5E1928] font-medium shadow-sm"
                          : "bg-[#FDFBF7] text-[#4A3C3F] border-[#E6DCD1] hover:border-[#B38A58]"
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
              <label className="block text-xs font-semibold text-[#544649] mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#B38A58]" />
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
                          ? "bg-[#FBF3E8] text-[#23191B] border-[#B38A58] font-semibold"
                          : "bg-[#FDFBF7] text-[#5C4D50] border-[#E6DCD1] hover:border-[#B38A58]"
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
              <label className="block text-xs font-semibold text-[#544649] mb-2.5">
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
                          ? "bg-[#FAF0F2] text-[#5E1928] border-[#5E1928] font-semibold"
                          : "bg-[#FDFBF7] text-[#5C4D50] border-[#E6DCD1] hover:border-[#B38A58]"
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
              <label className="block text-xs font-semibold text-[#544649] mb-2">
                Special Requirement{" "}
                <span className="font-normal text-[#9A8A8D]">(Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need guest rooms for relatives, daytime Haldi, veg catering..."
                maxLength={140}
                className="w-full bg-[#FDFBF7] border border-[#E6DCD1] focus:border-[#5E1928] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#23191B] placeholder:text-[#A5979A] focus:outline-none transition-colors"
              />
            </div>

            {/* Pre-Filled Summary */}
            <div className="rounded-2xl bg-[#FAF4F5] border border-[#5E1928]/15 px-4 py-3.5 text-xs text-[#5C4D50]">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#5E1928]">
                Ready to Send to {PREM_VENUE.phoneDisplay}
              </div>
              <div className="mt-1 text-[#3A2D30]">
                <strong className="text-[#23191B]">{eventType}</strong> •{" "}
                {formattedDatePreview} • {guestCount}
              </div>
            </div>

            {/* Submit */}
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