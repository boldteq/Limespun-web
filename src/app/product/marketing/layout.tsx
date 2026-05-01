import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing — Campaigns, loyalty, win-back | InkOS",
  description:
    "Campaign mechanics tattoo studios actually run. SMS + email touch-ups. Loyalty milestones. Auto win-back sequences. No mass-blast spam.",
  openGraph: {
    title: "InkOS Marketing — Campaigns, loyalty, win-back",
    description:
      "Campaign mechanics tattoo studios actually run. SMS + email touch-ups. Loyalty milestones. Auto win-back sequences.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/marketing" },
};

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
