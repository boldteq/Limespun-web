import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Multi-Location Chains — Per-location P&L, SSO, dedicated support | Limespun",
  description:
    "Tattoo studio software for chains and franchises. Multi-location dashboard, per-location P&L, SSO, dedicated migration team, dedicated account manager. Enterprise plan, $199/mo per location.",
  openGraph: {
    title: "Limespun for Multi-Location Chains",
    description: "Per-location P&L, SSO, dedicated account manager. Enterprise plan, $199/mo per location.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/for/multi-location" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
