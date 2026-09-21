import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments — Commission auto-splits, deposit pools, payroll-ready | Limespun",
  description:
    "Stripe Connect on every invoice. Artist commission splits at booking time. Deposits pool to projects. 1099-K and EU equivalents at year end.",
  openGraph: {
    title: "Limespun Payments — Auto-split commissions, payroll-ready",
    description: "Stripe Connect on every invoice. Zero math.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/payments" },
};

export default function PaymentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
