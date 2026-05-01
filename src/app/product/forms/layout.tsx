import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms — Kiosk consent, REACH waivers, audit trail | InkOS",
  description:
    "Digital consent forms. Tablet kiosk. EU REACH waivers. PDF audit trail with hash signatures. The paperwork, finally not paperwork.",
  openGraph: {
    title: "InkOS Forms — Consent on a tablet, audit-ready PDF",
    description: "The paperwork, finally not paperwork.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/forms" },
};

export default function FormsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
