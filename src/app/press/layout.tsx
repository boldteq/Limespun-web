import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press kit — Brand assets, product screenshots, founder bio | Limespun",
  description:
    "Press kit for journalists writing about Limespun or Boldteq: the facts, the logo, brand colours and the founder's contact. Screenshots on request.",
  openGraph: {
    title: "Limespun Press Kit",
    description: "Brand assets and product screenshots.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/press" },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
