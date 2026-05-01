import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory — Ink registry, REACH compliance, low-stock alerts | InkOS",
  description:
    "Every ink, every needle, every batch. EU REACH 2022 compliance built in. Low-stock alerts. The cabinet, in software.",
  openGraph: {
    title: "InkOS Inventory — REACH-compliant ink registry",
    description: "The cabinet, in software.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/inventory" },
};

export default function InventoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
