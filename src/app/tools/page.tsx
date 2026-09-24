import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, FileSignature, HandCoins } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { PageIntro } from "@/components/marketing/page-intro";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { TOOLS_INDEX } from "@/lib/site-links";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free tools for tattoo studios",
  description: "Free calculators and templates for tattoo studios: deposit and no-show calculator, artist payout calculator and a printable tattoo consent form.",
  path: "/tools",
});

const ICONS = {
  "deposit-calculator": HandCoins,
  "payout-calculator": Calculator,
  "consent-form-template": FileSignature,
} as const;

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-canvas text-graphite">
      <Nav />
      <main id="main">
        <PageIntro
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools" }]}
          title="Free tools for tattoo studios"
          lead="Quick calculators and templates for the money and paperwork side of the shop. Free, no sign-up, and nothing you type leaves your browser."
        />
        <section className="bg-white py-16 sm:py-20">
          <ul className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:px-8 md:grid-cols-3">
            {TOOLS_INDEX.map((t) => {
              const Icon = ICONS[t.slug];
              return (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="group flex h-full flex-col rounded-[20px] bg-canvas p-7 ring-1 ring-hair transition-shadow hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-soft text-ember-deep">
                      <Icon size={20} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="mt-5 text-[22px] font-semibold tracking-[-0.01em] text-graphite">{t.name}</span>
                    <span className="mt-2 flex-1 text-[16px] leading-[1.55] text-graphite-soft">{t.blurb}</span>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-graphite">
                      Open the tool <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
