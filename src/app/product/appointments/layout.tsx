import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments — Booking + deposits as one unit | Limespun",
  description:
    "Bookings that wait on the deposit, link to multi-session projects and show allergy notes at booking time. The booking flow tattoo studios actually need.",
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
