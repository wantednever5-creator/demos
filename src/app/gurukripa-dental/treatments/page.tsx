// src/app/gurukripa-dental/treatments/page.tsx
"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Baby,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  DENTAL_CLINIC,
  DENTAL_MEDIA,
  TREATMENTS,
  TreatmentItem,
  applyDentalFallback,
  buildClinicWhatsAppUrl,
} from "@/lib/gurukripaData";

const CATEGORIES = [
  "All",
  "Cosmetic Dentistry",
  "Emergency Care",
  "Pediatric Care",
  "Sedation & Pain-Free",
] as const;

const TENURES = [3, 6, 9, 12] as const;

function getCategoryStyle(category: TreatmentItem["category"]) {
  switch (category) {
    case "Cosmetic Dentistry":
      return {
        icon: Sparkles,
        pill: "bg-teal-50 text-[#0D9488] border-teal-100",
      };
    case "Emergency Care":
      return {
        icon: AlertCircle,
        pill: "bg-rose-50 text-rose-600 border-rose-100",
      };
    case "Pediatric Care":
      return {
        icon: Baby,
        pill: "bg-sky-50 text-[#0B4F6C] border-sky-100",
      };
    default:
      return {
        icon: HeartHandshake,
        pill: "bg-indigo-50 text-indigo-700 border-indigo-100",
      };
  }
}

function TreatmentsContent() {
  const searchParams = useSearchParams();
  const initialParam = searchParams.get("category");
  const validInitial = CATEGORIES.includes(
    initialParam as (typeof CATEGORIES)[number]
  )
    ? (initialParam as (typeof CATEGORIES)[number])
    : "All";

  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>(validInitial);

  // Interactive Payment Plan (EMI) Estimator State
  const [selectedTreatmentName, setSelectedTreatmentName] = useState(
    TREATMENTS[0].name
  );
  const [estimatedCost, setEstimatedCost] = useState(24000);
  const [months, setMonths] = useState<number>(6);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);

  const visibleTreatments = useMemo<TreatmentItem[]>(() => {
    if (selectedCategory === "All") return TREATMENTS;
    return TREATMENTS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const downPayment = Math.round((estimatedCost * downPaymentPct) / 100);
  const financedAmount = Math.max(0, estimatedCost - downPayment);
  const monthlyEmi = Math.round(financedAmount / months);

  const loadIntoEstimator = (item: TreatmentItem) => {
    setSelectedTreatmentName(item.name);
    setEstimatedCost(item.estBaseCost);
    const el = document.getElementById("emi-estimator");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendEmiInquiry = () => {
    const msg = [
      `Namaste ${DENTAL_CLINIC.name} team,`,
      ``,
      `I would like to consult about a treatment & payment plan:`,
      `• Treatment: ${selectedTreatmentName}`,
      `• Estimated Package: ₹${estimatedCost.toLocaleString("en-IN")}`,
      `• Preferred Plan: ₹${downPayment.toLocaleString(
        "en-IN"
      )} initial + ₹${monthlyEmi.toLocaleString("en-IN")}/month for ${months} months`,
      ``,
      `Please help me schedule a consultation.`,
    ].join("\n");

    window.open(buildClinicWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#F6FAFC] text-[#0B2535] pb-20">
      {/* Polished Header With Clinical Preview Card */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F6] text-[#0B4F6C] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                Clinical Care Catalog
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B2535] leading-[1.08]">
                Transparent Treatments &{" "}
                <span className="font-serif italic font-normal text-[#0B4F6C]">
                  Easy Monthly Plans.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Explore cosmetic makeovers, same-day emergency relief, fear-free
                pediatric dentistry, and sedation care—all performed on-site
                with clear indicative pricing and Google Pay / EMI options.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md aspect-[16/9] bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DENTAL_MEDIA.cosmeticImage}
                  alt="Cosmetic and restorative consultation at Gurukripa Dental Hospital"
                  onError={(e) =>
                    applyDentalFallback(e, DENTAL_MEDIA.heroFallback)
                  }
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082E40]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-white">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-bold text-teal-300">
                      Stress-Free Financing
                    </div>
                    <div className="text-sm font-bold">
                      3 to 12-Month Payment Plans Available
                    </div>
                  </div>
                  <a
                    href="#emi-estimator"
                    className="px-3.5 py-2 rounded-full bg-white text-[#0B4F6C] text-xs font-bold shrink-0 hover:bg-sky-50 transition-colors"
                  >
                    Estimate EMI
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Smooth Sliding Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#F4F8FA] border border-slate-200/80 w-fit">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? "text-white"
                      : "text-slate-600 hover:text-[#0B4F6C]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gk-treat-cat"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-[#0B4F6C] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Treatment Cards Grid With Smooth Filter Transitions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {visibleTreatments.map((item) => {
              const style = getCategoryStyle(item.category);
              const CatIcon = style.icon;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                  className="group rounded-3xl bg-white border border-slate-200/80 hover:border-[#0D9488]/60 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-3 py-1 rounded-full border text-[11px] font-bold inline-flex items-center gap-1.5 ${style.pill}`}
                      >
                        <CatIcon className="w-3.5 h-3.5" />
                        {item.category}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/70">
                          <Clock className="w-3 h-3 text-[#0D9488]" />
                          {item.duration}
                        </span>
                        {item.emiEligible && (
                          <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-[10px] font-bold text-[#0D9488]">
                            EMI Eligible
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#0B2535] group-hover:text-[#0B4F6C] transition-colors">
                        {item.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {item.includes.map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                        Indicative Range • {item.comfortTag}
                      </div>
                      <div className="text-lg font-bold text-[#0B2535] mt-0.5">
                        {item.typicalRange}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => loadIntoEstimator(item)}
                        className="px-3.5 py-2.5 rounded-full border border-slate-200 hover:border-[#0B4F6C] bg-[#F8FBFD] text-xs font-semibold text-slate-700 hover:text-[#0B4F6C] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        Split EMI
                      </button>

                      <Link
                        href={`/gurukripa-dental/book?service=${encodeURIComponent(
                          item.name
                        )}${
                          item.category === "Emergency Care"
                            ? "&urgency=Emergency"
                            : ""
                        }`}
                        className="px-4 py-2.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        Book Slot
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================================================================ */}
      {/* INTERACTIVE PAYMENT PLAN (EMI) ESTIMATOR                         */}
      {/* ================================================================ */}
      <section
        id="emi-estimator"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      >
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-[0_24px_60px_-24px_rgba(11,79,108,0.16)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Controls */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-bold text-[#0D9488]">
                <CreditCard className="w-4 h-4" />
                Flexible Payment Planner
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2535]">
                Estimate Your Monthly Dental Plan
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Plan veneers, braces, implants, or root canal packages into
                comfortable monthly installments before your visit.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                Choose Treatment
              </label>
              <select
                value={selectedTreatmentName}
                onChange={(e) => {
                  const chosen = TREATMENTS.find(
                    (t) => t.name === e.target.value
                  );
                  setSelectedTreatmentName(e.target.value);
                  if (chosen) setEstimatedCost(chosen.estBaseCost);
                }}
                className="w-full bg-[#F6FAFC] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#0B2535] focus:outline-none cursor-pointer transition-colors"
              >
                {TREATMENTS.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.typicalRange})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F6FAFC] border border-slate-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Estimated Treatment Value
                </span>
                <span className="text-xl font-bold text-[#0B4F6C]">
                  ₹{estimatedCost.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={80000}
                step={1000}
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full accent-[#0B4F6C] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹3,000</span>
                <span>₹40,000</span>
                <span>₹80,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600">
                  Installment Tenure
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TENURES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        months === m
                          ? "bg-[#0B4F6C] text-white border-[#0B4F6C] shadow-xs"
                          : "bg-[#F6FAFC] text-slate-600 border-slate-200 hover:border-[#0B4F6C]"
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600">
                  Initial Sitting Payment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 20, 30].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPct(pct)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        downPaymentPct === pct
                          ? "bg-[#0D9488] text-white border-[#0D9488] shadow-xs"
                          : "bg-[#F6FAFC] text-slate-600 border-slate-200 hover:border-[#0D9488]"
                      }`}
                    >
                      {pct === 0 ? "₹0 Down" : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Breakdown */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B4F6C] via-[#094159] to-[#072F42] text-white p-7 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Monthly Estimate
              </div>

              <div>
                <div className="text-xs text-sky-100/75">
                  Estimated Monthly Payment ({months} months)
                </div>
                <motion.div
                  key={`${monthlyEmi}-${months}`}
                  initial={{ opacity: 0.4, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-4xl sm:text-5xl font-bold tracking-tight mt-1"
                >
                  ₹{monthlyEmi.toLocaleString("en-IN")}
                  <span className="text-base font-normal text-sky-100/75">
                    /mo
                  </span>
                </motion.div>
              </div>

              {/* Visual Split Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-2.5 w-full rounded-full bg-white/15 overflow-hidden flex">
                  <div
                    className="bg-teal-300 transition-all duration-300"
                    style={{ width: `${downPaymentPct}%` }}
                  />
                  <div
                    className="bg-sky-300/70 transition-all duration-300"
                    style={{ width: `${100 - downPaymentPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-sky-100/75">
                  <span>Initial ({downPaymentPct}%)</span>
                  <span>Monthly Split ({100 - downPaymentPct}%)</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/15 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-sky-100/75">Initial Sitting</span>
                  <span className="font-semibold">
                    ₹{downPayment.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-100/75">
                    Balance Over {months} Mo
                  </span>
                  <span className="font-semibold">
                    ₹{financedAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-100/75">Accepted Modes</span>
                  <span className="font-semibold text-teal-200 inline-flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> GPay • NFC • EMI
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-sky-100/60 leading-relaxed">
                * Exact clinical quote and installment eligibility are finalized
                on-site after examination.
              </p>
            </div>

            <div className="space-y-2.5">
              <Link
                href={`/gurukripa-dental/book?service=${encodeURIComponent(
                  selectedTreatmentName
                )}&payment=${encodeURIComponent("Payment Plan (EMI)")}`}
                className="w-full py-3.5 rounded-full bg-white hover:bg-sky-50 text-[#0B4F6C] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation With This Plan
              </Link>
              <button
                type="button"
                onClick={handleSendEmiInquiry}
                className="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#2BE06E] text-[#081C10] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Ask About This Plan on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Confidence Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-2xl bg-white border border-slate-200/80 px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 shadow-xs">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            All procedures performed on-site at {DENTAL_CLINIC.name},{" "}
            {DENTAL_CLINIC.shortAddress}.
          </span>
          <a
            href={DENTAL_CLINIC.telHref}
            className="font-bold text-[#0B4F6C] hover:underline"
          >
            Questions? Call {DENTAL_CLINIC.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TreatmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">
          Loading treatments & EMI estimator...
        </div>
      }
    >
      <TreatmentsContent />
    </Suspense>
  );
}