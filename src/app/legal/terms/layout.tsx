import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | InkOS",
  description:
    "InkOS subscription terms, acceptable use policy, and warranty disclaimers. Plain English where possible.",
  alternates: { canonical: "https://inkos.studio/legal/terms" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
