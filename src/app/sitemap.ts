import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import { blogPosts } from "@/lib/data/blog-posts";
import { competitors } from "@/lib/data/competitors";
import { TOOLS_INDEX } from "@/lib/site-links";

const STATIC_ROUTES: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/book-a-demo", priority: 0.9 },
  { path: "/product", priority: 0.8 },
  { path: "/product/ai-design", priority: 0.7 },
  { path: "/product/analytics", priority: 0.7 },
  { path: "/product/appointments", priority: 0.7 },
  { path: "/product/calendar", priority: 0.7 },
  { path: "/product/clients", priority: 0.7 },
  { path: "/product/forms", priority: 0.7 },
  { path: "/product/inbox", priority: 0.7 },
  { path: "/product/inventory", priority: 0.7 },
  { path: "/product/marketing", priority: 0.7 },
  { path: "/product/messages", priority: 0.7 },
  { path: "/product/payments", priority: 0.7 },
  { path: "/product/portfolio", priority: 0.7 },
  { path: "/product/projects", priority: 0.7 },
  { path: "/product/team", priority: 0.7 },
  { path: "/product/today", priority: 0.7 },
  { path: "/for/solo-artists", priority: 0.8 },
  { path: "/for/small-studios", priority: 0.8 },
  { path: "/for/multi-chair", priority: 0.8 },
  { path: "/for/multi-location", priority: 0.8 },
  { path: "/migrate", priority: 0.7 },
  { path: "/migrate/daysmart", priority: 0.6 },
  { path: "/migrate/fresha", priority: 0.6 },
  { path: "/migrate/mangomint", priority: 0.6 },
  { path: "/migrate/tattoogenda", priority: 0.6 },
  { path: "/migrate/vagaro", priority: 0.6 },
  { path: "/compare", priority: 0.8 },
  { path: "/tools", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/careers", priority: 0.5 },
  { path: "/changelog", priority: 0.5 },
  { path: "/roadmap", priority: 0.5 },
  { path: "/press", priority: 0.4 },
  { path: "/reach-compliance", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/legal/privacy", priority: 0.3 },
  { path: "/legal/terms", priority: 0.3 },
  { path: "/legal/cookies", priority: 0.3 },
  { path: "/legal/gdpr", priority: 0.3 },
  { path: "/legal/security", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
  const blogEntries = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const compareEntries = competitors.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const toolEntries = TOOLS_INDEX.map((t) => ({
    url: `${SITE_URL}/tools/${t.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...blogEntries, ...compareEntries, ...toolEntries];
}
