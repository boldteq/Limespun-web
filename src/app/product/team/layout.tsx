import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — Artists, guests, payroll, commissions | Limespun",
  description:
    "The roster for tattoo studios. Residents, guest artists and the front desk, a commission or booth-rent split per artist, guest spots with their own dates, payroll on Pro.",
  openGraph: {
    title: "Limespun Team — Your roster, paid right",
    description: "Residents, guests and front desk on one roster, with a split per artist.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/team" },
};

export default function TeamLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
