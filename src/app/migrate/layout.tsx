import type { Metadata } from "next";
import React from "react";
import { MONEY_BACK_DAYS } from "@/lib/data/plans";

export const metadata: Metadata = {
  title: "Migrate to Limespun — White-glove migration in 14 days, free | Limespun",
  description:
    `Migrate from DaySmart, Mangomint, Fresha, TattooGenda, Vagaro, or a Google spreadsheet. White-glove migration included on every plan. ${MONEY_BACK_DAYS}-day money-back guarantee.`,
  openGraph: {
    title: "Migrate to Limespun — 14 days, white-glove",
    description:
      `White-glove migration included on every plan. ${MONEY_BACK_DAYS}-day money-back guarantee.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
