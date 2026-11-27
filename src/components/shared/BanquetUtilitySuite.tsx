// src/components/shared/BanquetUtilitySuite.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChefHat,
  Clock,
  Eye,
  LayoutDashboard,
  MessageCircle,
  Music,
  Phone,
  PhoneCall,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export interface UtilityVenueProps {
  id: "vatika" | "prem-bandhan";
  name: string;
  shortAddress: string;
  phoneDisplay: string;
  telHref: string;
  whatsappNumber: string;
  theme: "emerald" | "burgundy";
}

type ActiveMode = "catering" | "appointment" | "owner";

interface LeadEntry {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  menuTier: string;
  counters: string[];
  rooms: number;
  addOns: string[];
  status: "New Inquiry" | "Visit Scheduled" | "Confirmed";
  createdAt: string;
}

interface AppointmentEntry {
  id: string;
  name: string;
  phone: string;
  kind: "Site Visit" | "Manager Callback";
  date: string;
  slot: string;
  visitors: string;
  createdAt: string;
}

const MENU_TIERS = [
  {
    id: "Pure Veg Traditional",
    label: "Pure Veg Traditional",
    desc: "Kumaoni & North Indian feast, 2 starters, 4 mains, breads & desserts",
  },
  {
    id: "Royal Multi-Cuisine Veg",
    label: "Royal Multi-Cuisine Veg",
    desc: "North Indian + Chinese + Continental + elaborate salad & dessert spread",
  },
  {
    id: "Grand Veg & Non-Veg Gala",
    label: "Grand Veg & Non-Veg Gala",
    desc: "Separate veg/non-veg dining wings with royal tandoor & Mughlai mains",
  },
] as const;

const LIVE_COUNTERS = [
  "Live Chaat & Golgappa Counter",
  "Live Tandoor & Stuffed Naan",
  "Mocktail & Welcome Drink Bar",
  "Live Jalebi / Rabri / Mithai",
  "South Indian / Pasta Live Stall",
  "Morning Breakfast & High-Tea",
] as const;

const ADD_ON_SERVICES = [
  "Floral Mandap & Varmala Stage",
  "DJ, Sound & Sangeet Lighting",
  "Photography & Drone Entry",
  "Valet & Parking Assistance",
] as const;

const TIME_SLOTS = [
  { label: "Morning Slot", time: "11:00 AM – 1:00 PM", note: "Daytime lawn view" },
  { label: "Afternoon Slot", time: "2:30 PM – 5:00 PM", note: "Quiet walkthrough" },
  { label: "Evening Lighting Tour", time: "5:30 PM – 8:00 PM", note: "See night lights" },
] as const;

const THEME_TOKENS = {
  emerald: {
    sectionBg: "bg-[#FAF8F5]",
    cardBorder: "border-stone-200/80",
    accentText: "text-[#9A7B4F]",
    primaryBg: "bg-[#1C3B2E]",
    primaryHover: "hover:bg-[#152E24]",
    primaryText: "text-[#1C3B2E]",
    primaryBorder: "border-[#1C3B2E]",
    softTintBg: "bg-[#EDF5F0]",
    softTintBorder: "border-[#1C3B2E]/20",
    warmTintBg: "bg-[#F4EFE6]",
    warmBorder: "border-[#9A7B4F]",
    headingText: "text-[#1F1C18]",
    mutedText: "text-stone-600",
    inputBg: "bg-[#FAF8F5] border-stone-200 focus:border-[#1C3B2E]",
  },
  burgundy: {
    sectionBg: "bg-[#FDFBF7]",
    cardBorder: "border-[#EDE4DA]",
    accentText: "text-[#B38A58]",
    primaryBg: "bg-[#5E1928]",
    primaryHover: "hover:bg-[#49121F]",
    primaryText: "text-[#5E1928]",
    primaryBorder: "border-[#5E1928]",
    softTintBg: "bg-[#FAF0F2]",
    softTintBorder: "border-[#5E1928]/20",
    warmTintBg: "bg-[#FBF3E8]",
    warmBorder: "border-[#B38A58]",
    headingText: "text-[#23191B]",
    mutedText: "text-[#635357]",
    inputBg: "bg-[#FDFBF7] border-[#E6DCD1] focus:border-[#5E1928]",
  },
} as const;

function getUpcomingDates(count = 10): { iso: string; day: string; dateNum: string; month: string }[] {
  const result: { iso: string; day: string; dateNum: string; month: string }[] = [];
  const base = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i * 2);
    const iso = d.toISOString().split("T")[0];
    result.push({
      iso,
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dateNum: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return result;
}

function formatReadableDate(iso: string): string {
  if (!iso) return "Flexible / To be finalized";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BanquetUtilitySuite({
  venue,
}: {
  venue: UtilityVenueProps;
}) {
  const t = THEME_TOKENS[venue.theme];
  const storageKey = `tapecut_banquet_demo_${venue.id}_v1`;
  const upcomingDates = useMemo(() => getUpcomingDates(10), []);

  const defaultLeads = useMemo<LeadEntry[]>(
    () => [
      {
        id: "LD-402",
        name: "Suresh Chandra Joshi",
        phone: "98371 44210",
        eventType: "Wedding & Reception",
        eventDate: upcomingDates[1]?.iso || "2026-12-08",
        guests: 650,
        menuTier: "Royal Multi-Cuisine Veg",
        counters: ["Live Chaat & Golgappa Counter", "Live Tandoor & Stuffed Naan", "Live Jalebi / Rabri / Mithai"],
        rooms: 8,
        addOns: ["Floral Mandap & Varmala Stage", "DJ, Sound & Sangeet Lighting"],
        status: "Visit Scheduled",
        createdAt: "2 hrs ago",
      },
      {
        id: "LD-401",
        name: "Meenakshi Bisht",
        phone: "94111 89204",
        eventType: "Engagement / Ring Ceremony",
        eventDate: upcomingDates[4]?.iso || "2026-12-14",
        guests: 300,
        menuTier: "Pure Veg Traditional",
        counters: ["Mocktail & Welcome Drink Bar", "Live Chaat & Golgappa Counter"],
        rooms: 4,
        addOns: ["Floral Mandap & Varmala Stage"],
        status: "New Inquiry",
        createdAt: "Yesterday",
      },
    ],
    [upcomingDates]
  );

  const defaultAppointments = useMemo<AppointmentEntry[]>(
    () => [
      {
        id: "AP-108",
        name: "Suresh Chandra Joshi",
        phone: "98371 44210",
        kind: "Site Visit",
        date: upcomingDates[0]?.iso || "2026-12-02",
        slot: "5:30 PM – 8:00 PM (Evening Lighting Tour)",
        visitors: "4 Family Members",
        createdAt: "Booked today",
      },
      {
        id: "AP-107",
        name: "Vikas Pandey (Kumaon Motors)",
        phone: "97562 33018",
        kind: "Manager Callback",
        date: upcomingDates[0]?.iso || "2026-12-02",
        slot: "11:00 AM – 1:00 PM (Morning Slot)",
        visitors: "Corporate Inquiry",
        createdAt: "Booked yesterday",
      },
    ],
    [upcomingDates]
  );

  const [activeMode, setActiveMode] = useState<ActiveMode>("catering");
  const [leads, setLeads] = useState<LeadEntry[]>(defaultLeads);
  const [appointments, setAppointments] =
    useState<AppointmentEntry[]>(defaultAppointments);
  const [bookedDates, setBookedDates] = useState<string[]>(() =>
    [upcomingDates[2]?.iso, upcomingDates[6]?.iso].filter(Boolean)
  );

  // Hydrate demo state from localStorage so owner tests persist across refresh
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.leads)) setLeads(parsed.leads);
      if (Array.isArray(parsed.appointments)) setAppointments(parsed.appointments);
      if (Array.isArray(parsed.bookedDates)) setBookedDates(parsed.bookedDates);
    } catch {
      // ignore corrupted storage
    }
  }, [storageKey]);

  const persistDemoState = (
    nextLeads: LeadEntry[],
    nextApps: AppointmentEntry[],
    nextBooked: string[]
  ) => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          leads: nextLeads,
          appointments: nextApps,
          bookedDates: nextBooked,
        })
      );
    } catch {
      // ignore storage quota errors
    }
  };

  // --- Catering & Requirement Builder Form State ---
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState(upcomingDates[0]?.iso || "");
  const [eventType, setEventType] = useState("Wedding & Reception");
  const [guestCount, setGuestCount] = useState(450);
  const [menuTier, setMenuTier] = useState<string>(MENU_TIERS[1].id);
  const [selectedCounters, setSelectedCounters] = useState<string[]>([
    LIVE_COUNTERS[0],
    LIVE_COUNTERS[1],
  ]);
  const [roomCount, setRoomCount] = useState(6);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    ADD_ON_SERVICES[0],
  ]);
  const [cateringSavedNotice, setCateringSavedNotice] = useState<string | null>(
    null
  );

  // --- Appointment Scheduler State ---
  const [appKind, setAppKind] = useState<"Site Visit" | "Manager Callback">(
    "Site Visit"
  );
  const [appName, setAppName] = useState("");
  const [appPhone, setAppPhone] = useState("");
  const [appDate, setAppDate] = useState(upcomingDates[0]?.iso || "");
  const [appSlot, setAppSlot] = useState<string>(
    `${TIME_SLOTS[2].time} (${TIME_SLOTS[2].label})`
  );
  const [appVisitors, setAppVisitors] = useState("2–4 Family Members");
  const [confirmedPass, setConfirmedPass] = useState<AppointmentEntry | null>(
    null
  );

  const toggleItem = (
    list: string[],
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const isSelectedEventDateBooked = Boolean(
    eventDate && bookedDates.includes(eventDate)
  );

  const handleBuildRequirement = (e: React.FormEvent, openWhatsApp: boolean) => {
    e.preventDefault();
    const cleanName = clientName.trim() || "Family Guest";
    const cleanPhone = clientPhone.trim() || "Shared on WhatsApp";

    const newLead: LeadEntry = {
      id: `LD-${Math.floor(410 + Math.random() * 500)}`,
      name: cleanName,
      phone: cleanPhone,
      eventType,
      eventDate: eventDate || "Flexible",
      guests: guestCount,
      menuTier,
      counters: selectedCounters,
      rooms: roomCount,
      addOns: selectedAddOns,
      status: "New Inquiry",
      createdAt: "Just now",
    };

    const nextLeads = [newLead, ...leads];
    setLeads(nextLeads);
    persistDemoState(nextLeads, appointments, bookedDates);
    setCateringSavedNotice(
      `Saved as ${newLead.id} in Owner Panel! Switch to "Owner Dashboard Preview" to see how management receives this.`
    );

    if (openWhatsApp) {
      const msg = [
        `Namaste ${venue.name} team,`,
        ``,
        `Here is my complete Event & Food Requirement Sheet:`,
        `• Name: ${cleanName}`,
        `• Contact: ${cleanPhone}`,
        `• Occasion: ${eventType}`,
        `• Preferred Date: ${formatReadableDate(eventDate)}`,
        `• Guest Count: ~${guestCount} Guests`,
        `• Catering Style: ${menuTier}`,
        `• Live Food Counters: ${
          selectedCounters.length ? selectedCounters.join(", ") : "Standard buffet"
        }`,
        `• AC Guest Rooms Needed: ${roomCount}`,
        `• Decor & Services: ${
          selectedAddOns.length ? selectedAddOns.join(", ") : "Venue only"
        }`,
        ``,
        `Please share your best direct package & availability.`,
      ].join("\n");

      window.open(
        `https://wa.me/${venue.whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = appName.trim() || "Family Visitor";
    const cleanPhone = appPhone.trim() || "Shared on WhatsApp";

    const newApp: AppointmentEntry = {
      id: `AP-${Math.floor(110 + Math.random() * 800)}`,
      name: cleanName,
      phone: cleanPhone,
      kind: appKind,
      date: appDate || upcomingDates[0]?.iso || "Upcoming",
      slot: appSlot,
      visitors: appKind === "Site Visit" ? appVisitors : "Phone Callback",
      createdAt: "Just now",
    };

    const nextApps = [newApp, ...appointments];
    setAppointments(nextApps);
    persistDemoState(leads, nextApps, bookedDates);
    setConfirmedPass(newApp);
  };

  const sendAppointmentToWhatsApp = (pass: AppointmentEntry) => {
    const msg = [
      `Namaste ${venue.name} team,`,
      ``,
      `I have scheduled a *${pass.kind}* (Ref: ${pass.id}):`,
      `• Name: ${pass.name}`,
      `• Phone: ${pass.phone}`,
      `• Date: ${formatReadableDate(pass.date)}`,
      `• Time Slot: ${pass.slot}`,
      `• Details: ${pass.visitors}`,
      ``,
      `Please confirm this slot.`,
    ].join("\n");

    window.open(
      `https://wa.me/${venue.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const toggleDateBlocked = (iso: string) => {
    const nextBooked = bookedDates.includes(iso)
      ? bookedDates.filter((d) => d !== iso)
      : [...bookedDates, iso];
    setBookedDates(nextBooked);
    persistDemoState(leads, appointments, nextBooked);
  };

  const cycleLeadStatus = (id: string) => {
    const order: LeadEntry["status"][] = [
      "New Inquiry",
      "Visit Scheduled",
      "Confirmed",
    ];
    const nextLeads = leads.map((l) => {
      if (l.id !== id) return l;
      const nextIdx = (order.indexOf(l.status) + 1) % order.length;
      return { ...l, status: order[nextIdx] };
    });
    setLeads(nextLeads);
    persistDemoState(nextLeads, appointments, bookedDates);
  };

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <section
      id="planner"
      className={`py-20 sm:py-28 ${t.sectionBg} border-t border-stone-200/60`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading + Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div
              className={`text-xs uppercase tracking-[0.2em] font-semibold ${t.accentText}`}
            >
              Smart Planning & Venue Management Suite
            </div>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-medium ${t.headingText} leading-tight`}
            >
              Custom Menu, Site Visits & Owner Control — All in One Place.
            </h2>
            <p className={`text-sm sm:text-base ${t.mutedText} leading-relaxed`}>
              Families can customize their catering menu or book a walkthrough
              in seconds, while management receives organized requirements and
              controls open wedding dates without messy notebooks.
            </p>
          </div>

          {/* 3-Mode Pill Switcher */}
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-full bg-white border border-stone-200/90 shadow-sm self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveMode("catering")}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === "catering"
                  ? `${t.primaryBg} text-white shadow-sm`
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Food & Event Builder
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("appointment")}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === "appointment"
                  ? `${t.primaryBg} text-white shadow-sm`
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Book Visit / Call
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("owner")}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === "owner"
                  ? `${t.primaryBg} text-white shadow-sm`
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Owner Panel
              <span
                className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeMode === "owner"
                    ? "bg-white/20 text-white"
                    : `${t.softTintBg} ${t.primaryText}`
                }`}
              >
                {leads.length + appointments.length}
              </span>
            </button>
          </div>
        </div>

        {/* ================================================================ */}
        {/* TAB 1: CATERING, FOOD COUNTERS & EVENT REQUIREMENT BUILDER       */}
        {/* ================================================================ */}
        {activeMode === "catering" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => handleBuildRequirement(e, true)}
              className={`lg:col-span-8 rounded-3xl bg-white border ${t.cardBorder} p-6 sm:p-8 space-y-6 shadow-[0_24px_60px_-20px_rgba(31,28,24,0.08)]`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
                <div>
                  <h3 className={`font-serif text-2xl sm:text-3xl font-medium ${t.headingText}`}>
                    Customize Catering, Rooms & Decor
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Build your exact wedding requirement sheet before speaking with management
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full ${t.softTintBg} ${t.primaryText} text-xs font-semibold inline-flex items-center gap-1.5`}>
                  <ChefHat className="w-3.5 h-3.5" /> Catering Ready
                </span>
              </div>

              {/* Guest Contact & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rajesh Pant"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none transition-colors ${t.inputBg}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 98370 XXXXX"
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none transition-colors ${t.inputBg}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Event Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={`w-full border rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none transition-colors [color-scheme:light] ${t.inputBg}`}
                  />
                </div>
              </div>

              {isSelectedEventDateBooked && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-900 flex items-center justify-between gap-3">
                  <span>
                    <strong>Note:</strong> {formatReadableDate(eventDate)} is currently
                    marked <strong>Booked</strong> on the venue calendar. You can
                    still inquire for daytime slots or pick a nearby date.
                  </span>
                </div>
              )}

              {/* Guest Count Slider + AC Rooms Counter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/70">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-600 inline-flex items-center gap-1.5">
                      <Users className={`w-4 h-4 ${t.primaryText}`} />
                      Expected Guests
                    </span>
                    <span className={`font-serif text-2xl font-semibold ${t.headingText}`}>
                      {guestCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1200}
                    step={50}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-[#1C3B2E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400">
                    <span>100</span>
                    <span>500</span>
                    <span>1,200+</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-600 inline-flex items-center gap-1.5">
                      <BedDouble className={`w-4 h-4 ${t.primaryText}`} />
                      AC Family Rooms Needed
                    </span>
                    <span className={`font-serif text-2xl font-semibold ${t.headingText}`}>
                      {roomCount} Rooms
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    step={1}
                    value={roomCount}
                    onChange={(e) => setRoomCount(Number(e.target.value))}
                    className="w-full accent-[#1C3B2E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400">
                    <span>None</span>
                    <span>6 Rooms</span>
                    <span>12 Rooms</span>
                  </div>
                </div>
              </div>

              {/* Catering & Food Tier */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-stone-600">
                  Catering & Food Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {MENU_TIERS.map((tier) => {
                    const active = menuTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setMenuTier(tier.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? `${t.softTintBg} ${t.primaryBorder} shadow-sm`
                            : "bg-white border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <div className={`text-xs font-bold ${active ? t.primaryText : t.headingText}`}>
                          {tier.label}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                          {tier.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Food Counters */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-stone-600">
                  Live Food Counters & Add-On Stalls
                </label>
                <div className="flex flex-wrap gap-2">
                  {LIVE_COUNTERS.map((counter) => {
                    const active = selectedCounters.includes(counter);
                    return (
                      <button
                        key={counter}
                        type="button"
                        onClick={() =>
                          toggleItem(selectedCounters, counter, setSelectedCounters)
                        }
                        className={`px-3.5 py-2 rounded-full text-xs font-medium border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? `${t.primaryBg} text-white ${t.primaryBorder}`
                            : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                        {counter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Decor, DJ & Logistics */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-stone-600 inline-flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-stone-400" />
                  Decor, Sound & Event Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ON_SERVICES.map((service) => {
                    const active = selectedAddOns.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() =>
                          toggleItem(selectedAddOns, service, setSelectedAddOns)
                        }
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? `${t.warmTintBg} ${t.warmBorder} ${t.headingText} font-semibold`
                            : "bg-[#FAF8F5] text-stone-600 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <span>{service}</span>
                        {active && <CheckCircle2 className={`w-4 h-4 ${t.primaryText}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {cateringSavedNotice && (
                <div className={`rounded-2xl ${t.softTintBg} border ${t.softTintBorder} px-4 py-3 text-xs ${t.primaryText} flex flex-wrap items-center justify-between gap-2`}>
                  <span>{cateringSavedNotice}</span>
                  <button
                    type="button"
                    onClick={() => setActiveMode("owner")}
                    className="underline font-bold cursor-pointer"
                  >
                    Open Owner Panel →
                  </button>
                </div>
              )}

              {/* Dual Submit Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#1C7C46] hover:bg-[#166639] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Menu & Details on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={(e) => handleBuildRequirement(e, false)}
                  className={`py-3.5 px-5 rounded-full border border-stone-300 hover:border-stone-500 ${t.headingText} text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors`}
                >
                  <Eye className="w-4 h-4" />
                  Save to Owner Panel Demo
                </button>
              </div>
            </form>

            {/* Live Requirement Sheet Preview (Right Column) */}
            <div className="lg:col-span-4 space-y-5">
              <div className={`rounded-3xl bg-white border ${t.cardBorder} p-6 space-y-5 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] uppercase tracking-[0.18em] font-semibold ${t.accentText}`}>
                    Live Event Brief
                  </span>
                  <span className="text-[11px] text-stone-400">Auto-formatted</span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Occasion</span>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className={`font-semibold text-right bg-transparent focus:outline-none cursor-pointer ${t.headingText}`}
                    >
                      <option>Wedding & Reception</option>
                      <option>Engagement / Sangeet</option>
                      <option>Corporate Meet</option>
                      <option>Anniversary / Birthday</option>
                    </select>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Date</span>
                    <span className={`font-semibold ${t.headingText}`}>
                      {formatReadableDate(eventDate)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Headcount</span>
                    <span className={`font-semibold ${t.headingText}`}>
                      ~{guestCount} Guests
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Menu Tier</span>
                    <span className={`font-semibold text-right ${t.primaryText}`}>
                      {menuTier}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">AC Rooms</span>
                    <span className={`font-semibold ${t.headingText}`}>
                      {roomCount} Rooms
                    </span>
                  </div>
                  <div className="pt-1">
                    <div className="text-xs text-stone-500 mb-2">
                      Selected Counters ({selectedCounters.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCounters.length > 0 ? (
                        selectedCounters.map((c) => (
                          <span
                            key={c}
                            className={`px-2.5 py-1 rounded-full text-[11px] ${t.softTintBg} ${t.primaryText} font-medium`}
                          >
                            {c.replace(" Counter", "").replace("Live ", "")}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-stone-400">Standard Buffet</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl ${t.primaryBg} text-white p-6 space-y-3`}>
                <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#F2D5AB] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Why Venue Owners Love This
                </div>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Instead of answering 30 vague calls asking “rate kya
                  hai?”, management receives exact headcount, veg/non-veg
                  menu choices, room count, and contact details upfront—ready
                  to quote immediately.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveMode("owner")}
                  className="pt-1 text-xs font-semibold text-[#F4D5A3] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  See Owner Dashboard Preview
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: SITE VISIT & MANAGER CALLBACK APPOINTMENT SCHEDULER       */}
        {/* ================================================================ */}
        {activeMode === "appointment" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleBookAppointment}
              className={`lg:col-span-7 rounded-3xl bg-white border ${t.cardBorder} p-6 sm:p-8 space-y-6 shadow-[0_24px_60px_-20px_rgba(31,28,24,0.08)]`}
            >
              <div className="space-y-1 pb-4 border-b border-stone-100">
                <h3 className={`font-serif text-2xl sm:text-3xl font-medium ${t.headingText}`}>
                  Schedule a Venue Walkthrough or Callback
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Lock in a dedicated time slot so the venue manager is ready for your family
                </p>
              </div>

              {/* Site Visit vs Callback Toggle */}
              <div className="grid grid-cols-2 gap-3">
                {(["Site Visit", "Manager Callback"] as const).map((kind) => {
                  const active = appKind === kind;
                  return (
                    <button
                      key={kind}
                      type="button"
                      onClick={() => setAppKind(kind)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        active
                          ? `${t.softTintBg} ${t.primaryBorder} shadow-sm`
                          : "bg-[#FAF8F5] border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      {kind === "Site Visit" ? (
                        <CalendarCheck className={`w-5 h-5 ${active ? t.primaryText : "text-stone-400"}`} />
                      ) : (
                        <PhoneCall className={`w-5 h-5 ${active ? t.primaryText : "text-stone-400"}`} />
                      )}
                      <div>
                        <div className={`text-xs sm:text-sm font-bold ${active ? t.primaryText : t.headingText}`}>
                          {kind === "Site Visit"
                            ? "Physical Venue Visit"
                            : "Request Manager Call"}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {kind === "Site Visit"
                            ? "Tour lawn, hall & rooms"
                            : "10-min rate & date call"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="e.g. Deepak Rawat"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none ${t.inputBg}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={appPhone}
                    onChange={(e) => setAppPhone(e.target.value)}
                    placeholder="e.g. 94120 XXXXX"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none ${t.inputBg}`}
                  />
                </div>
              </div>

              {/* Date & Visitor Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={appDate}
                    onChange={(e) => setAppDate(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none [color-scheme:light] ${t.inputBg}`}
                  />
                </div>

                {appKind === "Site Visit" && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                      People Visiting
                    </label>
                    <select
                      value={appVisitors}
                      onChange={(e) => setAppVisitors(e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none cursor-pointer ${t.inputBg}`}
                    >
                      <option>2–4 Family Members</option>
                      <option>5–8 Family Members</option>
                      <option>Bride & Groom Parents</option>
                      <option>Event Planner / Corporate Team</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Time Slot Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-600 inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Select Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const value = `${slot.time} (${slot.label})`;
                    const active = appSlot === value;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        onClick={() => setAppSlot(value)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? `${t.primaryBg} text-white ${t.primaryBorder}`
                            : "bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold">{slot.label}</div>
                        <div className={`text-[11px] mt-0.5 ${active ? "text-white/90" : "text-stone-600"}`}>
                          {slot.time}
                        </div>
                        <div className={`text-[10px] mt-1 ${active ? "text-[#F4D5A3]" : "text-stone-400"}`}>
                          {slot.note}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-full ${t.primaryBg} ${t.primaryHover} text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md`}
              >
                <CalendarCheck className="w-4 h-4" />
                Confirm {appKind} Slot
              </button>
            </form>

            {/* Right Column: Instant Confirmation Pass OR Info */}
            <div className="lg:col-span-5 space-y-5">
              {confirmedPass ? (
                <div className={`rounded-3xl bg-white border-2 ${t.primaryBorder} p-6 sm:p-7 space-y-5 shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full ${t.softTintBg} ${t.primaryText} text-xs font-bold inline-flex items-center gap-1.5`}>
                      <CheckCircle2 className="w-4 h-4" /> Slot Reserved
                    </span>
                    <span className="text-xs font-mono font-semibold text-stone-400">
                      #{confirmedPass.id}
                    </span>
                  </div>

                  <div>
                    <h4 className={`font-serif text-2xl font-semibold ${t.headingText}`}>
                      {confirmedPass.kind} Pass
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Added automatically to the Venue Owner Panel
                    </p>
                  </div>

                  <div className="space-y-2.5 text-sm bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200/70">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Guest</span>
                      <span className={`font-semibold ${t.headingText}`}>{confirmedPass.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Phone</span>
                      <span className={`font-semibold ${t.headingText}`}>{confirmedPass.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Date</span>
                      <span className={`font-semibold ${t.headingText}`}>{formatReadableDate(confirmedPass.date)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-stone-500">Slot</span>
                      <span className={`font-semibold text-right ${t.primaryText}`}>{confirmedPass.slot}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => sendAppointmentToWhatsApp(confirmedPass)}
                      className="w-full py-3.5 rounded-full bg-[#1C7C46] hover:bg-[#166639] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send Pass to Venue WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMode("owner")}
                      className="w-full py-3 rounded-full border border-stone-300 hover:border-stone-500 text-xs font-semibold text-stone-700 cursor-pointer transition-colors"
                    >
                      View This Booking in Owner Panel →
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`rounded-3xl bg-white border ${t.cardBorder} p-6 sm:p-7 space-y-5 shadow-sm`}>
                  <div className={`text-xs uppercase tracking-[0.18em] font-semibold ${t.accentText}`}>
                    Organized Appointments
                  </div>
                  <h4 className={`font-serif text-2xl sm:text-3xl font-medium ${t.headingText}`}>
                    Never Miss a Serious Family Visit.
                  </h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Evening lighting tours convert more wedding bookings than
                    plain daytime walk-ins. Families pick an exact slot, get a
                    digital visit pass with {venue.name}'s address, and
                    your staff knows who is arriving beforehand.
                  </p>
                  <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 space-y-1.5">
                    <div className="font-semibold text-stone-700">{venue.name}</div>
                    <div>{venue.shortAddress}</div>
                    <div className="font-semibold text-stone-800">{venue.phoneDisplay}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: LIVE OWNER COMMAND PANEL (INTERACTIVE DEMO CLOSER)        */}
        {/* ================================================================ */}
        {activeMode === "owner" && (
          <div className="space-y-6">
            {/* Demo Banner Explaining What the Owner Gets */}
            <div className={`rounded-2xl ${t.primaryBg} text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
              <div className="flex items-start sm:items-center gap-3">
                <LayoutDashboard className="w-5 h-5 text-[#F4D5A3] shrink-0 mt-0.5 sm:mt-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-white">Owner Management Preview:</strong>{" "}
                  <span className="text-white/85">
                    Every catering inquiry & site visit submitted on your website lands
                    here automatically. Tap any date below to block/unblock availability live.
                  </span>
                </div>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold text-[#F4D5A3]">
                Live Interactive Demo
              </span>
            </div>

            {/* Owner Quick KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Active Inquiries", value: String(leads.length), sub: "With menu & headcount" },
                { label: "Scheduled Visits / Calls", value: String(appointments.length), sub: "Upcoming slots" },
                { label: "Blocked Wedding Dates", value: String(bookedDates.length), sub: "Tap dates to toggle" },
                { label: "Commission Saved", value: "100%", sub: "Direct family leads" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl bg-white border ${t.cardBorder} p-5 shadow-sm`}
                >
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                    {stat.label}
                  </div>
                  <div className={`font-serif text-3xl font-semibold ${t.headingText} mt-1`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${t.accentText} mt-0.5`}>{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Interactive Date Availability Manager */}
            <div className={`rounded-3xl bg-white border ${t.cardBorder} p-6 space-y-4 shadow-sm`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className={`font-serif text-2xl font-medium ${t.headingText}`}>
                    1-Tap Wedding Date Availability Control
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tap any date to mark it <strong>Booked</strong> or <strong>Available</strong> — updates the guest planner instantly
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Available
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-rose-700 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Booked
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                {upcomingDates.map((d) => {
                  const isBooked = bookedDates.includes(d.iso);
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => toggleDateBlocked(d.iso)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isBooked
                          ? "bg-rose-50 border-rose-300 text-rose-900"
                          : "bg-emerald-50/70 border-emerald-200 hover:border-emerald-400 text-emerald-950"
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider opacity-70">
                        {d.day}
                      </div>
                      <div className="font-serif text-2xl font-bold leading-tight">
                        {d.dateNum}
                      </div>
                      <div className="text-[10px] font-medium">{d.month}</div>
                      <div
                        className={`mt-1.5 text-[10px] font-bold uppercase ${
                          isBooked ? "text-rose-700" : "text-emerald-700"
                        }`}
                      >
                        {isBooked ? "Booked" : "Open"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Incoming Leads + Scheduled Appointments Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Incoming Leads with Full Catering Specs */}
              <div className={`lg:col-span-7 rounded-3xl bg-white border ${t.cardBorder} p-6 space-y-4 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-serif text-2xl font-medium ${t.headingText}`}>
                    Incoming Inquiries & Food Sheets
                  </h3>
                  <span className="text-xs text-stone-400">
                    Tap status pill to update
                  </span>
                </div>

                <div className="space-y-3.5">
                  {leads.map((lead) => (
                    <div
                      key={lead.id}
                      className="rounded-2xl bg-[#FAF8F5] border border-stone-200/80 p-4 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${t.headingText}`}>
                              {lead.name}
                            </span>
                            <span className="text-[11px] font-mono text-stone-400">
                              {lead.id}
                            </span>
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">
                            {lead.eventType} • <strong>{formatReadableDate(lead.eventDate)}</strong> •{" "}
                            <strong>{lead.guests} Guests</strong> • {lead.rooms} Rooms
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => cycleLeadStatus(lead.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                            lead.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : lead.status === "Visit Scheduled"
                              ? "bg-amber-100 text-amber-900"
                              : `${t.softTintBg} ${t.primaryText}`
                          }`}
                          title="Click to cycle lead status"
                        >
                          {lead.status}
                        </button>
                      </div>

                      <div className="text-xs text-stone-600 space-y-1">
                        <div>
                          <span className="font-semibold text-stone-700">Food:</span>{" "}
                          {lead.menuTier}
                          {lead.counters.length > 0 &&
                            ` (+ ${lead.counters.length} live counters)`}
                        </div>
                        {lead.addOns.length > 0 && (
                          <div>
                            <span className="font-semibold text-stone-700">Services:</span>{" "}
                            {lead.addOns.join(", ")}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-stone-500">
                          {lead.phone} • {lead.createdAt}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                            className="px-3 py-1.5 rounded-full bg-white border border-stone-300 hover:border-stone-500 text-stone-800 font-semibold inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" /> Call
                          </a>
                          <a
                            href={`https://wa.me/91${lead.phone.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
                              `Namaste ${lead.name} ji, thank you for inquiring with ${venue.name} for ${formatReadableDate(
                                lead.eventDate
                              )} (${lead.guests} guests). Let's connect to share our best package.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-full bg-[#1C7C46] hover:bg-[#166639] text-white font-semibold inline-flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" /> Reply
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheduled Site Visits & Callback Queue */}
              <div className={`lg:col-span-5 rounded-3xl bg-white border ${t.cardBorder} p-6 space-y-4 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-serif text-2xl font-medium ${t.headingText}`}>
                    Scheduled Visits & Calls
                  </h3>
                  <Calendar className={`w-4 h-4 ${t.accentText}`} />
                </div>

                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-2xl bg-[#FAF8F5] border border-stone-200/80 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            app.kind === "Site Visit"
                              ? `${t.softTintBg} ${t.primaryText}`
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {app.kind}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {app.createdAt}
                        </span>
                      </div>
                      <div className={`text-sm font-bold ${t.headingText}`}>
                        {app.name}
                      </div>
                      <div className="text-xs text-stone-600">
                        {formatReadableDate(app.date)} • {app.slot}
                      </div>
                      <div className="text-xs text-stone-500 flex items-center justify-between pt-1">
                        <span>{app.visitors}</span>
                        <span className="font-semibold text-stone-700">{app.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}