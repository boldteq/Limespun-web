import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Solo Artists — One chair, full kit, $29/mo | InkOS",
  description:
    "Tattoo studio software for the solo artist. Bookings, deposits, consent, photo timeline — everything you need to run one chair, no overhead.",
  openGraph: {
    title: "InkOS for Solo Artists",
    description: "One chair, full kit, $29/mo.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/for/solo-artists" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
