import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Switch from Fresha to Limespun | Limespun",
  description:
    "Switching from Fresha: we move your clients, bookings, deposits and signed forms for you, on every plan. One flat monthly plan, no Limespun fee on bookings or deposits.",
  openGraph: {
    title: "Switch from Fresha to Limespun",
    description: "Migration included on every plan. No Limespun fee on bookings or deposits.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/fresha" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
