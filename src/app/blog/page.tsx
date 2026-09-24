import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container, InkBand, PageIntro, RelatedGrid, Section, type RelatedItem } from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { SITE_URL } from "@/lib/brand";
import {
  blogPosts,
  categoryLabels,
  formatPostDate,
  keepHyphens,
  noWidow,
  postCategories,
  readMinutes,
  type BlogPost,
} from "@/lib/data/blog-posts";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { PostIndex, type PostCardData } from "./_components/post-index";
import { PostCover, PostThumb } from "./_components/post-screens";

export const metadata = pageMetadata({
  title: "Blog: running a tattoo studio",
  description:
    "Practical writing for tattoo studio owners: deposits, consent forms, EU REACH ink records and artist pay, worked through on the Sample studio’s numbers.",
  path: "/blog",
  ogImage: "/blog/opengraph-image",
});

const [featured] = blogPosts;

const card = (p: BlogPost): PostCardData => ({
  slug: p.slug,
  title: keepHyphens(p.title),
  summary: noWidow(p.summary),
  category: p.category,
  categoryLabel: categoryLabels[p.category],
  date: formatPostDate(p.publishedAt, "short"),
  dateTime: p.publishedAt,
  readTime: `${readMinutes(p)} min read`,
  thumb: <PostThumb screen={p.screen} />,
});

const RELATED: RelatedItem[] = [
  { eyebrow: "Product", title: "All features", body: "Every screen, from the calendar to payouts.", href: "/product" },
  {
    eyebrow: "Plans",
    title: "Pricing",
    body: `Flat monthly plans from ${formatPrice(PLANS[0].monthlyCents)}. No cut of bookings.`,
    href: "/pricing",
  },
  { eyebrow: "Resources", title: "Free tools", body: "Deposit and payout calculators, a consent form template.", href: "/tools" },
  { eyebrow: "Compliance", title: "EU REACH hub", body: "The ink records a studio keeps, and where they live.", href: "/reach-compliance" },
];

/** The first post, large: the screen it's about beside its title and dek. */
function FeaturedPost({ post }: { post: BlogPost }) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      aria-labelledby="featured-heading"
      className="group relative grid overflow-hidden rounded-tile bg-canvas ring-1 ring-hair transition-[box-shadow] duration-200 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-graphite hover:shadow-[var(--shadow-lift)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div className="flex flex-col p-6 sm:p-10 lg:p-12">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-label uppercase">
          <span className="text-ember-deep">Featured · {categoryLabels[post.category]}</span>
        </p>
        <h2
          id="featured-heading"
          className="mt-4 font-serif text-[36px] leading-[1.04] tracking-[-0.015em] text-balance text-graphite sm:text-[48px] lg:text-[52px]"
        >
          <Link href={href} className="after:absolute after:inset-0 after:z-10 after:rounded-tile focus-visible:outline-none">
            {keepHyphens(post.title)}
          </Link>
        </h2>
        <p className="mt-4 max-w-[520px] text-[17px] leading-[1.6] text-pretty text-graphite-soft sm:text-[18px]">
          {noWidow(post.description)}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:mt-8 lg:mt-auto lg:pt-10">
          <p className="flex flex-wrap items-center gap-x-2.5 text-[14px] text-mute">
            <time dateTime={post.publishedAt} className="whitespace-nowrap">
              {formatPostDate(post.publishedAt)}
            </time>
            <span aria-hidden="true" className="text-hair-strong">
              ·
            </span>
            <span className="whitespace-nowrap">{readMinutes(post)} min read</span>
          </p>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-graphite transition-colors group-hover:text-ember-deep"
          >
            Read the post
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-hair transition-colors duration-200 group-hover:bg-graphite group-hover:text-white">
              <ArrowRight size={17} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </div>
      {/* The screen the post is about, on the sand stage; it bleeds off the card's edge from lg */}
      <div className="@container min-w-0 bg-canvas-deep p-3 sm:p-6 lg:py-10 lg:pr-0 lg:pl-10">
        <PostCover screen={post.screen} />
      </div>
    </article>
  );
}

/**
 * The newsletter as the grid's last card: on the sand like the thumbnails' stage, the form's
 * label set as a card title (serif, like the post titles) and the field on the cards' bottom
 * line. The form stretches to the card's height (grid items stretch), so its field sits low.
 */
function NewsletterCard() {
  return (
    <div className="grid h-full rounded-card bg-canvas-deep p-5 ring-1 ring-hair sm:p-6 [&_form]:max-w-none [&_label]:mt-1 [&_label]:block [&_label]:font-serif [&_label]:text-[26px] [&_label]:leading-[1.1] [&_label]:font-normal [&_label]:tracking-[-0.01em] [&_label]:text-balance sm:[&_label]:text-[28px] [&>div]:max-w-none">
      <NewsletterForm
        eyebrow="Studio notes · free"
        title="New posts, by email"
        hint="At most one email a month: new posts, plus the deposit wording, consent templates and payout math you can copy."
      />
    </div>
  );
}

export default function BlogPage() {
  const posts = blogPosts.map(card);
  return (
    <PageShell
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Limespun blog",
          url: absoluteUrl("/blog"),
          inLanguage: "en-US",
          publisher: { "@type": "Organization", name: "Limespun", url: SITE_URL },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.publishedAt,
          })),
        },
      ]}
    >
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Notes on running a tattoo studio"
        italicWord="studio"
        lead={noWidow(
          "Deposits, consent forms, ink records and artist pay, worked through on the Sample studio’s numbers. Written by the team that builds Limespun.",
        )}
      />

      <Section tone="white" labelledBy="featured-heading" className="pt-10 sm:pt-14">
        <Container>
          <FeaturedPost post={featured} />
          <div className="mt-14 sm:mt-20">
            <PostIndex
              posts={posts}
              featuredSlug={featured.slug}
              categories={postCategories()}
              headingId="posts-heading"
              after={<NewsletterCard />}
            />
          </div>
        </Container>
      </Section>

      <RelatedGrid heading="Related" items={RELATED} tone="white" />

      <InkBand
        headline="Put the notes to work."
        italicWord="work"
        secondary={{ label: "Free tools", href: "/tools" }}
      />
    </PageShell>
  );
}
