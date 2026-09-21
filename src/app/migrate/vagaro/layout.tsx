import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Migrate from Vagaro to Limespun — 7-day move, salon-coded data re-mapped to tattoo schema | Limespun",
  description:
    "Vagaro users: stop bending salon software to fit tattoo. 7-day migration with full schema re-mapping. Multi-session projects, allergy intelligence, REACH compliance — concepts Vagaro doesn't have.",
  openGraph: {
    title: "Migrate from Vagaro to Limespun",
    description:
      "Vagaro is built for nail salons. Limespun is built for tattoo. 7-day schema re-mapping migration.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/vagaro" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
