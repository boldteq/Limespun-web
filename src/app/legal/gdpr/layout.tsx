import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR & DPA | InkOS",
  description:
    "GDPR compliance information, Data Processing Agreement summary, sub-processors, EU representative.",
  alternates: { canonical: "https://inkos.studio/legal/gdpr" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
