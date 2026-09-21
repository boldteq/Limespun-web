import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Migrate from Fresha to Limespun — Keep your bookings, leave the platform fee | Limespun",
  description:
    "Fresha users: keep every booking, every client, every deposit. Stop paying Fresha's 1.95% transaction fee. 5-day migration. Limespun is built for tattoo, not haircuts.",
  openGraph: {
    title: "Migrate from Fresha to Limespun — Keep your bookings",
    description:
      "Stop paying Fresha's 1.95% per-transaction fee. 5-day migration, white-glove.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/fresha" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
