import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Studio — Moodboards and design briefs | Limespun",
  description:
    "Turn a client's idea into a clear brief and a moodboard to talk through. AI for the prep, never the art: it doesn't draw tattoos. On every plan.",
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
