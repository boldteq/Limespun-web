import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Migrate from TattooGenda to Limespun — 4-day move, every feature included | Limespun",
  description:
    "TattooGenda users: keep guest residencies, deposit pools, REACH ink registry — all carried. 4-day migration. Every feature included on every plan, no 'Bigger Plan' upsell.",
  openGraph: {
    title: "Migrate from TattooGenda to Limespun",
    description:
      "Tattoo-native vs tattoo-native. We win on multi-session + every feature on every plan.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/migrate/tattoogenda" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
