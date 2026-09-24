import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "./section";
import { Display } from "./type";
import { cn } from "./cn";

export interface FaqItem {
  q: string;
  a: string;
}

const linkClass =
  "font-semibold whitespace-nowrap text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/**
 * Short hyphenated words ("cut-down", "double-booked?") kept whole, so a balanced question
 * doesn't break at the hyphen. Long ones ("REACH-registered") may, or a narrow phone would
 * push the words after them onto a line of their own.
 */
function Question({ text }: { text: string }) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 && part.length <= 14 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/**
 * Questions and answers in native <details>, heading sticky beside them at xl. Renders the
 * FAQPage JSON-LD for its items; pass jsonLd={false} if the page already emits one.
 * `compact` puts it on the inner-page rhythm (the system Section's): 64px of padding and a
 * shorter gap on phones. Inner pages pass it; the homepage keeps the default.
 */
export function FAQ({
  items,
  title = "Questions studio owners ask",
  intro,
  tone = "canvas",
  id = "faq",
  jsonLd = true,
  compact = false,
}: {
  items: FaqItem[];
  title?: string;
  intro?: React.ReactNode;
  tone?: "canvas" | "white";
  id?: string;
  jsonLd?: boolean;
  compact?: boolean;
}) {
  const headingId = `${id}-heading`;
  if (items.length === 0) return null;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-24",
        compact ? "py-section-y-inner" : "py-section-y",
        tone === "white" ? "bg-white" : "bg-canvas",
      )}
    >
      {jsonLd && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <Container className={cn("grid xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]", compact ? "gap-8 sm:gap-12" : "gap-12")}>
        <div className="xl:sticky xl:top-32 xl:self-start">
          <Display id={headingId}>{title}</Display>
          <p className="mt-5 max-w-[360px] text-[18px] leading-[1.6] text-pretty text-mute">
            {intro ?? (
              <>
                Anything else?{" "}
                <Link href="/contact" className={linkClass}>
                  Contact us
                </Link>{" "}
                and a person on the team will answer.
              </>
            )}
          </p>
        </div>
        <div className="border-t border-hair-strong">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-hair-strong">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite [&::-webkit-details-marker]:hidden">
                <h3 className="text-[18px] font-medium text-balance text-graphite">
                  <Question text={f.q} />
                </h3>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-graphite ring-1 ring-hair transition-transform duration-200 group-open:rotate-45",
                    tone === "white" ? "bg-canvas" : "bg-white",
                  )}
                >
                  <Plus size={16} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[640px] pb-6 text-[16px] leading-[1.65] text-graphite-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
