import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Callout,
  Container,
  Eyebrow,
  InkBand,
  PageIntro,
  Prose,
  RelatedGrid,
  TOC,
  Title,
  cn,
  type Crumb,
  type RelatedItem,
  type TocItem,
} from "@/components/system";
import { READING_FRAME, type InkBandProps } from "./content-page";
import { PageShell } from "./page-shell";

export interface ArticleMeta {
  /** Display date, e.g. "September 12, 2026". */
  date: string;
  /** Machine date for <time>, e.g. "2026-09-12". */
  dateTime: string;
  /** "6 min read" (a bare "6 min" gets " read" added). */
  readTime?: string;
  /** A real, named person or the team; left off when unknown. */
  author?: string;
  /** Shown after the author, e.g. "Founder". */
  authorRole?: string;
  /** Last substantive edit, shown as "Updated …" in the meta line. */
  updated?: { date: string; dateTime: string };
}

/**
 * Post content as data (the shape of src/lib/data/blog-posts.ts). Text is plain; the
 * renderer adds the ids, the measure and the callout surface.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "callout"; text: string; tone?: string; label?: string }
  | ArticleTable;

/**
 * A small worked example. Money columns (`figureColumns`, by index) are right-aligned with
 * tabular figures; `foot` is a totals row. Scrolls inside its own labeled, focusable box when a
 * cell can't wrap, never the page.
 */
export interface ArticleTable {
  type: "table";
  /** What the table shows: the caption and the scroll box's accessible name. */
  caption: string;
  head: string[];
  rows: string[][];
  foot?: string[];
  figureColumns?: number[];
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Text with `[label](/path)` links: internal paths through next/link, others open in a new tab. */
export function InlineText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") || href.startsWith("#") ? (
        <Link key={at} href={href}>
          {label}
        </Link>
      ) : (
        <a key={at} href={href} rel="noopener noreferrer" target="_blank">
          {label}
        </a>
      ),
    );
    last = at + m[0].length;
  }
  if (out.length === 0) return <>{text}</>;
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** The text of a heading or cell without link markup. */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

/** Columns whose longest cell is this short (a time, a name, "Session 1") never wrap. */
const SHORT_CELL = 12;

/**
 * Which columns keep each cell on one line: the first, every money column, and any short
 * column other than the one with the longest text, which takes the wrapping. So on a phone
 * "Asha M." or "Walk-ins" stays whole and "What to know" wraps instead.
 */
export function tableNowrapColumns(table: Pick<ArticleTable, "head" | "rows" | "foot" | "figureColumns">): Set<number> {
  const longest = table.head.map((h, i) =>
    Math.max(plainText(h).length, ...[...table.rows, ...(table.foot ? [table.foot] : [])].map((r) => plainText(r[i] ?? "").length)),
  );
  const prose = longest.indexOf(Math.max(...longest));
  const nowrap = new Set<number>(table.figureColumns ?? []);
  longest.forEach((len, i) => {
    if (i === 0 || (i !== prose && len <= SHORT_CELL)) nowrap.add(i);
  });
  return nowrap;
}

/** A worked-example table: ArticleBlocks renders `table` blocks with it; a page's own renderer can too. */
export function ArticleTableBlock({ table }: { table: ArticleTable }) {
  const last = table.head.length - 1;
  const figures = new Set(table.figureColumns ?? []);
  const nowrap = tableNowrapColumns(table);
  const cell = (i: number) =>
    cn(nowrap.has(i) && "whitespace-nowrap", figures.has(i) && "pl-3 text-right tabular-nums", i === last && "pr-0");
  return (
    <figure>
      <div
        role="region"
        aria-label={table.caption}
        tabIndex={0}
        className="overflow-x-auto rounded-window bg-white px-4 py-1 ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:px-5"
      >
        <table className="mt-0 text-[14px] sm:text-[15px]">
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th key={i} scope="col" className={cell(i)}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((c, i) => (
                  <td key={i} className={cn(cell(i), r === table.rows.length - 1 && !table.foot && "border-b-0")}>
                    <InlineText text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {table.foot && (
            <tfoot>
              <tr>
                {table.foot.map((c, i) => (
                  <td key={i} className={cn(cell(i), "border-b-0 font-semibold text-graphite")}>
                    {c}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <figcaption>{table.caption}</figcaption>
    </figure>
  );
}

/** "Deposits & no-shows: what to charge" → "deposits-and-no-shows-what-to-charge" */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Anchor ids for every h2, unique within the post (a repeated heading gets "-2", "-3"). */
function h2Ids(blocks: readonly ArticleBlock[]): Map<number, string> {
  const ids = new Map<number, string>();
  const seen = new Map<string, number>();
  blocks.forEach((b, i) => {
    if (b.type !== "h2") return;
    const base = b.id ?? (slugify(plainText(b.text)) || `section-${i}`);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    ids.set(i, n === 0 ? base : `${base}-${n + 1}`);
  });
  return ids;
}

/** "On this page" entries for a post's h2s, with the same ids ArticleBlocks renders. */
export function articleToc(blocks: readonly ArticleBlock[]): TocItem[] {
  const ids = h2Ids(blocks);
  return blocks.flatMap((b, i) =>
    b.type === "h2" ? [{ id: ids.get(i) ?? slugify(plainText(b.text)), label: plainText(b.text) }] : [],
  );
}

/**
 * Renders post blocks as plain HTML for Prose: h2s get anchor ids (matching articleToc),
 * callouts sit on the sand surface (any tone other than "note"/"quiet" gets the ember rule),
 * code and tables scroll inside their own box, and `[label](/path)` in paragraphs, list items,
 * quotes, callouts and table cells becomes a link.
 */
export function ArticleBlocks({ blocks }: { blocks: readonly ArticleBlock[] }) {
  const ids = h2Ids(blocks);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <InlineText text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={ids.get(i)}>
                {plainText(b.text)}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{plainText(b.text)}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <InlineText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <InlineText text={it} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <p>
                  <InlineText text={b.text} />
                </p>
                {b.attribution && <footer>{b.attribution}</footer>}
              </blockquote>
            );
          case "table":
            return <ArticleTableBlock key={i} table={b} />;
          case "code":
            return (
              <pre key={i} tabIndex={0} data-lang={b.lang}>
                <code>{b.text}</code>
              </pre>
            );
          case "callout":
            return (
              <Callout key={i} label={b.label} tone={!b.tone || b.tone === "note" || b.tone === "quiet" ? "quiet" : "ember"}>
                <p>
                  <InlineText text={b.text} />
                </p>
              </Callout>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

const withRead = (t: string) => (/\bread\b/i.test(t) ? t : `${t} read`);

/**
 * Category · date · read time, set as the eyebrow over the title. Phones put the category on
 * its own line so a wrap never strands a separator; from sm it is one line.
 */
function MetaLine({ category, meta }: { category?: string; meta: ArticleMeta }) {
  const dot = (
    <span aria-hidden="true" className="text-hair-strong">
      ·
    </span>
  );
  return (
    <p className="flex flex-col gap-1.5 text-label uppercase sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2.5">
      {category && (
        <span className="flex items-center gap-2.5">
          <span className="text-ember-deep">{category}</span>
          <span className="hidden sm:inline">{dot}</span>
        </span>
      )}
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-mute">
        <time dateTime={meta.dateTime} className="whitespace-nowrap">
          {meta.date}
        </time>
        {meta.readTime && (
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            {dot}
            {withRead(meta.readTime)}
          </span>
        )}
        {meta.updated && (
          <span className="flex items-center gap-2.5 whitespace-nowrap">
            {dot}
            <span>
              Updated <time dateTime={meta.updated.dateTime}>{meta.updated.date}</time>
            </span>
          </span>
        )}
      </span>
    </p>
  );
}

/**
 * Blog post shell: breadcrumb, a meta line (category · date · read time), serif title, dek
 * and byline; an optional figure; then the post at a 65ch measure in the 1040px reading
 * frame with a sticky "On this page" from lg (a disclosure above the text below lg); then one
 * product link, related posts and the closing band.
 *
 * Pass the post either as `blocks` (blog-posts.ts data; `toc` defaults to its h2s) or as
 * children (plain HTML; h2 ids must match `toc`). Posts pass their Article JSON-LD
 * (seo.ts articleJsonLd) in `jsonLd`; the breadcrumb emits its own BreadcrumbList.
 */
export function ArticlePage({
  crumbs,
  category,
  title,
  italicWord,
  dek,
  meta,
  toc,
  figure,
  blocks,
  feature,
  related,
  relatedHeading = "Keep reading",
  inkBand,
  jsonLd,
  children,
}: {
  crumbs: Crumb[];
  category?: string;
  title: string;
  italicWord?: string;
  dek: React.ReactNode;
  meta: ArticleMeta;
  /** Defaults to the h2s of `blocks`; pass [] to leave it off. */
  toc?: TocItem[];
  /** A screen crop or illustration between the intro and the text (never generated tattoo art). */
  figure?: { node: React.ReactNode; caption?: string };
  blocks?: readonly ArticleBlock[];
  /** The one screen in the app this post is about. */
  feature?: { eyebrow?: string; title: string; body: string; href: string };
  related?: RelatedItem[];
  relatedHeading?: string;
  inkBand?: InkBandProps | null;
  jsonLd?: Record<string, unknown>[];
  children?: React.ReactNode;
}) {
  const items = toc ?? (blocks ? articleToc(blocks) : []);
  const hasToc = items.length > 1;
  return (
    <PageShell jsonLd={jsonLd}>
      <div className={cn("mx-auto", READING_FRAME)}>
        <PageIntro
          crumbs={crumbs}
          eyebrow={<MetaLine category={category} meta={meta} />}
          title={title}
          italicWord={italicWord}
          lead={dek}
        >
          {meta.author && (
            <p className="mt-6 text-[15px] text-mute">
              By <span className="font-medium text-graphite">{meta.author}</span>
              {meta.authorRole && `, ${meta.authorRole}`}
            </p>
          )}
        </PageIntro>
      </div>

      <article aria-label={title} className="border-t border-hair bg-white py-section-y-tight">
        <Container className={READING_FRAME}>
          {figure && (
            <figure className="mb-10 sm:mb-14">
              <div className="@container min-w-0 overflow-hidden rounded-tile bg-canvas-deep p-3 sm:p-6">{figure.node}</div>
              {figure.caption && <figcaption className="mt-3 text-[14px] leading-[1.5] text-mute">{figure.caption}</figcaption>}
            </figure>
          )}
          <div className={cn(hasToc && "grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16")}>
            {hasToc && <TOC items={items} />}
            {/* 65ch at the prose size (17px), so the product card lines up with the text's edge */}
            <div className="min-w-0 max-w-[65ch] text-[17px]">
              <Prose>
                {blocks && <ArticleBlocks blocks={blocks} />}
                {children}
              </Prose>

              {feature && (
                <Link
                  href={feature.href}
                  className="group mt-12 flex items-center justify-between gap-6 rounded-card bg-canvas-deep p-5 ring-1 ring-hair transition-shadow duration-200 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:mt-14 sm:p-7"
                >
                  <span className="min-w-0">
                    <Eyebrow>{feature.eyebrow ?? "In Limespun"}</Eyebrow>
                    <Title as="p" size="sm" className="mt-2">
                      {feature.title}
                    </Title>
                    <span className="mt-1 block text-[15px] leading-[1.55] text-pretty text-mute">{feature.body}</span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-colors duration-200 group-hover:bg-graphite group-hover:text-white">
                    <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </article>

      {related && related.length > 0 && (
        <RelatedGrid heading={relatedHeading} items={related} containerClassName={READING_FRAME} />
      )}
      {inkBand !== null && <InkBand {...inkBand} />}
    </PageShell>
  );
}
