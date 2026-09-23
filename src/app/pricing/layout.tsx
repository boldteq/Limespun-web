import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — flat plans, never per booking | Limespun",
  description:
    "Flat plans for tattoo studios from $39/mo: Solo, Studio, Pro and Multi-Location. No cut of bookings or deposits, 20% off yearly, 30-day money-back guarantee.",
  openGraph: {
    title: "Limespun pricing, from $39/mo",
    description:
      "Flat plans, never per booking: Solo, Studio, Pro and Multi-Location. No cut of bookings or deposits. 30-day money-back guarantee.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/pricing" },
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
