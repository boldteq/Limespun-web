import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments — Booking + deposits as one unit | Limespun",
  description:
    "Booking with deposit-required gating, multi-session links, allergy alerts at lock time. The booking flow tattoo studios actually need.",
  openGraph: {
    title: "Limespun Appointments",
    description: "Booking + deposits, locked together.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/appointments" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
