// src/components/gurukripa/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Car,
  CreditCard,
  ExternalLink,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { DENTAL_CLINIC } from "@/lib/gurukripaData";

export default function Footer() {
  const agencyWhatsApp = `https://wa.me/${DENTAL_CLINIC.agency.whatsapp}?text=${encodeURIComponent(
    "Hi Tapecut Studios team, I checked the Gurukripa Dental Hospital website & doctor admin prototype. Let's discuss making this live for our clinic!"
  )}`;

  return (
    <footer className="bg-[#093245] text-sky-50 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Clinic Info */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">
                  {DENTAL_CLINIC.name}
                </div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-teal-300 font-semibold">
                  {DENTAL_CLINIC.rating} ★ ({DENTAL_CLINIC.reviewCount} Google Reviews)
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed max-w-md">
              {DENTAL_CLINIC.address}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-white/90">
              <a
                href={DENTAL_CLINIC.telHref}
                className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-300" />
                {DENTAL_CLINIC.phoneDisplay}
              </a>
              <a
                href={DENTAL_CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                {DENTAL_CLINIC.plusCode}
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-teal-300">
              Hospital Pages
            </div>
            <ul className="space-y-2.5 text-sm text-sky-100/80">
              <li>
                <Link href="/gurukripa-dental" className="hover:text-white transition-colors">
                  Hospital Overview
                </Link>
              </li>
              <li>
                <Link href="/gurukripa-dental/treatments" className="hover:text-white transition-colors">
                  Treatments & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/gurukripa-dental/book" className="hover:text-white transition-colors">
                  Book Appointment Slot
                </Link>
              </li>
              <li>
                <Link href="/gurukripa-dental/portal" className="hover:text-white transition-colors">
                  Patient Care Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/gurukripa-dental/admin"
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" /> Doctor / Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Conveniences */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold text-teal-300">
              Patient Conveniences
            </div>
            <div className="space-y-2.5 text-xs text-sky-100/80">
              <div className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Payments:</strong> Google Pay,
                  NFC Mobile Tap-to-Pay & Easy Payment Plans (EMI)
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Parking:</strong> Free Parking
                  Lot, On-Site Parking & Free Street Parking
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/gurukripa-dental/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-sky-50 text-[#093245] text-xs font-bold transition-colors"
              >
                Book Recommended Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Anonymous Tapecut Studios Pitch Attribution */}
        <div className="rounded-2xl bg-white/[0.07] border border-white/15 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-300">
              <Sparkles className="w-3.5 h-3.5" />
              Custom Hospital Website & Admin System Prototype
            </div>
            <p className="text-xs sm:text-sm text-sky-100/85 leading-relaxed">
              Designed for <strong className="text-white">{DENTAL_CLINIC.name}</strong> by{" "}
              <a
                href={DENTAL_CLINIC.agency.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-200 underline underline-offset-2 font-semibold hover:text-white"
              >
                {DENTAL_CLINIC.agency.name}
              </a>
              . Illustrative clinic photos will be swapped with your actual
              doctors, dental chairs, and hospital interiors before launch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={agencyWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#2CE070] text-[#081C10] text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Message {DENTAL_CLINIC.agency.name}
            </a>
            <a
              href={DENTAL_CLINIC.agency.site}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full border border-white/25 hover:bg-white/10 text-xs font-medium text-white inline-flex items-center gap-1.5 transition-colors"
            >
              {DENTAL_CLINIC.agency.siteDisplay}
              <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-sky-200/50">
          © {new Date().getFullYear()} {DENTAL_CLINIC.name}, Haldwani. Multi-Page
          Prototype by {DENTAL_CLINIC.agency.name}.
        </div>
      </div>
    </footer>
  );
}