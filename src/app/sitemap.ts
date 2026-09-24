import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import { blogPosts } from "@/lib/data/blog-posts";
import { CHECKED_ON, competitors } from "@/lib/data/competitors";
import { FEATURES } from "@/lib/data/features";
import { SEGMENTS } from "@/lib/data/segments";
import { LEGAL_LINKS, TOOLS_INDEX } from "@/lib/site-links";

/**
 * Built from the same data the pages render from, so a new feature, segment, comparison,
 * post or tool lands here without an edit. Only live, indexable routes: no /mockups-gallery,
 * nothing that redirects (/product/today, /product/inbox, /migrate/<vendor>, /book-a-demo,
 * /customers).
 */

type Entry = MetadataRoute.Sitemap[number];
type Frequency = NonNullable<Entry["changeFrequency"]>;

/** Pages without a date of their own carry the build date. */
const BUILT = new Date();
/** Comparisons were last checked on CHECKED_ON ("22 September 2026"). */
const COMPARED = new Date(`${CHECKED_ON} 12:00 UTC`);

function entry(path: string, priority: number, changeFrequency: Frequency = "monthly", lastModified: Date = BUILT): Entry {
  return { url: path === "/" ? SITE_URL : `${SITE_URL}${path}`, lastModified, changeFrequency, priority };
}

const CORE: Entry[] = [
  entry("/", 1, "weekly"),
  entry("/pricing", 0.9),
  entry("/product", 0.9),
  entry("/compare", 0.8, "monthly", COMPARED),
  entry("/migrate", 0.7),
  entry("/reach-compliance", 0.6),
];

const UPDATES: Entry[] = [entry("/changelog", 0.5, "weekly"), entry("/roadmap", 0.5, "weekly")];

const COMPANY: Entry[] = [
  entry("/about", 0.5),
  entry("/contact", 0.5),
  entry("/careers", 0.4),
  entry("/press", 0.4),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const features = FEATURES.map((f) => entry(f.href, 0.8));
  const segments = SEGMENTS.map((s) => entry(s.href, 0.8));
  const comparisons = competitors.map((c) => entry(`/compare/${c.slug}`, 0.7, "monthly", COMPARED));
  const posts = [
    entry("/blog", 0.6, "weekly"),
    ...blogPosts.map((p) => entry(`/blog/${p.slug}`, 0.6, "yearly", new Date(`${p.updatedAt ?? p.publishedAt}T12:00:00Z`))),
  ];
  const tools = [entry("/tools", 0.6), ...TOOLS_INDEX.map((t) => entry(`/tools/${t.slug}`, 0.6))];
  const legal = LEGAL_LINKS.map((l) => entry(l.href, 0.3, "yearly"));

  // One URL per page even if two lists name it (Security sits in legal and company menus).
  const seen = new Set<string>();
  return [...CORE, ...features, ...segments, ...comparisons, ...posts, ...tools, ...UPDATES, ...COMPANY, ...legal].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
