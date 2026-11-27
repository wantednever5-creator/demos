// src/components/prem-bandhan/Spaces.tsx
"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { PB_SPACES, applyPremFallback } from "@/lib/premBandhanData";

export default function Spaces() {
  const [activeId, setActiveId] = useState(PB_SPACES[0].id);

  const activeSpace =
    PB_SPACES.find((s) => s.id === activeId) || PB_SPACES[0];

  return (
    <section id="spaces" className="py-20 sm:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Heading + Interactive Space Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
              24/7 Digital Showroom
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#23191B] leading-tight">
              Every Space Crafted for Grandeur & Comfort
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {PB_SPACES.map((space) => {
              const active = space.id === activeId;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setActiveId(space.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                    active
                      ? "bg-[#5E1928] text-white border-[#5E1928] shadow-sm"
                      : "bg-white text-[#5C4D50] border-[#E6DCD1] hover:border-[#B38A58] hover:text-[#23191B]"
                  }`}
                >
                  {space.name.replace("The Prem Bandhan ", "").replace("The ", "").split(",")[0]}
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
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-3xl bg-white border border-[#EDE4DA] shadow-[0_24px_60px_-20px_rgba(94,25,40,0.08)] overflow-hidden"
          >
            {/* Details Side (Left on Desktop for fresh editorial rhythm) */}
            <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B38A58]">
                  {activeSpace.category}
                </div>

                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#23191B]">
                    {activeSpace.name}
                  </h3>
                  <p className="text-sm italic text-[#7A696C] mt-1">
                    {activeSpace.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#544649] leading-relaxed">
                  {activeSpace.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#9A8A8D]">
                    Venue Highlights
                  </div>
                  <ul className="space-y-2.5">
                    {activeSpace.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#3A2D30]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#5E1928] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#F3ECE4] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#9A8A8D] font-medium">
                    Ideal For
                  </div>
                  <div className="text-xs font-semibold text-[#23191B] mt-0.5">
                    {activeSpace.bestFor}
                  </div>
                </div>

                <a
                  href="#availability"
                  className="px-5 py-2.5 rounded-full bg-[#5E1928] hover:bg-[#49121F] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  Check Dates
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative min-h-[300px] sm:min-h-[440px] bg-[#F5EFE8] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSpace.image}
                alt={activeSpace.name}
                onError={(e) => applyPremFallback(e, activeSpace.fallbackImage)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/92 backdrop-blur-md text-xs font-semibold text-[#23191B] inline-flex items-center gap-1.5 shadow-sm">
                  <Users className="w-3.5 h-3.5 text-[#5E1928]" />
                  {activeSpace.capacity}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-xs font-medium text-white inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F4D5A3]" />
                  {activeSpace.setting}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}