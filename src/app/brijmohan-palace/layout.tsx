// src/app/brijmohan-palace/layout.tsx
import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bm-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bm-sans",
});

export const metadata: Metadata = {
  title: "Brijmohan Palace Banquet | 5.0★ Wedding & Event Venue in Haldwani",
  description:
    "Rated 5.0★ (49 Google reviews). Grand AC banquet hall, celebration lawn, free parking lot, Google Pay booking, and catering planner on Gas Godam Rd, Kusumkhera South, Haldwani.",
};

export default function BrijmohanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${lora.variable} ${jakarta.variable} [--font-serif:var(--font-bm-serif)] [--font-sans:var(--font-bm-sans)] bg-[#FAF9F6] text-[#17202D] font-sans antialiased selection:bg-[#162B47] selection:text-[#FAF9F6]`}
    >
      {children}
    </div>
  );
}