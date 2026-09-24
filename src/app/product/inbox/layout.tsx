import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox — Action feed for tattoo studios | Limespun",
  description:
    "Unpaid deposits, unsigned forms, booking clashes, allergy flags, low stock and unread messages, sorted into Overdue, Today and This week, and resolved in place.",
  openGraph: {
    title: "Limespun Needs attention",
    description: "Everything that needs doing, in one ordered list.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/inbox" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
