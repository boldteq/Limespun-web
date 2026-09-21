import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Artists, guests, payroll, commissions | Limespun",
  description:
    "The roster file for tattoo studios. Per-artist Stripe Connect, custom commission splits, guest residency bands, payroll-ready year-end exports.",
  openGraph: {
    title: "Limespun Team — Your roster, paid right",
    description: "Per-artist Stripe Connect, custom commission splits, guest residency bands, payroll-ready year-end exports.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/team" },
};

export default function TeamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
