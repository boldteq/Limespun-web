import type { Metadata } from "next";
import { PLANS, formatPrice } from "@/lib/data/plans";

const [STUDIO] = PLANS.filter((p) => p.tier === "studio");
const STUDIO_PRICE = formatPrice(STUDIO.monthlyCents);

export const metadata: Metadata = {
  title: `For Small Studios — 2-5 chairs, mixed roster, ${STUDIO_PRICE}/mo | Limespun`,
  description:
    `Tattoo studio software for 2-5 chair shops. Commission and booth-rent splits, one calendar for every artist, kiosk consent. Studio plan, ${STUDIO_PRICE}/mo.`,
  openGraph: {
    title: "Limespun for Small Studios",
    description: `2-5 chairs, mixed roster. Commission and booth-rent splits, one shared calendar, kiosk consent. ${STUDIO_PRICE}/mo.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/for/small-studios" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
