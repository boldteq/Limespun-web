import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Chip, CheckRow, Container, Section, Title, cn, type RelatedItem } from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { changelogEntries, formatChangelogDate } from "@/lib/data/changelog";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { ROADMAP_STAGES, roadmapItems, type RoadmapItem, type RoadmapStage } from "@/lib/data/roadmap";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Roadmap: what we’re building next",
  description:
    "What Limespun is building now, what comes next and what we’re weighing up, with no dates. See what already shipped, and tell us what your studio needs.",
  path: "/roadmap",
});

const REQUEST_HREF = "/contact?topic=feature-request";
const SHIPPED_ROWS = 4;
/** Phones list the newest three; the button covers the rest. */
const SHIPPED_ROWS_PHONE = 3;
const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

/* ─── Board ─────────────────────────────────────────────────────────────────── */

/** The column's node: ember for Now, a dark ring for Next, a hairline ring for Later. */
function StageNode({ stage }: { stage: RoadmapStage }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "h-3 w-3 shrink-0 rounded-full",
        stage === "now" && "bg-ember ring-4 ring-ember-soft",
        stage === "next" && "bg-white ring-2 ring-graphite ring-inset",
        stage === "later" && "bg-white ring-1 ring-hair-strong ring-inset",
      )}
    />
  );
}

function Card({ item }: { item: RoadmapItem }) {
  return (
    <li className="flex min-w-0 flex-col rounded-[16px] bg-white p-4 ring-1 ring-hair sm:p-5">
      <Chip tone="quiet" className="hidden self-start px-2.5 py-1 text-[12px] sm:inline-flex">
        {item.area}
      </Chip>
      <Title as="h3" size="sm" className="text-[18px] sm:mt-3 sm:text-[19px]">
        {item.title}
      </Title>
      <p className="mt-1.5 text-[15px] leading-[1.55] text-pretty text-mute">{item.description}</p>
      {item.today && (
        <p className="mt-3 border-t border-hair pt-3 text-[14px] leading-[1.5] text-pretty text-graphite-soft">
          <span className="font-semibold text-graphite">Today: </span>
          {item.today}
        </p>
      )}
    </li>
  );
}

function Board() {
  return (
    <Section tone="white" density="proof" className="border-t border-hair">
      <Container>
        <div className="grid gap-4 lg:grid-cols-3 lg:items-start lg:gap-5">
          {ROADMAP_STAGES.map((stage) => {
            const items = roadmapItems.filter((r) => r.stage === stage.id);
            const headingId = `stage-${stage.id}`;
            return (
              <section
                key={stage.id}
                aria-labelledby={headingId}
                className="flex min-w-0 flex-col rounded-card bg-canvas-deep p-2.5 sm:p-3"
              >
                <div className="flex items-center justify-between gap-3 px-2.5 pt-2.5 pb-3.5 sm:px-3 sm:pt-3 sm:pb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <StageNode stage={stage.id} />
                    <div className="min-w-0">
                      <Title as="h2" size="md" id={headingId}>
                        {stage.label}
                      </Title>
                      <p className="text-[14px] leading-snug text-mute">{stage.line}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-[13px] font-medium text-graphite-soft tabular-nums ring-1 ring-hair">
                    {items.length}
                    <span className="sr-only"> {items.length === 1 ? "item" : "items"}</span>
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <Card key={item.title} item={item} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
        <CheckRow
          className="mt-10 hidden sm:flex"
          items={["No dates, on purpose", "Nothing here is sold until it ships", "Shipped work moves to the changelog"]}
        />
      </Container>
    </Section>
  );
}

/* ─── Shipped + requests ────────────────────────────────────────────────────── */

function ShippedAndAsk() {
  const shipped = changelogEntries.slice(0, SHIPPED_ROWS);
  return (
    <Section tone="deep" density="proof" labelledBy="shipped-heading">
      <Container className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5">
        <div className="flex min-w-0 flex-col rounded-card bg-white p-5 ring-1 ring-hair sm:p-8 lg:p-10">
          <Title as="h2" size="lg" id="shipped-heading">
            Shipped lately
          </Title>
          <p className="mt-3 hidden max-w-[520px] text-[17px] leading-[1.6] text-pretty text-mute sm:block">
            Once it’s in the app, it leaves the board and gets a dated entry in the changelog.
          </p>
          <ul className="mt-5 border-t border-hair sm:mt-6">
            {shipped.map((e, i) => (
              <li key={e.id} className={cn("border-b border-hair", i >= SHIPPED_ROWS_PHONE && "hidden sm:block")}>
                <Link
                  href={`/changelog#${e.id}`}
                  className="group flex min-h-11 items-center justify-between gap-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:py-3.5"
                >
                  <span className="min-w-0 sm:flex sm:items-baseline sm:gap-5">
                    <time
                      dateTime={e.date}
                      className="block shrink-0 text-[13px] font-medium whitespace-nowrap text-mute tabular-nums sm:w-[96px] sm:text-[14px]"
                    >
                      {formatChangelogDate(e.date)}
                    </time>
                    <span className="mt-0.5 block text-[15px] leading-snug font-medium text-graphite sm:mt-0 sm:text-[16px]">
                      {e.title}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="shrink-0 text-graphite transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/changelog" variant="secondary" className="mt-6 self-start sm:mt-8">
            See the changelog
          </Button>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-8 rounded-card bg-canvas p-5 ring-1 ring-hair sm:p-8 lg:p-10">
          <div>
            <Title as="h2" size="lg">
              Tell us what to build
            </Title>
            <p className="mt-3 max-w-[440px] text-[16px] leading-[1.6] text-pretty text-graphite-soft sm:text-[17px]">
              Write to us with what your studio needs and how you handle it today. You’ll get a straight answer: now,
              next, later, or not for us.
            </p>
            <div className="mt-8 hidden border-t border-graphite/10 pt-6 sm:block">
              <p className="text-label text-mute uppercase">Useful to include</p>
              <CheckRow
                className="mt-4 flex-col items-start gap-y-2.5"
                items={["What you’d like the app to do", "How your studio handles it today", "How often it comes up"]}
              />
            </div>
          </div>
          <Button href={REQUEST_HREF} arrow className="self-start">
            Tell us what to build
          </Button>
        </div>
      </Container>
    </Section>
  );
}

const RELATED: RelatedItem[] = [
  { eyebrow: "Updates", title: "Changelog", body: "Everything that shipped, dated and in plain words.", href: "/changelog" },
  { eyebrow: "Feature", title: "Design moodboards", body: "References, placement, size and style notes on every project.", href: "/product/ai-design" },
  { eyebrow: "Feature", title: "Messages", body: "SMS and email in one inbox, beside the client’s record.", href: "/product/messages" },
  { eyebrow: "Feature", title: "Calendar", body: "Every artist on one calendar, with clash checks on Studio and up.", href: "/product/calendar" },
  { eyebrow: "Feature", title: "Deposits", body: "Deposits taken before the chair is held, with no cut of any of it.", href: "/product/appointments" },
  { eyebrow: "Plans", title: "Pricing", body: `Flat monthly plans from ${fromPrice}. No cut of bookings or deposits.`, href: "/pricing" },
];

export default function RoadmapPage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "Roadmap" }]}
      title="What we’re building next."
      italicWord="next"
      lead="What’s being built now, what’s queued after it and what we’re weighing up. No dates: we’d rather ship than promise a month."
      related={{ items: RELATED }}
      inkBand={{ headline: "Start with what’s shipped.", italicWord: "shipped", secondary: { label: "See the changelog", href: "/changelog" } }}
    >
      <Board />
      <ShippedAndAsk />
    </ContentPage>
  );
}
