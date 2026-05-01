import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Migrate from Vagaro to InkOS — 7-day move, salon-coded data re-mapped to tattoo schema | InkOS",
  description:
    "Vagaro users: stop bending salon software to fit tattoo. 7-day migration with full schema re-mapping. Multi-session projects, allergy intelligence, REACH compliance — concepts Vagaro doesn't have.",
  openGraph: {
    title: "Migrate from Vagaro to InkOS",
    description:
      "Vagaro is built for nail salons. InkOS is built for tattoo. 7-day schema re-mapping migration.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/migrate/vagaro" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
