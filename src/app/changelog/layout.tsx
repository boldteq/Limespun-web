import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — What's new in Limespun",
  description:
    "Public ship log. Every release, every fix, every improvement. Filterable by module. The opposite of a 'product hunt' marketing page.",
  openGraph: {
    title: "Limespun Changelog",
    description: "Public ship log.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/changelog" },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
