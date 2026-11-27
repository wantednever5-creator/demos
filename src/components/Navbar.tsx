// src/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { VENUE } from "@/lib/venueData";

const NAV_LINKS = [
  { label: "Spaces", href: "#spaces" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#corporate" },
  { label: "Reviews & Map", href: "#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDemoRibbon, setShowDemoRibbon] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Subtle Prototype Ribbon */}
      {showDemoRibbon && (
        <div className="bg-[#1C3B2E] text-[#F5EFE4] px-4 py-2 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B882] shrink-0" />
              <span className="truncate">
                <span className="font-semibold text-white">
                  Custom Preview for Vatika Banquet & Lawns
                </span>{" "}
                — crafted by{" "}
                <a
                  href={VENUE.agency.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[#E8CFA1] hover:text-white font-medium"
                >
                  {VENUE.agency.name}
                </a>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowDemoRibbon(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Hide prototype banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md border-b border-stone-200/80 shadow-sm py-3"
            : "bg-gradient-to-b from-black/55 via-black/25 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-xl font-semibold transition-colors ${
                scrolled
                  ? "bg-[#1C3B2E] text-[#FAF8F5]"
                  : "bg-white/15 backdrop-blur-md border border-white/30 text-white"
              }`}
            >
              V
            </div>
            <div className="leading-tight">
              <div
                className={`font-serif text-lg sm:text-xl font-semibold tracking-wide transition-colors ${
                  scrolled ? "text-[#1F1C18]" : "text-white"
                }`}
              >
                {VENUE.name}
              </div>
              <div
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  scrolled ? "text-[#9A7B4F]" : "text-[#E8CFA1]"
                }`}
              >
                {VENUE.tagline}
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-stone-600 hover:text-[#1C3B2E]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={VENUE.telHref}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                scrolled
                  ? "border-stone-300 text-[#1F1C18] hover:border-[#1C3B2E] hover:text-[#1C3B2E]"
                  : "border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              {VENUE.phoneDisplay}
            </a>
            <a
              href="#availability"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                scrolled
                  ? "bg-[#1C3B2E] hover:bg-[#152E24] text-white shadow-sm"
                  : "bg-white hover:bg-[#FAF8F5] text-[#1F1C18] shadow-md"
              }`}
            >
              Check Availability
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-full border cursor-pointer ${
              scrolled
                ? "border-stone-300 text-[#1F1C18]"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-3 mx-4 rounded-2xl bg-white border border-stone-200 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-stone-700 hover:text-[#1C3B2E] py-1.5 border-b border-stone-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={VENUE.telHref}
                className="py-2.5 rounded-full border border-stone-300 text-center text-xs font-semibold text-[#1F1C18]"
              >
                Call Venue
              </a>
              <a
                href="#availability"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 rounded-full bg-[#1C3B2E] text-center text-xs font-semibold text-white"
              >
                Check Date
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}