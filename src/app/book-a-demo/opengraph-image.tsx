import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Book a demo of Limespun: 30 minutes, no slide deck, your studio’s data.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["30 minutes. No slide deck.", "Your studio’s data."],
    underline: "studio’s data.",
    subline: "A live walkthrough of bookings, deposits, consent forms and payouts.",
    meta: "Book a demo",
  });
}
