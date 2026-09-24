import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { CompareMatrix } from "@/components/compare/compare-tables";
import { JsonLd } from "@/components/seo/json-ld";
import { CHECKED_ON, competitors, differentiators } from "@/lib/data/competitors";
import { SITE_URL } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compare tattoo studio software",
  description:
    "How Limespun compares with Square, Vagaro, Fresha, GlossGenius, TattooGenda, DaySmart and Mangomint for tattoo studios. Sourced from each vendor's own pages.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Limespun comparisons",
          itemListElement: competitors.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/compare/${c.slug}`,
            name: `Limespun vs ${c.name}`,
          })),
        }}
      />
      <Nav />
      <main id="main">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
          title="How Limespun compares for tattoo studios"
          lead={
            <>
              Side by side with the tools studios tell us they use today. Every competitor detail comes from that vendor&apos;s
              own public pages, checked on {CHECKED_ON}. Where a vendor doesn&apos;t say, we write &ldquo;not published&rdquo;
              rather than guess.
            </>
          }
        />

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">At a glance</h2>
            <p className="mt-3 max-w-[620px] text-[16px] text-mute">
              Tap any product name for the full comparison, notes and sources. On a phone, scroll the table sideways.
            </p>
            <div className="mt-8">
              <CompareMatrix competitors={competitors} />
            </div>
          </div>
        </section>

        <section className="bg-canvas py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">Pick a comparison</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {competitors.map((c) => {
                const diff = differentiators(c);
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/compare/${c.slug}`}
                      className="group flex h-full flex-col rounded-[20px] bg-white p-6 ring-1 ring-hair transition-shadow hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                    >
                      <span className="text-[13px] font-medium text-mute">{c.category}</span>
                      <span className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-graphite">
                        Limespun vs {c.name}
                      </span>
                      <span className="mt-3 flex-1 text-[15px] leading-[1.55] text-graphite-soft">
                        {diff.length > 0
                          ? `Where Limespun goes further: ${diff
                              .slice(0, 3)
                              .map((d) => d.label.toLowerCase())
                              .join(", ")}.`
                          : "Close on features. Compare pricing, focus and support."}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite">
                        See the comparison
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <ClosingCta
          title="Switch without starting over."
          italicWord="over"
          body="On every plan, our team moves your clients, bookings, deposits and signed forms from your current tool."
        />
      </main>
      <Footer />
    </div>
  );
}
