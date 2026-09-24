import React from "react";
import Link from "next/link";
import {
  Button,
  Container,
  InkBand,
  PageIntro,
  Prose,
  StatGrid,
  TOC,
  type StatItem,
  type TocItem,
} from "@/components/system";
import { CONTACT_EMAIL } from "@/lib/brand";
import { LEGAL_LINKS } from "@/lib/site-links";
import { PageShell } from "./page-shell";

/** Mailbox for security reports. Every other legal question goes to CONTACT_EMAIL. */
export const SECURITY_EMAIL = "security@boldteq.com";

/** A paragraph: plain text, or an element when it needs an inline link. */
export type LegalText = string | React.ReactElement;

export interface LegalSection {
  /** A noun ("Sub-processors", "Your rights"). Also the TOC label and, slugged, the anchor. */
  heading: string;
  body: LegalText | LegalText[];
  /** Anchor override when the slug of the heading isn't the one to link to. */
  id?: string;
  /** Bullet list under the paragraphs. */
  list?: LegalText[];
  /** Two-column table under the paragraphs (sub-processors, cookies). */
  table?: { head: [string, string]; rows: [string, string][] };
}

export interface LegalPageProps {
  /** Route of this document, e.g. "/legal/privacy". Leaves it out of the "Other documents" list. */
  path?: string;
  /** Kept for pages written against v1; the eyebrow is always "Legal" now. */
  eyebrow?: string;
  title: string;
  /** ISO date (YYYY-MM-DD). Shown as "Effective 23 September 2026". */
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
  /** The mailbox for questions about this document. */
  contactEmail?: string;
  contactNote?: string;
  /** Facts shown as a StatGrid between the intro and the document (Security). */
  highlights?: StatItem[];
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectionIds(sections: LegalSection[]): string[] {
  const seen = new Map<string, number>();
  return sections.map((s) => {
    const base = s.id ?? slug(s.heading);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? base : `${base}-${n + 1}`;
  });
}

const EFFECTIVE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatEffective(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : EFFECTIVE_FORMAT.format(d);
}

const INK_LINK =
  "rounded-sm font-medium text-ink-text underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas";

const asList = (body: LegalText | LegalText[]): LegalText[] => (Array.isArray(body) ? body : [body]);

const EMAIL = /([a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})/gi;

/** Plain-text paragraphs name mailboxes; this turns each one into a mailto link. */
function withMailto(text: LegalText): React.ReactNode {
  if (typeof text !== "string") return text;
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/**
 * Legal document on the design system: narrow PageIntro, then a sticky TOC beside the text
 * from lg (a <details> above the text below lg), a contact card, and a quiet InkBand.
 * Sections keep the v1 shape ({ heading, body }), so a page moves over by changing its import.
 */
export function LegalPage({
  path,
  title,
  effectiveDate,
  intro,
  sections,
  contactEmail = CONTACT_EMAIL,
  contactNote = "Email us about anything in this document. If it's about your account, include your studio's name.",
  highlights,
}: LegalPageProps) {
  const ids = sectionIds(sections);
  const toc: TocItem[] = sections.map((s, i) => ({ id: ids[i], label: s.heading }));
  const others = LEGAL_LINKS.filter((l) => l.href !== path);

  return (
    <PageShell>
      {/* PageIntro sets its own 1280 container; this keeps the title over the document column. */}
      <div className="mx-auto max-w-[1040px]">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: title }]}
          eyebrow="Legal"
          title={title}
          lead={intro}
        >
          <p className="mt-6 text-[14px] text-mute">
            <time dateTime={effectiveDate}>Effective {formatEffective(effectiveDate)}</time>
          </p>
        </PageIntro>
      </div>

      <section aria-label={title} className="bg-canvas pb-section-y">
        <Container className="max-w-[1040px]">
          {highlights && highlights.length > 0 && (
            <StatGrid items={highlights} cols={4} tone="white" className="mb-12 sm:mb-16" />
          )}
          <div className="grid gap-8 border-t border-hair pt-10 sm:pt-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <TOC items={toc} />

            <div className="min-w-0 max-w-[68ch]">
              <Prose>
                {sections.map((s, i) => (
                  <React.Fragment key={ids[i]}>
                    <h2 id={ids[i]}>{s.heading}</h2>
                    {asList(s.body).map((p, pi) => (
                      <p key={pi}>{withMailto(p)}</p>
                    ))}
                    {s.list && (
                      <ul>
                        {s.list.map((item, li) => (
                          <li key={li}>{withMailto(item)}</li>
                        ))}
                      </ul>
                    )}
                    {s.table && (
                      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                        <table>
                          <thead>
                            <tr>
                              <th scope="col">{s.table.head[0]}</th>
                              <th scope="col">{s.table.head[1]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {s.table.rows.map(([a, b]) => (
                              <tr key={a}>
                                <th scope="row" className="whitespace-nowrap">
                                  {a}
                                </th>
                                <td>{b}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Prose>

              <aside
                aria-labelledby="legal-contact-heading"
                className="mt-14 grid gap-8 rounded-card bg-white p-6 ring-1 ring-hair sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12"
              >
                <div>
                  <h2 id="legal-contact-heading" className="text-title-sm text-graphite">
                    Contact
                  </h2>
                  <p className="mt-2 text-[16px] leading-[1.6] text-pretty text-graphite-soft">{contactNote}</p>
                  <Button href={`mailto:${contactEmail}`} variant="ghost" className="mt-4 break-all">
                    {contactEmail}
                  </Button>
                </div>
                {others.length > 0 && (
                  <nav aria-label="Other legal documents" className="md:min-w-[160px]">
                    <p className="text-label text-mute uppercase">Other documents</p>
                    <ul className="mt-3 flex flex-col">
                      {others.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="inline-flex min-h-10 items-center rounded-sm text-[15px] text-graphite-soft transition-colors hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <InkBand
        mark={false}
        eyebrow="Questions about your data?"
        headline="Plain answers from the founding team."
        italicWord="answers"
        sub={
          <>
            Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={INK_LINK}>
              {CONTACT_EMAIL}
            </a>{" "}
            about anything these pages don&apos;t cover. Security reports go to{" "}
            <a href={`mailto:${SECURITY_EMAIL}`} className={INK_LINK}>
              {SECURITY_EMAIL}
            </a>
            .
          </>
        }
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </PageShell>
  );
}
