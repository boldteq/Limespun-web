import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments — Commission auto-splits, deposit pools, payroll-ready | InkOS",
  description:
    "Stripe Connect on every invoice. Artist commission splits at booking time. Deposits pool to projects. 1099-K and EU equivalents at year end.",
  openGraph: {
    title: "InkOS Payments — Auto-split commissions, payroll-ready",
    description: "Stripe Connect on every invoice. Zero math.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/payments" },
};

export default function PaymentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
