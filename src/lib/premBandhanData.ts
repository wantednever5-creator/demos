// src/lib/premBandhanData.ts
import type React from "react";

export const PREM_VENUE = {
  name: "Prem Bandhan",
  subtitle: "Banquet & Wedding Lawns",
  locationTag: "Lal Danth Bypass • Haldwani",
  address:
    "Lal Danth Bypass Rd, near Primary School, Malli Bamori, Shiv Puri, Haldwani, Bithoria No1, Uttarakhand 263139",
  shortAddress: "Lal Danth Bypass Rd, Malli Bamori, Shiv Puri, Haldwani",
  plusCode: "6GJ9+GM Haldwani, Uttarakhand",
  mapsUrl: "https://maps.app.goo.gl/R2kHtzXQKBh5oZuQ8",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Prem%20Bandhan%2C%20Lal%20Danth%20Bypass%20Rd%2C%20Malli%20Bamori%2C%20Shiv%20Puri%2C%20Haldwani%2C%20Uttarakhand%20263139&t=&z=15&ie=UTF8&iwloc=&output=embed",
  phoneDisplay: "+91 94120 40592",
  phoneRaw: "09412040592",
  telHref: "tel:+919412040592",
  whatsappNumber: "919412040592",
  rating: "4.7",
  reviewCount: 91,
  agency: {
    name: "Tapecut Studios",
    site: "https://tapcut.info",
    siteDisplay: "tapcut.info",
    whatsapp: "917983115325",
  },
} as const;

export const PB_HERO_MEDIA = {
  image:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
  fallbackImage:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
  alt: "Prem Bandhan wedding lawn and banquet celebration in Haldwani",
} as const;

export const PB_SPECS = [
  { label: "Google Rating", value: "4.7 ★", sub: "91 Verified Reviews" },
  { label: "Guest Capacity", value: "150 – 1,000+", sub: "Lawn & Indoor Hall" },
  { label: "Bypass Parking", value: "Spacious Lot", sub: "Lal Danth Bypass Rd" },
  { label: "Family Suites", value: "AC Rooms", sub: "Bridal & Guest Stay" },
] as const;

export interface PremSpace {
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

export const PB_SPACES: PremSpace[] = [
  {
    id: "celebration-lawn",
    category: "Open-Air Grandeur",
    name: "The Prem Bandhan Wedding Lawn",
    tagline: "Lush, expansive greens tailored for grand Kumaoni & North Indian weddings",
    capacity: "500 – 1,000+ Guests",
    setting: "Open-Air Lawn & Varmala Stage",
    bestFor: "Grand Weddings, Baraat Welcomes & Evening Receptions",
    description:
      "Built to host large family gatherings effortlessly without crowding. Offers generous room for a statement floral mandap, royal varmala stage, multi-counter catering zones, and relaxed family seating.",
    highlights: [
      "Wide illuminated entrance ideal for grand baraat processions",
      "Dedicated dining & live stall layout for smooth guest flow",
      "Warm ambient lighting & reliable full-load power backup",
      "Easy bypass road approach away from downtown traffic jams",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "banquet-hall",
    category: "Indoor Elegance",
    name: "The Imperial AC Banquet Hall",
    tagline: "Refined, climate-controlled comfort for every season",
    capacity: "200 – 500 Guests",
    setting: "Fully Air-Conditioned Indoor Hall",
    bestFor: "Sangeet Nights, Ring Ceremonies, Monsoon & Winter Events",
    description:
      "A clean, brightly dressed indoor hall featuring warm architectural lighting and an unobstructed stage view—keeping elders and guests comfortable through peak summers, winter nights, and unexpected rain.",
    highlights: [
      "Powerful centralized air conditioning & ventilation",
      "Acoustic-friendly stage for DJ, sangeet & family performances",
      "Direct transition to the outdoor lawn for combo bookings",
      "Clean, well-maintained washrooms & dedicated service corridor",
    ],
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "hospitality-access",
    category: "Comfort & Convenience",
    name: "Bridal Suites, Guest Rooms & Bypass Parking",
    tagline: "Effortless arrival and private comfort for outstation relatives",
    capacity: "AC Rooms + Ample Parking",
    setting: "Malli Bamori • Lal Danth Bypass Rd",
    bestFor: "Bride/Groom Preparation, Outstation Guests & Stress-Free Arrival",
    description:
      "Positioned directly along Lal Danth Bypass Road in Malli Bamori, Prem Bandhan lets relatives from across Haldwani, Kaladhungi, and Nainital arrive and park without navigating congested city lanes.",
    highlights: [
      "Private air-conditioned bridal & family changing suites",
      "Organized on-site vehicle parking with smooth exit",
      "Calm, residential Shiv Puri / Malli Bamori neighborhood",
      "Ground-level accessibility for senior family members",
    ],
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
  },
];

export interface PremGalleryItem {
  id: string;
  title: string;
  category: "Wedding Lawn" | "AC Hall" | "Decor & Stage" | "Gatherings";
  caption: string;
  image: string;
  fallbackImage: string;
}

export const PB_GALLERY: PremGalleryItem[] = [
  {
    id: "pb-1",
    title: "Royal Varmala & Floral Stage",
    category: "Decor & Stage",
    caption: "Customizable wedding stage backdrops framed in warm evening lights.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pb-2",
    title: "Grand Indoor Reception Layout",
    category: "AC Hall",
    caption: "Climate-controlled banquet hall designed for comfortable dining and ceremonies.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pb-3",
    title: "Evening Open-Air Celebrations",
    category: "Wedding Lawn",
    caption: "Spacious lawn setup built to host 500–1,000+ wedding guests effortlessly.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pb-4",
    title: "Multi-Cuisine Catering Counters",
    category: "Decor & Stage",
    caption: "Dedicated buffet lanes keeping dining spacious and congestion-free.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pb-5",
    title: "Sangeet & Ring Ceremony Ambience",
    category: "Wedding Lawn",
    caption: "Warm string lighting and lounge zones for joyful family evenings.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "pb-6",
    title: "Corporate Meets & Social Events",
    category: "Gatherings",
    caption: "Flexible seating for conferences, seminars, and milestone anniversaries.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
  },
];

export const PB_OFF_SEASON_EVENTS = [
  {
    badge: "80 – 450 Guests",
    title: "Corporate Conferences & Seminars",
    detail:
      "Quiet Lal Danth Bypass accessibility, air-conditioned indoor hall, audio-visual stage readiness, and full lunch/hi-tea service for regional businesses.",
  },
  {
    badge: "100 – 400 Guests",
    title: "Engagements, Haldi & Ring Ceremonies",
    detail:
      "Bright daytime lawn styling for Haldi & Mehendi rituals or intimate evening indoor functions with transparent, direct-from-management packages.",
  },
  {
    badge: "100 – 350 Guests",
    title: "Anniversaries, Birthdays & Family Meets",
    detail:
      "Warm, welcoming setups for silver jubilees, milestone birthdays, and retirement celebrations without paying third-party portal commissions.",
  },
] as const;

export const PB_REVIEWS = [
  {
    author: "Neeraj Tiwari",
    event: "Wedding & Reception",
    rating: 5,
    quote:
      "One of the cleanest and best-managed banquet venues in the Lal Danth – Malli Bamori belt. Plenty of space for guests and zero parking headache on the bypass road.",
  },
  {
    author: "Pooja Rawat",
    event: "Ring Ceremony & Sangeet",
    rating: 5,
    quote:
      "We hosted our family function here and everyone praised the lighting, cleanliness, and cooperative staff. Outstation relatives loved how easy it was to locate.",
  },
  {
    author: "Harish Chandra Joshi",
    event: "Family Wedding",
    rating: 5,
    quote:
      "Spacious lawn, neat AC rooms for the family, and very honest dealing directly with management. Easily deserves its 4.7 rating in Haldwani.",
  },
] as const;

export function applyPremFallback(
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackUrl: string
) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied === "1") return;
  img.dataset.fallbackApplied = "1";
  img.src = fallbackUrl;
}

export function buildPremAvailabilityWhatsAppUrl(params: {
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
    `Namaste Prem Bandhan team,`,
    ``,
    `I would like to check date availability & direct booking details:`,
    `• Name: ${params.guestName || "Family Inquiry"}`,
    `• Event: ${params.eventType}`,
    `• Preferred Date: ${formattedDate}`,
    `• Expected Guests: ${params.guestCount}`,
    `• Space Needed: ${params.spacePreference}`,
    ...(params.notes?.trim() ? [`• Note: ${params.notes.trim()}`] : []),
    ``,
    `Please confirm if this date is open so we can schedule a venue visit.`,
  ];

  return `https://wa.me/${PREM_VENUE.whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

export function buildPremFamilyShareUrl(currentUrl: string): string {
  const text = [
    `Take a look at *Prem Bandhan, Haldwani* (4.7★ • 91 Google Reviews — Lal Danth Bypass Rd, Malli Bamori).`,
    `Grand Wedding Lawn, AC Banquet Hall, Family Suites & Bypass Parking — everything in one clean link:`,
    currentUrl,
  ].join("\n\n");

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}