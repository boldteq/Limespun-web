import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switch from TattooGenda to Limespun | Limespun",
  description:
    "Switching from TattooGenda: we move your clients, bookings, deposits and signed forms for you, on every plan. Ink inventory with EU REACH tracking, artist splits and payroll.",
  openGraph: {
    title: "Switch from TattooGenda to Limespun",
    description: "Migration included on every plan. Ink inventory with EU REACH tracking.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/tattoogenda" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
