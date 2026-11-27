// src/components/gurukripa/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  { label: "Book Visit", href: "/gurukripa-dental/book" },
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
    <header className="sticky top-0 z-50 w-full">
      {/* Smooth Collapsible Preview Ribbon */}
      <AnimatePresence initial={false}>
        {showPreviewRibbon && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden bg-[#083B52] text-sky-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span className="truncate">
                  <strong className="text-white font-semibold">
                    Custom Preview for {DENTAL_CLINIC.name}
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
                className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close preview bar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Clinical Navigation */}
      <div className="bg-white/92 backdrop-blur-lg border-b border-slate-200/80 shadow-[0_4px_24px_-12px_rgba(11,79,108,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between gap-4">
          {/* Brand Crest */}
          <Link
            href="/gurukripa-dental"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B4F6C] to-[#0D9488] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base tracking-tight text-[#0B2535]">
                {DENTAL_CLINIC.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#0D9488]">
                {DENTAL_CLINIC.tagline} • {DENTAL_CLINIC.rating} ★
              </div>
            </div>
          </Link>

          {/* Desktop Sliding Pill Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/80 border border-slate-200/70">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                    active
                      ? "text-[#0B4F6C]"
                      : "text-slate-600 hover:text-[#0B4F6C]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gk-nav-active"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-white shadow-xs border border-slate-200/70 -z-0"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/gurukripa-dental/admin"
              className={`px-3.5 py-2 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 transition-all ${
                isActive("/gurukripa-dental/admin")
                  ? "bg-slate-900 text-amber-200 border-slate-800 shadow-xs"
                  : "bg-amber-50/90 text-amber-950 border-amber-200/90 hover:bg-amber-100"
              }`}
              title="Private Staff & Doctor Command Center"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              Doctor Admin
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
              className="px-4 py-2.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm hover:shadow transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Slot
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Animated Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden overflow-hidden bg-white border-t border-slate-200/80 shadow-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
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
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200/90 text-sm font-semibold text-amber-950"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}