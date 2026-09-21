import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migrate from Mangomint to Limespun — 6-day move, tattoo-native | Limespun",
  description:
    "Mangomint is salon-coded. Limespun is tattoo-native. Multi-session projects, deposit pools, allergy intelligence — concepts Mangomint doesn't have. 6-day white-glove migration.",
  openGraph: {
    title: "Migrate from Mangomint to Limespun",
    description:
      "Salon software is built for haircuts. Tattoo deserves better.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/mangomint" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
