import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox — Action feed for tattoo studios | Limespun",
  description:
    "Booking requests, deposit follow-ups, allergy flags, consent expiries, disputes, reviews — sorted by priority, resolved in place. Triage your studio in five minutes.",
  openGraph: {
    title: "Limespun Inbox",
    description: "The action feed. Triage in five minutes.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/inbox" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
