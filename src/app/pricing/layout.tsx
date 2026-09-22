import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — priced per shop, never per booking | Limespun",
  description:
    "Tattoo studio software from $39/mo. Solo, Studio, Pro and Multi-Location plans. No cut of bookings or deposits, 20% off yearly, 30-day money-back guarantee.",
  openGraph: {
    title: "Limespun pricing, from $39/mo",
    description:
      "Solo, Studio, Pro and Multi-Location plans. No cut of bookings or deposits. 30-day money-back guarantee.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/pricing" },
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
