import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar — Multi-chair, drag-drop, allergy-aware | Limespun",
  description:
    "Multi-chair Day view. Drag-drop with dnd-kit. Realtime sync. Allergy banners on every booking. The calendar that knows tattoo.",
  openGraph: {
    title: "Limespun Calendar — Multi-chair, realtime, allergy-aware",
    description: "The calendar that knows tattoo.",
    type: "website",
  },
  alternates: { canonical: "https://limespun.com/product/calendar" },
};

export default function CalendarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
