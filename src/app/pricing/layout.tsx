import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Priced like a tool, quietly fair | Limespun",
  description:
    "$29 to $199/mo. No per-booking fees. No transaction take. White-glove migration included on every plan above Solo. 14-day free trial.",
  openGraph: {
    title: "Limespun Pricing — From $29/mo",
    description:
      "$29 to $199/mo. No per-booking fees. No transaction take. White-glove migration included on every plan above Solo. 14-day free trial.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/pricing" },
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
