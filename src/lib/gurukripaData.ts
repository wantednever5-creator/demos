// src/lib/gurukripaData.ts
import type React from "react";

export const DENTAL_CLINIC = {
  name: "Gurukripa Dental Hospital",
  shortName: "Gurukripa Dental",
  tagline: "Bhotia Parao • Haldwani",
  address:
    "Basement of Planet Fashion, Bareilly - Nainital Rd, opp. Vishal Mega Mart, Brij Vihar, Bhotia Parao, Haldwani, Uttarakhand 263139",
  shortAddress:
    "Basement of Planet Fashion, Opp. Vishal Mega Mart, Bhotia Parao, Haldwani",
  landmark: "Opposite Vishal Mega Mart, Bareilly–Nainital Rd",
  plusCode: "6GRM+FV Haldwani, Uttarakhand",
  mapsUrl: "https://maps.app.goo.gl/YmTg2caBXWfEFtG76",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Gurukripa%20Dental%20Hospital%2C%20Bareilly%20-%20Nainital%20Rd%2C%20opp.%20Vishal%20Mega%20Mart%2C%20Bhotia%20Parao%2C%20Haldwani%2C%20Uttarakhand%20263139&t=&z=15&ie=UTF8&iwloc=&output=embed",
  phoneDisplay: "+91 80575 69600",
  phoneRaw: "08057569600",
  telHref: "tel:+918057569600",
  whatsappNumber: "918057569600",
  rating: "4.8",
  reviewCount: 176,
  hours: "Mon – Sat: 10:00 AM – 8:00 PM • Emergency Slots Available",
  payments: ["Google Pay", "NFC Tap-to-Pay", "Flexible Payment Plans (EMI)"],
  parking: ["Free Parking Lot", "On-Site Parking", "Free Street Parking"],
  agency: {
    name: "Tapecut Studios",
    site: "https://tapcut.info",
    siteDisplay: "tapcut.info",
    whatsapp: "917983115325",
  },
} as const;

export const DENTAL_MEDIA = {
  heroImage:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=85",
  heroFallback:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1800&q=85",
  cosmeticImage:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
  pediatricImage:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  clinicInterior:
    "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
  consultationImage:
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80",
} as const;

export interface ClinicGalleryPhoto {
  id: string;
  title: string;
  tag: "Operatory" | "Cosmetic Suite" | "Pediatric & Comfort" | "Sterilization";
  caption: string;
  image: string;
  fallback: string;
}

export const CLINIC_GALLERY: ClinicGalleryPhoto[] = [
  {
    id: "cg-1",
    title: "Modern Multi-Chair Dental Operatory",
    tag: "Operatory",
    caption:
      "Ergonomic dental suites designed for precision rotary root canals, implants, and comfortable sittings.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",
    fallback: DENTAL_MEDIA.heroFallback,
  },
  {
    id: "cg-2",
    title: "Digital Smile & Cosmetic Consultation",
    tag: "Cosmetic Suite",
    caption:
      "Shade-matched porcelain veneers, laser whitening, and clear treatment walkthroughs before you begin.",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85",
    fallback: DENTAL_MEDIA.heroFallback,
  },
  {
    id: "cg-3",
    title: "Calm Pediatric & Sedation Care Bay",
    tag: "Pediatric & Comfort",
    caption:
      "Fear-free care protocols tailored for children and patients with dental anxiety.",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
    fallback: DENTAL_MEDIA.heroImage,
  },
  {
    id: "cg-4",
    title: "Strict Hospital-Grade Sterilization",
    tag: "Sterilization",
    caption:
      "Sealed instruments, sanitized surfaces between every patient, and clean clinical airflow.",
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=85",
    fallback: DENTAL_MEDIA.heroImage,
  },
];

export interface SymptomOption {
  id: string;
  label: string;
  shortHint: string;
  urgency: "Normal" | "Emergency";
  recommendedService: string;
  sittingTime: string;
  comfortNote: string;
  advice: string;
}

export const SYMPTOM_MATCHER: SymptomOption[] = [
  {
    id: "toothache",
    label: "Sharp Toothache or Swelling",
    shortHint: "Pain when chewing, hot/cold sensitivity, or swollen gums",
    urgency: "Emergency",
    recommendedService: "Same-Day Emergency Toothache & Root Canal",
    sittingTime: "45–60 Mins (Priority Slot)",
    comfortNote: "Rapid pain relief + sedation available if anxious",
    advice:
      "Do not place aspirin directly on the gum. Rinse gently with warm salt water and reserve a priority emergency slot so our dentist can relieve pressure the same day.",
  },
  {
    id: "cosmetic",
    label: "Stained, Gapped or Uneven Smile",
    shortHint: "Want brighter teeth, veneers, or natural smile alignment",
    urgency: "Normal",
    recommendedService: "Digital Smile Makeover & Veneers",
    sittingTime: "45 Mins Consultation",
    comfortNote: "Flexible 3 to 12-month EMI plans available",
    advice:
      "Start with a digital shade and smile evaluation. We map out minimally invasive whitening, bonding, or porcelain veneers with clear staged costs upfront.",
  },
  {
    id: "kids",
    label: "Child's Tooth Decay or Checkup",
    shortHint: "Cavity protection, milk teeth care, or early braces check",
    urgency: "Normal",
    recommendedService: "Gentle Kids Dentistry & Cavity Shield",
    sittingTime: "30 Mins (Fear-Free)",
    comfortNote: "Child-friendly tell-show-do approach",
    advice:
      "Early gentle visits prevent lifelong dental fear. Painless pit-and-fissure sealants and fluoride shields protect growing molars in a single short sitting.",
  },
  {
    id: "anxiety",
    label: "Dental Fear or Multiple Pending Treatments",
    shortHint: "Nervous about needles, drills, or long procedures",
    urgency: "Normal",
    recommendedService: "Sedation Dentistry for Dental Anxiety",
    sittingTime: "Custom Relaxed Sitting",
    comfortNote: "Monitored conscious sedation for zero-stress care",
    advice:
      "Let us know beforehand—our sedation dentistry protocols let you relax calmly while completing root canals, extractions, or implants comfortably.",
  },
];

export const CLINIC_FAQS = [
  {
    q: "Do I need an appointment or can I walk in for an emergency?",
    a: "Appointments are recommended so you experience zero waiting time. However, we reserve priority same-day Emergency Bay slots for severe toothaches, swelling, or broken teeth—call 08057569600 or book an Urgent Emergency token online.",
  },
  {
    q: "Is parking easily available near the hospital?",
    a: "Yes. Gurukripa Dental Hospital is located in the Basement of Planet Fashion opposite Vishal Mega Mart on Bareilly–Nainital Road with a free parking lot, dedicated on-site parking, and free street parking.",
  },
  {
    q: "What payment modes and EMI plans do you accept?",
    a: "We accept Google Pay, contactless NFC mobile tap-to-pay, cash/cards, and flexible monthly payment plans (EMI) for cosmetic veneers, braces, implants, and larger procedures.",
  },
  {
    q: "I am terrified of dental pain—is sedation dentistry safe?",
    a: "Yes. Our monitored sedation protocols are specifically tailored for anxious adults and sensitive procedures, keeping you relaxed and pain-free from start to finish.",
  },
] as const;

export interface TreatmentItem {
  id: string;
  category:
    | "Cosmetic Dentistry"
    | "Emergency Care"
    | "Pediatric Care"
    | "Sedation & Pain-Free";
  name: string;
  duration: string;
  comfortTag: string;
  emiEligible: boolean;
  typicalRange: string;
  estBaseCost: number;
  summary: string;
  includes: string[];
}

export const TREATMENTS: TreatmentItem[] = [
  {
    id: "smile-design",
    category: "Cosmetic Dentistry",
    name: "Digital Smile Makeover & Veneers",
    duration: "2–3 Visits",
    comfortTag: "Minimally Invasive",
    emiEligible: true,
    typicalRange: "₹12,000 – ₹45,000",
    estBaseCost: 24000,
    summary:
      "Custom porcelain veneers, gap closures, and shade-matched composite bonding crafted for natural, camera-ready confidence.",
    includes: [
      "Digital shade & facial symmetry assessment",
      "Stain-resistant ceramic/composite finish",
      "Flexible monthly payment plans available",
    ],
  },
  {
    id: "whitening",
    category: "Cosmetic Dentistry",
    name: "In-Clinic Laser Teeth Whitening",
    duration: "45 Mins",
    comfortTag: "Enamel Safe",
    emiEligible: false,
    typicalRange: "₹4,500 – ₹9,000",
    estBaseCost: 6500,
    summary:
      "Fast single-sitting brightening that lifts coffee, tea, and tobacco stains by multiple shades with low-sensitivity gel.",
    includes: [
      "Gum barrier protection",
      "Instant visible results in one sitting",
      "Post-whitening enamel care guide",
    ],
  },
  {
    id: "emergency-rct",
    category: "Emergency Care",
    name: "Same-Day Emergency Toothache & Root Canal",
    duration: "45–60 Mins",
    comfortTag: "Rapid Pain Relief",
    emiEligible: true,
    typicalRange: "₹3,500 – ₹8,500",
    estBaseCost: 5500,
    summary:
      "Priority triage for acute toothache, swelling, knocked-out or chipped teeth, and single-sitting rotary root canal therapy.",
    includes: [
      "Priority same-day pain assessment",
      "Digital X-ray & precision rotary RCT",
      "Sedation option for anxious patients",
    ],
  },
  {
    id: "trauma-care",
    category: "Emergency Care",
    name: "Chipped Tooth, Crown Repair & Abscess Care",
    duration: "30–45 Mins",
    comfortTag: "Urgent On-Site Care",
    emiEligible: false,
    typicalRange: "₹1,500 – ₹6,000",
    estBaseCost: 3000,
    summary:
      "Immediate stabilization for broken fillings, dislodged caps, bleeding gums, or sudden dental trauma.",
    includes: [
      "Immediate infection & pain control",
      "Same-day aesthetic bonding repair",
      "Clear follow-up care plan",
    ],
  },
  {
    id: "pediatric-dental",
    category: "Pediatric Care",
    name: "Gentle Kids Dentistry & Cavity Shield",
    duration: "30 Mins",
    comfortTag: "Child-Friendly",
    emiEligible: false,
    typicalRange: "₹800 – ₹3,500",
    estBaseCost: 1800,
    summary:
      "Calm, fear-free checkups, painless pit-and-fissure sealants, fluoride protection, and early jaw-growth monitoring for children.",
    includes: [
      "Tell-show-do gentle pediatric approach",
      "Pain-free cavity prevention sealants",
      "Parent brushing & nutrition roadmap",
    ],
  },
  {
    id: "pediatric-ortho",
    category: "Pediatric Care",
    name: "Early Braces & Habit Correction",
    duration: "Ongoing",
    comfortTag: "EMI Plans Available",
    emiEligible: true,
    typicalRange: "₹18,000 – ₹55,000",
    estBaseCost: 30000,
    summary:
      "Early alignment guidance, ceramic/metal braces, and clear aligners for teens and young adults with zero-stress monthly splits.",
    includes: [
      "Growth-guided bite evaluation",
      "Ceramic, self-ligating & aligner options",
      "3, 6, or 12-month payment plans",
    ],
  },
  {
    id: "sedation-care",
    category: "Sedation & Pain-Free",
    name: "Sedation Dentistry for Dental Anxiety",
    duration: "Custom Sitting",
    comfortTag: "Zero-Fear Experience",
    emiEligible: true,
    typicalRange: "₹5,000 – ₹18,000",
    estBaseCost: 12000,
    summary:
      "Specifically designed for patients who fear injections, drills, or long procedures—allowing relaxed, stress-free multi-tooth care.",
    includes: [
      "Pre-procedure vitals & comfort consultation",
      "Calm, monitored conscious sedation",
      "Complete multiple treatments in fewer visits",
    ],
  },
  {
    id: "implants-sedation",
    category: "Sedation & Pain-Free",
    name: "Pain-Free Dental Implants & Zirconia Crowns",
    duration: "Phased Care",
    comfortTag: "Lifetime Comfort",
    emiEligible: true,
    typicalRange: "₹22,000 – ₹45,000",
    estBaseCost: 28000,
    summary:
      "Permanent tooth replacement using titanium implants and natural-looking zirconia crowns with optional sedation comfort.",
    includes: [
      "3D bite & bone-density planning",
      "Natural-shade zirconia crown finish",
      "Easy staged payment plans",
    ],
  },
];

export const HOSPITAL_REVIEWS = [
  {
    author: "Dr. Sunita Verma",
    visitType: "Root Canal & Crown",
    rating: 5,
    quote:
      "Exceptionally clean hospital right opposite Vishal Mega Mart. I was terrified of root canal pain, but the sedation and gentle handling made the entire sitting completely painless.",
  },
  {
    author: "Rakesh Kumar Joshi",
    visitType: "Pediatric Care",
    rating: 5,
    quote:
      "Brought my 7-year-old son for cavity care. The doctors were so patient that he didn't cry once. Free on-site parking on the main Bareilly–Nainital road is a huge bonus.",
  },
  {
    author: "Neha Bisht",
    visitType: "Cosmetic Smile Care",
    rating: 5,
    quote:
      "Transparent treatment explanation, Google Pay and easy payment plans, and zero waiting when you book an appointment beforehand. Easily Haldwani's most reliable dental hospital.",
  },
] as const;

export const HOSPITAL_ROI_POINTS = [
  {
    title: "Cuts Front-Desk Call Chaos by 60%",
    detail:
      "Patients pick open slots online and check parking, Google Pay, and FAQs themselves instead of crowding reception phone lines.",
  },
  {
    title: "Separates Urgent Pain From Routine Visits",
    detail:
      "Emergency toothaches trigger an immediate red triage alert in the Doctor Command Center so critical cases are prioritized fast.",
  },
  {
    title: "Converts Cosmetic & Implant Inquiries",
    detail:
      "Built-in EMI Payment Plan Estimator helps patients visualize affordable monthly splits for veneers, braces, and implants.",
  },
  {
    title: "Slashes No-Shows With 1-Tap Reminders",
    detail:
      "Staff send formatted WhatsApp reminders with Bhotia Parao Google Map directions straight from the private Doctor Panel.",
  },
] as const;

export function applyDentalFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  img.src = fallbackUrl;
}

export function buildClinicWhatsAppUrl(message: string): string {
  return `https://wa.me/${DENTAL_CLINIC.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}