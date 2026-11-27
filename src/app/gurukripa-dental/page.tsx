// src/app/gurukripa-dental/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Baby,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  HeartHandshake,
  Lock,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  User,
} from "lucide-react";
import {
  DENTAL_CLINIC,
  DENTAL_MEDIA,
  HOSPITAL_REVIEWS,
  HOSPITAL_ROI_POINTS,
  applyDentalFallback,
} from "@/lib/gurukripaData";

const SPECIALTY_CARDS = [
  {
    title: "Cosmetic Dentistry",
    tag: "Smile Design & Whitening",
    desc: "Porcelain veneers, composite bonding, and single-sitting laser whitening designed for natural facial harmony.",
    icon: Sparkles,
    categoryQuery: "Cosmetic Dentistry",
    accent: "bg-teal-50 text-[#0D9488] border-teal-100",
  },
  {
    title: "Emergency Dental Care",
    tag: "Priority Same-Day Relief",
    desc: "Immediate triage for severe toothaches, swelling, knocked-out or chipped teeth, and single-sitting root canals.",
    icon: AlertCircle,
    categoryQuery: "Emergency Care",
    accent: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    title: "Pediatric Care",
    tag: "Fear-Free Kids Dentistry",
    desc: "Gentle child checkups, cavity-shield sealants, fluoride care, and early orthodontic growth monitoring.",
    icon: Baby,
    categoryQuery: "Pediatric Care",
    accent: "bg-sky-50 text-[#0B4F6C] border-sky-100",
  },
  {
    title: "Sedation Dentistry",
    tag: "Zero-Anxiety Treatment",
    desc: "Calm, monitored conscious sedation for patients with dental anxiety—making implants and root canals stress-free.",
    icon: HeartHandshake,
    categoryQuery: "Sedation & Pain-Free",
    accent: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
] as const;

export default function GurukripaHomePage() {
  return (
    <div className="bg-[#F4F9FB] text-[#0E2433]">
      {/* ================================================================ */}
      {/* HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F9FB] to-[#F4F9FB] pt-10 pb-16 sm:pt-14 sm:pb-24">
        {/* Soft Clinical Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-teal-200/25 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-24 w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              {/* Verified Rating & Landmark Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={DENTAL_CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-[#0E2433] hover:border-[#0D9488] transition-colors"
                >
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {DENTAL_CLINIC.rating}
                  </span>
                  <span className="text-slate-500 font-medium">
                    ({DENTAL_CLINIC.reviewCount} Google Reviews)
                  </span>
                </a>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F4F6] text-[#0B4F6C] text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                  Appointments Recommended
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight leading-[1.08] text-[#0E2433]">
                Modern, Gentle Dental Care in{" "}
                <span className="font-serif italic font-normal text-[#0B4F6C]">
                  Haldwani.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                From pain-free sedation dentistry and cosmetic smile makeovers
                to gentle pediatric care and same-day emergency relief—right
                opposite Vishal Mega Mart in Bhotia Parao.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link
                  href="/gurukripa-dental/book"
                  className="px-6 py-3.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-[#0B4F6C]/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment Slot
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/gurukripa-dental/treatments"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#0E2433] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  View Treatments & EMI
                </Link>
              </div>

              {/* Micro Convenience Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                  Free On-Site & Lot Parking
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                  Google Pay, NFC & EMI Plans
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                  On-Site Clinical Services
                </span>
              </div>
            </motion.div>

            {/* Right Clinical Visual Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white shadow-[0_30px_70px_-20px_rgba(11,79,108,0.22)] bg-slate-100 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DENTAL_MEDIA.heroImage}
                  alt="Gurukripa Dental Hospital clinical care room in Haldwani"
                  onError={(e) =>
                    applyDentalFallback(e, DENTAL_MEDIA.heroFallback)
                  }
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#093245]/60 via-transparent to-transparent" />

                {/* Floating Live Status Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F4F6] text-[#0B4F6C] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0E2433]">
                        Sterile, Pain-Free Care Protocols
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#0D9488]" />
                        {DENTAL_CLINIC.landmark}
                      </div>
                    </div>
                  </div>
                  <a
                    href={DENTAL_CLINIC.telHref}
                    className="px-3.5 py-2 rounded-full bg-[#0D9488] hover:bg-[#0B7E74] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
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
      {/* EMERGENCY DENTAL TRIAGE STRIP                                    */}
      {/* ================================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-rose-50 via-white to-sky-50 border border-rose-200/80 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Emergency Care
                </span>
                <span className="text-xs font-semibold text-rose-800">
                  Same-Day Urgent Slots Available
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Severe toothache, facial swelling, chipped tooth, or dislodged
                crown? Request a priority emergency triage slot immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={DENTAL_CLINIC.telHref}
              className="px-4 py-2.5 rounded-full bg-white border border-rose-200 hover:border-rose-400 text-rose-700 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call {DENTAL_CLINIC.phoneDisplay}
            </a>
            <Link
              href="/gurukripa-dental/book?urgency=Emergency"
              className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              Priority Emergency Slot
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 4 CORE CLINICAL SPECIALTIES                                      */}
      {/* ================================================================ */}
      <section className="py-14 sm:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
                Specialized On-Site Offerings
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E2433]">
                Comprehensive Care Under One Roof
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Every core service listed for Gurukripa Dental Hospital—backed
                by clear treatment explanations and flexible EMI options.
              </p>
            </div>

            <Link
              href="/gurukripa-dental/treatments"
              className="self-start md:self-auto px-5 py-2.5 rounded-full border border-slate-200 hover:border-[#0B4F6C] text-xs sm:text-sm font-semibold text-[#0B4F6C] inline-flex items-center gap-1.5 transition-colors"
            >
              Explore Full Menu & EMI Estimator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPECIALTY_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="rounded-3xl bg-[#F8FBFD] border border-slate-200/80 hover:border-[#0D9488]/60 hover:shadow-lg p-6 flex flex-col justify-between space-y-5 transition-all"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${card.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-[#0D9488]">
                        {card.tag}
                      </div>
                      <h3 className="text-lg font-bold text-[#0E2433] mt-1">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/gurukripa-dental/treatments?category=${encodeURIComponent(
                      card.categoryQuery
                    )}`}
                    className="pt-4 border-t border-slate-200/70 text-xs font-bold text-[#0B4F6C] hover:text-[#0D9488] inline-flex items-center gap-1.5 transition-colors"
                  >
                    See Procedures & Pricing
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW THIS SYSTEM HELPS THE DOCTOR & HOSPITAL (ROI SHOWCASE)       */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-[#F4F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Pitch Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B4F6C]/10 text-[#0B4F6C] text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                Built for Doctors & Clinic Growth
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E2433] leading-tight">
                More Than a Website. A Complete Front-Desk & Patient System.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                This multi-page hospital platform saves reception hours, flags
                emergency toothaches automatically, gives patients a private
                care portal, and equips doctors with a password-protected admin
                dashboard.
              </p>

              {/* Direct Portal Preview Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/gurukripa-dental/portal"
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0B4F6C] shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <User className="w-5 h-5 text-[#0D9488]" />
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B4F6C] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-sm font-bold text-[#0E2433] mt-3">
                    Patient Portal
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Login to view token, aftercare & EMI plan
                  </div>
                </Link>

                <Link
                  href="/gurukripa-dental/admin"
                  className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 hover:border-amber-500 shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <Lock className="w-5 h-5 text-amber-700" />
                    <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[9px] font-extrabold uppercase">
                      Admin Only
                    </span>
                  </div>
                  <div className="text-sm font-bold text-amber-950 mt-3">
                    Doctor Command Center
                  </div>
                  <div className="text-[11px] text-amber-900/75 mt-0.5">
                    Manage chairs, emergency alerts & slots
                  </div>
                </Link>
              </div>
            </div>

            {/* Right 4 ROI Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HOSPITAL_ROI_POINTS.map((point, idx) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-2.5 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6F4F6] text-[#0B4F6C] font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#0E2433]">
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
      {/* PAYMENTS, PARKING & 4.8★ GOOGLE REVIEWS + MAP                    */}
      {/* ================================================================ */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Verified Convenience Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#F4F9FB] border border-slate-200/80 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-[#0B4F6C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0E2433]">
                  Google Pay & NFC Tap-to-Pay
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Fast contactless mobile payments accepted at reception with
                  digital receipts.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4F9FB] border border-slate-200/80 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0E2433]">
                  Flexible Payment Plans
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Easy staged monthly installments for veneers, braces,
                  implants, and full-mouth care.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F4F9FB] border border-slate-200/80 p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-[#0B4F6C]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0E2433]">
                  Free Parking Lot & On-Site Space
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Free on-site parking lot plus street parking directly on
                  Bareilly–Nainital Road.
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488]">
                Trusted by Haldwani Families
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E2433]">
                Rated {DENTAL_CLINIC.rating} ★ Across{" "}
                {DENTAL_CLINIC.reviewCount} Google Reviews
              </h2>
            </div>

            <a
              href={DENTAL_CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto px-5 py-2.5 rounded-full bg-[#F4F9FB] border border-slate-200 hover:border-[#0B4F6C] text-xs sm:text-sm font-semibold text-[#0E2433] inline-flex items-center gap-2 transition-colors"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Read all {DENTAL_CLINIC.reviewCount} Google reviews
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITAL_REVIEWS.map((review) => (
              <div
                key={review.author}
                className="rounded-3xl bg-[#F8FBFD] border border-slate-200/80 p-6 flex flex-col justify-between space-y-5"
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

                <div className="pt-4 border-t border-slate-200/70">
                  <div className="text-sm font-bold text-[#0E2433]">
                    {review.author}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {review.visitType} • Verified Patient
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location & Embedded Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-200/80 bg-[#F8FBFD] overflow-hidden shadow-sm">
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#0D9488] inline-flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Easy-to-Locate Clinic
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0E2433]">
                  Opposite Vishal Mega Mart, Bhotia Parao.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Conveniently situated in the Basement of Planet Fashion on
                  Bareilly–Nainital Road with free on-site and street parking.
                </p>

                <div className="space-y-3 pt-1 text-sm">
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
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0E2433]">
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
                  className="px-5 py-3 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/gurukripa-dental/book"
                  className="px-5 py-3 rounded-full bg-white border border-slate-200 hover:border-[#0B4F6C] text-[#0E2433] text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
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