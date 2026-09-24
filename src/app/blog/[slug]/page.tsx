import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/templates/article-page";
import { SITE_URL } from "@/lib/brand";
import {
  blogPosts,
  categoryLabels,
  formatPostDate,
  getPost,
  keepHyphens,
  noWidow,
  readMinutes,
  relatedPosts,
  type BlogPost,
} from "@/lib/data/blog-posts";
import { absoluteUrl, articleJsonLd, pageMetadata } from "@/lib/seo";
import { PostBody, postToc } from "../_components/post-body";
import { PostFigure } from "../_components/post-screens";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Every post is built at build time; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const OG_IMAGE = "/blog/opengraph-image";
const path = (post: BlogPost) => `/blog/${post.slug}`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: path(post),
    ogImage: OG_IMAGE,
    type: "article",
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ["Limespun"],
      section: categoryLabels[post.category],
    },
  };
}

/** Article JSON-LD with the team as author: the Limespun organization, not a person. */
function postJsonLd(post: BlogPost): Record<string, unknown> {
  return {
    ...articleJsonLd({
      title: post.title,
      description: post.description,
      path: path(post),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
    }),
    author: { "@type": "Organization", name: "Limespun", url: SITE_URL, logo: absoluteUrl("/icon.svg") },
    image: absoluteUrl(OG_IMAGE),
    articleSection: categoryLabels[post.category],
    inLanguage: "en-US",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <ArticlePage
      crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.crumb }]}
      category={categoryLabels[post.category]}
      title={keepHyphens(post.title)}
      italicWord={post.italicWord}
      dek={noWidow(post.description)}
      meta={{
        date: formatPostDate(post.publishedAt),
        dateTime: post.publishedAt,
        readTime: `${readMinutes(post)} min read`,
        author: "the Limespun team",
        ...(post.updatedAt
          ? { updated: { date: formatPostDate(post.updatedAt), dateTime: post.updatedAt } }
          : {}),
      }}
      toc={postToc(post.blocks)}
      figure={{ node: <PostFigure screen={post.screen} />, caption: post.screenCaption }}
      feature={{ eyebrow: "In Limespun", ...post.feature }}
      related={relatedPosts(post).map((p) => ({
        eyebrow: categoryLabels[p.category],
        title: keepHyphens(p.title),
        body: p.summary,
        href: path(p),
      }))}
      relatedHeading="Keep reading"
      inkBand={{
        headline: post.inkBand.headline,
        italicWord: post.inkBand.italicWord,
        secondary: post.inkBand.secondary,
      }}
      jsonLd={[postJsonLd(post)]}
    >
      <PostBody blocks={post.blocks} />
    </ArticlePage>
  );
}
