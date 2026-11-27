// src/app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vatika Banquet & Lawns | Premier Wedding & Event Venue in Haldwani",
  description:
    "Grand outdoor lawns, air-conditioned banquet hall, ample parking, and direct zero-commission bookings on Bareilly–Nainital Road, Kathgodam, Haldwani. Rated 4.7★ on Google.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF8F5] text-[#1F1C18] font-sans antialiased selection:bg-[#1C3B2E] selection:text-[#FAF8F5] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}