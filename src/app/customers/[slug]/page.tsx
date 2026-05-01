import { notFound } from "next/navigation";
import { customerStories } from "@/lib/data/customer-stories";
import { CustomerStoryDetail } from "./customer-story-detail";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return customerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = customerStories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: `${story.name} — ${story.role} | InkOS`,
    description: story.shortQuote.slice(0, 160),
    openGraph: {
      title: `${story.name} runs ${story.role.split("·")[1]?.trim() ?? "their studio"} on InkOS`,
      description: story.shortQuote,
      type: "article",
    },
    alternates: { canonical: `https://inkos.studio/customers/${slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const story = customerStories.find((s) => s.slug === slug);
  if (!story) notFound();

  const related = story.similarStudios
    .map((rs) => customerStories.find((s) => s.slug === rs))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${story.name} — ${story.role}`,
          description: story.shortQuote,
          author: {
            "@type": "Person",
            name: story.name,
            jobTitle: story.role,
          },
          publisher: {
            "@type": "Organization",
            name: "InkOS",
            logo: {
              "@type": "ImageObject",
              url: "https://inkos.studio/icon.png",
            },
          },
        }}
      />
      <CustomerStoryDetail story={story} related={related} />
    </>
  );
}
