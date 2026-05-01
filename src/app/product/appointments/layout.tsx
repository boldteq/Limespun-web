import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments — Booking + deposits as one unit | InkOS",
  description:
    "Booking with deposit-required gating, multi-session links, allergy alerts at lock time. The booking flow tattoo studios actually need.",
  openGraph: {
    title: "InkOS Appointments",
    description: "Booking + deposits, locked together.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/appointments" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
