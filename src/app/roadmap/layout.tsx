import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — What we're building, what's next | InkOS",
  description: "Public roadmap. Shipped this quarter. Building now. Up next. The honest version, not the marketing version.",
  openGraph: { title: "InkOS Roadmap", description: "What we're building, what's next.", type: "website" },
  alternates: { canonical: "https://inkos.studio/roadmap" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
