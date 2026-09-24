import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing — Campaigns, waitlist, referrals | Limespun",
  description:
    "Fill quiet weeks from your own client list. Text and email campaigns, segments like healed-not-rebooked on Studio, a waitlist for cancellations and a referral program.",
  openGraph: {
    title: "Limespun Marketing — Campaigns, waitlist, referrals",
    description:
      "Text and email campaigns to your own client list, a waitlist for cancellations and a referral program.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/marketing" },
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
