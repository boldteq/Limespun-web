import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product — Fifteen rooms, one floor | InkOS",
  description:
    "Today, Inbox, Calendar, Messages, Clients, Projects, Forms, Payments, Inventory, AI Studio. Every studio operation, one quiet system.",
  openGraph: {
    title: "InkOS Product Tour",
    description: "Every studio operation, one quiet system.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product" },
};

export default function ProductLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
