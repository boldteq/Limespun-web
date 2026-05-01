import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Migrate to InkOS — White-glove migration in 14 days, free | InkOS",
  description:
    "Migrate from DaySmart, Mangomint, Fresha, TattooGenda, Vagaro, or a Google spreadsheet. White-glove migration included on every Studio plan and above. We don't bill until your last appointment from your old tool clears.",
  openGraph: {
    title: "Migrate to InkOS — 14 days, white-glove",
    description:
      "White-glove migration included on every Studio plan. We don't bill until your last appointment clears.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/migrate" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
