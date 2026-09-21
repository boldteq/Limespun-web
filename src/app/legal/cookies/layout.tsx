import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Limespun",
  description:
    "What cookies limespun.com uses, why, and how to control them. We don't use advertising cookies.",
  alternates: { canonical: "https://limespun.com/legal/cookies" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
