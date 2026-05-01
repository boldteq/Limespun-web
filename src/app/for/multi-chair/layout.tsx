import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Multi-Chair Shops — 6+ chairs, AI-assisted, REACH-compliant, $99/mo | InkOS",
  description:
    "Tattoo studio software for 6+ chair shops. AI design assistant, EU REACH inventory, public booking pages, priority support. Pro plan, $99/mo.",
  openGraph: {
    title: "InkOS for Multi-Chair Shops",
    description: "6+ chairs. AI design assistant, EU REACH inventory, priority support. Pro plan, $99/mo.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/for/multi-chair" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
