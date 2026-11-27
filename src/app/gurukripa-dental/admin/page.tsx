// src/app/gurukripa-dental/admin/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  EyeOff,
  FileEdit,
  KeyRound,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageCircle,
  Phone,
  RotateCcw,
  Save,
  ShieldAlert,
  Stethoscope,
  Users,
} from "lucide-react";
import { DENTAL_CLINIC } from "@/lib/gurukripaData";
import {
  AppointmentStatus,
  CLINIC_TIME_SLOTS,
  ClinicDemoState,
  DEMO_ADMIN_CREDENTIALS,
  DentalAppointment,
  formatClinicDate,
  getInitialClinicState,
  getOffsetDateIso,
  getTodayIso,
  loadClinicState,
  saveClinicState,
} from "@/lib/gurukripaStore";

const STATUS_LIST: AppointmentStatus[] = [
  "Scheduled",
  "Checked In",
  "In Chair",
  "Completed",
  "Cancelled",
];

const CHAIR_LIST: DentalAppointment["chair"][] = [
  "Chair 1 (Main)",
  "Chair 2 (Cosmetic/Kids)",
  "Emergency Bay",
];

export default function DoctorAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [staffId, setStaffId] = useState("");
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");

  const [clinicState, setClinicState] = useState<ClinicDemoState>(() =>
    loadClinicState()
  );
  const [activeTab, setActiveTab] = useState<"queue" | "slots">("queue");
  const [filterMode, setFilterMode] = useState<"All" | "Emergency" | "Active">(
    "All"
  );
  const [slotDate, setSlotDate] = useState<string>(() => getTodayIso());

  // Inline Doctor Note Editor
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftDoctorNote, setDraftDoctorNote] = useState("");
  const [draftAftercare, setDraftAftercare] = useState("");

  useEffect(() => {
    setClinicState(loadClinicState());
  }, [authenticated]);

  const updateAndPersist = (next: ClinicDemoState) => {
    setClinicState(next);
    saveClinicState(next);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (
      staffId.trim().toLowerCase() === DEMO_ADMIN_CREDENTIALS.staffId &&
      pin.trim() === DEMO_ADMIN_CREDENTIALS.pin
    ) {
      setAuthenticated(true);
      setClinicState(loadClinicState());
      return;
    }
    setLoginError(
      `Invalid credentials. For demo preview use ID "${DEMO_ADMIN_CREDENTIALS.staffId}" and PIN "${DEMO_ADMIN_CREDENTIALS.pin}".`
    );
  };

  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    const next: ClinicDemoState = {
      ...clinicState,
      appointments: clinicState.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    };
    updateAndPersist(next);
  };

  const handleChairChange = (
    id: string,
    chair: DentalAppointment["chair"]
  ) => {
    const next: ClinicDemoState = {
      ...clinicState,
      appointments: clinicState.appointments.map((a) =>
        a.id === id ? { ...a, chair } : a
      ),
    };
    updateAndPersist(next);
  };

  const openNoteEditor = (app: DentalAppointment) => {
    setEditingId(app.id);
    setDraftDoctorNote(app.doctorNote || "");
    setDraftAftercare(app.aftercare || "");
  };

  const saveNotes = (id: string) => {
    const next: ClinicDemoState = {
      ...clinicState,
      appointments: clinicState.appointments.map((a) =>
        a.id === id
          ? {
              ...a,
              doctorNote: draftDoctorNote.trim(),
              aftercare: draftAftercare.trim(),
            }
          : a
      ),
    };
    updateAndPersist(next);
    setEditingId(null);
  };

  const toggleSlotBlocked = (time: string) => {
    const key = `${slotDate}|${time}`;
    const exists = clinicState.blockedSlots.includes(key);
    const nextBlocked = exists
      ? clinicState.blockedSlots.filter((s) => s !== key)
      : [...clinicState.blockedSlots, key];
    updateAndPersist({ ...clinicState, blockedSlots: nextBlocked });
  };

  const handleResetDemo = () => {
    const fresh = getInitialClinicState();
    updateAndPersist(fresh);
  };

  const sendPatientReminder = (app: DentalAppointment) => {
    const msg = [
      `Namaste ${app.patientName} ji,`,
      ``,
      `Friendly reminder for your appointment at *${DENTAL_CLINIC.name}*:`,
      `• Token: ${app.id}`,
      `• Treatment: ${app.service}`,
      `• Date & Time: ${formatClinicDate(app.date)} at ${app.slot}`,
      `• Location: ${DENTAL_CLINIC.shortAddress}`,
      `• Map: ${DENTAL_CLINIC.mapsUrl}`,
      ``,
      `Free on-site parking & Google Pay/NFC available. See you soon!`,
    ].join("\n");

    const cleanPhone = app.phone.replace(/\D/g, "").slice(-10);
    window.open(
      `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const emergencyCount = useMemo(
    () =>
      clinicState.appointments.filter(
        (a) =>
          a.urgency === "Emergency" &&
          a.status !== "Completed" &&
          a.status !== "Cancelled"
      ).length,
    [clinicState.appointments]
  );

  const activeChairCount = useMemo(
    () =>
      clinicState.appointments.filter(
        (a) => a.status === "Checked In" || a.status === "In Chair"
      ).length,
    [clinicState.appointments]
  );

  const filteredAppointments = useMemo(() => {
    if (filterMode === "Emergency") {
      return clinicState.appointments.filter((a) => a.urgency === "Emergency");
    }
    if (filterMode === "Active") {
      return clinicState.appointments.filter(
        (a) => a.status !== "Completed" && a.status !== "Cancelled"
      );
    }
    return clinicState.appointments;
  }, [clinicState.appointments, filterMode]);

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

  /* ====================================================================== */
  /* DOCTOR / ADMIN LOGIN GATE                                              */
  /* ====================================================================== */
  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-14 bg-[#F4F9FB]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl bg-white border-2 border-amber-300/90 p-7 sm:p-9 shadow-xl space-y-6"
        >
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 text-[10px] font-extrabold uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              Doctor & Hospital Admin Only
            </div>

            <div className="w-12 h-12 rounded-2xl bg-[#1F1710] text-amber-300 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-bold text-[#0E2433]">
              Hospital Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Strictly hidden from public patients on the live site. Sign in to
              manage chairs, emergency triage, care notes, and open slots.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Staff ID
              </label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] rounded-xl px-4 py-3 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Private Admin PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full bg-[#F8FBFD] border border-slate-200 focus:border-[#0B4F6C] rounded-xl px-4 py-3 text-sm font-mono tracking-[0.25em] focus:outline-none"
              />
            </div>

            {loginError && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2.5 text-xs text-rose-700 font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#0B4F6C] hover:bg-[#083C52] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
            >
              Unlock Doctor Dashboard
            </button>
          </form>

          {/* 1-Click Pitch Helper */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-2.5 text-center">
            <div className="text-[11px] font-bold text-amber-950">
              Prototype Demo Credentials: ID{" "}
              <span className="font-mono">{DEMO_ADMIN_CREDENTIALS.staffId}</span>{" "}
              • PIN{" "}
              <span className="font-mono">{DEMO_ADMIN_CREDENTIALS.pin}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStaffId(DEMO_ADMIN_CREDENTIALS.staffId);
                setPin(DEMO_ADMIN_CREDENTIALS.pin);
                setAuthenticated(true);
              }}
              className="w-full py-2 rounded-full bg-amber-950 hover:bg-black text-amber-100 text-xs font-bold cursor-pointer transition-colors"
            >
              Auto-Fill & Preview Doctor Admin Panel
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ====================================================================== */
  /* AUTHENTICATED DOCTOR / HOSPITAL ADMIN DASHBOARD                        */
  /* ====================================================================== */
  return (
    <div className="bg-[#F4F9FB] text-[#0E2433] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Unmistakable Private Admin Notice Banner */}
        <div className="rounded-3xl bg-[#1F1710] text-amber-50 p-5 sm:p-6 border border-amber-500/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#1F1710] text-[10px] font-extrabold uppercase tracking-wider">
                  DOCTOR / ADMIN ONLY
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                  <EyeOff className="w-3.5 h-3.5" />
                  Hidden From Public Patients
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                {DENTAL_CLINIC.name} — Live Hospital Command Center
              </h1>
              <p className="text-xs text-amber-100/80 max-w-3xl">
                Every patient phone number, clinical note, emergency alert, and
                slot blocker below is private to clinic staff. Edits made to
                doctor notes sync straight to the Patient Portal; blocked slots
                disappear immediately from the Booking page.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleResetDemo}
              className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-amber-100 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Reset sample appointments"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo
            </button>
            <button
              type="button"
              onClick={() => setAuthenticated(false)}
              className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#1F1710] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Lock Panel
            </button>
          </div>
        </div>

        {/* Emergency Triage Alert (If Active) */}
        {emergencyCount > 0 && (
          <div className="rounded-2xl bg-rose-50 border border-rose-300 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div className="text-xs sm:text-sm text-rose-900">
                <strong>
                  {emergencyCount} Active Emergency Patient
                  {emergencyCount > 1 ? "s" : ""}
                </strong>{" "}
                flagged for priority pain triage in the queue below.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveTab("queue");
                setFilterMode("Emergency");
              }}
              className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Filter Emergency Cases
            </button>
          </div>
        )}

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Bookings",
              value: clinicState.appointments.length,
              icon: Users,
              sub: "Synced from website",
              color: "text-[#0B4F6C]",
            },
            {
              label: "Active Emergencies",
              value: emergencyCount,
              icon: ShieldAlert,
              sub: "Priority triage bay",
              color: "text-rose-600",
            },
            {
              label: "Checked In / In Chair",
              value: activeChairCount,
              icon: Stethoscope,
              sub: "Live clinic floor",
              color: "text-[#0D9488]",
            },
            {
              label: "Doctor-Blocked Slots",
              value: clinicState.blockedSlots.length,
              icon: Lock,
              sub: "Hidden on booking page",
              color: "text-amber-700",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>{stat.label}</span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-[#0E2433] mt-1.5">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("queue")}
              className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === "queue"
                  ? "bg-[#0B4F6C] text-white"
                  : "text-slate-600 hover:text-[#0B4F6C]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Live Patient Queue ({clinicState.appointments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("slots")}
              className={`px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-all ${
                activeTab === "slots"
                  ? "bg-[#0B4F6C] text-white"
                  : "text-slate-600 hover:text-[#0B4F6C]"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Chair Slot Blocker
            </button>
          </div>

          {activeTab === "queue" && (
            <div className="flex items-center gap-1.5">
              {(["All", "Active", "Emergency"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilterMode(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-colors ${
                    filterMode === f
                      ? "bg-[#0E2433] text-white border-[#0E2433]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* ADMIN TAB 1: LIVE APPOINTMENT QUEUE & CLINICAL NOTE EDITOR       */}
        {/* ================================================================ */}
        {activeTab === "queue" && (
          <div className="space-y-4">
            {filteredAppointments.map((app) => {
              const isEditing = editingId === app.id;

              return (
                <div
                  key={app.id}
                  className={`rounded-3xl bg-white border p-5 sm:p-6 space-y-4 shadow-xs ${
                    app.urgency === "Emergency"
                      ? "border-rose-300"
                      : "border-slate-200/90"
                  }`}
                >
                  {/* Top Row */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E6F4F6] text-[#0B4F6C]">
                          {app.id}
                        </span>
                        <span className="text-base font-bold text-[#0E2433]">
                          {app.patientName}
                        </span>
                        <span className="text-xs text-slate-400">
                          Age: {app.age}
                        </span>
                        {app.urgency === "Emergency" && (
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase">
                            Emergency
                          </span>
                        )}
                        {app.sedationRequested && (
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                            Sedation Requested
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-semibold text-[#0B4F6C]">
                        {app.service}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                          {formatClinicDate(app.date)} • {app.slot}
                        </span>
                        <span>Payment: {app.paymentPreference}</span>
                        <span>Booked: {app.createdAt}</span>
                      </div>

                      {app.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/70 rounded-xl px-3 py-2 mt-2">
                          <strong>Patient Note:</strong> {app.notes}
                        </p>
                      )}
                    </div>

                    {/* Status & Chair Controls */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                      <select
                        value={app.chair}
                        onChange={(e) =>
                          handleChairChange(
                            app.id,
                            e.target.value as DentalAppointment["chair"]
                          )
                        }
                        className="bg-[#F8FBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                      >
                        {CHAIR_LIST.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app.id,
                            e.target.value as AppointmentStatus
                          )
                        }
                        className={`rounded-xl px-3 py-2 text-xs font-bold border focus:outline-none cursor-pointer ${
                          app.status === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : app.status === "In Chair"
                            ? "bg-teal-50 text-teal-800 border-teal-300"
                            : app.status === "Cancelled"
                            ? "bg-slate-100 text-slate-500 border-slate-200"
                            : "bg-[#E6F4F6] text-[#0B4F6C] border-[#0B4F6C]/30"
                        }`}
                      >
                        {STATUS_LIST.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Inline Doctor Clinical Note & Aftercare Editor */}
                  {isEditing ? (
                    <div className="rounded-2xl bg-[#F4F9FB] border border-[#0B4F6C]/30 p-4 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#0B4F6C] mb-1">
                            Doctor Clinical Note (Visible in Patient Portal)
                          </label>
                          <textarea
                            rows={2}
                            value={draftDoctorNote}
                            onChange={(e) => setDraftDoctorNote(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0B4F6C]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#0D9488] mb-1">
                            Post-Visit Aftercare Instructions
                          </label>
                          <textarea
                            rows={2}
                            value={draftAftercare}
                            onChange={(e) => setDraftAftercare(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#0D9488]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-3.5 py-1.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => saveNotes(app.id)}
                          className="px-4 py-1.5 rounded-full bg-[#0B4F6C] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          Save & Sync to Patient Portal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-xl bg-[#F8FBFD] border border-slate-200/70 px-3.5 py-2.5 text-slate-600">
                        <span className="font-bold text-[#0B4F6C]">
                          Doctor Note:
                        </span>{" "}
                        {app.doctorNote || "None added yet."}
                      </div>
                      <div className="rounded-xl bg-teal-50/50 border border-teal-200/60 px-3.5 py-2.5 text-slate-600">
                        <span className="font-bold text-[#0D9488]">
                          Aftercare:
                        </span>{" "}
                        {app.aftercare || "Standard post-visit care."}
                      </div>
                    </div>
                  )}

                  {/* Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-mono font-semibold text-slate-600">
                      Private Contact: +91 {app.phone}
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openNoteEditor(app)}
                        className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-[#0B4F6C] text-slate-700 hover:text-[#0B4F6C] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        Edit Notes / Aftercare
                      </button>

                      <a
                        href={`tel:+91${app.phone}`}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-semibold inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>

                      <button
                        type="button"
                        onClick={() => sendPatientReminder(app)}
                        className="px-3.5 py-1.5 rounded-full bg-[#1C7C46] hover:bg-[#166639] text-white font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Send WhatsApp Reminder
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================================================================ */}
        {/* ADMIN TAB 2: LIVE CHAIR SLOT BLOCKER                             */}
        {/* ================================================================ */}
        {activeTab === "slots" && (
          <div className="rounded-3xl bg-white border border-amber-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                  <Lock className="w-3 h-3" /> Admin Control Only
                </div>
                <h2 className="text-2xl font-bold text-[#0E2433]">
                  Live Dental Chair Slot Manager
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Tap any slot below to block it for surgeries, lunch breaks, or
                  walk-ins—it immediately greys out on the patient booking page.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {quickDates.map((qd) => (
                  <button
                    key={qd.iso}
                    type="button"
                    onClick={() => setSlotDate(qd.iso)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                      slotDate === qd.iso
                        ? "bg-[#0B4F6C] text-white border-[#0B4F6C]"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#0B4F6C]"
                    }`}
                  >
                    {qd.label}
                  </button>
                ))}
                <input
                  type="date"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="bg-[#F8FBFD] border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none [color-scheme:light]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CLINIC_TIME_SLOTS.map((time) => {
                const key = `${slotDate}|${time}`;
                const isBlocked = clinicState.blockedSlots.includes(key);
                const bookedBy = clinicState.appointments.find(
                  (a) =>
                    a.date === slotDate &&
                    a.slot === time &&
                    a.status !== "Cancelled"
                );

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleSlotBlocked(time)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                      isBlocked
                        ? "bg-rose-50 border-rose-300 text-rose-900"
                        : bookedBy
                        ? "bg-sky-50 border-sky-300 text-[#0B4F6C]"
                        : "bg-emerald-50/60 border-emerald-200 hover:border-emerald-400 text-emerald-950"
                    }`}
                  >
                    <div className="text-sm font-bold">{time}</div>
                    <div className="text-[11px] font-semibold">
                      {isBlocked
                        ? "Blocked by Doctor"
                        : bookedBy
                        ? `Booked: ${bookedBy.patientName.split(" ")[0]}`
                        : "Open Online"}
                    </div>
                    <div className="text-[10px] opacity-70 inline-flex items-center gap-1">
                      {isBlocked ? (
                        <>
                          <Lock className="w-3 h-3" /> Tap to reopen
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Tap to block
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}