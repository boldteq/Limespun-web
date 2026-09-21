import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Migrate from DaySmart Body Art to Limespun — 9 days, white-glove | Limespun",
  description:
    "DaySmart users: keep every booking, deposit, client record. 9-day migration with 2 white-glove calls. Limespun is built for tattoo, not adapted for it.",
  openGraph: {
    title: "Migrate from DaySmart to Limespun — 9 days",
    description:
      "Keep every booking, deposit, client record. Limespun is built for tattoo, not adapted for it.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/daysmart" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
