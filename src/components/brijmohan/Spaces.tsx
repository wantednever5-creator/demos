// src/components/brijmohan/Spaces.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { BM_SPACES, applyBmFallback } from "@/lib/brijmohanData";

export default function Spaces() {
  const [activeId, setActiveId] = useState(BM_SPACES[0].id);

  const activeSpace =
    BM_SPACES.find((s) => s.id === activeId) || BM_SPACES[0];

  return (
    <section id="spaces" className="py-20 sm:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading + Sapphire Pill Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
              24/7 Digital Showroom
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#17202D] leading-tight">
              Spaces & Amenities Built for Effortless Hosting
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {BM_SPACES.map((space) => {
              const active = space.id === activeId;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveId(space.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    active
                      ? "bg-[#162B47] text-white border-[#162B47] shadow-sm"
                      : "bg-white text-[#525E6E] border-[#E0DCD2] hover:border-[#AE8952] hover:text-[#17202D]"
                  }`}
                >
                  {space.name
                    .replace("The Grand Palace ", "")
                    .replace("The ", "")
                    .split(",")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Elevated Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-3xl bg-white border border-[#E6E2D8] shadow-[0_24px_60px_-20px_rgba(22,43,71,0.09)] overflow-hidden"
          >
            {/* Image Stage */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[440px] bg-[#ECEAE4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSpace.image}
                alt={activeSpace.name}
                onError={(e) => applyBmFallback(e, activeSpace.fallbackImage)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D192B]/65 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/94 backdrop-blur-md text-xs font-semibold text-[#17202D] inline-flex items-center gap-1.5 shadow-sm">
                  <Users className="w-3.5 h-3.5 text-[#162B47]" />
                  {activeSpace.capacity}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#0D192B]/65 backdrop-blur-md text-xs font-medium text-white inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F4D59A]" />
                  {activeSpace.setting}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#AE8952]">
                  {activeSpace.category}
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#17202D]">
                    {activeSpace.name}
                  </h3>
                  <p className="text-sm italic text-[#647182] mt-1">
                    {activeSpace.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#4A5565] leading-relaxed">
                  {activeSpace.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#8A95A5]">
                    Verified Highlights
                  </div>
                  <ul className="space-y-2.5">
                    {activeSpace.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#2C3644]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#162B47] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F0EDE6] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8A95A5] font-medium">
                    Ideal For
                  </div>
                  <div className="text-xs font-semibold text-[#17202D] mt-0.5">
                    {activeSpace.bestFor}
                  </div>
                </div>

                <a
                  href="#planner"
                  className="px-5 py-2.5 rounded-full bg-[#162B47] hover:bg-[#0F1F35] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  Customize Event
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