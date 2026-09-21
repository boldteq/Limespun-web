import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — What we're building, what's next | Limespun",
  description: "Public roadmap. Shipped this quarter. Building now. Up next. The honest version, not the marketing version.",
  openGraph: { title: "Limespun Roadmap", description: "What we're building, what's next.", type: "website" },
  alternates: { canonical: "https://limespun.com/roadmap" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
