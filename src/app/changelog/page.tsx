import React from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { Button, Chip, Container, Section, Title, cn, type ChipTone, type RelatedItem } from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CalendarScreen } from "@/components/mockups/calendar";
import { FormsScreen } from "@/components/mockups/forms";
import { InventoryScreen } from "@/components/mockups/inventory";
import { ProjectsScreen } from "@/components/mockups/projects";
import {
  CHANGELOG_KIND_LABEL,
  changelogEntries,
  formatChangelogDate,
  type ChangelogEntry,
  type ChangelogKind,
  type ChangelogScreen,
} from "@/lib/data/changelog";
import { PLANS, formatPrice } from "@/lib/data/plans";
import { roadmapItems } from "@/lib/data/roadmap";
import { pageMetadata } from "@/lib/seo";
import { ChangelogFeed, type FeedEntry } from "./changelog-feed";
import { MessagesPhotoThread } from "./messages-photo-thread";

export const metadata = pageMetadata({
  title: "Changelog: what’s new in Limespun",
  description:
    "Every change to Limespun, dated and in plain words: new features, improvements and fixes to the tattoo studio app, newest first. Nothing to install.",
  path: "/changelog",
});

/** Entries shown open on All; the rest fold into "Earlier updates" (keeps the phone page short). */
const RECENT = 7;

const KIND_TONE: Record<ChangelogKind, ChipTone> = {
  feature: "ember",
  improvement: "quiet",
  fix: "success",
};

/* ─── Screens ─────────────────────────────────────────────────────────────────
   The screen each entry changed, from the mockup library (sample studio, Thu Oct 8). */
function Screen({ screen }: { screen: ChangelogScreen }) {
  switch (screen) {
    case "messages":
      return <MessagesPhotoThread />;
    case "inventory":
      return <InventoryScreen tab="purchase-orders" />;
    case "calendar":
      return <CalendarScreen view="week" />;
    case "kiosk":
      return <FormsScreen tab="kiosk" />;
    case "project":
      return <ProjectsScreen view="detail" />;
  }
}

/**
 * Crops that run deeper than the default: Inventory's purchase orders sit under the KPI tiles
 * and tabs; the Messages crop keeps the whole stencil photo and the text under it in view.
 */
const CROP_HEIGHT: Partial<Record<ChangelogScreen, string>> = {
  inventory: "max-h-[290px] sm:max-h-[520px]",
  messages: "max-h-[340px] sm:max-h-[440px]",
};

/**
 * A crop of the screen on the sand stage: the top of it, fading into the stage. Phones show
 * only the newest entry's screen, so the list stays a list.
 */
function ScreenCrop({ screen, phone }: { screen: ChangelogScreen; phone: boolean }) {
  return (
    <div className={cn("mt-6 min-w-0 rounded-tile bg-canvas-deep p-3 sm:mt-8 sm:p-5", !phone && "hidden sm:block")}>
      <div
        className={cn(
          "overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-72px),transparent)]",
          CROP_HEIGHT[screen] ?? "max-h-[290px] sm:max-h-[400px]",
        )}
      >
        <Screen screen={screen} />
      </div>
    </div>
  );
}

/* ─── Entry ─────────────────────────────────────────────────────────────────── */

function HighlightList({ entry }: { entry: ChangelogEntry }) {
  return (
    <>
      <ul className="flex flex-col gap-2.5">
        {entry.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-[15px] leading-[1.55] text-pretty text-graphite sm:text-[16px]">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
      {entry.feature && (
        <Button href={entry.feature.href} variant="ghost" arrow className="mt-3 sm:mt-4">
          {entry.feature.label}
        </Button>
      )}
    </>
  );
}

/**
 * Date and type, then the title, the one-line summary, the screen and what changed. From xl the
 * date and type sit in their own column and stay in view while the entry scrolls. Phones fold
 * the highlights under "What changed", so the list reads as a list.
 */
function Entry({ entry, first }: { entry: ChangelogEntry; first: boolean }) {
  const titleId = `${entry.id}-title`;
  return (
    <article
      id={entry.id}
      aria-labelledby={titleId}
      className="scroll-mt-28 py-8 sm:py-12 xl:grid xl:grid-cols-[128px_minmax(0,1fr)] xl:gap-10"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 xl:sticky xl:top-28 xl:flex-col xl:items-start xl:self-start xl:pt-1">
        <time dateTime={entry.date} className="text-[14px] font-medium whitespace-nowrap text-mute tabular-nums">
          {formatChangelogDate(entry.date)}
        </time>
        <Chip tone={KIND_TONE[entry.kind]} className="px-2.5 py-1 text-[12px]">
          {CHANGELOG_KIND_LABEL[entry.kind]}
        </Chip>
      </div>
      <div className="mt-3 min-w-0 xl:mt-0">
        <Title as="h3" size="md" id={titleId} className="max-w-[680px]">
          {entry.title}
        </Title>
        <p className="mt-2 max-w-[640px] text-[16px] leading-[1.6] text-pretty text-graphite-soft sm:mt-2.5 sm:text-[17px]">
          {entry.summary}
        </p>
        {entry.screen && <ScreenCrop screen={entry.screen} phone={first} />}

        <div className="mt-6 hidden max-w-[680px] sm:block">
          <HighlightList entry={entry} />
        </div>
        <details className="group/hl mt-2 sm:hidden">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-[15px] font-semibold text-graphite focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
            What changed
            <span className="font-medium text-mute tabular-nums">{entry.highlights.length}</span>
            <ChevronDown
              size={16}
              strokeWidth={2.2}
              aria-hidden="true"
              className="text-mute transition-transform duration-200 group-open/hl:rotate-180"
            />
          </summary>
          <div className="pt-1 pb-1">
            <HighlightList entry={entry} />
          </div>
        </details>
      </div>
    </article>
  );
}

/* ─── Around the feed ───────────────────────────────────────────────────────── */

const monthYear = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

const latest = changelogEntries[0];
const oldest = changelogEntries[changelogEntries.length - 1];
const earlierCount = Math.max(0, changelogEntries.length - RECENT);
const buildingNow = roadmapItems.filter((r) => r.stage === "now");
const fromPrice = formatPrice(Math.min(...PLANS.map((p) => p.monthlyCents)));

function RailLinks() {
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <Button href="/roadmap" variant="ghost" arrow>
          Roadmap
        </Button>
      </li>
      <li>
        <a
          href="#subscribe"
          className="inline-flex min-h-11 items-center gap-1.5 text-[16px] font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite"
        >
          Updates by email
          <ArrowDown size={16} strokeWidth={2.4} aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}

/** Subscribe (the footer's Studio notes list) beside what's being built now. */
function Subscribe() {
  return (
    <div
      id="subscribe"
      className="grid scroll-mt-28 gap-8 rounded-card bg-canvas p-5 ring-1 ring-hair sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-12 lg:p-10"
    >
      <NewsletterForm
        eyebrow="Studio notes · free"
        title="Get the changelog by email."
        hint="What shipped, in plain words, in Studio notes. At most one email a month."
      />
      <div className="hidden min-w-0 flex-col justify-between gap-5 border-l border-hair pl-12 md:flex">
        <div>
          <p className="text-label text-mute uppercase">Building now</p>
          <ul className="mt-3 flex flex-col gap-2">
            {buildingNow.map((r) => (
              <li key={r.title} className="flex gap-2.5 text-[16px] leading-snug font-medium text-graphite">
                <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-ember" aria-hidden="true" />
                {r.title}
              </li>
            ))}
          </ul>
        </div>
        <Button href="/roadmap" variant="ghost" arrow className="self-start">
          See the roadmap
        </Button>
      </div>
    </div>
  );
}

const RELATED: RelatedItem[] = [
  { eyebrow: "Updates", title: "Roadmap", body: "What we’re building now, what’s next and what’s later.", href: "/roadmap" },
  { eyebrow: "Product", title: "All features", body: "Bookings, deposits, consent forms, projects and artist payouts.", href: "/product" },
  { eyebrow: "Feature", title: "Messages", body: "SMS and email in one inbox, beside the client’s record.", href: "/product/messages" },
  { eyebrow: "Feature", title: "Consent forms", body: "Signed on the client’s phone or the studio tablet, kept as PDFs.", href: "/product/forms" },
  { eyebrow: "Plans", title: "Pricing", body: `Flat monthly plans from ${fromPrice}. No cut of bookings or deposits.`, href: "/pricing" },
  { eyebrow: "Company", title: "Contact", body: "Found something broken, or want something built? Write to us.", href: "/contact?topic=feature-request" },
];

export default function ChangelogPage() {
  const entries: FeedEntry[] = changelogEntries.map((entry, i) => ({
    id: entry.id,
    kind: entry.kind,
    year: entry.date.slice(0, 4),
    node: <Entry entry={entry} first={i === 0} />,
  }));

  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "Changelog" }]}
      title="What changed in Limespun, and when."
      italicWord="when"
      lead="What changed in the app, newest first: features, improvements and fixes, in the words you’d use at the desk. There’s nothing to install; every studio gets each update as it lands."
      meta={
        <>
          Latest update <time dateTime={latest.date}>{formatChangelogDate(latest.date)}</time> · {changelogEntries.length}{" "}
          updates since {monthYear(oldest.date)}
        </>
      }
      related={{ items: RELATED }}
      inkBand={{ headline: "Try the latest.", italicWord: "latest", secondary: { label: "See the roadmap", href: "/roadmap" } }}
    >
      <Section tone="white" density="proof" labelledBy={`year-${latest.date.slice(0, 4)}`} className="border-t border-hair">
        <Container>
          <ChangelogFeed
            entries={entries}
            recent={RECENT}
            earlierLabel={`${earlierCount} more, back to ${monthYear(oldest.date)}`}
            aside={<RailLinks />}
            after={<Subscribe />}
          />
        </Container>
      </Section>
    </ContentPage>
  );
}
