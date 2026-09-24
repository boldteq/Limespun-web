import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Switch from Vagaro to Limespun | Limespun",
  description:
    "Switching from Vagaro: we move your clients, bookings, deposits and signed forms for you, on every plan. Multi-session projects, allergy flags on every booking and EU REACH ink tracking.",
  openGraph: {
    title: "Switch from Vagaro to Limespun",
    description: "Migration included on every plan. Software built only for tattoo.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/vagaro" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
