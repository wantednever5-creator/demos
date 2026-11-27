// src/lib/gurukripaStore.ts

export type AppointmentUrgency = "Normal" | "Emergency";
export type AppointmentStatus =
  | "Scheduled"
  | "Checked In"
  | "In Chair"
  | "Completed"
  | "Cancelled";

export interface DentalAppointment {
  id: string;
  patientName: string;
  phone: string;
  age: string;
  service: string;
  date: string; // YYYY-MM-DD
  slot: string; // e.g. "11:00 AM"
  urgency: AppointmentUrgency;
  sedationRequested: boolean;
  paymentPreference: "Google Pay / UPI" | "NFC Tap-to-Pay" | "Payment Plan (EMI)" | "Cash / Card";
  notes: string;
  status: AppointmentStatus;
  chair: "Chair 1 (Main)" | "Chair 2 (Cosmetic/Kids)" | "Emergency Bay";
  doctorNote?: string;
  aftercare?: string;
  createdAt: string;
}

export interface ClinicDemoState {
  appointments: DentalAppointment[];
  blockedSlots: string[]; // Format: "YYYY-MM-DD|HH:MM AM"
}

export const CLINIC_STORAGE_KEY = "tapecut_gurukripa_dental_v1";

export const DEMO_ADMIN_CREDENTIALS = {
  staffId: "admin",
  pin: "4817",
} as const;

export const DEMO_PATIENT_SAMPLE = {
  phone: "9837041209",
  token: "GK-204",
} as const;

export const CLINIC_TIME_SLOTS = [
  "10:00 AM",
  "10:45 AM",
  "11:30 AM",
  "12:15 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:15 PM",
  "06:30 PM",
  "07:15 PM",
] as const;

export function getTodayIso(): string {
  return new Date().toISOString().split("T")[0];
}

export function getOffsetDateIso(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split("T")[0];
}

export function formatClinicDate(iso: string): string {
  if (!iso) return "Today";
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function getInitialClinicState(): ClinicDemoState {
  const today = getTodayIso();
  const tomorrow = getOffsetDateIso(1);

  return {
    appointments: [
      {
        id: "GK-205",
        patientName: "Prakash Singh Rawat",
        phone: "9756128840",
        age: "42",
        service: "Same-Day Emergency Toothache & Root Canal",
        date: today,
        slot: "11:30 AM",
        urgency: "Emergency",
        sedationRequested: true,
        paymentPreference: "Google Pay / UPI",
        notes: "Severe lower molar pain since last night, mild swelling.",
        status: "Checked In",
        chair: "Emergency Bay",
        doctorNote: "Priority digital X-ray & rotary RCT sitting #1.",
        aftercare: "Avoid chewing on left side for 24 hrs. Cold compress if needed.",
        createdAt: "35 mins ago",
      },
      {
        id: "GK-204",
        patientName: "Anjali Joshi",
        phone: "9837041209",
        age: "29",
        service: "Digital Smile Makeover & Veneers",
        date: today,
        slot: "04:00 PM",
        urgency: "Normal",
        sedationRequested: false,
        paymentPreference: "Payment Plan (EMI)",
        notes: "Interested in 4-tooth porcelain veneer preview & 6-month EMI split.",
        status: "Scheduled",
        chair: "Chair 2 (Cosmetic/Kids)",
        doctorNote: "Digital shade scan completed. Trial smile mockup ready.",
        aftercare: "Use soft-bristle brush; avoid staining beverages for 48 hrs post bonding.",
        createdAt: "2 hrs ago",
      },
      {
        id: "GK-203",
        patientName: "Aarav Pant (Pediatric)",
        phone: "9412088712",
        age: "8",
        service: "Gentle Kids Dentistry & Cavity Shield",
        date: tomorrow,
        slot: "10:45 AM",
        urgency: "Normal",
        sedationRequested: false,
        paymentPreference: "NFC Tap-to-Pay",
        notes: "First dental visit; parent requested gentle fear-free checkup.",
        status: "Scheduled",
        chair: "Chair 2 (Cosmetic/Kids)",
        doctorNote: "Fluoride varnish & molar sealant evaluation.",
        aftercare: "No food or water for 30 mins after fluoride coat.",
        createdAt: "Yesterday",
      },
    ],
    blockedSlots: [`${today}|10:00 AM`, `${today}|02:00 PM`],
  };
}

export function loadClinicState(): ClinicDemoState {
  if (typeof window === "undefined") return getInitialClinicState();
  try {
    const raw = localStorage.getItem(CLINIC_STORAGE_KEY);
    if (!raw) return getInitialClinicState();
    const parsed = JSON.parse(raw) as Partial<ClinicDemoState>;
    if (!Array.isArray(parsed.appointments)) return getInitialClinicState();
    return {
      appointments: parsed.appointments,
      blockedSlots: Array.isArray(parsed.blockedSlots)
        ? parsed.blockedSlots
        : [],
    };
  } catch {
    return getInitialClinicState();
  }
}

export function saveClinicState(state: ClinicDemoState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CLINIC_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }
}