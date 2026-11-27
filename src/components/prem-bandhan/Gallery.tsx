// src/components/prem-bandhan/Gallery.tsx
"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  PB_GALLERY,
  PremGalleryItem,
  applyPremFallback,
} from "@/lib/premBandhanData";

const CATEGORIES = [
  "All",
  "Wedding Lawn",
  "AC Hall",
  "Decor & Stage",
  "Gatherings",
] as const;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo<PremGalleryItem[]>(() => {
    if (selectedCategory === "All") return PB_GALLERY;
    return PB_GALLERY.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeLightbox =
    lightboxIndex !== null ? visibleItems[lightboxIndex] || null : null;

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + visibleItems.length) % visibleItems.length
    );
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
  };

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 bg-white border-y border-[#EFE7DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
              Visual Tour
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#23191B]">
              Picture Your Celebration Here
            </h2>
            <p className="text-sm text-[#6B5A5E]">
              Tap any photograph to explore stage styling, lighting scale, and
              seating arrangements in full view.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                    active
                      ? "bg-[#5E1928] text-white border-[#5E1928] shadow-sm"
                      : "bg-[#FDFBF7] text-[#5C4D50] border-[#E6DCD1] hover:border-[#B38A58] hover:text-[#23191B]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5EFE8] text-left cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5E1928]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => applyPremFallback(e, item.fallbackImage)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231015]/80 via-black/15 to-transparent" />

              <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/85 backdrop-blur-md text-[#23191B] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <div className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#F4D5A3]">
                  {item.category}
                </div>
                <div className="font-serif text-xl sm:text-2xl font-medium text-white mt-0.5">
                  {item.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#23191B] shadow-md cursor-pointer transition-colors"
                aria-label="Close photo"
              >
                <X className="w-4 h-4" />
              </button>

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#23191B] shadow-md cursor-pointer transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#23191B] shadow-md cursor-pointer transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="aspect-[16/10] bg-[#160B0E] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  onError={(e) =>
                    applyPremFallback(e, activeLightbox.fallbackImage)
                  }
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-6 py-5 bg-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#B38A58]">
                    {activeLightbox.category}
                  </div>
                  <div className="font-serif text-2xl font-medium text-[#23191B]">
                    {activeLightbox.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B5A5E] mt-0.5">
                    {activeLightbox.caption}
                  </p>
                </div>
                <div className="text-xs font-medium text-[#7A696C] bg-[#F7F1EB] px-3 py-1 rounded-full">
                  {(lightboxIndex ?? 0) + 1} / {visibleItems.length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}