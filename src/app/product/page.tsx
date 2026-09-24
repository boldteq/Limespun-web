import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CalendarPlus,
  Check,
  ChevronRight,
  CircleCheck,
  Download,
  KeyRound,
  Lock,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  Button,
  Container,
  Display,
  InkBand,
  Lead,
  PageIntro,
  PlanChip,
  SampleTag,
  ScrollStory,
  Section,
  StripedFrame,
  Title,
  cn,
  type RelatedItem,
  type StoryStep,
} from "@/components/system";
import { PageShell } from "@/components/templates/page-shell";
import { RelatedLinks, SectionHeader } from "@/components/templates/parts";
import {
  ARTISTS,
  ASHA_PROJECT,
  AppAvatar,
  AppBookingStatus,
  AppButton,
  AppCard,
  AppFrame,
  AppLabel,
  AppProjectStatus,
  AppStatus,
  CLIENTS,
  CalendarScreen,
  MessagesScreen,
  NOW,
  NeedsAttentionScreen,
  SUBMISSIONS,
  TODAY_BOOKINGS,
  TODAY_SESSIONS,
  TodayScreen,
  usd,
  type ProjectSession,
} from "@/components/mockups";
import { ACCOUNT } from "@/lib/brand";
import { competitors } from "@/lib/data/competitors";
import { FEATURES, FEATURE_GROUPS, featureHref, getFeature, type FeatureSlug } from "@/lib/data/features";
import { ANNUAL_DISCOUNT_PERCENT, MONEY_BACK_DAYS, ONBOARDING_SUPPORT_DAYS, PLANS, PLAN_CAPS, formatPrice, type PlanTier } from "@/lib/data/plans";
import { SEGMENTS } from "@/lib/data/segments";
import { pageMetadata } from "@/lib/seo";

/* ─── Facts, read from the data files ──────────────────────────────────────── */

const planOf = (tier: PlanTier) => PLANS.find((p) => p.tier === tier) ?? PLANS[0];
const SOLO = planOf("solo");
const SOLO_PRICE = formatPrice(SOLO.monthlyCents);
const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen"];
const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);
const FEATURE_COUNT = FEATURES.length;
const ON_EVERY_PLAN = FEATURES.filter((f) => f.plan.min === "solo").length;

export const metadata = pageMetadata({
  title: "Tattoo studio software, feature by feature",
  description: `Bookings, deposits, consent forms, multi-session projects, artist payouts and stock for tattoo studios, in one client record. From ${SOLO_PRICE} a month.`,
  path: "/product",
  ogImage: "/product/opengraph-image",
});

/* ─── Frames for "A day in the studio" ─────────────────────────────────────── */

/**
 * A screen on the sand stage. Below lg each step shows its own frame in a swipe row, so a
 * tall screen is cut at a fixed height and fades out into the stage's foot (taller under 360px,
 * where text wraps more, so a message's reply still ends above the fade). From lg the frame
 * sticks 7rem from the top, so a screen is capped at the viewport less that offset, the
 * stage's padding and a 2rem foot (12rem in all). The fade sits just above the cap: a screen
 * shorter than the cap clips it away, so it only shows where the cap actually cuts.
 */
function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-tile bg-canvas-deep p-3 sm:p-5 lg:p-6">
      <div className="relative min-w-0 overflow-hidden max-[360px]:max-h-[440px] min-[360px]:max-sm:max-h-[380px] max-lg:[mask-image:linear-gradient(to_bottom,#000_calc(100%-72px),transparent_calc(100%-4px))] sm:max-lg:max-h-[440px] lg:max-h-[calc(100vh-12rem)]">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[calc(100vh-12rem-72px)] hidden h-[72px] bg-linear-to-b from-canvas-deep/0 to-canvas-deep lg:block"
        />
      </div>
    </div>
  );
}

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

/* Step 4: Asha M.'s koi sleeve, from ProjectsScreen view="detail" (InkOS projects/_proto,
   components/projects/*), cut to the two cards the step quotes. The Deposit pool card comes
   first so its figures sit at the top of the frame at every width (the full detail screen,
   KPI strip and photos included, is ~1,300px tall in this column). Labels, chips and the
   pool's ledger are the mockup's. */
const SESSION_CHIP: Record<ProjectSession["state"], { tone: "success" | "active" | "neutral"; label: string }> = {
  done: { tone: "success", label: "Completed" },
  today: { tone: "active", label: "In progress" },
  booked: { tone: "neutral", label: "Confirmed" },
  "not-booked": { tone: "neutral", label: "Not booked" },
};

const ASHA_DONE = ASHA_PROJECT.sessions.filter((s) => s.state === "done").length;
/** Today's session takes its share of the pool when Dev checks Asha out. */
const ASHA_CHECKOUT_CENTS = TODAY_SESSIONS.find((s) => s.projectId === ASHA_PROJECT.id)?.deposit?.cents;
/** One deposit in before session 1 (sample-data poolPaidOn), then what each session took. */
const ASHA_LEDGER = [
  { label: "Deposit paid", when: ASHA_PROJECT.poolPaidOn ?? "", cents: ASHA_PROJECT.pool.paidInCents },
  ...ASHA_PROJECT.sessions
    .filter((s) => s.appliedCents)
    .map((s) => ({ label: `Applied to S${s.n}`, when: s.date, cents: -(s.appliedCents ?? 0) })),
];

function PoolFigure({ label, cents, strong }: { label: string; cents: number; strong?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <AppLabel>{label}</AppLabel>
      <span className={cn("text-[18px] leading-tight font-extrabold tabular-nums", strong ? "text-app-success" : "text-app-text")}>
        {usd(cents)}
      </span>
    </div>
  );
}

function SleeveSessionRow({ s, last }: { s: ProjectSession; last: boolean }) {
  const chip = SESSION_CHIP[s.state];
  const done = s.state === "done";
  const cents = s.appliedCents ?? (s.state === "today" ? ASHA_CHECKOUT_CENTS : undefined);
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3", !last && "border-b border-app-border", s.state === "today" && "bg-app-sidebar")}>
      <span
        className={cn(
          "mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-app",
          done ? "bg-app-success-bg text-app-success" : "bg-graphite/[0.05] text-app-soft",
        )}
      >
        {done ? <CircleCheck size={14} strokeWidth={2} /> : <CalendarCheck size={14} strokeWidth={1.9} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-ui font-semibold whitespace-nowrap text-app-text">Session {s.n}</span>
          <AppStatus tone={chip.tone}>{chip.label}</AppStatus>
        </div>
        <span className="mt-1 block text-ui-sm text-app-mute">
          {s.date}
          {s.note ? ` · ${s.note}` : ""}
        </span>
      </div>
      {cents ? (
        <span className="shrink-0 text-right text-ui-sm tabular-nums">
          <span className="block font-semibold text-app-text">{usd(cents)}</span>
          <span className="block text-ui-xs text-app-mute">from pool</span>
          {s.state === "today" && <span className="block text-ui-xs text-app-mute">at checkout</span>}
        </span>
      ) : null}
    </div>
  );
}

function SleeveFrame() {
  const p = ASHA_PROJECT;
  return (
    <AppFrame
      active="projects"
      className="shadow-none"
      greeting={p.title}
      meta={
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1 text-app-mute">
            Projects <ChevronRight size={12} strokeWidth={2} />
          </span>
          <AppProjectStatus status={p.status} />
          <span>
            <span className="font-serif text-[13px] italic">{p.client}</span> · {ARTISTS[p.artist].name} · {p.placement}
          </span>
        </span>
      }
    >
      <div className="flex flex-col gap-4 px-4 pt-3 pb-5 @lg:px-6 @lg:pb-6">
        {/* Under 16rem of frame (320px phones) the chip goes so the card's title stays whole; Available still shows the sum */}
        <AppCard
          title="Deposit pool"
          meta={
            <AppStatus tone="success" className="hidden @min-[16rem]:inline-flex">
              {usd(p.pool.availableCents)} in pool
            </AppStatus>
          }
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 @md:grid-cols-4">
            <PoolFigure label="Paid in" cents={p.pool.paidInCents} />
            <PoolFigure label="Applied" cents={p.pool.appliedCents} />
            <PoolFigure label="Available" cents={p.pool.availableCents} strong />
            <PoolFigure label="Refundable" cents={p.pool.refundableCents} />
          </div>
          <div className="mt-3.5 flex flex-col border-t border-app-border pt-2.5">
            {ASHA_LEDGER.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2 py-1 text-ui-sm">
                {/* Narrow frames put the date under the label rather than truncating it */}
                <span className="min-w-0 text-app-text">
                  {row.label}
                  <span className="hidden text-app-mute @min-[22rem]:inline"> · </span>
                  <span className="block text-ui-xs text-app-mute @min-[22rem]:inline @min-[22rem]:text-ui-sm">{row.when}</span>
                </span>
                <span className={cn("shrink-0 font-semibold tabular-nums", row.cents > 0 ? "text-app-success" : "text-app-text")}>
                  {row.cents > 0 ? "+" : ""}
                  {usd(row.cents)}
                </span>
              </div>
            ))}
          </div>
        </AppCard>
        {/* Title and action both shorten in narrow frames, as in the detail screen */}
        <AppCard
          title={
            <>
              <span className="@min-[26rem]:hidden">
                {ASHA_DONE} of {p.sessions.length} done
              </span>
              <span className="hidden @min-[26rem]:inline">
                {ASHA_DONE} of {p.sessions.length} sessions complete
              </span>
            </>
          }
          meta={
            <AppButton icon={CalendarPlus} className="h-7">
              <span className="@min-[22rem]:hidden">Book</span>
              <span className="hidden @min-[22rem]:inline">Book next session</span>
            </AppButton>
          }
          padded={false}
        >
          {p.sessions.map((s, i) => (
            <SleeveSessionRow key={s.n} s={s} last={i === p.sessions.length - 1} />
          ))}
        </AppCard>
      </div>
    </AppFrame>
  );
}

const DAY_STEPS: StoryStep[] = [
  {
    title: "Needs attention, sorted by urgency",
    body: "An unsigned form, low stock and an unpaid deposit, in Overdue, Today and This week. Each row has its own action.",
  },
  {
    title: "Messages beside the booking",
    body: `Asha M. texts for a Saturday. Dev sends a booking link from the thread; the ${usd(ASHA_PROJECT.pool.availableCents)} on her project covers the deposit.`,
  },
  {
    title: "Three chairs side by side",
    body: `Dev, Mara and Rio side by side, with the now line at ${NOW.label}. From ${planOf("studio").name}, a move onto a taken chair is refused.`,
  },
  {
    title: "A sleeve is one project",
    body: `Session 4 of 5 of Asha M.’s koi sleeve. Her deposit pool: ${usd(ASHA_PROJECT.pool.paidInCents)} paid in, ${usd(ASHA_PROJECT.pool.appliedCents)} applied, ${usd(ASHA_PROJECT.pool.availableCents)} available.`,
  },
];

const DAY_FRAMES: React.ReactNode[] = [
  <StoryFrame key="attention">
    {/* Swipe cards (below lg) drop the search field and the revenue band, and phones the
        category chips too, so the crop reaches the queue itself: Priya S.'s unsigned form and
        the low-stock rows the step names. Under 360px the hovered row keeps only its action:
        the snooze and resolve squares would push "View booking" off the card. */}
    <NeedsAttentionScreen className="shadow-none max-lg:[&_div.bg-app-active.rounded-app-lg]:hidden max-lg:[&_div:has(>svg.lucide-search)]:hidden max-sm:[&_div:has(>div>span.h-7.rounded-full)]:hidden max-[359px]:[&_span:has(>svg.lucide-clock)]:hidden max-[359px]:[&_span:has(>svg.lucide-check)]:hidden" />
  </StoryFrame>,
  <StoryFrame key="messages">
    {/* The thread is bottom-anchored, so in a swipe card (below lg) a narrow phone would slice
        Asha's first text at the top. Here it reads from the top instead, without the day
        divider: her ask and Dev's reply with the link sit whole; the booked line fades out. */}
    <MessagesScreen className="shadow-none max-lg:[&_div.flex-col.justify-end]:justify-start max-lg:[&_div.flex-col.justify-end>div:first-child]:hidden" />
  </StoryFrame>,
  <StoryFrame key="calendar">
    <CalendarScreen view="day" className="shadow-none" />
  </StoryFrame>,
  <StoryFrame key="projects">
    <SleeveFrame />
  </StoryFrame>,
];

/* ─── Feature cards: the nav's three Product groups ────────────────────────── */

/**
 * Card names are the nav's nouns (src/components/layout/nav.tsx). The design page is
 * "Design moodboards" there: the app keeps references with placement, size and style
 * notes; drafted briefs aren't built, so its card says only what exists.
 */
const CARD_OVERRIDES: Partial<Record<FeatureSlug, { name: string; line: string }>> = {
  "ai-design": { name: "Design moodboards", line: "References and notes for every piece." },
};

function featureCard(slug: FeatureSlug) {
  const f = getFeature(slug);
  const o = CARD_OVERRIDES[slug];
  return { href: featureHref(slug), name: o?.name ?? f.navLabel, line: o?.line ?? f.card, plan: f.plan.min };
}

function FeatureGroups() {
  return (
    <div className="mt-block-gap grid gap-4 lg:grid-cols-3 lg:items-start lg:gap-5">
      {FEATURE_GROUPS.map((g) => (
        <div key={g.id} className="min-w-0 overflow-hidden rounded-card bg-white ring-1 ring-hair">
          <div className="flex items-baseline justify-between gap-3 px-5 pt-5 pb-3.5 sm:px-6">
            <Title as="h3" size="sm" id={`group-${g.id}`}>
              {g.title}
            </Title>
            <span className="text-[13px] text-mute tabular-nums">{g.features.length} features</span>
          </div>
          <ul aria-labelledby={`group-${g.id}`} className="border-t border-hair">
            {g.features.map((slug) => {
              const c = featureCard(slug);
              return (
                <li key={slug} className="border-b border-hair last:border-b-0">
                  <Link
                    href={c.href}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 px-5 py-3.5 transition-colors duration-200 hover:bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-graphite sm:px-6"
                  >
                    <span className="flex min-w-0 items-center gap-1.5 text-[16px] leading-snug font-semibold text-graphite">
                      {c.name}
                      <ArrowRight
                        size={15}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="shrink-0 text-ember-deep opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                    </span>
                    {/* Most features are on every plan (the lead says so); only a gated one carries a chip */}
                    {c.plan !== "solo" && <PlanChip plan={c.plan} andUp className="px-2.5 py-0.5 text-[12px]" />}
                    {/* Phones list the names only (as the Related cards do), so thirteen rows stay one short scroll */}
                    <span className="col-span-2 hidden text-[14px] leading-snug text-pretty text-mute sm:block">{c.line}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─── One record: client ↔ project ↔ session ↔ payment ↔ form ──────────────── */

const ASHA_CLIENT = CLIENTS.find((c) => c.name === ASHA_PROJECT.client);
const ASHA_SESSION = TODAY_SESSIONS.find((s) => s.projectId === ASHA_PROJECT.id);
const ASHA_FORM = SUBMISSIONS.find((s) => s.client === ASHA_PROJECT.client && s.status === "Signed");

interface RecordNode {
  kind: string;
  title: string;
  sub: string;
  lead?: React.ReactNode;
  status?: React.ReactNode;
}

const RECORD: RecordNode[] = [
  {
    kind: "Client",
    title: ASHA_PROJECT.client,
    sub: ASHA_CLIENT ? `${ASHA_CLIENT.visits} visits · next ${ASHA_CLIENT.nextVisit}` : "Client record",
    lead: <AppAvatar initials={initialsOf(ASHA_PROJECT.client)} size="md" />,
  },
  {
    kind: "Project",
    title: ASHA_PROJECT.title,
    sub: ASHA_PROJECT.placement,
    status: <AppProjectStatus status={ASHA_PROJECT.status} />,
  },
  {
    kind: "Session",
    title: ASHA_SESSION ? `Thu, Oct 8 · ${ASHA_SESSION.start}–${ASHA_SESSION.end}` : "Thu, Oct 8",
    sub: ASHA_SESSION?.session ? `Session ${ASHA_SESSION.session.n} of ${ASHA_SESSION.session.of} · ${ARTISTS[ASHA_SESSION.artist].name}` : "",
    status: ASHA_SESSION && <AppBookingStatus status={ASHA_SESSION.status} />,
  },
  {
    kind: "Payment",
    title: "Deposit pool",
    sub: `${usd(ASHA_PROJECT.pool.paidInCents)} paid in · ${usd(ASHA_PROJECT.pool.appliedCents)} applied`,
    status: (
      <AppStatus tone="success" dot>
        {usd(ASHA_PROJECT.pool.availableCents)} available
      </AppStatus>
    ),
  },
  {
    kind: "Form",
    title: ASHA_FORM?.form ?? "Tattoo consent — general",
    sub: ASHA_FORM ? `${ASHA_FORM.when} · ${ASHA_FORM.via === "Kiosk" ? "studio tablet" : ASHA_FORM.via.toLowerCase()}` : "",
    status: <AppStatus tone="success">Signed</AppStatus>,
  },
];

/**
 * The five records as the app prints them, joined by a hairline: across from lg, down the
 * left edge below it. Real text (not a picture), so it reads as a list too.
 */
function RecordChain() {
  return (
    <div className="mt-block-gap rounded-tile bg-canvas-deep p-4 sm:p-6 lg:p-8">
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
        <p className="text-[13px] font-medium text-graphite-soft">
          {ASHA_PROJECT.client}’s {ASHA_PROJECT.title.toLowerCase()}, in the app
        </p>
        <SampleTag className="bg-white" />
      </div>
      <ol className="grid gap-5 lg:grid-cols-5 lg:gap-6">
        {RECORD.map((n, i) => (
          <li
            key={n.kind}
            className={cn(
              "relative min-w-0",
              // The join: a hairline down the left edge on phones, across the gap from lg, with an ember dot on it
              i > 0 &&
                "before:absolute before:-top-5 before:left-8 before:h-5 before:w-px before:bg-hair-strong after:absolute after:-top-2.5 after:left-8 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-ember lg:before:top-1/2 lg:before:-left-6 lg:before:h-px lg:before:w-6 lg:after:top-1/2 lg:after:-left-3",
            )}
          >
            <div className="grid h-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-app-lg bg-app-surface px-4 py-3.5 shadow-lift ring-1 ring-app-border lg:grid-rows-[auto_auto_1fr] lg:py-4">
              <AppLabel className="text-app-active-fg">{n.kind}</AppLabel>
              {n.status && (
                <div className="col-start-2 row-start-1 lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:self-end lg:pt-1">{n.status}</div>
              )}
              <div className="col-span-2 flex min-w-0 items-center gap-2.5">
                {n.lead}
                <div className="min-w-0">
                  <p className="text-ui font-semibold text-app-text">{n.title}</p>
                  <p className="text-ui-xs text-app-mute">{n.sub}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Who it's for ─────────────────────────────────────────────────────────── */

function capsLine(tier: PlanTier): string {
  const artists = PLAN_CAPS.find((c) => c.label === "Artists")?.values[tier] ?? "";
  const locations = PLAN_CAPS.find((c) => c.label === "Locations")?.values[tier] ?? "";
  if (artists === "Unlimited" && locations === "Unlimited") return "Unlimited artists and locations";
  const a = artists === "1" ? "1 artist" : `${artists} artists`;
  const l = locations === "1" ? "1 location" : `${locations} locations`;
  return `${a} · ${l}`;
}

function SegmentCards() {
  return (
    <ul className="mt-block-gap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {SEGMENTS.map((s) => {
        const plan = planOf(s.plan);
        return (
          <li key={s.slug} className="min-w-0">
            <Link
              href={s.href}
              className="group flex h-full flex-col rounded-card bg-white p-4 ring-1 ring-hair transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)] hover:ring-hair-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:p-6"
            >
              <span className="text-label text-mute uppercase">{plan.name}</span>
              <span className="mt-1.5 text-title-sm text-balance text-graphite">{s.name}</span>
              <span className="mt-4 flex items-baseline gap-1 sm:mt-6">
                <span className="text-figure text-graphite tabular-nums">{formatPrice(plan.monthlyCents)}</span>
                <span className="text-[14px] text-mute">/mo</span>
              </span>
              <span className="mt-1 text-[13px] leading-snug text-pretty text-mute sm:text-[14px]">{capsLine(s.plan)}</span>
              <span className="mt-auto pt-4 sm:pt-5">
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  aria-hidden="true"
                  className="text-graphite transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ─── Trust ────────────────────────────────────────────────────────────────── */

/** The footer's SECURITY_FACTS (src/components/layout/footer.tsx), verified against the app. */
const SECURITY: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: "Encrypted in transit and at rest" },
  { icon: ShieldCheck, text: "Each studio’s data kept separate" },
  { icon: KeyRound, text: "Two-factor sign-in available on every account" },
  { icon: Download, text: "Export your clients and signed forms any time" },
];

const PROMISES = [
  `${MONEY_BACK_DAYS}-day money-back guarantee`,
  `${ONBOARDING_SUPPORT_DAYS} days of onboarding help`,
  "We move your data over for you",
  "No Limespun fee on bookings or deposits",
];

function Trust() {
  return (
    <Section tone="deep" density="proof" labelledBy="trust-heading">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <Display id="trust-heading" className="max-w-[520px]">
            What every studio can count on
          </Display>
          <p className="mt-4 max-w-[460px] text-[16px] leading-[1.6] text-pretty text-graphite-soft sm:text-[17px]">
            There’s no free trial. Every plan starts with a {MONEY_BACK_DAYS}-day money-back guarantee, and your clients and
            signed forms leave with you whenever you want.
          </p>
          <Button href="/legal/security" variant="ghost" arrow className="mt-5">
            How we protect your data
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div>
            <Title as="h3" size="sm">
              Your studio’s data
            </Title>
            <ul className="mt-4 flex flex-col gap-3 border-t border-hair-strong/70 pt-4">
              {SECURITY.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 text-[15px] leading-snug text-graphite">
                  <Icon size={17} strokeWidth={2} className="mt-px shrink-0 text-ember-deep" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Title as="h3" size="sm">
              On every plan
            </Title>
            <ul className="mt-4 flex flex-col gap-3 border-t border-hair-strong/70 pt-4">
              {PROMISES.map((text) => (
                <li key={text} className="flex gap-3 text-[15px] leading-snug text-graphite">
                  <Check size={17} strokeWidth={2.6} className="mt-px shrink-0 text-ember" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] leading-snug text-mute">Card payments carry the provider’s standard fee.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ─── Related ──────────────────────────────────────────────────────────────── */

const RELATED: RelatedItem[] = [
  { eyebrow: "Plans", title: "Pricing", body: `${inWords(PLANS.length)} flat plans from ${SOLO_PRICE} a month. No cut of bookings.`, href: "/pricing" },
  { eyebrow: "Switching", title: "Switching guide", body: "We move your clients, bookings, deposits and signed forms.", href: "/migrate" },
  { eyebrow: "Compare", title: "All comparisons", body: `Limespun next to ${competitors.length} other tools, checked and sourced.`, href: "/compare" },
  { eyebrow: "Tools", title: "Free tools", body: "Deposit and payout calculators, and a consent form template.", href: "/tools" },
];

/**
 * The hero's chip. PlanChip reads "Every plan · from $39/mo", which an overview can't say
 * (Team & guest artists starts at Studio), so this is PlanChip's markup with the plural label.
 */
function PlansFromChip() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-ui font-semibold whitespace-nowrap text-graphite ring-1 ring-hair">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" aria-hidden="true" />
      Plans
      <span className="font-medium text-mute">from {SOLO_PRICE}/mo</span>
    </span>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function ProductPage() {
  return (
    <PageShell>
      <PageIntro
        crumbs={[{ label: "Home", href: "/" }, { label: "Features" }]}
        eyebrow={<PlansFromChip />}
        title="From first message to healed photo."
        italicWord="healed"
        lead="Studio software built only for tattoo. Bookings, deposits, consent forms, multi-session projects and artist payouts share one client record, for a flat monthly price and no cut of bookings."
        primary={{ label: ACCOUNT.signUpLabel, href: ACCOUNT.signUpHref }}
        secondary={{ label: "See pricing", href: "/pricing" }}
        visual={
          <StripedFrame inset="md" className="max-sm:px-2.5 max-sm:pt-6 max-sm:pb-0">
            {/* Phones: the top of Today (greeting, allergy band, KPIs), fading into the frame's foot */}
            <div className="mx-auto max-w-[1040px] max-sm:max-h-[420px] max-sm:overflow-hidden max-sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_calc(100%-8px))]">
              <TodayScreen />
            </div>
          </StripedFrame>
        }
      />

      <Section tone="white" labelledBy="day-heading">
        <Container>
          <SectionHeader
            id="day-heading"
            title="A day in the studio"
            lead={`Thursday, October 8 at the sample studio: ${inWords(Object.keys(ARTISTS).length).toLowerCase()} artists, ${inWords(TODAY_BOOKINGS.length).toLowerCase()} bookings and one red ink allergy, across four screens.`}
          />
          {/* From lg: sticky frame beside the steps. Below lg: the steps swipe side by side, so four screens cost one screen of height.
              The steps' column ends 20vh after the last step: the sticky frame (up to 100vh less 9rem with its stage) stays
              whole under the nav while the last step sits mid-screen, instead of being pushed up by the column's end. */}
          <div className="mt-block-gap">
            <ScrollStory
              steps={DAY_STEPS}
              frames={DAY_FRAMES}
              mobile="swipe"
              label="A day in the studio, in four screens"
              className="lg:[&>ol]:pb-[20vh]"
            />
          </div>
        </Container>
      </Section>

      <Section tone="canvas" labelledBy="features-heading">
        <Container>
          <SectionHeader
            id="features-heading"
            title="The features, by the job they do"
            lead={`The same three groups as the menu. ${ON_EVERY_PLAN} of the ${FEATURE_COUNT} are on every plan, ${SOLO.name} at ${SOLO_PRICE} included.`}
          />
          <FeatureGroups />
        </Container>
      </Section>

      <Section tone="white" density="story" labelledBy="record-heading" className="max-sm:py-section-y">
        <Container>
          <SectionHeader
            id="record-heading"
            title="One client record under all of it"
            lead="A project holds its sessions. Each session carries its payment and its signed form, and all of it sits on the client, so nothing is typed twice."
          />
          <RecordChain />
        </Container>
      </Section>

      <Section tone="canvas" density="proof" labelledBy="who-heading">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <Display id="who-heading" className="max-w-[640px]">
              One plan for each size of shop
            </Display>
            <div className="lg:justify-self-end lg:pb-1">
              <Lead className="text-mute lg:text-[18px]">
                Flat monthly prices, never a cut of bookings or deposits. Pay yearly and save {ANNUAL_DISCOUNT_PERCENT}%.
              </Lead>
              <Button href="/pricing" variant="ghost" arrow className="mt-3">
                Compare every plan
              </Button>
            </div>
          </div>
          <SegmentCards />
        </Container>
      </Section>

      <Trust />

      <RelatedLinks heading="Related" items={RELATED} />

      {/* No-break space: at 320 the last line keeps two words */}
      <InkBand headline={"Start with tomorrow’s bookings."} italicWord="tomorrow’s" />
    </PageShell>
  );
}
