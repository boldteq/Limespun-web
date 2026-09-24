import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — What's new in Limespun",
  description:
    "What changed in Limespun, most recent first: releases, improvements and fixes to the studio software built only for tattoo, in plain words.",
  openGraph: {
    title: "Limespun Changelog",
    description: "What changed in Limespun, most recent first.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/changelog" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
