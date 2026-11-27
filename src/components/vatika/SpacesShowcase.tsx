// src/components/SpacesShowcase.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { VENUE_SPACES, applyImageFallback } from "@/lib/venueData";

export default function SpacesShowcase() {
  const [activeId, setActiveId] = useState(VENUE_SPACES[0].id);

  const activeSpace =
    VENUE_SPACES.find((s) => s.id === activeId) || VENUE_SPACES[0];

  const cleanCategory = activeSpace.tag.replace(/^\d+\s*\/\/\s*/, "");

  return (
    <section id="spaces" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading + Pill Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
              Venue Spaces
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#1F1C18] leading-tight">
              Spaces Designed for Every Ritual & Gathering
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {VENUE_SPACES.map((space) => {
              const active = space.id === activeId;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveId(space.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    active
                      ? "bg-[#1C3B2E] text-white border-[#1C3B2E] shadow-sm"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-[#1F1C18]"
                  }`}
                >
                  {space.name.replace("The ", "").split(",")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Soft Elevated Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch rounded-3xl bg-white border border-stone-200/80 shadow-[0_24px_60px_-20px_rgba(31,28,24,0.08)] overflow-hidden"
          >
            {/* Image Side */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[440px] bg-stone-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSpace.image}
                alt={activeSpace.name}
                onError={(e) => applyImageFallback(e, activeSpace.fallbackImage)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/92 backdrop-blur-md text-xs font-semibold text-[#1F1C18] inline-flex items-center gap-1.5 shadow-sm">
                  <Users className="w-3.5 h-3.5 text-[#1C3B2E]" />
                  {activeSpace.capacity}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-xs font-medium text-white inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F4D59A]" />
                  {activeSpace.areaNote}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#9A7B4F]">
                  {cleanCategory}
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F1C18]">
                    {activeSpace.name}
                  </h3>
                  <p className="text-sm italic text-stone-500 mt-1">
                    {activeSpace.subtitle}
                  </p>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {activeSpace.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-stone-400">
                    Included Highlights
                  </div>
                  <ul className="space-y-2.5">
                    {activeSpace.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-stone-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1C3B2E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                    Ideal For
                  </div>
                  <div className="text-xs font-semibold text-[#1F1C18] mt-0.5">
                    {activeSpace.bestFor}
                  </div>
                </div>

                <a
                  href="#availability"
                  className="px-5 py-2.5 rounded-full bg-[#1C3B2E] hover:bg-[#152E24] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  Check Dates
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}