// src/components/prem-bandhan/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { PREM_VENUE } from "@/lib/premBandhanData";

const NAV_LINKS = [
  { label: "Spaces", href: "#spaces" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
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
      {/* Dismissible Custom Preview Ribbon (Anonymous Agency Only) */}
      {showDemoRibbon && (
        <div className="bg-[#5E1928] text-[#FAF3EC] px-4 py-2 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C89B] shrink-0" />
              <span className="truncate">
                <span className="font-semibold text-white">
                  Custom Preview for {PREM_VENUE.name}
                </span>{" "}
                — crafted by{" "}
                <a
                  href={PREM_VENUE.agency.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[#F2D5AB] hover:text-white font-medium"
                >
                  {PREM_VENUE.agency.name}
                </a>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowDemoRibbon(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Hide preview banner"
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
            ? "bg-white/94 backdrop-blur-md border-b border-[#EDE4DA] shadow-sm py-3"
            : "bg-gradient-to-b from-black/55 via-black/25 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Crest */}
          <a href="#top" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-base font-semibold tracking-tight transition-colors ${
                scrolled
                  ? "bg-[#5E1928] text-[#FDFBF7]"
                  : "bg-white/15 backdrop-blur-md border border-white/30 text-white"
              }`}
            >
              PB
            </div>
            <div className="leading-tight">
              <div
                className={`font-serif text-lg sm:text-xl font-semibold tracking-wide transition-colors ${
                  scrolled ? "text-[#23191B]" : "text-white"
                }`}
              >
                {PREM_VENUE.name}
              </div>
              <div
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${
                  scrolled ? "text-[#B38A58]" : "text-[#F2D5AB]"
                }`}
              >
                {PREM_VENUE.locationTag}
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
                    ? "text-[#5C4D50] hover:text-[#5E1928]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={PREM_VENUE.telHref}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                scrolled
                  ? "border-[#DFD4C8] text-[#23191B] hover:border-[#5E1928] hover:text-[#5E1928]"
                  : "border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              {PREM_VENUE.phoneDisplay}
            </a>
            <a
              href="#availability"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                scrolled
                  ? "bg-[#5E1928] hover:bg-[#49121F] text-white shadow-sm"
                  : "bg-white hover:bg-[#FDFBF7] text-[#23191B] shadow-md"
              }`}
            >
              Check Availability
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-full border cursor-pointer ${
              scrolled
                ? "border-[#DFD4C8] text-[#23191B]"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-3 mx-4 rounded-2xl bg-white border border-[#EDE4DA] p-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#4A3C3F] hover:text-[#5E1928] py-1.5 border-b border-[#F4ECE3]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={PREM_VENUE.telHref}
                className="py-2.5 rounded-full border border-[#DFD4C8] text-center text-xs font-semibold text-[#23191B]"
              >
                Call Venue
              </a>
              <a
                href="#availability"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 rounded-full bg-[#5E1928] text-center text-xs font-semibold text-white"
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