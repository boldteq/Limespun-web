import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Boldteq | Limespun",
  description: "Boldteq is the small team behind Limespun, studio software made only for tattoo. No open roles right now; if you want to help, write to us.",
  openGraph: { title: "Careers at Boldteq · Limespun", description: "The small team building Limespun, studio software for tattoo.", type: "website" },
  alternates: { canonical: "https://limespun.com/careers" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
