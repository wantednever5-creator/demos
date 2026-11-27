// src/app/prem-bandhan/layout.tsx
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-pb-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pb-sans",
});

export const metadata: Metadata = {
  title: "Prem Bandhan | Premier Wedding Lawn & Banquet Hall in Haldwani",
  description:
    "Rated 4.7★ (91 Google reviews). Grand wedding lawn, AC banquet hall, family suites, and bypass parking on Lal Danth Bypass Rd, Malli Bamori, Haldwani. Direct zero-commission bookings.",
};

export default function PremBandhanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} [--font-serif:var(--font-pb-serif)] [--font-sans:var(--font-pb-sans)] bg-[#FDFBF7] text-[#23191B] font-sans antialiased selection:bg-[#5E1928] selection:text-[#FDFBF7]`}
    >
      {children}
    </div>
  );
}