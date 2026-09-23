import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const alt = "The Limespun blog: practical writing for studio owners.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OGImage() {
  return ogImage({
    lines: ["Practical writing", "for studio owners."],
    underline: "studio owners.",
    subline: "On running a tattoo studio: operations, compliance and craft.",
    meta: "The Limespun blog",
  });
}
