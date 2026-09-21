import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/brand";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Limespun — The Studio OS for Tattoo",
  description:
    "Bookings, deposits, projects, portfolio, consent, payments, messages — one quiet system built for tattoo studios. Multi-session projects, allergy intelligence, deposit pools, EU REACH compliance.",
  keywords: [
    "tattoo studio software",
    "tattoo booking",
    "tattoo management",
    "studio OS",
    "tattoo appointment",
    "REACH compliance",
  ],
  openGraph: {
    title: "Limespun — The Studio OS for Tattoo",
    description:
      "One quiet system that understands multi-session work, red-ink allergies, and deposits split across five visits.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Limespun — The Studio OS for Tattoo",
    description:
      "One quiet system that understands multi-session work, red-ink allergies, and deposits split across five visits.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
