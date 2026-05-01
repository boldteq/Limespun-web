import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | InkOS",
  description:
    "How InkOS collects, uses, and protects your data and your studio's data. GDPR + CCPA compliant. Plain English where possible.",
  alternates: { canonical: "https://inkos.studio/legal/privacy" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
