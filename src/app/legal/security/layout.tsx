import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Limespun",
  description:
    "Our security practices: encryption, access controls, sub-processors, breach response, SOC 2 path.",
  alternates: { canonical: "https://limespun.com/legal/security" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
