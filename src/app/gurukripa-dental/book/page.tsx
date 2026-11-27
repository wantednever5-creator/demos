// src/app/gurukripa-dental/book/page.tsx
"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  HeartHandshake,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  DENTAL_CLINIC,
  DENTAL_MEDIA,
  TREATMENTS,
  applyDentalFallback,
  buildClinicWhatsAppUrl,
} from "@/lib/gurukripaData";
import {
  AppointmentUrgency,
  CLINIC_TIME_SLOTS,
  ClinicDemoState,
  DentalAppointment,
  formatClinicDate,
  getOffsetDateIso,
  getTodayIso,
  loadClinicState,
  saveClinicState,
} from "@/lib/gurukripaStore";

const PAYMENT_OPTIONS: DentalAppointment["paymentPreference"][] = [
  "Google Pay / UPI",
  "NFC Tap-to-Pay",
  "Payment Plan (EMI)",
  "Cash / Card",
];

function BookingContent() {
  const searchParams = useSearchParams();
  const queryService = searchParams.get("service");
  const queryUrgency = searchParams.get("urgency");
  const queryPayment = searchParams.get("payment");

  const [clinicState, setClinicState] = useState<ClinicDemoState>(() =>
    loadClinicState()
  );

  // Form fields
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [service, setService] = useState<string>(
    queryService && TREATMENTS.some((t) => t.name === queryService)
      ? queryService
      : TREATMENTS[0].name
  );
  const [urgency, setUrgency] = useState<AppointmentUrgency>(
    queryUrgency === "Emergency" ? "Emergency" : "Normal"
  );
  const [date, setDate] = useState<string>(() => getTodayIso());
  const [slot, setSlot] = useState<string>("");
  const [sedationRequested, setSedationRequested] = useState(false);
  const [paymentPreference, setPaymentPreference] = useState<
    DentalAppointment["paymentPreference"]
  >(
    queryPayment &&
      PAYMENT_OPTIONS.includes(
        queryPayment as DentalAppointment["paymentPreference"]
      )
      ? (queryPayment as DentalAppointment["paymentPreference"])
      : "Google Pay / UPI"
  );
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<DentalAppointment | null>(null);

  useEffect(() => {
    setClinicState(loadClinicState());
  }, []);

  const quickDates = useMemo(
    () => [
      { label: "Today", iso: getTodayIso() },
      { label: "Tomorrow", iso: getOffsetDateIso(1) },
      {
        label: formatClinicDate(getOffsetDateIso(2)).split(",")[0],
        iso: getOffsetDateIso(2),
      },
      {
        label: formatClinicDate(getOffsetDateIso(3)).split(",")[0],
        iso: getOffsetDateIso(3),
      },
    ],
    []
  );

  const unavailableSlotsForDate = useMemo(() => {
    const blocked = new Set<string>();
    clinicState.blockedSlots.forEach((key) => {
      const [d, s] = key.split("|");
      if (d === date && s) blocked.add(s);
    });
    clinicState.appointments.forEach((app) => {
      if (app.date === date && app.status !== "Cancelled") {
        blocked.add(app.slot);
      }
    });
    return blocked;
  }, [clinicState, date]);

  useEffect(() => {
    if (slot && !unavailableSlotsForDate.has(slot)) return;
    const firstOpen = CLINIC_TIME_SLOTS.find(
      (s) => !unavailableSlotsForDate.has(s)
    );
    setSlot(firstOpen || "");
  }, [date, unavailableSlotsForDate, slot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanName = patientName.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName) {
      setError("Please enter the patient's full name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!slot) {
      setError("All slots on this date are full. Please choose another date.");
      return;
    }

    const latest = loadClinicState();
    const tokenNum = 206 + latest.appointments.length;
    const newAppointment: DentalAppointment = {
      id: `GK-${tokenNum}`,
      patientName: cleanName,
      phone: cleanPhone.slice(-10),
      age: age.trim() || "Adult",
      service,
      date,
      slot,
      urgency,
      sedationRequested,
      paymentPreference,
      notes: notes.trim() || "Standard consultation requested.",
      status: "Scheduled",
      chair:
        urgency === "Emergency"
          ? "Emergency Bay"
          : service.toLowerCase().includes("kids") ||
            service.toLowerCase().includes("smile")
          ? "Chair 2 (Cosmetic/Kids)"
          : "Chair 1 (Main)",
      doctorNote:
        urgency === "Emergency"
          ? "Flagged for rapid triage on arrival."
          : "Pre-booked online slot confirmed.",
      aftercare:
        "Arrive 10 minutes early. Free on-site parking available opposite Vishal Mega Mart.",
      createdAt: "Just now",
    };

    const nextState: ClinicDemoState = {
      ...latest,
      appointments: [newAppointment, ...latest.appointments],
    };
    saveClinicState(nextState);
    setClinicState(nextState);
    setConfirmed(newAppointment);
  };

  const handleSendWhatsAppPass = (app: DentalAppointment) => {
    const msg = [
      `Namaste ${DENTAL_CLINIC.name} team,`,
      ``,
      `I have booked an online appointment (Token: *${app.id}*):`,
      `• Patient: ${app.patientName} (Age: ${app.age})`,
      `• Phone: ${app.phone}`,
      `• Treatment: ${app.service}`,
      `• Priority: ${
        app.urgency === "Emergency" ? "URGENT EMERGENCY" : "Regular Appointment"
      }`,
      `• Date & Time: ${formatClinicDate(app.date)} at ${app.slot}`,
      `• Sedation Option: ${
        app.sedationRequested ? "Yes, requested" : "Not needed"
      }`,
      `• Payment Mode: ${app.paymentPreference}`,
      ...(app.notes ? [`• Note: ${app.notes}`] : []),
      ``,
      `Please confirm my slot.`,
    ].join("\n");

    window.open(buildClinicWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const openSlotCount = CLINIC_TIME_SLOTS.length - unavailableSlotsForDate.size;

  return (
    <div className="bg-[#F6FAFC] text-[#0B2535] pb-20">
      {/* Clean Header With 3-Step Guide */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F6] text-[#0B4F6C] text-xs font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
              Appointments Recommended • Live Chair Sync
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0B2535]">
              Book Your Dental Slot
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Select a convenient time in 30 seconds. Your token syncs directly
              to the hospital queue and your personal Patient Portal.
            </p>
          </div>

          {/* Simple 3-Step Visual Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            {[
              { step: "1", label: "Visit & Details", active: !confirmed },
              { step: "2", label: "Pick Live Slot", active: !confirmed },
              { step: "3", label: "Digital Token", active: Boolean(confirmed) },
            ].map((s) => (
              <div
                key={s.step}
                className={`px-3.5 py-2 rounded-full border inline-flex items-center gap-2 ${
                  s.active
                    ? "bg-[#E6F4F6] border-[#0B4F6C]/30 text-[#0B4F6C]"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                    s.active
                      ? "bg-[#0B4F6C] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {s.step}
                </span>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {confirmed ? (
          /* ============================================================ */
          /* DIGITAL TOKEN CONFIRMATION PASS                              */
          /* ============================================================ */
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto rounded-[28px] bg-white border border-teal-200 p-6 sm:p-10 shadow-[0_24px_60px_-20px_rgba(13,148,136,0.2)] space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0D9488] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Appointment Confirmed
              </span>
              <span className="font-mono text-sm font-bold px-3.5 py-1.5 rounded-full bg-[#0B4F6C] text-white shadow-xs">
                Token #{confirmed.id}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2535]">
                You're All Set, {confirmed.patientName}.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your slot is now visible in your Patient Portal and the
                hospital's live Doctor Queue.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F6FAFC] border border-slate-200/80 p-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Date & Slot</span>
                <span className="font-bold text-[#0B2535] text-right">
                  {formatClinicDate(confirmed.date)} • {confirmed.slot}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Treatment</span>
                <span className="font-semibold text-[#0B4F6C] text-right">
                  {confirmed.service}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Assigned Bay</span>
                <span
                  className={`font-bold ${
                    confirmed.urgency === "Emergency"
                      ? "text-rose-600"
                      : "text-[#0D9488]"
                  }`}
                >
                  {confirmed.urgency} • {confirmed.chair}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Payment Mode</span>
                <span className="font-semibold text-[#0B2535]">
                  {confirmed.paymentPreference}
                </span>
              </div>
              <div className="flex justify-between gap-3 pt-2 border-t border-slate-200">
                <span className="text-slate-500">Location</span>
                <span className="text-xs font-medium text-slate-700 text-right max-w-[260px]">
                  {DENTAL_CLINIC.shortAddress}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSendWhatsAppPass(confirmed)}
                className="py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#2CE06E] text-[#081C10] text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Send Pass on WhatsApp
              </button>

              <Link
                href={`/gurukripa-dental/portal?token=${encodeURIComponent(
                  confirmed.id
                )}`}
                className="py-3.5 px-5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <User className="w-4 h-4" />
                Open in Patient Portal
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href="/gurukripa-dental/admin"
                className="inline-flex items-center gap-1.5 font-bold text-amber-800 hover:underline"
              >
                <Lock className="w-3.5 h-3.5" />
                View Live in Doctor Admin Panel →
              </Link>

              <button
                type="button"
                onClick={() => {
                  setConfirmed(null);
                  setPatientName("");
                  setNotes("");
                }}
                className="text-slate-500 hover:text-[#0B4F6C] font-semibold cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          </motion.div>
        ) : (
          /* ============================================================ */
          /* BOOKING FORM + LIVE SUMMARY SIDEBAR                          */
          /* ============================================================ */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs"
            >
              {/* Urgency Toggle */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 1 — Visit Priority & Patient Info
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency("Normal")}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      urgency === "Normal"
                        ? "bg-[#EBF6F8] border-[#0B4F6C] shadow-xs"
                        : "bg-[#F8FBFD] border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        urgency === "Normal"
                          ? "bg-[#0B4F6C] text-white"
                          : "bg-white text-slate-400 border border-slate-200"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B2535]">
                        Regular Consultation
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Checkup, cosmetic, pediatric or planned care
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency("Emergency")}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      urgency === "Emergency"
                        ? "bg-rose-50 border-rose-500 shadow-xs"
                        : "bg-[#F8FBFD] border-slate-200 hover:border-rose-300"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        urgency === "Emergency"
                          ? "bg-rose-600 text-white"
                          : "bg-white text-slate-400 border border-slate-200"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-rose-700">
                        Urgent Dental Emergency
                      </div>
                      <div className="text-xs text-rose-600/80 mt-0.5">
                        Severe pain, swelling, trauma or broken tooth
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Patient Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Rohan Tiwari"
                    className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Age
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value.slice(0, 3))}
                    placeholder="28"
                    className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-3.5 py-3 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Service Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Treatment / Reason for Visit
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm font-medium text-[#0B2535] focus:outline-none cursor-pointer transition-colors"
                >
                  {TREATMENTS.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                  <option value="Routine Dental Checkup & Scaling">
                    Routine Dental Checkup & Scaling
                  </option>
                </select>
              </div>

              {/* Date & Live Slot Picker */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 2 — Pick Date & Live Chair Slot
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {quickDates.map((qd) => (
                      <button
                        key={qd.iso}
                        type="button"
                        onClick={() => setDate(qd.iso)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold border cursor-pointer transition-all ${
                          date === qd.iso
                            ? "bg-[#0B4F6C] text-white border-[#0B4F6C] shadow-xs"
                            : "bg-[#F8FBFD] text-slate-600 border-slate-200 hover:border-[#0B4F6C]"
                        }`}
                      >
                        {qd.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="date"
                    min={getTodayIso()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none [color-scheme:light]"
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                      {openSlotCount} open slots for {formatClinicDate(date)}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Crossed-out slots are booked or blocked by doctor
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {CLINIC_TIME_SLOTS.map((time) => {
                      const taken = unavailableSlotsForDate.has(time);
                      const active = slot === time && !taken;
                      return (
                        <motion.button
                          whileTap={taken ? undefined : { scale: 0.96 }}
                          key={time}
                          type="button"
                          disabled={taken}
                          onClick={() => setSlot(time)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            taken
                              ? "bg-slate-100 text-slate-400 border-slate-200 line-through cursor-not-allowed"
                              : active
                              ? "bg-[#0B4F6C] text-white border-[#0B4F6C] shadow-sm cursor-pointer"
                              : "bg-[#F8FBFD] text-slate-700 border-slate-200 hover:border-[#0D9488] hover:bg-white cursor-pointer"
                          }`}
                        >
                          {time}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sedation Comfort Option */}
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50/55 border border-indigo-100 hover:border-indigo-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={sedationRequested}
                  onChange={(e) => setSedationRequested(e.target.checked)}
                  className="mt-1 accent-[#0B4F6C] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-indigo-950 inline-flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-indigo-600" />
                    Request Sedation / Anxiety-Free Comfort Option
                  </div>
                  <p className="text-xs text-indigo-900/70 mt-0.5">
                    Alerts our doctor in advance so your sitting is tailored for
                    zero anxiety.
                  </p>
                </div>
              </label>

              {/* Payment Preference */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#0D9488]" />
                  Preferred Payment Mode at Reception
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPaymentPreference(opt)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        paymentPreference === opt
                          ? "bg-[#E6F4F6] text-[#0B4F6C] border-[#0B4F6C]"
                          : "bg-[#F8FBFD] text-slate-600 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptoms / Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Symptoms or Notes{" "}
                  <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe pain location, sensitivity, child's age, or preferred follow-up..."
                  className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs font-semibold text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-full text-white text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                  urgency === "Emergency"
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                    : "bg-[#0B4F6C] hover:bg-[#083C52] shadow-[#0B4F6C]/20"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {urgency === "Emergency"
                  ? "Reserve Priority Emergency Token"
                  : "Confirm Appointment Slot"}
              </button>
            </form>

            {/* Right Live Summary & Hospital Preview Card */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[28px] bg-white border border-slate-200/90 overflow-hidden shadow-sm">
                <div className="relative h-36 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DENTAL_MEDIA.clinicInterior}
                    alt="Gurukripa Dental Hospital interior"
                    onError={(e) =>
                      applyDentalFallback(e, DENTAL_MEDIA.heroFallback)
                    }
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082E40]/80 via-[#082E40]/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-teal-300">
                      Live Booking Summary
                    </div>
                    <div className="text-sm font-bold">
                      {DENTAL_CLINIC.name}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Priority</span>
                      <span
                        className={`font-bold ${
                          urgency === "Emergency"
                            ? "text-rose-600"
                            : "text-[#0D9488]"
                        }`}
                      >
                        {urgency === "Emergency"
                          ? "Urgent Emergency"
                          : "Standard Visit"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Date & Slot</span>
                      <span className="font-bold text-[#0B2535] text-right">
                        {formatClinicDate(date).split(",")[0]} •{" "}
                        {slot || "Pick slot"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Payment</span>
                      <span className="font-semibold text-[#0B4F6C] text-right">
                        {paymentPreference}
                      </span>
                    </div>
                    {sedationRequested && (
                      <div className="rounded-xl bg-indigo-50 text-indigo-800 px-3 py-2 text-xs font-semibold">
                        Sedation comfort option flagged for doctor
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                      <span>{DENTAL_CLINIC.shortAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-[#0B4F6C] shrink-0" />
                      <span>Free On-Site & Lot Parking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                      <span>Instant Digital Token + WhatsApp Pass</span>
                    </div>
                  </div>

                  <a
                    href={DENTAL_CLINIC.telHref}
                    className="w-full py-2.5 rounded-full bg-[#F6FAFC] border border-slate-200 hover:border-[#0B4F6C] text-xs font-bold text-[#0B4F6C] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Reception: {DENTAL_CLINIC.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-5 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-extrabold text-amber-900">
                  <Lock className="w-3.5 h-3.5" /> Live Hospital Sync
                </div>
                <p className="text-xs text-amber-950/80 leading-relaxed">
                  Book a test slot here, then check{" "}
                  <strong>Doctor Admin</strong> in the navbar—it lands in the
                  live queue instantly.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500">
          Loading live appointment slots...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}