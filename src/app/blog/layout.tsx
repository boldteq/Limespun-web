import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Studio playbooks, ops content, founder essays | InkOS",
  description:
    "Practical writing for tattoo studio owners. The 90-second morning triage. Deposit pool accounting. EU REACH compliance. Written by people who walk into shops.",
  openGraph: {
    title: "InkOS Blog",
    description: "Practical writing for tattoo studio owners.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/blog" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
