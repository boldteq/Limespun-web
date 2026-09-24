import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments — Deposits, artist splits, payroll | Limespun",
  description:
    "Take deposits and card payments with no Limespun fee. Commission and booth-rent splits worked out per session on Studio, payroll and 1099-K forms on Pro.",
  openGraph: {
    title: "Limespun Payments — Card payments in, artist splits out",
    description: "Deposits, commission and booth-rent splits, payroll and 1099s.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/payments" },
};

export default function PaymentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
