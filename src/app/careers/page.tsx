import React from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Display,
  Lead,
  Section,
  StripedFrame,
  Title,
  type RelatedItem,
} from "@/components/system";
import { ContentPage } from "@/components/templates/content-page";
import { TodayScreen } from "@/components/mockups/today";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/brand";
import { openRoles, roleTypeLabels, teamLabels, type Role } from "@/lib/data/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers at Boldteq, the team behind Limespun",
  description:
    "Boldteq is the small, remote team behind Limespun, studio software built only for tattoo. No open roles right now; if you want to help, write to us.",
  path: "/careers",
});

const mailTo = (subject: string) => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const inlineLink =
  "font-semibold text-graphite underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-graphite";

/* How the team works. Facts about the team only: no perks, pay or equity claims. */
const WAYS: { term: string; body: React.ReactNode }[] = [
  {
    term: "Remote, and written down",
    body: "We work remotely and write decisions down, so the reasoning never lives only in a meeting you missed.",
  },
  {
    term: "A small team",
    body: "A founder and a small team. You’d know everyone, and your work shows up in the product.",
  },
  {
    term: "Close to the studios",
    body: "Limespun is live. What you build reaches studios that tell us plainly what works and what doesn’t.",
  },
  {
    term: "Four rules",
    body: (
      <>
        Built only for tattoo, flat price with no cut, say what’s true, ship with studios. They hold for the work as
        much as the product.{" "}
        <Link href="/about#principles" className={inlineLink}>
          Read them
        </Link>
      </>
    ),
  },
];

/* JobPosting only for roles that are really open (careers.ts). None today, so none is emitted. */
function jobPostingJsonLd(role: Role): Record<string, unknown> {
  const remote = /^remote/i.test(role.location);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
    datePosted: role.postedOn,
    employmentType: role.type === "full-time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: "Boldteq", sameAs: SITE_URL },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          ...(role.countries?.length
            ? { applicantLocationRequirements: role.countries.map((name) => ({ "@type": "Country", name })) }
            : {}),
        }
      : { jobLocation: { "@type": "Place", address: role.location } }),
    directApply: false,
  };
}

const RELATED: RelatedItem[] = [
  { eyebrow: "Company", title: "About", body: "Why Limespun is built only for tattoo, and the rules we build by.", href: "/about" },
  { eyebrow: "Updates", title: "Roadmap", body: "What we’re building now, next and later.", href: "/roadmap" },
  { eyebrow: "Updates", title: "Changelog", body: "What shipped in Limespun, newest first.", href: "/changelog" },
  { eyebrow: "Company", title: "Contact", body: "Questions about switching, plans or your account.", href: "/contact" },
];

/* ─── Sections ────────────────────────────────────────────────────────────── */

/* The work itself: Today in the sample studio, the screen a studio opens first. It runs off
   the frame's foot and fades, so the page stays short. */
function WhatYouBuild() {
  return (
    <figure>
      <StripedFrame inset="md" className="pb-0 sm:pb-0">
        <div className="max-h-[450px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-72px),transparent)] sm:max-h-[460px] lg:max-h-[520px] sm:[mask-image:linear-gradient(to_bottom,#000_calc(100%-110px),transparent)]">
          <TodayScreen />
        </div>
      </StripedFrame>
      <figcaption className="mt-4 max-w-[560px] text-[14px] leading-[1.5] text-pretty text-mute">
        Today in the sample studio: the screen a shop opens first, and the kind of work you’d do.
      </figcaption>
    </figure>
  );
}

function HowWeWork() {
  return (
    <Section tone="white" density="story" labelledBy="work-heading">
      <Container className="grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <Display id="work-heading" className="max-w-[480px]">
            How we work
          </Display>
          <Lead className="mt-4 max-w-[440px] text-mute sm:mt-5">
            Small on purpose, and close to the studios we build for.
          </Lead>
        </div>
        <dl className="border-t border-hair-strong">
          {WAYS.map((w) => (
            <div
              key={w.term}
              className="grid gap-x-10 gap-y-1.5 border-b border-hair-strong py-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:py-7"
            >
              <dt className="text-title-sm text-balance text-graphite">{w.term}</dt>
              <dd className="max-w-[520px] text-[16px] leading-[1.6] text-pretty text-mute sm:text-[17px]">{w.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

function RoleRow({ role }: { role: Role }) {
  return (
    <li className="grid gap-4 border-b border-hair-strong py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-8">
      <div className="min-w-0">
        <Title as="h3" size="md">
          {role.title}
        </Title>
        <p className="mt-1.5 text-[14px] font-medium text-graphite-soft">
          {teamLabels[role.team]} · {roleTypeLabels[role.type]} · {role.location}
        </p>
        <p className="mt-3 max-w-[620px] text-[16px] leading-[1.6] text-pretty text-mute">{role.description}</p>
      </div>
      <Button href={mailTo(`Application: ${role.title}`)} variant="secondary" arrow className="self-start sm:self-center">
        Apply by email
      </Button>
    </li>
  );
}

function OpenRoles() {
  return (
    <Section tone="deep" density="proof" id="roles" labelledBy="roles-heading">
      <Container className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
        <Display id="roles-heading" className="max-w-[480px]">
          Open roles
        </Display>
        {openRoles.length > 0 ? (
          <ul className="border-t border-hair-strong">
            {openRoles.map((r) => (
              <RoleRow key={r.title} role={r} />
            ))}
          </ul>
        ) : (
          <div className="rounded-card bg-white p-6 ring-1 ring-hair sm:p-9">
            <Title as="h3" size="md">
              No open roles right now
            </Title>
            <p className="mt-3 max-w-[560px] text-[16px] leading-[1.65] text-pretty text-mute sm:text-[17px]">
              When a real role opens, it’s listed here with what the work is. If you’d like to help build Limespun before
              then, write to{" "}
              <a href={mailTo("Careers")} className={inlineLink}>
                {CONTACT_EMAIL}
              </a>{" "}
              with what you’d want to work on and a link to your work.
            </p>
            <Button href={mailTo("Careers")} variant="secondary" arrow className="mt-6 w-full sm:w-auto">
              Write to us
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default function CareersPage() {
  return (
    <ContentPage
      layout="sections"
      crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      eyebrow="Careers"
      title="Build software for people who make art."
      italicWord="art"
      lead="Boldteq is the small team behind Limespun, studio software built only for tattoo. We hire when there’s a real role to fill, and we list it here."
      visual={<WhatYouBuild />}
      jsonLd={openRoles.map(jobPostingJsonLd)}
      related={{ items: RELATED }}
      inkBand={{
        headline: "See what you’d be building.",
        italicWord: "building",
        secondary: { label: "About Limespun", href: "/about" },
      }}
    >
      <HowWeWork />
      <OpenRoles />
    </ContentPage>
  );
}
