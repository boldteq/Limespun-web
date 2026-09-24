import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — What we're building, what's next | Limespun",
  description: "What's shipped in Limespun, what we're building now and what comes next. No dates, because dates slip. Tell us what to build for your studio.",
  openGraph: { title: "Limespun Roadmap", description: "What we're building, what's next.", type: "website" },
  alternates: { canonical: "https://limespun.com/roadmap" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
