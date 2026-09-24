import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import { Title, cn } from "@/components/system";
import { SWITCHING_CHECKED_ON, competitors, possessive, shortName, type Competitor } from "@/lib/data/competitors";
import { MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS } from "@/lib/data/plans";
import { CopyButton } from "./copy-button";

/*
 * The switching story, shared by the /migrate hub and every /compare/<vendor> page. Server
 * components; the only client part is the copy button in the announcement kit. Every vendor
 * fact comes from `competitor.switching` (sourced, SWITCHING_CHECKED_ON); everything else is
 * what Limespun does on every plan.
 */

/* ─── What comes across ─────────────────────────────────────────────────── */

/** The five things our team moves, and where each lands in the app (its own nouns). */
const MOVES: { title: string; lands: string }[] = [
  { title: "Clients", lands: "Contact details and notes on each client’s record, duplicates merged." },
  { title: "Upcoming bookings", lands: "On the right artist’s calendar, at the same time." },
  { title: "Deposits held", lands: "On the client and the project, ready to apply at the session." },
  { title: "Signed consent forms", lands: "Kept as PDFs on the client’s record." },
  { title: "Project notes and photos", lands: "Under the project, next to its sessions." },
];

/** What never moves, whichever tool you leave; the vendor's own `keeps` follow these. */
function staysBehind(from: string, vendor?: Competitor): { title: string; body?: string }[] {
  return [
    {
      title: "Past card payments and payouts",
      body: `They stay in ${possessive(from)} reports. Download what you need before you close the account.`,
    },
    { title: "Saved client cards", body: "We don’t move saved cards. Clients add a card with their next deposit." },
    ...(vendor?.switching.keeps ?? []).map((k) => ({ title: k })),
  ];
}

function StaysList({ items, className }: { items: { title: string; body?: string }[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((s) => (
        <li key={s.title} className="flex gap-2.5">
          <Minus size={16} strokeWidth={2.4} aria-hidden="true" className="mt-[3px] shrink-0 text-mute" />
          <span className="min-w-0">
            <span className="block text-[15px] leading-snug font-semibold text-graphite">{s.title}</span>
            {s.body && <span className="mt-0.5 block text-[14px] leading-[1.5] text-pretty text-mute">{s.body}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Sources ───────────────────────────────────────────────────────────── */

/** "vagaro.com/pro/pricing"; a long help-page path shortens to its host ("support.vagaro.com/…"). */
function hostPath(url: string): string {
  const bare = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return bare.length > 36 ? `${bare.split("/")[0]}/…` : bare;
}

/** A row of source links, each at least 44px tall. */
export function SourceLinks({ urls, className }: { urls: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5", className)}>
      {urls.map((u) => (
        <li key={u} className="min-w-0">
          <a
            href={u}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 max-w-full items-center gap-1 text-[14px] text-mute underline decoration-hair-strong underline-offset-4 hover:text-graphite hover:decoration-ember focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
          >
            {hostPath(u)}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Where the facts come from. Phones fold the links under one line ("Sources, checked …") so a
 * vendor with several source pages doesn't stack a link per row; from sm the links sit inline.
 */
export function SourceNote({ checkedOn, urls, className }: { checkedOn: string; urls: string[]; className?: string }) {
  if (urls.length === 0) return null;
  const label = `${urls.length === 1 ? "Source" : "Sources"}, checked ${checkedOn}`;
  return (
    <div className={className}>
      <details className="group sm:hidden">
        <summary className="-my-1 flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 text-[13px] text-mute focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
          {label}
          <ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <SourceLinks urls={urls} className="-mb-1" />
      </details>
      <div className="hidden gap-x-3 sm:flex sm:flex-wrap sm:items-center">
        <p className="text-[14px] text-mute">{label}:</p>
        <SourceLinks urls={urls} />
      </div>
    </div>
  );
}

/* ─── Three steps ───────────────────────────────────────────────────────── */

/** What we take: an export, a spreadsheet, the paper book by photo, or access to the old tool. */
const SOURCES_ACCEPTED = ["CSV or Excel export", "Spreadsheet", "Paper book, by photo", "Access to your old tool"];

function SourceChips({ onWhite }: { onWhite: boolean }) {
  return (
    <ul aria-label="What we can work from" className="mt-3 flex flex-wrap gap-1.5 sm:mt-3.5">
      {SOURCES_ACCEPTED.map((s) => (
        <li
          key={s}
          className={cn(
            "rounded-full px-2 py-0.5 text-[12.5px] font-medium text-graphite-soft ring-1 ring-hair sm:px-2.5 sm:py-1 sm:text-[13px]",
            onWhite ? "bg-canvas" : "bg-white",
          )}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Dots({ items }: { items: string[] }) {
  return (
    <ul className="mt-2.5 flex flex-col gap-1.5">
      {items.map((w) => (
        <li key={w} className="flex gap-2.5 text-[15px] leading-[1.5] text-pretty text-graphite-soft">
          <span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
          {w}
        </li>
      ))}
    </ul>
  );
}

const bodyText = "text-[15px] leading-[1.55] text-pretty text-mute sm:text-[16px]";

/**
 * You export or share access → we import and you check the counts → you switch when you're
 * ready. No day counts: the old tool runs alongside for as long as it takes. Cards that swipe
 * below lg (the next one peeks in), three across from lg.
 *
 * Each card carries its part of the move: step one how to get the data out (with a vendor, its
 * export steps from its own help pages) and what we can work from, step two what comes across,
 * step three what stays behind.
 */
export function SwitchSteps({
  vendor,
  surface = "white",
  className,
}: {
  vendor?: Competitor;
  /** The section's tone: cards are canvas on white, white on canvas. */
  surface?: "white" | "canvas";
  className?: string;
}) {
  const onWhite = surface === "canvas";
  const from = vendor ? shortName(vendor) : "your old tool";
  const From = vendor ? from : "Your old tool";
  const steps: { title: string; body: React.ReactNode }[] = [
    {
      title: vendor ? `Export from ${from}, or send what you have` : "You export, or share access",
      body: (
        <>
          <p className={bodyText}>
            {vendor
              ? vendor.switching.exports
              : "Download a client list from your current tool, send a spreadsheet or photos of the paper book, or give our team access to pull it."}
          </p>
          {vendor ? (
            vendor.switching.watchouts.length > 0 && <Dots items={vendor.switching.watchouts} />
          ) : (
            <Dots items={["Export before you cancel. Some tools let only the account owner export, and some export once."]} />
          )}
          <SourceChips onWhite={onWhite} />
          {vendor && vendor.switching.exportSources.length > 0 && (
            <SourceNote
              checkedOn={SWITCHING_CHECKED_ON}
              urls={vendor.switching.exportSources}
              className="mt-3 border-t border-hair-strong/70 pt-1 sm:pt-2 [&_p]:text-[13px]"
            />
          )}
        </>
      ),
    },
    {
      title: "We import, you check the counts",
      body: (
        <>
          <p className={bodyText}>Our team files each of these on the right client. Then you check the counts against {from}.</p>
          <ul className="mt-3 flex flex-col gap-2">
            {MOVES.map((m) => (
              <li key={m.title} className="flex gap-2.5">
                <Check size={16} strokeWidth={2.6} aria-hidden="true" className="mt-[3px] shrink-0 text-ember" />
                <span className="min-w-0">
                  <span className="block text-[15px] leading-snug font-semibold text-graphite">{m.title}</span>
                  <span className="mt-0.5 hidden text-[14px] leading-[1.5] text-pretty text-mute sm:block">{m.lands}</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "You switch when you’re ready",
      body: (
        <>
          <p className={bodyText}>
            {From} keeps running alongside. When the counts match, point your booking link at Limespun and cancel{" "}
            {vendor ? from : "the old one"} yourself.
          </p>
          <p className="mt-4 text-label text-mute uppercase">Stays with {from}</p>
          <StaysList items={staysBehind(from, vendor)} className="mt-2.5" />
        </>
      ),
    },
  ];
  return (
    <div
      role="region"
      aria-label="Three steps to switch"
      tabIndex={0}
      className={cn(
        "relative -mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <ol className="flex items-stretch gap-3 max-lg:after:block max-lg:after:w-1 max-lg:after:shrink-0 max-lg:after:content-[''] sm:gap-4 lg:grid lg:grid-cols-3 lg:gap-5">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={cn(
              "flex w-[min(calc(100vw-4.5rem),20.5rem)] shrink-0 snap-start flex-col rounded-card p-5 sm:w-[21.5rem] sm:p-6 lg:w-auto lg:p-7",
              onWhite ? "bg-white ring-1 ring-hair" : "bg-canvas",
            )}
          >
            <span aria-hidden="true" className="font-serif text-[40px] leading-none text-ember-deep tabular-nums">
              {i + 1}
            </span>
            <h3 className="mt-3 text-title-sm text-balance text-graphite">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <div className="mt-2">{s.body}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Guarantees ────────────────────────────────────────────────────────── */

const PROMISES = [
  { value: "Every plan", label: "Migration done by our team", note: "Solo included, at no extra cost" },
  { value: `${MONEY_BACK_DAYS} days`, label: "Money-back guarantee", note: "No free trial" },
  { value: `${ONBOARDING_SUPPORT_DAYS} days`, label: "Onboarding help", note: "By email, while you set up" },
];

/**
 * The three promises from plans.ts, in the StatGrid's hairline cells. Phones read them as
 * rows (figure beside its label) so three facts cost one short block; three across from sm.
 * `vendor` adds a last row: what that vendor's own pages offer studios moving onto it.
 */
export function Guarantees({
  vendor,
  tone = "canvas",
  className,
}: {
  vendor?: Competitor;
  tone?: "canvas" | "white";
  className?: string;
}) {
  const cell = tone === "white" ? "bg-white" : "bg-canvas";
  const source = vendor?.switching.onboardingSource;
  return (
    <div
      className={cn(
        "flex flex-col gap-px overflow-hidden rounded-card ring-1",
        tone === "white" ? "bg-hair ring-hair" : "bg-hair-strong/60 ring-hair-strong/60",
        className,
      )}
    >
      <dl className="grid gap-px sm:grid-cols-3">
        {PROMISES.map((p) => (
          <div
            key={p.label}
            className={cn(
              "grid grid-cols-[104px_minmax(0,1fr)] items-baseline gap-x-4 px-4 py-3 sm:flex sm:flex-col-reverse sm:justify-end sm:gap-1 sm:p-6",
              cell,
            )}
          >
            <dt className="col-start-2 row-start-1 text-[15px] leading-snug text-pretty text-graphite sm:text-mute">
              {p.label}
              <span className="mt-0.5 block text-ui-sm text-mute">{p.note}</span>
            </dt>
            <dd className="col-start-1 row-start-1 text-[21px] leading-tight font-semibold tracking-[-0.02em] text-graphite tabular-nums sm:text-figure">
              {p.value}
            </dd>
          </div>
        ))}
      </dl>
      {vendor && (
        <p className={cn("px-4 py-3.5 text-[15px] leading-[1.55] text-pretty text-graphite-soft sm:px-6 sm:py-4", cell)}>
          <span className="font-semibold text-graphite">{shortName(vendor)}, for comparison: </span>
          {vendor.switching.onboarding}{" "}
          {source ? (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mute underline decoration-hair-strong underline-offset-4 hover:text-graphite hover:decoration-ember focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
            >
              From {possessive(shortName(vendor))} own page
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-mute">From {possessive(shortName(vendor))} own pages, listed above.</span>
          )}
        </p>
      )}
    </div>
  );
}

/* ─── Switching from (hub cards) ───────────────────────────────────────── */

const cardClass =
  "group flex h-full flex-col rounded-card bg-canvas p-4 ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:p-6";

/**
 * One card per competitor (→ its comparison's switching section) plus spreadsheet or paper.
 * Phones get two across with the name and its arrow only; from sm the kind of tool and a short
 * export line join.
 */
export function SwitchFromGrid({ className }: { className?: string }) {
  const cards = [
    ...competitors.map((c) => ({
      key: c.slug,
      eyebrow: c.category === "Tattoo studio software" ? "Tattoo software" : c.category,
      title: shortName(c),
      body: c.switching.exportsShort,
      href: `/compare/${c.slug}#switching`,
    })),
    {
      key: "paper",
      eyebrow: "No software",
      title: "Spreadsheet or paper",
      body: "Send the file, or photos of the book",
      href: "/contact?topic=switching",
    },
  ];
  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", className)}>
      {cards.map((c) => (
        <li key={c.key} className="min-w-0">
          <Link href={c.href} className={cardClass}>
            <span className="hidden text-label text-mute uppercase sm:block">{c.eyebrow}</span>
            <span className="flex items-start justify-between gap-2 sm:mt-2 sm:block">
              <span className="text-[17px] leading-snug font-semibold text-balance text-graphite sm:text-title-sm">{c.title}</span>
              <ArrowRight
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
                className="mt-1 shrink-0 text-graphite transition-transform duration-200 group-hover:translate-x-1 sm:hidden"
              />
            </span>
            <span className="mt-1.5 hidden text-[15px] leading-[1.45] text-pretty text-mute sm:block">{c.body}</span>
            <span className="mt-auto hidden pt-4 sm:block">
              <ArrowRight
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
                className="text-graphite transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ─── Client announcement kit ──────────────────────────────────────────── */

const SMS =
  "Hi [first name], it’s [studio]. We’ve moved to a new booking system. Your session and your deposit came with us. Book your next one here: [booking link]";

const EMAIL_SUBJECT = "Our booking system has changed";
const EMAIL: string[] = [
  "Hi [first name],",
  "We’ve moved [studio] to a new booking system. Your upcoming session is still booked, same day and artist, and any deposit you’ve paid is on it.",
  "From now on, book and pay deposits here: [booking link]. Your consent form comes to your phone before your session.",
  "If you had a card saved with us, add it again with your next deposit.",
  "See you soon,\n[your name], [studio]",
];

const STORY = ["New booking link.", "Same artists, same chairs.", "Book and pay your deposit in one place. Link in bio."];

/** "[studio]" → a highlighted placeholder; everything else as typed. */
function WithPlaceholders({ text, onDark = false }: { text: string; onDark?: boolean }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        /^\[[^\]]+\]$/.test(p) ? (
          <span
            key={i}
            className={cn("rounded-[4px] px-[3px]", onDark ? "bg-white/15 text-white" : "bg-ember-soft text-ember-deep")}
          >
            {p}
          </span>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

function KitCard({
  label,
  hint,
  copyText,
  copyWhat,
  children,
}: {
  label: string;
  hint: string;
  copyText: string;
  /** What the button copies, for its accessible name: "Copy text message". */
  copyWhat: string;
  children: React.ReactNode;
}) {
  return (
    <li className="@container relative flex w-[min(calc(100vw-4.5rem),21rem)] shrink-0 snap-start flex-col rounded-card bg-white p-4 ring-1 ring-hair sm:p-6 lg:w-auto">
      {/* Title and who it's for, the copy button beside them; a narrow card (320 phones, the
          three-across row at lg) puts it under them in every card alike */}
      <div className="flex flex-col items-start gap-3 @[17rem]:flex-row @[17rem]:items-center @[17rem]:justify-between">
        <div className="min-w-0">
          <Title as="h3" size="sm">
            {label}
          </Title>
          <p className="mt-0.5 text-[13px] text-mute">{hint}</p>
        </div>
        <CopyButton text={copyText} what={copyWhat} className="shrink-0" />
      </div>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </li>
  );
}

/**
 * Text, email and Instagram story copy a studio can paste the day it switches. Placeholders
 * in brackets. Below lg the cards swipe (the next one peeks in); three across from lg.
 */
export function AnnouncementKit({ className }: { className?: string }) {
  const emailText = `Subject: ${EMAIL_SUBJECT}\n\n${EMAIL.join("\n\n")}`;
  return (
    <div
      role="region"
      aria-label="Announcement copy: text message, email and Instagram story"
      tabIndex={0}
      className={cn(
        "relative -mx-5 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <ul className="flex items-start gap-3 max-lg:after:block max-lg:after:w-1 max-lg:after:shrink-0 max-lg:after:content-[''] sm:gap-4 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-5">
        <KitCard label="Text message" hint="To booked clients" copyText={SMS} copyWhat="text message">
          {/* A text thread: the studio's name on top, the message going out, then its status */}
          <div className="flex flex-1 flex-col rounded-[16px] bg-canvas p-4">
            <div className="flex items-center gap-2.5 border-b border-hair-strong/70 pb-3">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-graphite ring-1 ring-hair">
                S
              </span>
              <span className="min-w-0 text-[14px] leading-tight">
                <span className="block font-semibold text-graphite">[studio]</span>
                <span className="block text-[13px] text-mute">Text message</span>
              </span>
            </div>
            <p className="mt-4 max-w-[92%] self-end rounded-[16px] rounded-br-[4px] bg-graphite px-4 py-3 text-[14px] leading-[1.5] text-white">
              <WithPlaceholders text={SMS} onDark />
            </p>
            <span className="mt-1.5 self-end text-[12px] text-mute">Delivered</span>
          </div>
        </KitCard>

        <KitCard label="Email" hint="To every client" copyText={emailText} copyWhat="email">
          <div className="flex-1 rounded-[16px] bg-canvas p-4 text-[14px] leading-[1.5] text-graphite-soft">
            <p className="border-b border-hair-strong/70 pb-2.5 text-graphite">
              <span className="text-mute">Subject </span>
              <span className="font-semibold">{EMAIL_SUBJECT}</span>
            </p>
            <div className="mt-2.5 flex flex-col gap-2">
              {EMAIL.map((l) => (
                <p key={l} className="whitespace-pre-line">
                  <WithPlaceholders text={l} />
                </p>
              ))}
            </div>
          </div>
        </KitCard>

        <KitCard label="Instagram story" hint="Add a link sticker" copyText={STORY.join(" ")} copyWhat="Instagram story">
          <div className="flex flex-1 items-center justify-center rounded-[16px] bg-canvas-deep p-4">
            <div className="ink-glow flex aspect-[9/16] w-[168px] flex-col justify-center rounded-[18px] p-4 text-center shadow-[var(--shadow-warm)]">
              <p className="font-serif text-[26px] leading-[1.05] text-balance text-ink-text">{STORY[0]}</p>
              <p className="mt-2 font-serif text-[18px] leading-[1.15] text-balance text-ember">{STORY[1]}</p>
              <p className="mt-3 text-[12px] leading-[1.45] text-ink-muted">{STORY[2]}</p>
              <span className="mx-auto mt-4 rounded-full bg-canvas px-3 py-1 text-[11px] font-semibold text-graphite">
                [booking link]
              </span>
            </div>
          </div>
        </KitCard>
      </ul>
    </div>
  );
}
