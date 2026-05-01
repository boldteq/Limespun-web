import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sales, support, press, partnerships | InkOS",
  description:
    "Get in touch with the InkOS team. Sales inquiries, product support, press requests, partnership discussions, feature requests. We answer every email within one business day.",
  openGraph: {
    title: "Contact InkOS",
    description: "Sales, support, press, partnerships.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/contact" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
