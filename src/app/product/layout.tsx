import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product — Fifteen rooms, one floor | Limespun",
  description:
    "Today, Inbox, Calendar, Messages, Clients, Projects, Forms, Payments, Inventory, AI Studio. Every studio operation, one quiet system.",
  openGraph: {
    title: "Limespun Product Tour",
    description: "Every studio operation, one quiet system.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product" },
};

export default function ProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
