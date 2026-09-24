import React from "react";
import Link from "next/link";
import { Callout, cn, type TocItem } from "@/components/system";
import { slugify } from "@/components/templates/article-page";
import { plainText, type PostBlock, type PostTable } from "@/lib/data/blog-posts";

/*
 * The post renderer. ArticlePage's own ArticleBlocks covers p/h2/h3/lists/callouts; posts
 * also carry small worked-example tables and inline links, so they render here and go to
 * ArticlePage as children with a matching `toc`. The h2 ids follow the template's rule
 * (slug of the heading, "-2", "-3" for repeats), so a link to a heading stays stable if the
 * template's renderer is extended later.
 */

/** Anchor id for every h2 by block index, unique within the post. */
function headingIds(blocks: readonly PostBlock[]): Map<number, string> {
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

/** "On this page" entries for the post's h2s, with the ids PostBody renders. */
export function postToc(blocks: readonly PostBlock[]): TocItem[] {
  const ids = headingIds(blocks);
  return blocks.flatMap((b, i) => (b.type === "h2" ? [{ id: ids.get(i) ?? "", label: plainText(b.text) }] : []));
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Plain text with `[label](/path)` turned into links (internal ones through next/link). */
function Inline({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
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
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/**
 * A worked example. Narrow enough to fit a phone at 320 in most cases; if a cell can't
 * wrap, the table scrolls inside its own box (focusable, labeled), never the page. Money
 * columns (`figureColumns`) are right-aligned with tabular numbers.
 */
function PostTableBlock({ table }: { table: PostTable }) {
  const last = table.head.length - 1;
  const figures = new Set(table.figureColumns ?? []);
  const cell = (i: number) =>
    cn(
      i === 0 && "whitespace-nowrap",
      figures.has(i) && "pl-3! text-right! whitespace-nowrap tabular-nums",
      i === last && "pr-0!",
    );
  return (
    <figure>
      <div
        role="region"
        aria-label={table.caption}
        tabIndex={0}
        className="overflow-x-auto rounded-window bg-white px-4 py-1 ring-1 ring-hair focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:px-5"
      >
        <table className="mt-0! text-[14px] sm:text-[15px]">
          <thead>
            <tr>
              {table.head.map((h, i) => (
                <th key={h || i} scope="col" className={cell(i)}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((c, i) => (
                  <td key={i} className={cn(cell(i), r === table.rows.length - 1 && !table.foot && "border-b-0!")}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {table.foot && (
            <tfoot>
              <tr>
                {table.foot.map((c, i) => (
                  <td key={i} className={cn(cell(i), "border-b-0! font-semibold text-graphite")}>
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

export function PostBody({ blocks }: { blocks: readonly PostBlock[] }) {
  const ids = headingIds(blocks);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
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
          case "ol": {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <Callout key={i} label={b.label} tone={!b.tone || b.tone === "note" || b.tone === "quiet" ? "quiet" : "ember"}>
                <p>
                  <Inline text={b.text} />
                </p>
              </Callout>
            );
          case "table":
            return <PostTableBlock key={i} table={b} />;
          default:
            return null;
        }
      })}
    </>
  );
}
