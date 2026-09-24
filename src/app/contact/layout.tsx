import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sales, support and press | Limespun",
  description:
    "Get in touch with the Limespun team about plans, switching tools, support or press. Every question goes to one inbox, and we reply within one business day.",
  openGraph: {
    title: "Contact Limespun",
    description: "Sales, support and press. One inbox, a reply within one business day.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/contact" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
