import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

/* The /product share card; the feature pages under /product name it as theirs too. Same line as the page's h1. */
export const alt = "Limespun, studio software for tattoo: from first message to healed photo.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["From first message", "to healed photo."],
    underline: "healed photo.",
    subline: "Bookings, deposits, consent forms, projects and artist payouts in one client record.",
  });
}
