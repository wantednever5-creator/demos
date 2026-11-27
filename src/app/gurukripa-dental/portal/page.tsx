// src/app/gurukripa-dental/portal/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  LogOut,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { DENTAL_CLINIC, buildClinicWhatsAppUrl } from "@/lib/gurukripaData";
import {
  DEMO_PATIENT_SAMPLE,
  DentalAppointment,
  formatClinicDate,
  loadClinicState,
} from "@/lib/gurukripaStore";

const PROGRESS_STEPS = ["Scheduled", "Checked In", "In Chair", "Completed"] as const;

function PatientPortalContent() {
  const searchParams = useSearchParams();
  const initialToken = searchParams.get("token") || "";

  const [lookupInput, setLookupInput] = useState(initialToken);
  const [matchedVisits, setMatchedVisits] = useState<DentalAppointment[]>([]);
  const [signedInLabel, setSignedInLabel] = useState<string | null>(null);
  const [error, setError] = useState("");

  const runLookup = (rawQuery: string) => {
    setError("");
    const query = rawQuery.trim().toLowerCase();
    const digitsOnly = rawQuery.replace(/\D/g, "");
    if (!query) {
      setError("Enter your 10-digit mobile number or Token ID (e.g. GK-204).");
      return;
    }

    const state = loadClinicState();
    const hits = state.appointments.filter(
      (app) =>
        app.id.toLowerCase() === query ||
        (digitsOnly.length >= 6 && app.phone.includes(digitsOnly.slice(-10)))
    );

    if (hits.length === 0) {
      setError(
        "No appointment found for that phone or token. Try demo patient GK-204 or book a new slot first."
      );
      return;
    }

    setMatchedVisits(hits);
    setSignedInLabel(hits[0].patientName);
  };

  useEffect(() => {
    if (initialToken) {
      runLookup(initialToken);
    }
  }, [initialToken]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runLookup(lookupInput);
  };

  const handleSignOut = () => {
    setSignedInLabel(null);
    setMatchedVisits([]);
    setLookupInput("");
    setError("");
  };

  const handleRequestReschedule = (visit: DentalAppointment) => {
    const msg = [
      `Namaste ${DENTAL_CLINIC.name} team,`,
      `This is ${visit.patientName} (Token ${visit.id}).`,
      `I would like to reschedule my ${visit.service} appointment currently on ${formatClinicDate(
        visit.date
      )} at ${visit.slot}.`,
    ].join("\n");
    window.open(buildClinicWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  if (!signedInLabel) {
    return (
      <div className="min-h-[78vh] flex items-center justify-center px-4 py-14 bg-[#F4F9FB]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-9 shadow-lg space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4F6] text-[#0B4F6C] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0D9488]">
              Patient Care Portal
            </div>
            <h1 className="text-2xl font-bold text-[#0E2433]">
              Access Your Visits & Care Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in with your mobile number or appointment token ID to check
              live chair status, aftercare, and payment details.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Mobile Number or Token ID
              </label>
              <input
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="e.g. 9837041209 or GK-204"
                className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm text-[#0E2433] focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-xs text-rose-700 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
            >
              View My Patient Dashboard
            </button>
          </form>

          {/* One-Click Demo Login for Pitching */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="text-[11px] text-center text-slate-400 font-medium">
              Testing the demo? Try a pre-loaded patient record:
            </div>
            <button
              type="button"
              onClick={() => {
                setLookupInput(DEMO_PATIENT_SAMPLE.token);
                runLookup(DEMO_PATIENT_SAMPLE.token);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#F4F9FB] hover:bg-[#E6F4F6] border border-slate-200 text-xs font-semibold text-[#0B4F6C] inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              Load Sample Patient (Anjali Joshi • {DEMO_PATIENT_SAMPLE.token})
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F9FB] text-[#0E2433] py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Patient Header */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0B4F6C] text-white font-bold text-lg flex items-center justify-center">
              {signedInLabel.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#0D9488]">
                Verified Patient Portal
              </div>
              <h1 className="text-2xl font-bold text-[#0E2433]">
                Welcome, {signedInLabel}
              </h1>
              <p className="text-xs text-slate-500">
                Phone: +91 {matchedVisits[0]?.phone} • {matchedVisits.length}{" "}
                recorded visit(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/gurukripa-dental/book"
              className="px-4 py-2.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              New Appointment
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-full border border-slate-200 hover:border-rose-300 text-xs font-semibold text-slate-600 hover:text-rose-700 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-6">
          {matchedVisits.map((visit) => {
            const currentStepIdx = PROGRESS_STEPS.indexOf(
              visit.status as (typeof PROGRESS_STEPS)[number]
            );

            return (
              <div
                key={visit.id}
                className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#E6F4F6] text-[#0B4F6C]">
                        Token #{visit.id}
                      </span>
                      {visit.urgency === "Emergency" && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold">
                          Priority Emergency
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 text-[#0D9488] text-[11px] font-bold">
                        {visit.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#0E2433] mt-2">
                      {visit.service}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                        {formatClinicDate(visit.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                        {visit.slot}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-[#0B4F6C]" />
                        {visit.paymentPreference}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRequestReschedule(visit)}
                    className="px-4 py-2 rounded-full border border-slate-200 hover:border-[#0B4F6C] text-xs font-semibold text-[#0B4F6C] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reschedule on WhatsApp
                  </button>
                </div>

                {/* Live Clinic Progress Stepper */}
                {visit.status !== "Cancelled" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {PROGRESS_STEPS.map((step, idx) => {
                      const done = currentStepIdx >= idx;
                      return (
                        <div
                          key={step}
                          className={`rounded-2xl px-3.5 py-3 border text-xs font-semibold flex items-center gap-2 ${
                            done
                              ? "bg-[#E6F4F6] border-[#0D9488]/40 text-[#0B4F6C]"
                              : "bg-slate-50 border-slate-200 text-slate-400"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              done ? "text-[#0D9488]" : "text-slate-300"
                            }`}
                          />
                          {step}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Doctor Clinical Note + Aftercare Instructions (Synced From Admin) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#F4F9FB] border border-slate-200/80 p-4 space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#0B4F6C] inline-flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Doctor's Clinical Note ({visit.chair})
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {visit.doctorNote ||
                        "Initial dental evaluation scheduled on arrival."}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-teal-50/60 border border-teal-200/70 p-4 space-y-1.5">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#0D9488] inline-flex items-center gap-1.5">
                      <ClipboardList className="w-3.5 h-3.5" />
                      Preparation & Aftercare Instructions
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {visit.aftercare ||
                        "Arrive 10 minutes before your slot. Carry previous dental X-rays if available."}
                    </p>
                  </div>
                </div>

                {/* Quick Clinic Directions Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                    {DENTAL_CLINIC.shortAddress}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={DENTAL_CLINIC.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0B4F6C] hover:underline"
                    >
                      Get Directions
                    </a>
                    <a
                      href={DENTAL_CLINIC.telHref}
                      className="font-semibold text-[#0B4F6C] hover:underline inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> {DENTAL_CLINIC.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Assurance */}
        <div className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-xs text-slate-500 flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
          <span>
            Patients only see their own appointment tokens and care notes—never
            other patients' records or hospital admin controls.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PatientPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">
          Loading patient portal...
        </div>
      }
    >
      <PatientPortalContent />
    </Suspense>
  );
}