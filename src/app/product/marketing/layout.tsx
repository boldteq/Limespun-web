import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing — Campaigns, loyalty, win-back | Limespun",
  description:
    "Campaign mechanics tattoo studios actually run. SMS + email touch-ups. Loyalty milestones. Auto win-back sequences. No mass-blast spam.",
  openGraph: {
    title: "Limespun Marketing — Campaigns, loyalty, win-back",
    description:
      "Campaign mechanics tattoo studios actually run. SMS + email touch-ups. Loyalty milestones. Auto win-back sequences.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/marketing" },
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
