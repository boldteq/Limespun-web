import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "About Limespun: built for the work, not the spreadsheet.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Built for the work,", "not the spreadsheet."],
    underline: "the work,",
    subline: "Made by Boldteq, a small team building software for craft industries.",
    meta: "Tattoo studio software",
  });
}
