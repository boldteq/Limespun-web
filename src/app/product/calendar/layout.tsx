import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar — Multi-chair, drag-drop, allergy-aware | InkOS",
  description:
    "Multi-chair Day view. Drag-drop with dnd-kit. Realtime sync. Allergy banners on every booking. The calendar that knows tattoo.",
  openGraph: {
    title: "InkOS Calendar — Multi-chair, realtime, allergy-aware",
    description: "The calendar that knows tattoo.",
    type: "website",
  },
  alternates: { canonical: "https://inkos.studio/product/calendar" },
};

export default function CalendarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
