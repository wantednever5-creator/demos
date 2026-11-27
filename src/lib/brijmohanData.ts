// src/lib/brijmohanData.ts
import type React from "react";

export const BM_VENUE = {
  name: "Brijmohan Palace Banquet",
  shortName: "Brijmohan Palace",
  locationTag: "Gas Godam Rd • Kusumkhera, Haldwani",
  address:
    "6F5V+MR8, Gas Godam Rd, Shiv Puram Phase -I, Shiv Puram Colony, Haldwani, Kusumkhera South, Uttarakhand 263139",
  shortAddress:
    "Gas Godam Rd, Shiv Puram Phase-I, Kusumkhera South, Haldwani",
  plusCode: "6F5V+MR8 Haldwani, Uttarakhand",
  mapsUrl: "https://maps.app.goo.gl/8SXDEj6zGa49hx339",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Brijmohan%20Palace%20banquet%2C%20Gas%20Godam%20Rd%2C%20Shiv%20Puram%20Phase%20-I%2C%20Kusumkhera%20South%2C%20Haldwani%2C%20Uttarakhand%20263139&t=&z=15&ie=UTF8&iwloc=&output=embed",
  phoneDisplay: "+91 70173 75504",
  phoneRaw: "07017375504",
  telHref: "tel:+917017375504",
  whatsappNumber: "917017375504",
  rating: "5.0",
  reviewCount: 49,
  verifiedBadges: [
    "Free On-Site Parking Lot",
    "Google Pay & UPI Accepted",
    "Modern Gender-Neutral Restrooms",
  ],
  agency: {
    name: "Tapecut Studios",
    site: "https://tapcut.info",
    siteDisplay: "tapcut.info",
    whatsapp: "917983115325",
  },
} as const;

export const BM_HERO_MEDIA = {
  image:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
  fallbackImage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
  alt: "Brijmohan Palace Banquet grand wedding and celebration venue in Kusumkhera, Haldwani",
} as const;

export const BM_SPECS = [
  { label: "Google Rating", value: "5.0 ★", sub: "49 Perfect Reviews" },
  { label: "Parking Facility", value: "Free Lot", sub: "Dedicated Guest Parking" },
  { label: "Digital Payments", value: "Google Pay", sub: "Hassle-Free UPI Booking" },
  { label: "Venue Facilities", value: "All-Inclusive", sub: "Hall, Lawn & Restrooms" },
] as const;

export interface BrijmohanSpace {
  id: string;
  category: string;
  name: string;
  tagline: string;
  capacity: string;
  setting: string;
  bestFor: string;
  description: string;
  highlights: string[];
  image: string;
  fallbackImage: string;
}

export const BM_SPACES: BrijmohanSpace[] = [
  {
    id: "palace-hall",
    category: "Signature Indoor Venue",
    name: "The Grand Palace AC Banquet Hall",
    tagline: "Immaculate, chandelier-lit interiors rated 5.0★ by Haldwani families",
    capacity: "250 – 550 Guests",
    setting: "Climate-Controlled Main Hall",
    bestFor: "Weddings, Sangeet Nights, Ring Ceremonies & Receptions",
    description:
      "A refined indoor banquet space engineered for comfort in every season. Clean architectural finishes, elevated varmala staging, and seamless dining layout keep every ritual effortless for elders and guests.",
    highlights: [
      "Centralized air conditioning & uninterrupted power backup",
      "Elevated floral & DJ stage with unobstructed guest sightlines",
      "Clean, modern gender-neutral washrooms & guest freshening areas",
      "Seamless Google Pay / UPI advance & transparent direct billing",
    ],
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "celebration-lawn",
    category: "Open-Air Grandeur",
    name: "The Evening Celebration Lawn",
    tagline: "Spacious open-air grounds for lavish weddings & culinary counters",
    capacity: "400 – 900+ Guests",
    setting: "Open-Air Lawn + Mandap Zone",
    bestFor: "Grand Wedding Receptions, Baraat Welcomes & Evening Dinners",
    description:
      "Thoughtfully planned for large Kumaon & North Indian weddings in Kusumkhera South—giving caterers dedicated live-stall lanes and families generous room for mandap rituals and evening lounging.",
    highlights: [
      "Grand illuminated entry gate on Gas Godam Road",
      "Separate buffet, chaat & live tandoor counter zones",
      "Warm ambient lighting & custom floral decor compatibility",
      "Direct indoor-to-lawn access for combined event bookings",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "parking-comfort",
    category: "Verified Guest Amenities",
    name: "Free Parking Lot, Suites & Modern Facilities",
    tagline: "Built around guest convenience in Shiv Puram Phase-I",
    capacity: "Free Parking + AC Family Rooms",
    setting: "Gas Godam Rd, Kusumkhera South",
    bestFor: "Outstation Relatives, Smooth Arrival & Family Comfort",
    description:
      "Every guest detail is accounted for—from a dedicated free on-site parking lot and clean gender-neutral restrooms to private bridal changing rooms and effortless digital payments via Google Pay.",
    highlights: [
      "Dedicated free on-site parking lot—zero roadside hassle",
      "Clean, well-maintained gender-neutral restrooms",
      "Google Pay & digital UPI payment acceptance for smooth bookings",
      "Well-connected Gas Godam Rd, Shiv Puram Colony location",
    ],
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  },
];

export interface BrijmohanGalleryItem {
  id: string;
  title: string;
  category: "Palace Hall" | "Wedding Lawn" | "Food & Decor" | "Events";
  caption: string;
  image: string;
  fallbackImage: string;
}

export const BM_GALLERY: BrijmohanGalleryItem[] = [
  {
    id: "bm-1",
    title: "Grand Varmala & Stage Backdrop",
    category: "Food & Decor",
    caption: "Customizable wedding stage styling with warm architectural lighting.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bm-2",
    title: "Air-Conditioned Palace Hall",
    category: "Palace Hall",
    caption: "Bright, spotless indoor reception seating built for all-weather comfort.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bm-3",
    title: "Illuminated Evening Lawn",
    category: "Wedding Lawn",
    caption: "Generous open-air venue space for grand Haldwani wedding dinners.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bm-4",
    title: "Live Catering & Buffet Lanes",
    category: "Food & Decor",
    caption: "Organized dining stations for smooth guest service without crowding.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bm-5",
    title: "Ring Ceremony & Sangeet Setup",
    category: "Palace Hall",
    caption: "Intimate celebration layouts designed for joyful family evenings.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bm-6",
    title: "Corporate Meets & Social Functions",
    category: "Events",
    caption: "Professional seating and hospitality for off-season corporate gatherings.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
];

export const BM_OFF_SEASON_EVENTS = [
  {
    badge: "80 – 450 Guests",
    title: "Corporate Meets, Conferences & Awards",
    detail:
      "Air-conditioned indoor hall, audio-visual stage readiness, free guest parking lot, and convenient Google Pay / digital invoicing for local businesses.",
  },
  {
    badge: "100 – 400 Guests",
    title: "Engagements, Haldi & Ring Ceremonies",
    detail:
      "Vibrant daytime setups or evening indoor receptions with clean washroom amenities, attentive staff, and direct zero-commission pricing.",
  },
  {
    badge: "100 – 350 Guests",
    title: "Milestone Birthdays & Anniversaries",
    detail:
      "Warm family-friendly layouts in Kusumkhera South with customizable multi-cuisine food counters and relaxed on-site parking.",
  },
] as const;

export const BM_REVIEWS = [
  {
    author: "Kamal Kishore Pandey",
    event: "Wedding & Reception",
    rating: 5,
    quote:
      "Truly deserves its 5.0 rating in Haldwani. Spotless hall, cooperative management, and the free parking lot on Gas Godam Road made it stress-free for every relative.",
  },
  {
    author: "Shweta Bora",
    event: "Engagement Ceremony",
    rating: 5,
    quote:
      "Very neat restrooms, beautiful lighting, and smooth arrangements from start to finish. Paying advances via Google Pay and dealing straight with management was super easy.",
  },
  {
    author: "Manoj Negi",
    event: "Family Celebration",
    rating: 5,
    quote:
      "Best banquet palace around Shiv Puram and Kusumkhera. Cleanliness, food counter space, and hospitality were top-notch—every guest complimented the venue.",
  },
] as const;

export function applyBmFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  img.src = fallbackUrl;
}

export function buildBmAvailabilityWhatsAppUrl(params: {
  guestName: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  spacePreference: string;
  notes?: string;
}): string {
  const formattedDate = params.eventDate
    ? new Date(params.eventDate + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Flexible / To be discussed";

  const lines = [
    `Namaste Brijmohan Palace Banquet team,`,
    ``,
    `I would like to check date availability & direct booking details:`,
    `• Name: ${params.guestName || "Family Inquiry"}`,
    `• Event: ${params.eventType}`,
    `• Preferred Date: ${formattedDate}`,
    `• Expected Guests: ${params.guestCount}`,
    `• Space Needed: ${params.spacePreference}`,
    ...(params.notes?.trim() ? [`• Note: ${params.notes.trim()}`] : []),
    ``,
    `Please confirm if this date is open so we can plan a venue visit.`,
  ];

  return `https://wa.me/${BM_VENUE.whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

export function buildBmFamilyShareUrl(currentUrl: string): string {
  const text = [
    `Check out *Brijmohan Palace Banquet, Haldwani* (Perfect 5.0★ • 49 Google Reviews — Gas Godam Rd, Shiv Puram Phase-I, Kusumkhera South).`,
    `AC Banquet Hall, Wedding Lawn, Free Parking Lot & Google Pay booking — all details in one clean link:`,
    currentUrl,
  ].join("\n\n");

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}