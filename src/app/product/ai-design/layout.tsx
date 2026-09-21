import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio — Brief generator, reference assist, style transfer | Limespun",
  description:
    "Generate client briefs from a paragraph. Pull reference grids by style. Translate inspiration to the artist's hand. AI for the prep, not the work.",
  openGraph: {
    title: "Limespun AI Studio",
    description: "AI for the prep, not the work.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/ai-design" },
};

export default function AIDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
