import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Small Studios — 2-5 chairs, mixed roster, $59/mo | InkOS",
  description:
    "Tattoo studio software for 2-5 chair shops. Commission auto-splits, guest residencies, kiosk consent. Studio plan, $59/mo.",
  openGraph: {
    title: "InkOS for Small Studios",
    description: "2-5 chairs, mixed roster. Commission auto-splits, guest residencies, kiosk consent. $59/mo.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/for/small-studios" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
