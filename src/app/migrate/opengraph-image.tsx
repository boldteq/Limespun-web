import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Move to Limespun: whatever you’re on, we move it for you.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Whatever you’re on,", "we move it for you."],
    underline: "for you.",
    subline: "Done-for-you migration: clients, bookings, deposits and consent forms.",
    meta: "Included on every plan",
  });
}
