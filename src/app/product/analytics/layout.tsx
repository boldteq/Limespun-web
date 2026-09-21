import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics — Studio P&L, retention, no-show risk | Limespun",
  description:
    "The numbers that actually matter for tattoo studios. Per-artist revenue, retention, no-show risk, ink-color mix. Real-time, exportable, audit-ready.",
  openGraph: {
    title: "Limespun Analytics — Studio P&L, retention, no-show risk",
    description:
      "The numbers that actually matter for tattoo studios. Per-artist revenue, retention, no-show risk, ink-color mix.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/analytics" },
};

export default function AnalyticsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
