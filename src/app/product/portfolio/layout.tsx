import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Healed work and flash with deposits | Limespun",
  description:
    "A studio portfolio you curate. Promote healed photos from projects in one tap, or upload work. Flash pieces with their own price and deposit, from Available to Sold.",
  openGraph: {
    title: "Limespun Portfolio — Show the work, sell the flash",
    description: "Promote healed photos from projects in one tap. Flash pieces with their own price and deposit.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/portfolio" },
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
