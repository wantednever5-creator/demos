// src/app/gurukripa-dental/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Baby,
  Calendar,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  ExternalLink,
  HeartHandshake,
  Lock,
  MapPin,
  Maximize2,
  Navigation,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import {
  CLINIC_FAQS,
  CLINIC_GALLERY,
  DENTAL_CLINIC,
  DENTAL_MEDIA,
  HOSPITAL_REVIEWS,
  HOSPITAL_ROI_POINTS,
  SYMPTOM_MATCHER,
  applyDentalFallback,
} from "@/lib/gurukripaData";

const SPECIALTY_CARDS = [
  {
    title: "Cosmetic Dentistry",
    tag: "Smile Design & Whitening",
    desc: "Porcelain veneers, composite bonding, and single-sitting laser whitening designed for natural facial harmony.",
    icon: Sparkles,
    categoryQuery: "Cosmetic Dentistry",
    image: DENTAL_MEDIA.cosmeticImage,
    accent: "bg-teal-50 text-[#0D9488] border-teal-100",
  },
  {
    title: "Emergency Dental Care",
    tag: "Priority Same-Day Relief",
    desc: "Immediate triage for severe toothaches, swelling, chipped teeth, and single-sitting rotary root canals.",
    icon: AlertCircle,
    categoryQuery: "Emergency Care",
    image: DENTAL_MEDIA.heroImage,
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    title: "Pediatric Care",
    tag: "Fear-Free Kids Dentistry",
    desc: "Gentle checkups, cavity-shield sealants, fluoride protection, and early jaw-growth monitoring.",
    icon: Baby,
    categoryQuery: "Pediatric Care",
    image: DENTAL_MEDIA.pediatricImage,
    accent: "bg-sky-50 text-[#0B4F6C] border-sky-100",
  },
  {
    title: "Sedation Dentistry",
    tag: "Zero-Anxiety Treatment",
    desc: "Calm, monitored conscious sedation for nervous patients—making root canals and implants completely stress-free.",
    icon: HeartHandshake,
    categoryQuery: "Sedation & Pain-Free",
    image: DENTAL_MEDIA.clinicInterior,
    accent: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
] as const;

export default function GurukripaHomePage() {
  const [selectedSymptomId, setSelectedSymptomId] = useState(
    SYMPTOM_MATCHER[0].id
  );
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const activeSymptom =
    SYMPTOM_MATCHER.find((s) => s.id === selectedSymptomId) ||
    SYMPTOM_MATCHER[0];

  const activeLightbox =
    lightboxIdx !== null ? CLINIC_GALLERY[lightboxIdx] : null;

  const prevPhoto = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx(
      (lightboxIdx - 1 + CLINIC_GALLERY.length) % CLINIC_GALLERY.length
    );
  };

  const nextPhoto = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % CLINIC_GALLERY.length);
  };

  return (
    <div className="bg-[#F6FAFC] text-[#0B2535]">
      {/* ================================================================ */}
      {/* 1. CLEAN EDITORIAL HOSPITAL HERO                                 */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F6FAFC] to-[#F6FAFC] pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="pointer-events-none absolute -top-28 right-0 w-[520px] h-[520px] rounded-full bg-teal-200/20 blur-3xl" />
        <div className="pointer-events-none absolute top-44 -left-24 w-[420px] h-[420px] rounded-full bg-sky-200/25 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={DENTAL_CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-[#0B2535] hover:border-[#0D9488] transition-colors"
                >
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {DENTAL_CLINIC.rating}
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({DENTAL_CLINIC.reviewCount} Verified Google Reviews)
                  </span>
                </a>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F4F6] text-[#0B4F6C] text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                  Appointments Recommended
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight leading-[1.07] text-[#0B2535]">
                Gentle, Pain-Free Dental Care in{" "}
                <span className="font-serif italic font-normal text-[#0B4F6C]">
                  Haldwani.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                Cosmetic smile makeovers, same-day emergency relief, gentle
                pediatric dentistry, and monitored sedation care—right opposite
                Vishal Mega Mart in Bhotia Parao.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href="/gurukripa-dental/book"
                  className="px-7 py-3.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-[#0B4F6C]/20 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment Slot
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/gurukripa-dental/treatments"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-[#0B2535] text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  Treatments & EMI Plans
                </Link>
              </div>

              {/* Clean Trust Indicators */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2 bg-white/80 border border-slate-200/70 rounded-xl px-3 py-2">
                  <Car className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Free On-Site Parking</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 border border-slate-200/70 rounded-xl px-3 py-2">
                  <Smartphone className="w-4 h-4 text-[#0B4F6C] shrink-0" />
                  <span>GPay, NFC & EMI</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 border border-slate-200/70 rounded-xl px-3 py-2">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Sedation Comfort</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-[0_28px_70px_-20px_rgba(11,79,108,0.22)] bg-slate-100 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DENTAL_MEDIA.heroImage}
                  alt="Gurukripa Dental Hospital sterile operatory in Haldwani"
                  onError={(e) =>
                    applyDentalFallback(e, DENTAL_MEDIA.heroFallback)
                  }
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082E40]/65 via-transparent to-transparent" />

                {/* Floating Clinic Info Card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F4F6] text-[#0B4F6C] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B2535]">
                        Bhotia Parao, Bareilly–Nainital Rd
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Basement of Planet Fashion • Opp. Vishal Mega Mart
                      </div>
                    </div>
                  </div>
                  <a
                    href={DENTAL_CLINIC.telHref}
                    className="px-4 py-2 rounded-full bg-[#0D9488] hover:bg-[#0B7E74] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {DENTAL_CLINIC.phoneDisplay}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. EMERGENCY PRIORITY BANNER                                     */}
      {/* ================================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="rounded-3xl bg-white border border-rose-200/90 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_14px_40px_-18px_rgba(225,29,72,0.16)]"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Emergency Care
                </span>
                <span className="text-xs font-semibold text-rose-700">
                  Same-Day Priority Relief Available
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Sudden toothache, gum swelling, broken crown, or dental trauma?
                Reserve an urgent Emergency Bay token without waiting in line.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={DENTAL_CLINIC.telHref}
              className="px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <Link
              href="/gurukripa-dental/book?urgency=Emergency"
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              Book Urgent Slot
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 3. INTERACTIVE "WHAT BRINGS YOU IN?" SYMPTOM MATCHER             */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-22 bg-white border-y border-slate-200/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
              Interactive Care Finder
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535]">
              Not Sure What You Need? Tell Us How You Feel.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Tap a concern below for instant guidance, sitting duration, and a
              pre-filled appointment link.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Selectable Concern Cards */}
            <div className="lg:col-span-5 space-y-2.5">
              {SYMPTOM_MATCHER.map((item) => {
                const active = item.id === activeSymptom.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedSymptomId(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      active
                        ? "bg-[#EBF6F8] border-[#0B4F6C] shadow-xs"
                        : "bg-[#F8FBFD] border-slate-200/80 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-bold ${
                          active ? "text-[#0B4F6C]" : "text-[#0B2535]"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.urgency === "Emergency" && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.shortHint}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Smoothly Animated Recommendation Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSymptom.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="h-full rounded-3xl bg-gradient-to-br from-[#0B4F6C] to-[#09384D] text-white p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/12 text-teal-200 text-[11px] font-semibold">
                        Recommended Clinical Care
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-sky-100/85">
                        <Clock className="w-3.5 h-3.5 text-teal-300" />
                        {activeSymptom.sittingTime}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold leading-snug">
                      {activeSymptom.recommendedService}
                    </h3>

                    <p className="text-sm text-sky-100/85 leading-relaxed">
                      {activeSymptom.advice}
                    </p>

                    <div className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-xs text-teal-100 inline-flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0" />
                      <span>{activeSymptom.comfortNote}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/gurukripa-dental/book?service=${encodeURIComponent(
                        activeSymptom.recommendedService
                      )}&urgency=${activeSymptom.urgency}`}
                      className="px-6 py-3 rounded-full bg-white hover:bg-sky-50 text-[#0B4F6C] text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
                    >
                      Book This Appointment
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/gurukripa-dental/treatments"
                      className="px-5 py-3 rounded-full border border-white/25 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold transition-colors"
                    >
                      Check Cost & EMI
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. FOUR CORE SPECIALTIES WITH VISUAL PHOTO HEADERS               */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-[#F6FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
                Specialized On-Site Offerings
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535]">
                Complete Dental Care Under One Roof
              </h2>
            </div>

            <Link
              href="/gurukripa-dental/treatments"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#0B4F6C] text-xs sm:text-sm font-semibold text-[#0B4F6C] inline-flex items-center gap-1.5 shadow-xs transition-colors"
            >
              View All 8 Procedures & EMI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIALTY_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="group rounded-3xl bg-white border border-slate-200/80 hover:border-[#0D9488]/60 hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt={card.title}
                        onError={(e) =>
                          applyDentalFallback(e, DENTAL_MEDIA.heroFallback)
                        }
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <div
                        className={`absolute bottom-3 left-3 w-9 h-9 rounded-xl border bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xs ${card.accent}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#0D9488]">
                        {card.tag}
                      </div>
                      <h3 className="text-lg font-bold text-[#0B2535]">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <Link
                      href={`/gurukripa-dental/treatments?category=${encodeURIComponent(
                        card.categoryQuery
                      )}`}
                      className="pt-3.5 border-t border-slate-100 text-xs font-bold text-[#0B4F6C] hover:text-[#0D9488] flex items-center justify-between transition-colors"
                    >
                      <span>Explore Procedures</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. INSIDE THE HOSPITAL — PHOTO TOUR WITH LIGHTBOX                */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
                Inside the Hospital
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535]">
                Clean, Calm & Designed for Patient Comfort
              </h2>
              <p className="text-sm text-slate-600">
                Tap any photograph to inspect our care bays and hygiene
                standards up close.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLINIC_GALLERY.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 text-left cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.image}
                  alt={photo.title}
                  onError={(e) => applyDentalFallback(e, photo.fallback)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082E40]/85 via-[#082E40]/20 to-transparent" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-white/85 backdrop-blur-sm text-[#0B2535] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-3.5 left-4 right-4">
                  <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-teal-300">
                    {photo.tag}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
                    {photo.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIdx(null)}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIdx(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0B2535] shadow-md cursor-pointer"
                  aria-label="Close photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0B2535] shadow-md cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#0B2535] shadow-md cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="aspect-[16/10] bg-slate-950 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeLightbox.image}
                    alt={activeLightbox.title}
                    onError={(e) =>
                      applyDentalFallback(e, activeLightbox.fallback)
                    }
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="px-6 py-5 bg-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#0D9488]">
                      {activeLightbox.tag}
                    </div>
                    <div className="text-lg font-bold text-[#0B2535]">
                      {activeLightbox.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {activeLightbox.caption}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {(lightboxIdx ?? 0) + 1} / {CLINIC_GALLERY.length}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================================================ */}
      {/* 6. HOW THIS HELPS THE DOCTOR & HOSPITAL (CLEAN PORTAL LAUNCHER)  */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-[#F6FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F6C]/10 text-[#0B4F6C] text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                Built for Doctors & Front-Desk Speed
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535] leading-tight">
                A Complete Digital Front Desk — Not Just a Brochure.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Keep patients informed with their own clean care portal while
                your medical team runs chairs, emergency triage, and WhatsApp
                reminders from a private, PIN-protected dashboard.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/gurukripa-dental/portal"
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0B4F6C] shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#E6F4F6] text-[#0B4F6C] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B4F6C] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-sm font-bold text-[#0B2535] mt-3">
                    Patient Portal
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Live token status, care notes & aftercare
                  </div>
                </Link>

                <Link
                  href="/gurukripa-dental/admin"
                  className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[9px] font-extrabold uppercase">
                      Staff Only
                    </span>
                  </div>
                  <div className="text-sm font-bold text-amber-950 mt-3">
                    Doctor Command Center
                  </div>
                  <div className="text-[11px] text-amber-900/75 mt-0.5">
                    Chair queue, triage & slot blocker
                  </div>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOSPITAL_ROI_POINTS.map((point, idx) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-2.5 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6F4F6] text-[#0B4F6C] font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0B2535]">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {point.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. ANIMATED PATIENT FAQ ACCORDION                                */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-22 bg-white border-t border-slate-200/75">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
              Quick Patient Answers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535]">
              Before Your Visit
            </h2>
          </div>

          <div className="space-y-3">
            {CLINIC_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? "bg-[#F6FAFC] border-[#0B4F6C]/35"
                      : "bg-white border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B2535]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0B4F6C] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. REVIEWS, CONVENIENCES & EMBEDDED BHOTIA PARAO MAP             */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-[#F6FAFC] border-t border-slate-200/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
                Trusted Across Haldwani
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2535]">
                Rated {DENTAL_CLINIC.rating} ★ Across{" "}
                {DENTAL_CLINIC.reviewCount} Google Reviews
              </h2>
            </div>

            <a
              href={DENTAL_CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#0B4F6C] text-xs sm:text-sm font-semibold text-[#0B2535] inline-flex items-center gap-2 shadow-xs transition-colors"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Read all {DENTAL_CLINIC.reviewCount} reviews
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITAL_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-3xl bg-white border border-slate-200/80 p-6 flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-sm font-bold text-[#0B2535]">
                    {review.author}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {review.visitType} • Verified Patient
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location & Full-Color Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488] inline-flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Easy-to-Locate Clinic
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2535]">
                  Opposite Vishal Mega Mart, Bhotia Parao.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Basement of Planet Fashion on Bareilly–Nainital Road with free
                  on-site, lot, and street parking plus Google Pay & NFC
                  checkout.
                </p>

                <div className="space-y-2.5 pt-1 text-sm">
                  <div className="flex items-start gap-3 text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-1" />
                    <span>{DENTAL_CLINIC.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Clock className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>{DENTAL_CLINIC.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Navigation className="w-4 h-4 text-[#0D9488] shrink-0" />
                    <span>Plus Code: {DENTAL_CLINIC.plusCode}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0B2535]">
                    <Phone className="w-4 h-4 text-[#0B4F6C] shrink-0" />
                    <a
                      href={DENTAL_CLINIC.telHref}
                      className="hover:text-[#0D9488] transition-colors"
                    >
                      {DENTAL_CLINIC.phoneDisplay} ({DENTAL_CLINIC.phoneRaw})
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={DENTAL_CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/gurukripa-dental/book"
                  className="px-5 py-3 rounded-full bg-[#F6FAFC] border border-slate-200 hover:border-[#0B4F6C] text-[#0B2535] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#0D9488]" />
                  Book Appointment
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[340px] lg:min-h-[430px] bg-slate-100">
              <iframe
                title="Gurukripa Dental Hospital Haldwani Google Map"
                src={DENTAL_CLINIC.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[340px] lg:min-h-[430px] border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}