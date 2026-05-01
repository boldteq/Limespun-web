import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Migrate from DaySmart Body Art to InkOS — 9 days, white-glove | InkOS",
  description:
    "DaySmart users: keep every booking, deposit, client record. 9-day migration with 2 white-glove calls. InkOS is built for tattoo, not adapted for it.",
  openGraph: {
    title: "Migrate from DaySmart to InkOS — 9 days",
    description:
      "Keep every booking, deposit, client record. InkOS is built for tattoo, not adapted for it.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/migrate/daysmart" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
