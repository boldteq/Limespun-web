import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory — Ink registry, REACH records, low-stock alerts | Limespun",
  description:
    "Every ink, every needle, every batch. Stock by item, movements, purchase orders and low-stock alerts, with REACH-registered inks marked. The cabinet, in software.",
  openGraph: {
    title: "Limespun Inventory — Ink stock with REACH records",
    description: "The cabinet, in software.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/inventory" },
};

export default function InventoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
