import React, { Suspense } from "react";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { FAQ, Title, type FaqItem, type RelatedItem } from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { SECURITY_EMAIL } from "@/components/templates/legal-page";
import { ContactForm, ContactFormFromUrl } from "@/components/forms/contact-form";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { ONBOARDING_SUPPORT_DAYS, PLANS, formatPrice } from "@/lib/data/plans";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { CopyAddress } from "./copy-address";

const TITLE = "Contact sales, support and press";
const DESCRIPTION =
  "Talk to a person on the Limespun team about plans, switching from another tool, support or press. One inbox, and a reply within one business day.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

/** Every topic goes to the one inbox; the subject line tells us who should answer. */
const mailto = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const ROUTES = [
  {
    title: "Sales and switching",
    body: "Plans, Multi-Location and the founding offer, or moving over from Vagaro, Fresha or a spreadsheet.",
    subject: "Sales",
  },
  {
    title: "Support",
    body: "Help with your account, your booking page or anything in the app.",
    subject: "Support",
  },
  {
    title: "Press",
    body: "Interviews and questions about Limespun. Logos and the boilerplate are in the press kit.",
    subject: "Press",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How fast do you reply?",
    a: "Within one business day. A person on the team reads every message and writes the reply, whether it came through the form or by email.",
  },
  {
    q: "Which languages do you reply in?",
    a: "English. Sales, support and onboarding all run in English.",
  },
  {
    q: "Where do security reports go?",
    a: `Email ${SECURITY_EMAIL} with the details, and please keep the issue private until we've fixed it. The Security page explains how we protect studio data and how we handle reports.`,
  },
  {
    q: "I'm switching from another tool. What should I send?",
    a: `Pick "Switching from another tool" in the form and tell us which tool you use and roughly how many clients you have. We move your clients, bookings, deposits and signed forms for you on every plan. It usually takes a week or two, your old tool keeps running until you decide to switch, and you get ${ONBOARDING_SUPPORT_DAYS} days of onboarding help.`,
  },
];

const priceLine = PLANS.map((p) => `${p.name} ${formatPrice(p.monthlyCents)}`).join(" · ");

const RELATED: RelatedItem[] = [
  { eyebrow: "Switching", title: "Switching guide", body: "What we move over for you, on every plan.", href: "/migrate" },
  { eyebrow: "Plans", title: "Pricing", body: `${priceLine} a month. No cut of bookings.`, href: "/pricing" },
  { eyebrow: "Company", title: "Press kit", body: "Facts, logos and a short boilerplate.", href: "/press" },
  { eyebrow: "Company", title: "Security", body: "How we protect studio data, and how to report an issue.", href: "/legal/security" },
  { eyebrow: "Resources", title: "Roadmap", body: "What we're building now, next and later.", href: "/roadmap" },
  { eyebrow: "Company", title: "About", body: "Who builds Limespun, and why only for tattoo.", href: "/about" },
];

const contactPageJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Limespun",
  url: absoluteUrl("/contact"),
  description: DESCRIPTION,
  inLanguage: "en",
  mainEntity: {
    "@type": "Organization",
    name: "Limespun",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL, availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL, availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "media relations", email: CONTACT_EMAIL, availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "security", email: SECURITY_EMAIL, availableLanguage: "English" },
    ],
  },
};

const inlineLink =
  "font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/** The one mailbox, the three desks that share it, and where security reports go. */
function EmailDesk() {
  return (
    <aside aria-labelledby="email-heading" className="min-w-0 lg:pt-10">
      <Title as="h2" size="md" id="email-heading">
        Or write to us directly
      </Title>
      <p className="mt-1.5 max-w-[440px] text-[15px] leading-[1.55] text-pretty text-mute">
        Sales, support and press share one inbox. The subject line tells us who should answer.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex min-h-11 items-center text-[22px] font-semibold tracking-[-0.01em] text-graphite underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:text-[26px]"
        >
          {CONTACT_EMAIL}
        </a>
        <CopyAddress address={CONTACT_EMAIL} />
      </div>

      <ul className="mt-6 border-t border-hair-strong">
        {ROUTES.map((r) => (
          <li key={r.title} className="border-b border-hair-strong">
            <a
              href={mailto(r.subject)}
              className="group flex items-center justify-between gap-5 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite sm:py-5"
            >
              <span className="min-w-0">
                <span className="block text-[17px] font-semibold text-graphite">{r.title}</span>
                <span className="mt-1 block text-[15px] leading-[1.55] text-pretty text-mute">{r.body}</span>
                <span className="sr-only">
                  {" "}
                  Email {CONTACT_EMAIL} with the subject {r.subject}.
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-hair transition-[background-color,color] duration-200 group-hover:bg-graphite group-hover:text-white">
                <Mail size={17} strokeWidth={2} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex gap-3 text-[15px] leading-[1.6] text-pretty text-graphite-soft">
        <ShieldCheck size={18} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-graphite" />
        <span>
          Security reports go to{" "}
          <a href={`mailto:${SECURITY_EMAIL}`} className={inlineLink}>
            {SECURITY_EMAIL}
          </a>
          . How we protect studio data is on the{" "}
          <Link href="/legal/security" className={inlineLink}>
            Security page
          </Link>
          .
        </span>
      </p>
    </aside>
  );
}

function ContactDesk() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 xl:gap-20">
      <div id="message" className="min-w-0 scroll-mt-28">
        {/* Static HTML carries the plain form; the client swaps in the one with ?topic= chosen */}
        <Suspense fallback={<ContactForm />}>
          <ContactFormFromUrl />
        </Suspense>
      </div>
      <EmailDesk />
    </div>
  );
}

export default function ContactPage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      eyebrow="Contact"
      title="Talk to a real person."
      italicWord="person"
      lead={
        <>
          Sales, switching, support and press questions all reach the founding team. Use the form or email{" "}
          {CONTACT_EMAIL}, and we reply within <span className="whitespace-nowrap">one business day</span>.
        </>
      }
      visual={<ContactDesk />}
      related={{ items: RELATED }}
      inkBand={{ headline: "Set up your studio while you wait.", italicWord: "wait" }}
      jsonLd={[contactPageJsonLd]}
    >
      <FAQ
        compact
        tone="white"
        title="Before you write"
        intro="Short answers to what people ask most. For anything else, the form above reaches the same people."
        items={FAQ_ITEMS}
      />
    </ContentPage>
  );
}
