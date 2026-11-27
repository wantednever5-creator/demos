    // src/lib/venueData.ts
    import type React from "react";

    export const VENUE = {
    name: "Vatika Banquet & Lawns",
    shortName: "VATIKA",
    tagline: "Kathgodam • Haldwani",
    address:
        "Vatika Banquet Hall, Bareilly - Nainital Rd, Opposite LIC Building, Tedhi Pulia, Kathgodam, Haldwani, Uttarakhand 263126",
    shortAddress:
        "Bareilly–Nainital Rd, Opp. LIC Building, Tedhi Pulia, Kathgodam, Haldwani",
    plusCode: "6GWQ+QV Haldwani, Uttarakhand",
    mapsUrl: "https://maps.app.goo.gl/KKWZGrtiip1NrQRG6",
    mapsEmbedUrl:
        "https://maps.google.com/maps?q=Vatika%20Banquet%20Hall%2C%20Bareilly%20-%20Nainital%20Rd%2C%20Tedhi%20Pulia%2C%20Kathgodam%2C%20Haldwani%2C%20Uttarakhand%20263126&t=&z=15&ie=UTF8&iwloc=&output=embed",
    phoneDisplay: "+91 82180 55579",
    phoneRaw: "08218055579",
    telHref: "tel:+918218055579",
    whatsappNumber: "918218055579",
    rating: "4.7",
    reviewCount: 51,
    agency: {
    name: "Tapecut Studios",
    site: "https://tapcut.info",
    siteDisplay: "tapcut.info",
    phone: "7983115325",
    whatsapp: "917983115325",
  },
    } as const;

    export const HERO_MEDIA = {
    image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
    fallbackImage:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85",
    alt: "Vatika Banquet & Lawns, Kathgodam, Haldwani illuminated for an evening celebration",
    } as const;

    export const KEY_SPECS = [
    { label: "Total Capacity", value: "100 – 1,000+", sub: "Lawn + Indoor Hall" },
    { label: "Dedicated Parking", value: "120+ Cars", sub: "Main Highway Access" },
    { label: "Guest Suites", value: "AC Rooms", sub: "Bridal & Family Stay" },
    { label: "Google Rating", value: "4.7 ★", sub: "51 Verified Reviews" },
    ] as const;

    export interface VenueSpace {
    id: string;
    tag: string;
    name: string;
    subtitle: string;
    capacity: string;
    areaNote: string;
    bestFor: string;
    description: string;
    highlights: string[];
    image: string;
    fallbackImage: string;
    }

    export const VENUE_SPACES: VenueSpace[] = [
    {
        id: "grand-lawn",
        tag: "01 // OPEN-AIR CELEBRATION",
        name: "The Grand Wedding Lawn",
        subtitle: "Lush manicured greens beneath the Kumaon evening sky",
        capacity: "500 – 1,000 Guests",
        areaNote: "Expansive Open Lawn + Mandap Stage",
        bestFor: "Grand Weddings, Receptions & Baraat Welcomes",
        description:
        "Designed for grand Haldwani weddings where space never feels cramped. Accommodates lavish multi-cuisine buffet counters, a royal varmala stage, dedicated baraat entry lane, and open-air lounge seating.",
        highlights: [
        "Grand illuminated entry gate & floral mandap zone",
        "Separate dining & live catering counter layout",
        "Full generator backup & ambient warm floodlighting",
        "Direct access from Bareilly–Nainital Highway",
        ],
        image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        fallbackImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
    },
    {
        id: "royal-hall",
        tag: "02 // CLIMATE-CONTROLLED LUXURY",
        name: "The Royal AC Banquet Hall",
        subtitle: "Chandelier-lit indoor elegance for all-weather comfort",
        capacity: "250 – 500 Guests",
        areaNote: "Pillar-Minimal Grand Hall + Pre-Function Area",
        bestFor: "Sangeet Nights, Ring Ceremonies, Winter & Monsoon Events",
        description:
        "A refined indoor sanctuary with high ceilings, warm architectural lighting, and acoustic-ready staging—giving families total peace of mind regardless of weather or season.",
        highlights: [
        "Centralized heavy-duty air conditioning",
        "Elevated stage for DJ, sangeet & family performances",
        "Seamless indoor-to-lawn connectivity for combo bookings",
        "Spotless washrooms & dedicated service staff corridor",
        ],
        image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
        fallbackImage:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=85",
    },
    {
        id: "suites-parking",
        tag: "03 // HOSPITALITY & CONVENIENCE",
        name: "Bridal Suites, Rooms & Highway Parking",
        subtitle: "Stress-free logistics for outstation relatives & VIP guests",
        capacity: "Family Rooms + 120+ Vehicles",
        areaNote: "Opposite LIC Building, Tedhi Pulia",
        bestFor: "Outstation Guests, Bride/Groom Prep & Hassle-Free Arrival",
        description:
        "Located right on Bareilly–Nainital Road in Kathgodam, guests traveling from Nainital, Rudrapur, or Bareilly reach Vatika without getting stuck in narrow city lanes.",
        highlights: [
        "Well-appointed AC bridal & family changing rooms",
        "Wide, organized parking lot with easy highway exit",
        "Minutes from Kathgodam Railway Station",
        "Wheelchair-accessible ground-level entry",
        ],
        image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=85",
        fallbackImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85",
    },
    ];

    export interface GalleryItem {
    id: string;
    title: string;
    category: "Lawn" | "Banquet Hall" | "Decor & Catering" | "Events";
    caption: string;
    image: string;
    fallbackImage: string;
    }

    export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: "g1",
        title: "Grand Lawn & Mandap Stage",
        category: "Lawn",
        caption: "Open-air evening setup ready for 500–1,000 wedding guests.",
        image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "g2",
        title: "Air-Conditioned Banquet Hall",
        category: "Banquet Hall",
        caption: "All-weather indoor reception and sangeet seating.",
        image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "g3",
        title: "Illuminated Night Celebrations",
        category: "Lawn",
        caption: "Grand baraat welcome entrance right off Bareilly–Nainital Road.",
        image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "g4",
        title: "Dining & Live Catering Counters",
        category: "Decor & Catering",
        caption: "Spacious buffet zones with smooth guest movement.",
        image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "g5",
        title: "Stage & Floral Backdrop",
        category: "Decor & Catering",
        caption: "Custom varmala, ring ceremony, and reception stage styling.",
        image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "g6",
        title: "Corporate Meets & Family Gatherings",
        category: "Events",
        caption: "Flexible indoor seating for conferences, birthdays & anniversaries.",
        image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        fallbackImage:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    },
    ];

    export const OFF_SEASON_EVENTS = [
    {
        code: "CORP-01",
        title: "Corporate Conferences & Dealer Meets",
        capacity: "80 – 450 Attendees",
        detail:
        "Full AC hall seating, projector & sound-ready stage, tea/lunch buffet service, and effortless highway parking for Kumaon region companies.",
    },
    {
        code: "FAM-02",
        title: "Milestone Birthdays & Anniversaries",
        capacity: "100 – 350 Guests",
        detail:
        "Intimate warm lighting setups and curated indoor/outdoor spaces for silver jubilees, kids' milestone celebrations, and family reunions.",
    },
    {
        code: "CER-03",
        title: "Engagements, Haldi & Ring Ceremonies",
        capacity: "150 – 500 Guests",
        detail:
        "Daytime sunlit lawn decor for vibrant Haldi/Mehendi events or evening cocktail-style hall setups with zero middleman markups.",
    },
    ] as const;

    export const GOOGLE_REVIEWS = [
    {
        author: "Rajesh Pant",
        event: "Wedding Reception",
        rating: 5,
        quote:
        "Hosted my sister's wedding here—the lawn size and parking right on the Nainital highway made everything smooth for relatives coming from outside Haldwani. Management was super cooperative.",
    },
    {
        author: "Ankita Joshi",
        event: "Engagement & Sangeet",
        rating: 5,
        quote:
        "Very neat AC banquet hall and spacious rooms for the family. Unlike venues tucked inside crowded lanes, guests found Vatika immediately opposite the LIC building.",
    },
    {
        author: "Deepak Bisht",
        event: "Family Celebration",
        rating: 5,
        quote:
        "Best value in the Tedhi Pulia – Kathgodam stretch. Clean washrooms, strong power backup, and generous space for separate catering stalls without any crowd congestion.",
    },
    ] as const;

    export function applyImageFallback(
    e: React.SyntheticEvent<HTMLImageElement>,
    fallbackUrl: string
    ) {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackUrl;
    }

    export function buildAvailabilityWhatsAppUrl(params: {
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
        `Namaste Vatika Banquet & Lawns team,`,
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

    return `https://wa.me/${VENUE.whatsappNumber}?text=${encodeURIComponent(
        lines.join("\n")
    )}`;
    }

    export function buildFamilyShareWhatsAppUrl(currentUrl: string): string {
    const text = [
        `Check out *Vatika Banquet & Lawns, Haldwani* (4.7★ on Google — Opp. LIC Building, Tedhi Pulia, Kathgodam).`,
        `Lawn + AC Hall, 100–1,000+ guest capacity & highway parking — all details in one clean link:`,
        currentUrl,
    ].join("\n\n");

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
    }