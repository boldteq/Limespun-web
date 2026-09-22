import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { HeadToHead } from "@/components/compare/compare-tables";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CHECKED_ON,
  LIMESPUN_PRICING,
  competitors,
  differentiators,
  getCompetitor,
  type Competitor,
} from "@/lib/data/competitors";
import { SITE_URL } from "@/lib/brand";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return {};
  const title = `Limespun vs ${c.name} for tattoo studios`;
  return {
    title: `${title} | Limespun`,
    description: `An honest comparison of Limespun and ${c.name} for tattoo studios: multi-session projects, deposits, consent forms, payouts and pricing. Sourced and dated.`,
    alternates: { canonical: `${SITE_URL}/compare/${c.slug}` },
    openGraph: { title, description: `How Limespun and ${c.name} compare for tattoo studios.`, type: "article" },
  };
}

function faqsFor(c: Competitor) {
  const multi = c.features.multiSession.value;
  const mig = c.migrateSlug;
  return [
    {
      q: `Is ${c.name} built for tattoo studios?`,
      a:
        c.category === "Tattoo studio software"
          ? `Yes. ${c.name} is made for tattoo studios. The comparison above shows where the two products differ on the details.`
          : `${c.name} is ${c.category.toLowerCase()} software that also markets to tattoo studios. Limespun is built only for tattoo, around projects that run across several sessions.`,
    },
    {
      q: `Does ${c.name} track a sleeve as one multi-session project?`,
      a:
        multi === "yes"
          ? `Yes, ${c.name} publishes project-based booking. Limespun does too, with the deposit carried across every session.`
          : multi === "partial"
            ? `Partly. ${c.name} supports multi-session bookings, but doesn't describe tracking them as a single project. In Limespun every session, photo and note sits under one project.`
            : `${c.name} doesn't describe project tracking on its public pages. In Limespun a sleeve is one project, with the deposit carried across every session.`,
    },
    {
      q: `Can I move from ${c.name} to Limespun?`,
      a: mig
        ? `Yes. On every plan our team moves your clients, upcoming bookings, deposits and signed forms. There's a step-by-step guide for moving from ${c.name}.`
        : `Yes. On every plan our team moves your clients, upcoming bookings, deposits and signed forms for you.`,
    },
    {
      q: `Where does ${c.name} do better?`,
      a: `${c.strengths.join(". ")}. If those matter most to your shop, ${c.name} may suit you better.`,
    },
  ];
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const diff = differentiators(c);
  const faqs = faqsFor(c);
  const others = competitors.filter((o) => o.slug !== c.slug);

  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
            { "@type": "ListItem", position: 3, name: `Limespun vs ${c.name}`, item: `${SITE_URL}/compare/${c.slug}` },
          ],
        }}
      />
      <Nav />
      <main id="main">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: `vs ${c.name}` }]}
          title={`Limespun vs ${c.name} for tattoo studios`}
          lead={
            <>
              {c.name} is {c.category === "Tattoo studio software" ? "tattoo studio software" : `${c.category.toLowerCase()} software`}.
              Limespun is built only for tattoo. Here&apos;s how they compare on the jobs a studio does every day, using {c.name}
              &apos;s own public pages, checked on {CHECKED_ON}.
            </>
          }
        />

        {/* Quick verdict */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:px-8 md:grid-cols-2">
            <div className="rounded-[20px] bg-canvas p-7">
              <h2 className="text-[20px] font-semibold text-graphite">Choose Limespun if you want</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {(diff.length > 0 ? diff.slice(0, 4) : []).map((d) => (
                  <li key={d.key} className="flex gap-2.5 text-[16px] leading-snug text-graphite">
                    <Check size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                    <span>
                      <span className="font-semibold">{d.label}.</span> <span className="text-graphite-soft">{d.why}</span>
                    </span>
                  </li>
                ))}
                <li className="flex gap-2.5 text-[16px] leading-snug text-graphite">
                  <Check size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-ember" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">One price per shop.</span>{" "}
                    <span className="text-graphite-soft">No cut of your bookings or deposits.</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-[20px] bg-white p-7 ring-1 ring-hair">
              <h2 className="text-[20px] font-semibold text-graphite">Choose {c.name} if you want</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.strengths.map((s) => (
                  <li key={s} className="flex gap-2.5 text-[16px] leading-snug text-graphite-soft">
                    <Plus size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-graphite" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Feature table */}
        <section className="bg-white pb-16 sm:pb-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">Feature by feature</h2>
            <p className="mt-3 max-w-[640px] text-[16px] text-mute">
              &ldquo;Not published&rdquo; means {c.name}&apos;s public pages don&apos;t describe it. It may exist, so check with them.
            </p>
            <div className="mt-8">
              <HeadToHead competitor={c} />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-canvas py-16 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
            <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">Pricing</h2>
            <dl className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-[20px] bg-white p-7 ring-1 ring-hair">
                <dt className="text-[15px] font-semibold text-graphite">Limespun</dt>
                <dd className="mt-2 text-[16px] leading-[1.6] text-graphite-soft">{LIMESPUN_PRICING}</dd>
                <dd className="mt-4">
                  <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4">
                    See Limespun pricing <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </dd>
              </div>
              <div className="rounded-[20px] bg-white p-7 ring-1 ring-hair">
                <dt className="text-[15px] font-semibold text-graphite">{c.name}</dt>
                <dd className="mt-2 text-[16px] leading-[1.6] text-graphite-soft">{c.pricingSummary}</dd>
                <dd className="mt-4">
                  <a
                    href={c.sources[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite underline decoration-hair-strong underline-offset-4 hover:decoration-ember"
                  >
                    Check {c.name} pricing <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Switching */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">Switching from {c.name}</h2>
              <p className="mt-4 max-w-[560px] text-[17px] leading-[1.6] text-graphite-soft">
                On every plan our team moves your clients, upcoming bookings, deposits and signed consent forms, then
                checks the counts with you before you switch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {c.migrateSlug && (
                <Link
                  href={`/migrate/${c.migrateSlug}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-graphite px-6 text-[16px] font-semibold text-white hover:bg-graphite-soft"
                >
                  Moving from {c.name} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
              <Link
                href="/migrate"
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[16px] font-semibold text-graphite ring-1 ring-graphite/70 hover:bg-canvas"
              >
                How migration works
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-canvas py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
            <h2 className="font-serif text-[36px] leading-[1.1] text-graphite sm:text-[44px]">Questions</h2>
            <div className="border-t border-hair-strong">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-hair-strong">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[18px] font-medium text-graphite">{f.q}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-transform group-open:rotate-45">
                      <Plus size={16} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="max-w-[640px] pb-6 text-[16px] leading-[1.65] text-graphite-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sources + other comparisons */}
        <section className="bg-white py-14">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 md:grid-cols-2">
            <div>
              <h2 className="text-[15px] font-semibold text-graphite">Sources, checked {CHECKED_ON}</h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {c.sources.map((s) => (
                  <li key={s}>
                    <a href={s} target="_blank" rel="noopener noreferrer" className="text-[14px] break-all text-mute underline underline-offset-4 hover:text-graphite">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-[1.55] text-mute">
                Spotted something out of date? Email hello@boldteq.com and we&apos;ll correct it. Product names belong to
                their owners.
              </p>
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-graphite">Other comparisons</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/compare/${o.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-canvas px-4 text-[14px] font-medium text-graphite ring-1 ring-hair hover:bg-canvas-deep">
                      vs {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
