import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today — Morning launchpad for tattoo studios | InkOS",
  description:
    "The morning launchpad. Live KPIs, allergy alerts on today's book, multi-chair schedule, project pulse. Triage your studio in 30 seconds, role-aware.",
  openGraph: {
    title: "InkOS Today",
    description: "The morning launchpad. Triage in 30 seconds.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/today" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
