import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | InkOS",
  description:
    "What cookies inkos.studio uses, why, and how to control them. We don't use advertising cookies.",
  alternates: { canonical: "https://inkos.studio/legal/cookies" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
