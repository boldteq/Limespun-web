import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU REACH Compliance for Tattoo Studios | Limespun",
  description:
    "EU REACH 2022 compliance for tattoo studios. Ink registry, MSDS attachments, batch tracking, reaction logging, inspector reports. Built into Limespun Inventory.",
  openGraph: {
    title: "REACH compliance, built in",
    description: "EU REACH 2022 compliance for tattoo studios.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/reach-compliance" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
