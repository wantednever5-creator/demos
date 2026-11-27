// src/components/brijmohan/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { BM_VENUE } from "@/lib/brijmohanData";

const NAV_LINKS = [
  { label: "Spaces", href: "#spaces" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu & Planner", href: "#planner" },
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
      {showDemoRibbon && (
        <div className="bg-[#162B47] text-[#F4F2EC] px-4 py-2 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C68B] shrink-0" />
              <span className="truncate">
                <span className="font-semibold text-white">
                  Custom Preview for {BM_VENUE.name}
                </span>{" "}
                — crafted by{" "}
                <a
                  href={BM_VENUE.agency.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[#F0D59E] hover:text-white font-medium"
                >
                  {BM_VENUE.agency.name}
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

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/94 backdrop-blur-md border-b border-[#E6E2D8] shadow-sm py-3"
            : "bg-gradient-to-b from-[#0E1B2D]/65 via-[#0E1B2D]/30 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-base font-semibold tracking-tight transition-colors ${
                scrolled
                  ? "bg-[#162B47] text-[#FAF9F6]"
                  : "bg-white/15 backdrop-blur-md border border-white/30 text-white"
              }`}
            >
              BP
            </div>
            <div className="leading-tight">
              <div
                className={`font-serif text-base sm:text-xl font-semibold tracking-wide transition-colors ${
                  scrolled ? "text-[#17202D]" : "text-white"
                }`}
              >
                {BM_VENUE.name}
              </div>
              <div
                className={`text-[10px] uppercase tracking-[0.18em] font-medium transition-colors ${
                  scrolled ? "text-[#AE8952]" : "text-[#F0D59E]"
                }`}
              >
                {BM_VENUE.locationTag}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-[#4D5A6B] hover:text-[#162B47]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={BM_VENUE.telHref}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 border ${
                scrolled
                  ? "border-[#DCD7CC] text-[#17202D] hover:border-[#162B47] hover:text-[#162B47]"
                  : "border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              {BM_VENUE.phoneDisplay}
            </a>
            <a
              href="#availability"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                scrolled
                  ? "bg-[#162B47] hover:bg-[#0F1F35] text-white shadow-sm"
                  : "bg-white hover:bg-[#FAF9F6] text-[#17202D] shadow-md"
              }`}
            >
              Check Availability
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden p-2 rounded-full border cursor-pointer ${
              scrolled
                ? "border-[#DCD7CC] text-[#17202D]"
                : "border-white/30 bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-3 mx-4 rounded-2xl bg-white border border-[#E6E2D8] p-5 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-[#3D4B5C] hover:text-[#162B47] py-1.5 border-b border-stone-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={BM_VENUE.telHref}
                className="py-2.5 rounded-full border border-[#DCD7CC] text-center text-xs font-semibold text-[#17202D]"
              >
                Call Venue
              </a>
              <a
                href="#availability"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 rounded-full bg-[#162B47] text-center text-xs font-semibold text-white"
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