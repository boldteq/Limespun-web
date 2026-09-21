import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Limespun",
  description:
    "How Limespun collects, uses, and protects your data and your studio's data. GDPR + CCPA compliant. Plain English where possible.",
  alternates: { canonical: "https://limespun.com/legal/privacy" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
