import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "The Limespun product: fifteen rooms, one floor.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Fifteen rooms,", "one floor."],
    underline: "one floor.",
    subline: "Bookings, deposits, consent forms, messages and payouts in one app.",
  });
}
