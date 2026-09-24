import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today — Morning launchpad for tattoo studios | Limespun",
  description:
    "The morning launchpad. Live numbers, allergy alerts on today's book, the multi-chair schedule and project pulse, in a view that fits your role.",
  openGraph: {
    title: "Limespun Today",
    description: "The morning launchpad for a tattoo studio.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/today" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
