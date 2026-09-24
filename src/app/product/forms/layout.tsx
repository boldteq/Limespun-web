import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms — Kiosk consent, REACH disclosure, signed PDFs | Limespun",
  description:
    "Digital consent forms signed on a phone or the studio tablet. EU REACH ink disclosure built in. Signed copies can't be edited and are stored as PDFs.",
  openGraph: {
    title: "Limespun Forms — Consent on a tablet, stored as a signed PDF",
    description: "The paperwork, finally not paperwork.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/forms" },
};

export default function FormsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
