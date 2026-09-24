import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog: practical writing for tattoo studio owners | Limespun",
  description:
    "Practical writing for tattoo studio owners from the Limespun team: the 90-second morning triage, deposit pool accounting, EU REACH ink records and artist splits.",
  openGraph: {
    title: "Limespun Blog",
    description: "Practical writing for tattoo studio owners.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/blog" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
