import type { Metadata } from "next";
import { PLANS, formatPrice } from "@/lib/data/plans";

const [MULTI] = PLANS.filter((p) => p.tier === "enterprise");
const MULTI_PRICE = formatPrice(MULTI.monthlyCents);

export const metadata: Metadata = {
  title: "For Multi-Location Chains — Every shop, one flat price | Limespun",
  description:
    `Tattoo studio software for chains and franchises. Unlimited artists and locations, reports across every shop, dedicated account manager. Multi-Location plan, ${MULTI_PRICE}/mo flat, not per location.`,
  openGraph: {
    title: "Limespun for Multi-Location Chains",
    description: `Unlimited locations, reports across every shop, dedicated account manager. Multi-Location plan, ${MULTI_PRICE}/mo flat.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/for/multi-location" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
