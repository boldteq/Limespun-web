import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Flash sheets + healed gallery, auto-synced from projects | Limespun",
  description:
    "Studio portfolio that builds itself. Healed photos auto-flow from project sessions. Flash sheets with deposit-tied booking links. The gallery you wish you'd been building all along.",
  openGraph: {
    title: "Limespun Portfolio — The gallery that builds itself",
    description: "Healed photos auto-flow from project sessions. Flash sheets with deposit-tied booking links.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/portfolio" },
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
