import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Migrate from Mangomint to InkOS — 6-day move, tattoo-native | InkOS",
  description:
    "Mangomint is salon-coded. InkOS is tattoo-native. Multi-session projects, deposit pools, allergy intelligence — concepts Mangomint doesn't have. 6-day white-glove migration.",
  openGraph: {
    title: "Migrate from Mangomint to InkOS",
    description:
      "Salon software is built for haircuts. Tattoo deserves better.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/migrate/mangomint" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
