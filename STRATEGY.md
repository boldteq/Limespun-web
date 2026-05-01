# InkOS Marketing Site — Full-Site Build Strategy

> **Source of truth for all remaining pages.** Every page agent reads this. Brand voice, design DNA, sprint plan, quality bar.
> Last updated: 2026-04-28.

---

## 1. Context

InkOS = the studio OS for tattoo. Real shipped product. 644 files, 140 routes, 13 sprints, live at `inkos.up.railway.app`.

**App routes (what we sell):**
dashboard, calendar, appointments, clients (+8 sub-pages), projects, inbox, messages, artists, guest-artists, ai-design, forms (+kiosk/templates), flash-events, inventory, payments, payroll, commissions, marketing, portfolio, reports, waitlist, locations, settings.

**Marketing site goal:** Beat every salon-coded SaaS (Mangomint, Fresha, Booksy, DaySmart, Vagaro) AND tattoo-specific tools (TattooGenda, Porter, TSP, TattooPro) on:
1. Brand presence (premium, intentional, tattoo-native)
2. Copywriting (sales-first, benefit-led, founder voice)
3. UX (zero friction, anchor links work, mobile flawless)
4. Conversion (every page → Start free / Book demo)

**Homepage already built.** This doc covers the 30+ remaining pages.

---

## 2. Brand DNA (locked, do not deviate)

### 2.1 Palette
| Token | Hex | Use |
|---|---|---|
| `bone` | `#F7F7F5` | Primary background |
| `bone-cream` | `#FAFAF8` | Section alternate |
| `onyx` | `#0F0F0F` | Primary text + dark sections |
| `stone-dark` | `#4B4842` | Body text |
| `rust` | `#C8351F` | Primary brand accent (italic emphasis, CTAs, alerts) |
| `rust-bright` | `#E8553F` | Featured tier, glow |
| `rust-glow` | `#F26B4D` | Gradient stops |
| `rust-wash` | `#FBEFEB` | Soft backgrounds |
| `amber` | `#D89538` | Secondary accent (warmth, ink stage) |
| `sage` | `#5C8A55` | Tertiary accent (success, healed stage) |
| `crimson` | `#C73838` | Warnings (allergy, danger) |

**Three-color motif:** rust (artist) / amber (ink) / sage (skin). Recurring brand mark = `TriCircleMarkV2`.

### 2.2 Typography
- **Serif:** Instrument Serif 400 + italic (display headings, italic emphasis on `tattoo` brand word)
- **Sans:** Inter 400/500/600/700 (body, UI, all functional copy)
- **Mono:** JetBrains Mono 500/600 (timestamps, badges, kpi values, code)

**Hero formula:** Big serif headline with one italic word in `rust`. Sans subhead. Always.
> Example: *"The studio OS built like a* ***tattoo***, *not a spreadsheet."*

### 2.3 Voice
**Tone:** quiet authority. Specialist. Anti-salon-SaaS. Founder-voice over committee-voice.

**Allowed:**
- Plain English. "It just works." not "leveraging proprietary algorithms."
- Specific: "10 weeks of one sleeve," "$420 of $600 deposit pool," "S4 of 5"
- Direct: "If we can't move you cleanly in 14 days, you don't pay."
- Emotional truth: "That was before your first client sat in the chair."

**Forbidden:**
- "Empower," "unlock," "seamless," "robust," "best-in-class"
- Stock-photo language ("Our team works tirelessly...")
- Generic SaaS template copy

**Reference:** every line in `InkOSLandingV6.jsx` is the gold standard. Copy that voice exactly.

### 2.4 Layout DNA
- **Max-width:** 1280px main containers. 760px text columns. 720-920px content cards.
- **Padding:** 100px top/bottom on full sections. 32px horizontal.
- **Borders:** 1px `border` (#E7E5E1). Radius 12-22px on cards.
- **Shadows:** Soft warm (rust-tinted). Never neutral gray.
- **Backgrounds alternate:** `bone` → `sectionWarm` (rust wash) → `bone` → `sectionCool` (sage wash) → `onyx` (CTA / pricing).
- **Always:** corner glow accents, MangomintBlobs on hero/CTA sections.

### 2.5 Component standards
Every page MUST use:
- `<Nav />` + `<Footer />` (already built)
- `SectionEyebrow` + `SectionHeading` + `SectionSubhead` for section intros
- `BRAND` / `FONT` / `SHADOW` / `GRADIENT` from `@/lib/brand`
- `motion` + `whileInView` for scroll reveals
- `MangomintBlobs` for hero atmospheres
- `TriCircleMarkV2` as brand mark
- `PhotoBand` for image placeholders

NEVER:
- Hardcode hex values (use BRAND tokens)
- Use `any` type
- Use `<button>` for navigation (use `<a>`)
- Centered hero (left-aligned only, except CTA close)
- Stock SaaS hero with abstract illustrations

---

## 3. Page Inventory (32 pages)

### Tier 1 — Conversion engine (Sprint 1) — 4 pages

| Route | Purpose | Template |
|---|---|---|
| `/pricing` | Deep pricing page beyond homepage anchor. Comparison table vs DaySmart/Mangomint/Fresha. Plan FAQ. ROI calculator. | Pricing |
| `/customers` | Case study index + 3 deep stories (Miles/Kaia/Rafael from homepage). Filter by studio size. | Index + detail |
| `/book-a-demo` | Lead-capture form with calendar slot picker. Personalised by studio size. | Form |
| `/about` | Boldteq + founder story. Why we built this. The team. The thesis. | Long-form |

### Tier 2 — Product depth (Sprint 2) — 9 pages

| Route | Headline angle | Hero visual |
|---|---|---|
| `/product` | Overview of all 15 modules. Anchor links to each. | Module grid + dashboard |
| `/product/calendar` | Multi-chair, drag-drop, dnd-kit, allergy banners. | Calendar mockup |
| `/product/projects` | **THE MOAT.** Multi-session sleeves. Deposit pool. | Polaroid timeline (lift from homepage) |
| `/product/clients` | CRM with allergy intel + photo timeline. | Client profile mockup |
| `/product/forms` | Kiosk consent. EU REACH waivers. PDF audit trail. | Kiosk + signature |
| `/product/payments` | Commission auto-splits. Deposit pools. Payroll. | Invoice + payout |
| `/product/inventory` | Ink registry. REACH compliance. Low-stock alerts. | Bottle CI numbers |
| `/product/ai-design` | Brief generator. Reference assist. Style transfer. | AI gallery |
| `/product/messages` | Omnichannel inbox: SMS/Email/IG/Whatsapp/in-app. | 3-pane inbox |

### Tier 3 — Solutions + Migration (Sprint 3) — 9 pages

| Route | Targeting |
|---|---|
| `/for/solo-artists` | One chair, $29 plan, anti-overhead pitch |
| `/for/small-studios` | 2-5 chairs, mixed roster, residency band |
| `/for/multi-chair` | 6+ chairs, commission auto-splits, payroll |
| `/for/multi-location` | Chains, SSO, per-location P&L |
| `/migrate` | Migration hub. White-glove promise. 6-source comparison. |
| `/migrate/daysmart` | DaySmart-specific. 9-day migration. Pain → relief. |
| `/migrate/fresha` | Anti-platform-fee angle. "Keep your bookings, leave the take." |
| `/migrate/mangomint` | Salon-vs-tattoo angle. Native concepts. |
| `/reach-compliance` | EU REACH 2022 explainer + InkOS implementation |

### Tier 4 — Resources (Sprint 4) — 6 pages

| Route | Content |
|---|---|
| `/blog` | Index. Studio playbooks, ops content, founder essays. (Static MDX, no CMS for v1.) |
| `/changelog` | Public ship log. Versioned. Filterable by module. |
| `/roadmap` | What we're building. Quarterly themes. Vote / request. |
| `/careers` | Open roles. Boldteq culture. Remote-first. |
| `/contact` | Sales / support / press contact splits. |
| `/press` | Brand kit. Logos, palette, screenshots. Press releases. |

### Tier 5 — Legal (Sprint 5) — 5 pages

| Route | Notes |
|---|---|
| `/legal/privacy` | GDPR + CCPA + per-region. Last-updated. |
| `/legal/terms` | TOS. Subscription terms. Acceptable use. |
| `/legal/security` | Soc2 path. Data residency. Encryption. |
| `/legal/gdpr` | DPA. Sub-processors. Data export. |
| `/legal/cookies` | Cookie inventory. Opt-out. |

**NOT building yet:** `/docs`, `/api-docs`, `/help`, `/status`. These point to the app's own docs subdomain or external Statuspage. Marketing site links out.

---

## 4. Per-Page Quality Standard

Every page must hit:

| Gate | Requirement |
|---|---|
| **Hero** | Eyebrow → serif headline (with one italic rust word) → subhead → 2 CTAs (signup + secondary) → trust strip OR product visual |
| **Sections** | 3-5 sections max. Each has eyebrow + heading + supporting visual or content card |
| **CTAs** | Every page has 2+ paths to `/signup` (top + bottom). Soft secondary CTA optional (demo, docs) |
| **Mobile** | All grids collapse cleanly. Tested at 360 / 768 / 1024 / 1440 |
| **Animation** | `motion.whileInView` reveals. Never auto-play. Respect `prefers-reduced-motion` |
| **Type safety** | Zero `any`. `tsc --noEmit` passes |
| **SEO** | `metadata` export per page (title, desc, OG, twitter). JSON-LD where applicable (Article for blog, FAQPage for FAQ-heavy pages, Product for /pricing, Organization for /about) |
| **A11y** | Nav landmarks. `aria-label` on icon buttons. Focus rings. Skip-to-content link |
| **Performance** | LCP < 2.5s. CLS < 0.1. Static generation always (`force-static` if doing data fetches) |
| **Footer + Nav** | Same `<Nav />` + `<Footer />` on every page |

---

## 5. Per-Page Section Skeleton (use as template)

Default structure for any page. Customise sections per page goal.

```
<Nav />
<main>
  1. Hero          — eyebrow + h1 + subhead + CTAs + visual
  2. Social proof  — logo bar OR stat row OR 1 testimonial
  3. Body 1        — primary value prop (the headline answer)
  4. Body 2        — supporting feature/proof/use-case
  5. Body 3        — comparison / objection-handling
  6. FAQ           — 5-7 questions (only on Pricing, Migrate, Solution pages)
  7. Closing CTA   — onyx section, MangomintBlobs cta, dual CTAs
</main>
<Footer />
```

---

## 6. Sprint Plan

**One sprint = one parallel agent dispatch + Sage review + fix pass.**

| Sprint | Pages | Dispatch | Time |
|---|---|---|---|
| **1** | Pricing, Customers, Book-a-demo, About | 4 Pixel agents in parallel + 1 Koda for forms | ~90 min |
| **2** | /product hub + 8 product pages | Pixel designs hub + 8 Koda agents (one per page) in parallel | ~2 hr |
| **3** | 4 Solution pages + 4 Migration pages + REACH | 9 Koda agents in parallel | ~2 hr |
| **4** | Blog index, Changelog, Roadmap, Careers, Contact, Press | 6 Koda agents | ~90 min |
| **5** | 5 Legal pages | 1 Koda (templates similar) + Quill for legal copy | ~45 min |

**After every sprint:**
- `pnpm run type-check`
- `pnpm run build`
- Sage review on diff
- Fix-Koda runs critical findings
- Browser smoke test (homepage + new routes load)

---

## 7. Data + State Strategy

- **No CMS for v1.** All page content lives as TypeScript constants in component files.
- **Blog posts:** `src/content/blog/*.mdx` with `next-mdx-remote` (add later only if needed; v1 = 3-5 hardcoded posts).
- **Customer stories:** TS array in `src/lib/data/stories.ts`. 3 stories (Miles/Kaia/Rafael) lifted from homepage.
- **Changelog:** TS array in `src/lib/data/changelog.ts`. Versioned with date + module tags.
- **Form submissions:** `/book-a-demo` → POST to Resend (or stub email) via Server Action. No DB on marketing site — all leads → Resend → Boldteq inbox.
- **No auth on marketing site.** Sign-in redirects to app domain.

---

## 8. SEO Plan

| Page type | Strategy |
|---|---|
| Homepage | Brand + category rank ("tattoo studio software", "tattoo CRM") |
| `/product/*` | Long-tail feature queries ("tattoo deposit pool software", "REACH compliance ink registry") |
| `/migrate/*` | High-intent competitor queries ("migrate from DaySmart", "Fresha alternative tattoo") |
| `/blog/*` | Top-of-funnel ops content ("how to run a tattoo studio", "tattoo studio commission split") |
| `/customers/*` | Long-tail social proof ("Sable & Sparrow tattoo studio software") |
| `/for/*` | Personalised landing for ad campaigns ("software for solo tattoo artist") |

**Each page MUST export:**
```ts
export const metadata: Metadata = {
  title: "<Page-specific> | InkOS",
  description: "<155 chars max, with primary keyword + benefit + CTA>",
  openGraph: { title, description, images: [og-image-url], type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  alternates: { canonical: `https://inkos.studio${route}` },
};
```

JSON-LD via `<script type="application/ld+json">` server-rendered:
- `/pricing` → `Product` + `Offer` schema
- Solution pages → `WebPage` + `BreadcrumbList`
- `/about` → `Organization`
- FAQ blocks → `FAQPage`
- Blog posts → `Article` + `Person` (author)

---

## 9. Component Library to Build (shared, reusable)

These get built ONCE in Sprint 1 and reused across every later sprint:

| Component | Lives in | Used on |
|---|---|---|
| `<HeroSection>` | `components/shared/hero-section.tsx` | every page hero |
| `<FAQAccordion>` | `components/shared/faq-accordion.tsx` | pricing, migrate, solution pages |
| `<ComparisonTable>` | `components/shared/comparison-table.tsx` | pricing, migrate |
| `<FeatureGrid>` | `components/shared/feature-grid.tsx` | product pages, solutions |
| `<TestimonialCard>` | `components/shared/testimonial-card.tsx` | customers, solutions |
| `<StatStrip>` | `components/shared/stat-strip.tsx` | trust strips |
| `<CTASection>` | `components/shared/cta-section.tsx` | bottom of every page (lift from homepage Close) |
| `<PageBreadcrumbs>` | `components/shared/breadcrumbs.tsx` | non-home pages |
| `<LogoBar>` | `components/shared/logo-bar.tsx` | social proof bands |
| `<DemoForm>` | `components/forms/demo-form.tsx` | /book-a-demo |
| `<NewsletterForm>` | `components/forms/newsletter-form.tsx` | blog footer |

---

## 10. Sprint 1 Detailed Brief (executable)

**Output of this strategy doc → start here.**

### 10.1 Build shared components first
1. `<HeroSection>` — props: eyebrow, heading (with optional italicWord), subhead, primaryCTA, secondaryCTA, accent, blobs?, visual?
2. `<FAQAccordion>` — props: items[] of {q, a}, accent
3. `<CTASection>` — props: heading, subhead, primaryCTA, secondaryCTA (lift Close section)
4. `<ComparisonTable>` — props: rows[] with feature + competitor flags + InkOS tick
5. `<TestimonialCard>` — props: name, role, city, chairs, quote, stats[], gradient
6. `<StatStrip>` — props: stats[] with stat + label
7. `<PageBreadcrumbs>` — auto-generates from route

### 10.2 Build 4 pages

**`/pricing`**
- Hero: "Priced like a tool, quietly fair." (lift from homepage Pricing)
- 4-tier grid (lift from homepage)
- Comparison table vs DaySmart, Mangomint, Fresha, TattooGenda (16-row feature matrix from Dossier)
- Plan FAQ (8 questions: cancellation, downgrades, refunds, overages, team seats, currencies, taxes, trial)
- ROI strip: "Studios save 12 hr/wk on average. At $50/hr that's $2,400/mo. InkOS Studio is $59/mo."
- Closing CTA

**`/customers`**
- Hero: "How studios run on InkOS."
- Filter chips (size: solo / small / multi-chair / chain)
- 3 hero stories (Miles/Kaia/Rafael) with dedicated detail pages later (`/customers/[slug]`)
- Stat strip: "1,200+ artists. 47 countries. $0 in transaction fees."
- Logo bar (placeholder studio names for now)
- Closing CTA: "Add your studio to the wall"

**`/book-a-demo`**
- 2-column layout: left = pitch, right = form
- Form fields: name, studio name, chairs, current tool, email, phone, preferred time
- On submit → Resend email to Boldteq + redirect to thank-you with calendar link
- Below fold: "What you'll see in 30 minutes" (3-step preview)
- Trust strip + closing line

**`/about`**
- Hero serif headline: "Built for the work, not the spreadsheet."
- Founder story (Boldteq + the why)
- Team grid (placeholder until real photos)
- Manifesto section: 5 principles (lift from CLAUDE.md decision framework where applicable)
- Press strip + closing CTA

---

## 11. Verification Per Sprint

After every sprint dispatch:

```bash
cd "/Users/yashbaldha/Desktop/Boldteq App/Marketing Site/InkOS"
pnpm run type-check          # zero errors
pnpm run build               # all routes compile static
# Smoke test
curl -s http://localhost:3001/pricing | grep -c "Priced like"   # should match
```

Sage review focus:
- Type safety (no `any`)
- A11y (focus, aria-label, landmarks)
- Brand voice (no SaaS template copy)
- Mobile breakpoints (CSS class names attached)
- CTAs link to `/signup` not `#`
- Footer + Nav present
- Metadata exported

---

## 12. Out of Scope (v1)

Skip for now, revisit post-launch:
- Multi-language (English only)
- Dark mode (light only — brand identity)
- Live chat widget (use `/contact` form instead)
- A/B testing infrastructure (PostHog later)
- Sanity CMS (TypeScript constants suffice for v1)
- Comments on blog
- Search across the site
- AI chatbot

---

## 13. The North Star

> **A tattoo artist visits the site for 90 seconds.** They see one headline that names their pain ("seven apps before 10:30"), one screenshot that shows the relief, one price that doesn't punish them, and one button that gets them in. Everything else is bonus.

If a page doesn't pass that test in 90 seconds, it gets cut.

---

*Strategy authored 2026-04-28. Built on InkOSLandingV6.jsx + InkOSDossierV3.jsx + 13-sprint InkOS web app build at `/Users/yashbaldha/Desktop/Boldteq App/InkOS/`.*
