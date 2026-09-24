import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU REACH Ink Tracking for Tattoo Studios | Limespun",
  description:
    "EU REACH ink tracking for tattoo studios: an Ink registry in Settings, a REACH-registered count on Inventory and a REACH ink disclosure on the consent form. On every plan, Solo included.",
  openGraph: {
    title: "EU REACH ink tracking, built in",
    description: "For the EU REACH restriction on tattoo inks, in force since January 2022. On every plan.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/reach-compliance" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
