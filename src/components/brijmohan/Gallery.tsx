// src/components/brijmohan/Gallery.tsx
"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  BM_GALLERY,
  BrijmohanGalleryItem,
  applyBmFallback,
} from "@/lib/brijmohanData";

const CATEGORIES = [
  "All",
  "Palace Hall",
  "Wedding Lawn",
  "Food & Decor",
  "Events",
] as const;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo<BrijmohanGalleryItem[]>(() => {
    if (selectedCategory === "All") return BM_GALLERY;
    return BM_GALLERY.filter((item) => item.category === selectedCategory);
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
      className="py-20 sm:py-28 bg-white border-y border-[#ECE8DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
              Visual Tour
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#17202D]">
              Explore Brijmohan Palace
            </h2>
            <p className="text-sm text-[#525E6E]">
              Tap any photograph to view stage lighting, banquet seating, and
              catering counter setups up close.
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
                      ? "bg-[#162B47] text-white border-[#162B47] shadow-sm"
                      : "bg-[#FAF9F6] text-[#525E6E] border-[#E0DCD2] hover:border-[#AE8952] hover:text-[#17202D]"
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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECEAE4] text-left cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#162B47]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => applyBmFallback(e, item.fallbackImage)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D192B]/80 via-black/15 to-transparent" />

              <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/85 backdrop-blur-md text-[#17202D] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <div className="text-[11px] uppercase tracking-[0.16em] font-medium text-[#F4D59A]">
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
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#17202D] shadow-md cursor-pointer transition-colors"
                aria-label="Close photo"
              >
                <X className="w-4 h-4" />
              </button>

              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#17202D] shadow-md cursor-pointer transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#17202D] shadow-md cursor-pointer transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="aspect-[16/10] bg-[#0B1422] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  onError={(e) =>
                    applyBmFallback(e, activeLightbox.fallbackImage)
                  }
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-6 py-5 bg-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#AE8952]">
                    {activeLightbox.category}
                  </div>
                  <div className="font-serif text-2xl font-medium text-[#17202D]">
                    {activeLightbox.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#525E6E] mt-0.5">
                    {activeLightbox.caption}
                  </p>
                </div>
                <div className="text-xs font-medium text-[#647182] bg-[#F2F0EA] px-3 py-1 rounded-full">
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