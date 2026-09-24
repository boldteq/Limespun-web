import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switch from Mangomint to Limespun | Limespun",
  description:
    "Switching from Mangomint: we move your clients, bookings, deposits and signed forms for you, on every plan. One project per piece, one deposit pool, EU REACH ink tracking.",
  openGraph: {
    title: "Switch from Mangomint to Limespun",
    description: "Migration included on every plan. Software built only for tattoo.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/mangomint" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
