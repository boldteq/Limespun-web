import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics — Revenue, no-shows, fill rate | Limespun",
  description:
    "The numbers that matter for tattoo studios. Revenue by artist, no-show rate, fill rate, new, returning and lapsed clients. Reports across locations on Pro.",
  openGraph: {
    title: "Limespun Analytics — Revenue, no-shows, fill rate",
    description:
      "Revenue by artist, no-show rate, fill rate and client numbers for tattoo studios.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/analytics" },
};

export default function AnalyticsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
