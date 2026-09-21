import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join the Limespun team | Boldteq",
  description: "Boldteq is hiring engineers, designers, and customer success specialists. Remote-first, three time zones, ship-or-die culture.",
  openGraph: { title: "Careers at Boldteq · Limespun", description: "Join the team building software for craft industries.", type: "website" },
  alternates: { canonical: "https://limespun.com/careers" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
