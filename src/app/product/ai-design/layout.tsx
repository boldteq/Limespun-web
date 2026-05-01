import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio — Brief generator, reference assist, style transfer | InkOS",
  description:
    "Generate client briefs from a paragraph. Pull reference grids by style. Translate inspiration to the artist's hand. AI for the prep, not the work.",
  openGraph: {
    title: "InkOS AI Studio",
    description: "AI for the prep, not the work.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/ai-design" },
};

export default function AIDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
