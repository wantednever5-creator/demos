// src/components/gurukripa/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Lock,
  Menu,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import { DENTAL_CLINIC } from "@/lib/gurukripaData";

const NAV_ITEMS = [
  { label: "Home", href: "/gurukripa-dental" },
  { label: "Treatments & EMI", href: "/gurukripa-dental/treatments" },
  { label: "Book Appointment", href: "/gurukripa-dental/book" },
  { label: "Patient Portal", href: "/gurukripa-dental/portal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPreviewRibbon, setShowPreviewRibbon] = useState(true);

  const isActive = (href: string) =>
    href === "/gurukripa-dental"
      ? pathname === href
      : pathname?.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Anonymous Tapecut Studios Preview Ribbon */}
      {showPreviewRibbon && (
        <div className="bg-[#0B4F6C] text-sky-50 px-4 py-1.5 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span className="truncate">
                <strong className="text-white">
                  Multi-Page Hospital Prototype for {DENTAL_CLINIC.name}
                </strong>{" "}
                — crafted by{" "}
                <a
                  href={DENTAL_CLINIC.agency.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-teal-200 hover:text-white font-medium"
                >
                  {DENTAL_CLINIC.agency.name}
                </a>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPreviewRibbon(false)}
              className="p-0.5 rounded-full hover:bg-white/10 cursor-pointer shrink-0"
              aria-label="Close preview bar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Clinical Navigation Bar */}
      <div className="bg-white/94 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">
          {/* Clinic Brand */}
          <Link href="/gurukripa-dental" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B4F6C] to-[#0D9488] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base tracking-tight text-[#0E2433]">
                {DENTAL_CLINIC.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#0D9488]">
                {DENTAL_CLINIC.tagline} • {DENTAL_CLINIC.rating} ★
              </div>
            </div>
          </Link>

          {/* Desktop Multi-Page Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#E6F4F6] text-[#0B4F6C]"
                      : "text-slate-600 hover:text-[#0B4F6C] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Utility Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/gurukripa-dental/admin"
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 transition-all ${
                isActive("/gurukripa-dental/admin")
                  ? "bg-amber-950 text-amber-100 border-amber-900"
                  : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
              }`}
              title="Doctor & Hospital Admin Panel (Private)"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              Doctor / Admin
            </Link>

            <a
              href={DENTAL_CLINIC.telHref}
              className="hidden xl:inline-flex px-3.5 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0B4F6C] hover:text-[#0B4F6C] items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
              {DENTAL_CLINIC.phoneDisplay}
            </a>

            <Link
              href="/gurukripa-dental/book"
              className="px-4 py-2.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Visit
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-xl">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive(item.href)
                    ? "bg-[#E6F4F6] text-[#0B4F6C]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/gurukripa-dental/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-950"
            >
              <span className="inline-flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                Doctor / Admin Portal
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-700">
                Staff Only
              </span>
            </Link>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Link
                href="/gurukripa-dental/portal"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 rounded-full border border-slate-200 text-center text-xs font-semibold text-slate-700 inline-flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" /> Patient Login
              </Link>
              <a
                href={DENTAL_CLINIC.telHref}
                className="py-2.5 rounded-full bg-[#0B4F6C] text-center text-xs font-semibold text-white inline-flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call Clinic
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}