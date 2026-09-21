import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sales, support, press, partnerships | Limespun",
  description:
    "Get in touch with the Limespun team. Sales inquiries, product support, press requests, partnership discussions, feature requests. We answer every email within one business day.",
  openGraph: {
    title: "Contact Limespun",
    description: "Sales, support, press, partnerships.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/contact" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
