import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog-posts";
import { BlogPostDetail } from "./blog-post-detail";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Limespun Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    alternates: { canonical: `https://limespun.com/blog/${slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: {
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
          },
          publisher: {
            "@type": "Organization",
            name: "Limespun",
            logo: {
              "@type": "ImageObject",
              url: "https://limespun.com/icon.png",
            },
          },
        }}
      />
      <BlogPostDetail post={post} related={related} />
    </>
  );
}
