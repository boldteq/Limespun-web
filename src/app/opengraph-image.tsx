import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Limespun: Book the whole sleeve. Keep every deposit.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Book the whole sleeve.", "Keep every deposit."],
    underline: "every deposit.",
    subline: "Bookings, deposits, consent forms and artist payouts for tattoo studios.",
  });
}
