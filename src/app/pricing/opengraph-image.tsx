import { OG_CONTENT_TYPE, OG_PRICE_RANGE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Limespun pricing: flat plans, never per booking.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Flat plans,", "never per booking."],
    underline: "never per booking.",
    subline: "Pick the plan that fits your team. No cut of your bookings or deposits.",
    meta: `${OG_PRICE_RANGE}/mo · No per-booking fees`,
  });
}
