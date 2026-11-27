// src/app/gurukripa-dental/layout.tsx
import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/gurukripa/Navbar";
import Footer from "@/components/gurukripa/Footer";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import { DENTAL_CLINIC } from "@/lib/gurukripaData";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-gk-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gk-sans",
});

export const metadata: Metadata = {
  title: "Gurukripa Dental Hospital | 4.8★ Advanced Dental Care in Haldwani",
  description:
    "Rated 4.8★ (176 reviews). Cosmetic dentistry, emergency dental care, pediatric care & sedation dentistry opposite Vishal Mega Mart, Bhotia Parao, Haldwani. Free parking, Google Pay & EMI plans.",
};

export default function GurukripaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${instrumentSerif.variable} ${jakarta.variable} [--font-serif:var(--font-gk-serif)] [--font-sans:var(--font-gk-sans)] min-h-screen flex flex-col bg-[#F4F9FB] text-[#0E2433] font-sans antialiased selection:bg-[#0B4F6C] selection:text-white`}
    >
      <Navbar />
      <main className="flex-1 pt-[104px] sm:pt-[108px]">{children}</main>
      <Footer />

      {/* Mobile Sticky Clinic Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 grid grid-cols-2 gap-3 shadow-[0_-8px_30px_rgba(11,79,108,0.1)]">
        <a
          href={DENTAL_CLINIC.telHref}
          className="py-2.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          Emergency Call
        </a>
        <Link
          href="/gurukripa-dental/book"
          className="py-2.5 rounded-full bg-[#0B4F6C] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Slot
        </Link>
      </div>
    </div>
  );
}