import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Multi-session work, deposit pools, photo timelines | Limespun",
  description:
    "A sleeve isn't a booking. It's a project. Five sessions, one deposit pool, one photo timeline from reference to healed, and the artist's notes carried forward.",
  openGraph: {
    title: "Limespun Projects — Multi-session work, one record",
    description: "Five sessions, one deposit pool, one photo timeline.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/projects" },
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
