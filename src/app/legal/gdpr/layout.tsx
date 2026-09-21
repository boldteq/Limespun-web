import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR & DPA | Limespun",
  description:
    "GDPR compliance information, Data Processing Agreement summary, sub-processors, EU representative.",
  alternates: { canonical: "https://limespun.com/legal/gdpr" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
