import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Limespun",
  description:
    "How Limespun protects studio data today: encryption, per-studio data separation, two-factor sign-in, data export and where your data is hosted.",
  alternates: { canonical: "https://limespun.com/legal/security" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
