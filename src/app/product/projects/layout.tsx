import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Multi-session sleeves, deposit pools, photo timelines | Limespun",
  description:
    "A sleeve isn't a booking. It's a project. Five sessions, one deposit pool, one healing timeline. The thing salon software doesn't have.",
  openGraph: {
    title: "Limespun Projects — Multi-session sleeves done right",
    description: "Five sessions, one deposit pool, one healing timeline.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/projects" },
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
