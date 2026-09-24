import type { Metadata } from "next";
import React from "react";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

export const metadata: Metadata = {
  title: "Switch to Limespun: migration included on every plan | Limespun",
  description:
    `Switching from DaySmart, Mangomint, Fresha, TattooGenda, Vagaro or a spreadsheet: we move your clients, bookings, deposits and signed forms for you, on every plan. ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  openGraph: {
    title: "Switch to Limespun",
    description:
      `Migration included on every plan. Usually a week or two, with your old tool running alongside. ${MONEY_BACK_DAYS}-day money-back guarantee.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
