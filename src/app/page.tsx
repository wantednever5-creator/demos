// src/app/page.tsx
import type { Metadata } from "next";
import { ArrowUpRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Preview Portal | Tapecut Studios",
  description: "Private interactive website previews crafted by Tapecut Studios.",
};

export default function PreviewPortalPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F1C18] flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-3xl bg-white border border-stone-200/80 p-8 sm:p-10 text-center space-y-6 shadow-[0_24px_60px_-20px_rgba(31,28,24,0.08)]">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDF5F0] text-[#1C3B2E] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Tapecut Studios
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1F1C18]">
            Client Preview Portal
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Open the direct preview link shared with you on WhatsApp to view
            your custom website prototype.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="https://tapcut.info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1C3B2E] hover:bg-[#152E24] text-white text-xs font-semibold tracking-wide transition-colors"
          >
            Visit tapecut.info
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}