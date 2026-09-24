import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Switch from DaySmart Body Art to Limespun | Limespun",
  description:
    "Switching from DaySmart Body Art: we move your clients, bookings, deposits and signed forms for you, on every plan. Usually a week or two, with DaySmart running alongside.",
  openGraph: {
    title: "Switch from DaySmart to Limespun",
    description: "Migration included on every plan. Multi-session projects, one deposit pool, allergy flags on every booking.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/daysmart" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
