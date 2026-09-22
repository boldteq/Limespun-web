import type { Metadata } from "next";
import { PLANS, formatPrice } from "@/lib/data/plans";

const [PRO] = PLANS.filter((p) => p.tier === "pro");
const PRO_PRICE = formatPrice(PRO.monthlyCents);

export const metadata: Metadata = {
  title: `For Multi-Chair Shops — 6+ chairs, guest artists, AI replies, ${PRO_PRICE}/mo | Limespun`,
  description:
    `Tattoo studio software for 6+ chair shops. Up to 15 artists, unlimited guest-artist seats, AI replies and aftercare, payroll and 1099s, priority support. Pro plan, ${PRO_PRICE}/mo.`,
  openGraph: {
    title: "Limespun for Multi-Chair Shops",
    description: `6+ chairs. Unlimited guest-artist seats, AI replies and aftercare, priority support. Pro plan, ${PRO_PRICE}/mo.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/for/multi-chair" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
