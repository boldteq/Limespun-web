import type { Metadata } from "next";
import { PLANS, formatPrice } from "@/lib/data/plans";

const [SOLO] = PLANS.filter((p) => p.tier === "solo");
const SOLO_PRICE = formatPrice(SOLO.monthlyCents);

export const metadata: Metadata = {
  title: `For Solo Artists — One chair, full kit, ${SOLO_PRICE}/mo | Limespun`,
  description:
    "Tattoo studio software for the solo artist. Bookings, deposits, consent, photo timeline — everything you need to run one chair, no overhead.",
  openGraph: {
    title: "Limespun for Solo Artists",
    description: `One chair, full kit, ${SOLO_PRICE}/mo.`,
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/for/solo-artists" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
