import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Limespun EU REACH compliance: EU REACH 2022, built into the studio.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["EU REACH 2022,", "built into the studio."],
    underline: "the studio.",
    subline: "Every ink’s CI numbers, safety sheets and reactions, ready for an inspector.",
    meta: "EU REACH ink tracking on every plan",
  });
}
