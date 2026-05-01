import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Artists, guests, payroll, commissions | InkOS",
  description:
    "The roster file for tattoo studios. Per-artist Stripe Connect, custom commission splits, guest residency bands, payroll-ready year-end exports.",
  openGraph: {
    title: "InkOS Team — Your roster, paid right",
    description: "Per-artist Stripe Connect, custom commission splits, guest residency bands, payroll-ready year-end exports.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/team" },
};

export default function TeamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
