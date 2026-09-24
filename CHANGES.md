# Changes

Change requests for the Limespun marketing site. One line per ask, with who does it and how we know it's done.
Evidence for every item: `.design-audit/deep/findings.json` (2026-09-23 homepage audit).

## 2026-09-23 · Homepage audit: broken + clearly-off fixes

### Broken or wrong
- [x] 1. Tour on phones: Deposits/Payouts tabs no longer widen the page; the tab's product view shows right under the tapped tab. · claude · 0px horizontal overflow at 390/768 on all 6 tabs; view visible without scrolling.
- [x] 2. Allergy card: mockup never covers its description on phones. · claude · text bottom < mockup top at 390.
- [x] 3. "We move you over": competitor names never clipped; "Square" not "Square Appointments". · claude · no chip text overflow at 390/768/1024.
- [x] 4. Lifetime "Pays for itself in N months" is true (rounded up: 7/7/7/6). · claude · months × monthly ≥ lifetime for every plan.
- [x] 5. Payouts mockup maths correct (Mara $2,910 − $250 rent = $2,660). · claude · every payout row adds up.
- [x] 6. Share image + Google title/description match the current hero; headline fits the card. · claude · /opengraph-image renders without overflow, in brand fonts.
- [x] 7. /customers (invented stories) taken down and unlinked. · claude · /customers returns 404; no links to it.

### Clearly off
- [x] 8. "Priced per shop" / "1 price per shop" replaced with wording that matches the artist caps. · claude
- [x] 9. Guest artists / guest splits marked Pro wherever they're shown. · claude
- [x] 10. Onboarding promise matches the 60 days of help. · claude
- [x] 11. Deposits mockup header counts only money actually held ($340). · claude
- [x] 12. One consistent sample-studio story across hero, tour, feature cards and final CTA (no double bookings, 2026 dates, allergy timeline, consent toast). · claude
- [x] 13. FAQ "Book a demo" is a real link; one name for the demo everywhere. · claude
- [x] 14. FAQ answers no-trial, cancelling, devices, data export and support; drops "ready today?". · claude
- [x] 15. Promises no longer look like testimonials; no repeated lines; heading no longer repeats "salon software". · claude
- [x] 17. Tour: benefit headline outranks the tab label; tab markup valid for screen readers (Lighthouse aria pass). · claude
- [x] 18. 1024px: pillars, promises and FAQ stack instead of squeezing text into narrow columns. · claude
- [x] 20. "Seven apps" strip readable (≥4.5:1), heading outranks items, app count consistent site-wide. · claude
- [x] 21. Final CTA card on the 1280 grid; phone mockup never cuts its button. · claude
- [x] 22. Feature-card grid: consistent text-to-picture spacing, no dead space, balanced at 768. · claude
- [x] 23. Pricing: toggle inside the phone gutter, Recommended badge passes contrast, Recommended card not the emptiest, plan + billing passed to signup. · claude
- [x] 24. Hero headline breaks between its two sentences on phones. · claude
- [x] 25. Header + mega menus on the current brand tokens (no second orange, no blue focus ring). · claude
- [x] 26. Mobile menu: backdrop, scrolls inside the screen, 44px targets, Sign in + Book a demo reachable. · claude

### Waiting on Yash
- [ ] 16. hello@limespun.com mailbox + confirmed social handles. · yash
- [ ] 19. Merge the three repeating feature sections (show one section at a time first). · yash
- [ ] 41. Pick US or UK English. · yash

## 2026-09-23 · Inner pages wave 0: foundation, hotfix, demo removal

Plan: `~/.claude/plans/playful-whistling-hummingbird.md` (Wave 0). Gate for every page line: `node .design-audit/page-audit.mjs http://localhost:3100 <outDir> @.design-audit/routes-w0.txt --full` → `<outDir>/report.json` (`pass: true` = 0 overflow, 0 console errors, one h1 and no skipped levels, metadata valid, 0 banned phrases from `.design-audit/banned.json`, 0 broken links, axe 0 serious/critical). "6/6 widths" = 320, 390, 768, 1024, 1280, 1440.

### Shipped
- [ ] 0.1. Design tokens in `src/app/globals.css` `@theme`: type scale, section spacing, radii, ink surface + `ink-glow` utility, app tokens, motion tokens; no homepage restyle. · claude · `--text-display-1`, `--spacing-section-y`, `--radius-card`, `--color-ink`, `--color-app-sidebar`, `--ease-out-quart` each grep once in globals.css; `pnpm run type-check` clean.
- [ ] 0.2. System components in `src/components/system/*`, all exported from `@/components/system` (Section … InkBand, per the design-system contract). · claude · every contract name is exported from `src/components/system/index.ts`; `pnpm exec eslint src/components/system` + type-check clean.
- [ ] 0.3. `Reveal` is visible at rest; motion only after mount (`html.ls-motion`); none under reduced motion. · claude · `curl -s localhost:3100/product/calendar | grep -c 'ls-reveal[^>]*opacity: *0'` = 0; page-audit 390 fold shows every first-viewport block.
- [ ] 0.4. InkBand closes the homepage in place of FinalCta ("Run the shop in one place.", Create account + See pricing). · claude · `/` last region before the footer carries `.ink-glow`; `grep -n "FinalCta" src/app/page.tsx` = 0; rest of `/` unchanged at 390 + 1440.
- [ ] 0.5. Mockup base: `sample-data.ts` (Sample studio, Thu Oct 8 2026, Dev / Mara / Rio), `AppSidebar` with the real groups + Studio / Artist / Desk lens, `AppFrame`, `app-parts.tsx`. · claude · type-check clean; every screen shows a SampleTag; `grep -rniE "sable|sparrow" src/components/mockups` = 0.
- [ ] 0.6. Mockups, daily queue: Today, Needs attention, Messages, Calendar (day / week / agenda), Appointments. · claude · each renders on /mockups-gallery at 390 + 1440 with 0 page overflow; labels match `InkOS/app/(app)/**/_proto`.
- [ ] 0.7. Mockups, client side: booking flow (steps 1–4), client file, Forms (templates / submissions / kiosk) + consent sign phone, briefing, client portal. · claude · each renders on /mockups-gallery; phone screens stay phone-sized at 390; 0 page overflow.
- [ ] 0.8. Mockups, work and money: Projects (gallery / board / detail with deposit pool), Portfolio + Flash, Flash Events, AI moodboard, Payments (4 tabs), Team + permissions, guest artists, Inventory (3 tabs), Analytics (4 tabs), Marketing (4 tabs), Locations. · claude · each renders on /mockups-gallery; payout rows add up ($7,630 gross, $5,622 paid out); 0 page overflow.
- [ ] 0.9. `MOCKUPS.md` maps every mockup screen to its app route and `proto-shots/` reference. · claude · every file in `src/components/mockups/*.tsx` (except parts/frame/sidebar) has a row with an app route.
- [ ] 0.10. `/mockups-gallery` renders every mockup and state for review. · claude · page-audit `/mockups-gallery` 390 + 1440: 0 overflow, 0 console errors, axe 0 serious outside decorative mockups.
- [ ] 0.11. Templates (Feature, Segment, Legal v2) + `src/lib/data/features.ts`, `segments.ts`, `src/lib/seo.ts` (title ≤ 60, description 120–160, canonical, OG). · claude · the three samples build their metadata through `seo.ts`; page-audit meta checks pass on them.
- [ ] 0.12. Sample `/product/calendar` on the Feature template (held for review, not deployed). · claude · page-audit 6/6 widths pass; ≤ 8,500px at 390; every plan/number traces to `plans.ts` or the app.
- [ ] 0.13. Sample `/for/solo-artists` on the Segment template (held for review, not deployed). · claude · page-audit 6/6 widths pass; ≤ 7,000px at 390.
- [ ] 0.14. `/legal/privacy` on Legal v2 (effective date, TOC + prose, contact card, quiet InkBand). · claude · page-audit 6/6 widths pass.
- [ ] 0.15. 404, error and loading on the system with nav + footer; 404 has one h1 and three exits (Product, Pricing, Contact). · claude · page-audit `/this-page-does-not-exist#404` 6/6 widths pass (status 404, exactly one h1).
- [ ] 0.16. Verification harness: `.design-audit/page-audit.mjs`, `banned.json`, `routes-w0.txt`, `axe-core` devDependency. · claude · the gate command above writes `report.json` + `sheet-*.png`; `axe-core` listed in package.json devDependencies.

### Redirects
- [ ] 0.17. `/book-a-demo` → `/contact` (308). · claude · `curl -sI localhost:3100/book-a-demo` → 308, `location: /contact`; page-audit `/book-a-demo#308` passes.
- [ ] 0.18. `/customers` and `/customers/:slug` → `/` (308). · claude · page-audit `/customers#308` passes; `curl -sI localhost:3100/customers/any` → 308.

### Honesty
- [ ] 0.19. "Sable & Sparrow", the "i" logo and the dark sidebar gone from every mockup; "Sample studio" only. · claude · banned "Sable & Sparrow" = 0 on every route in routes-w0; `grep -rn "Sable" src` = 0.
- [ ] 0.20. Homepage AppWindow sidebar uses the real app labels (Today, Needs attention, Messages, Calendar …), not "Consent forms / Deposits / Payouts". · claude · `/` 1440 hero sidebar text contains "Needs attention" and none of "Consent forms", "Deposits", "Payouts" as nav items.
- [ ] 0.21. Blog: "Studio owner, Leeds" quote deleted; "no credit card needed" → "30-day money-back, no free trial"; £ prices → $. · claude · `grep -nE "Leeds|credit card|£" src/lib/data/blog-posts.ts` = 0.
- [ ] 0.22. Migration: "100+ studios", "14 days or you don't pay", the day-count table and "white-glove" deleted; "usually a week or two; migration on every plan". · claude · `grep -rniE "white[- ]glove|100\+ studios|you don't pay" src` = 0.
- [ ] 0.23. Forms: "SHA-256 signed, court-admissible" → "Signed copies can't be edited and are stored as PDFs". · claude · `grep -rniE "court-admissible|sha-256" src` = 0.
- [ ] 0.24. REACH: "€5,000 fines", "<30s report", "validated against registry" and the cross-studio network deleted. · claude · `grep -rnE "€5,000|<30s|validated against" src` = 0; banned "fines figure" = 0 on `/reach-compliance`.
- [ ] 0.25. Contact: "< 4 hr", in-app chat and "French and German Q3 2026" → "one business day", email only, English. · claude · page-audit banned = 0 on `/contact`.
- [ ] 0.26. Careers: perks (equity, Lisbon/Tokyo, "hire every year") and the Apprentice role deleted. · claude · `grep -rniE "equity|lisbon|tokyo|apprentice" src/lib/data/careers.ts src/app/careers` = 0.
- [ ] 0.27. About: "644 files", "13 sprints", "Two years" and internal principles removed. · claude · `grep -rniE "644 files|13 sprints|two years" src/app/about` = 0.
- [ ] 0.28. Vendor names out of marketing copy (Stripe Connect, Twilio, WhatsApp Business, Supabase, dnd-kit); legal pages may still name sub-processors. · claude · page-audit banned vendor group = 0 on every non-`/legal/` route.
- [ ] 0.29. Messages says SMS and email today; Instagram and WhatsApp as coming next, never as live. · claude · no page in routes-w0 lists Instagram or WhatsApp as a live channel; banned "WhatsApp Business" = 0.
- [ ] 0.30. Loyalty, Studio P&L, healing/sterilization blocks, no-show risk and portfolio auto-sync removed; "Referral program" and "Projects" used instead. · claude · page-audit banned = 0 for those five phrases on every route; `grep -rniE "loyalty|p&l|no-show risk" src` = 0.
- [ ] 0.31. Product "vs" tables with "Q1 2025" and "pilot studio reports" removed. · claude · `grep -rniE "Q1 2025|pilot studio" src` = 0.
- [ ] 0.32. Roadmap reconciled with pricing: API + webhooks shown as shipped, loyalty and P&L removed, Instagram/WhatsApp messaging under Next, no dates. · claude · `grep -niE "loyalty|p&l|Q[1-4] 20" src/lib/data/roadmap.ts` = 0.
- [ ] 0.33. Terms: "99.9% uptime" removed; status link only when `STATUS_PAGE_URL` is set; "no pro-rated refunds" → "30-day money-back on first purchase; cancel any time, effective end of period". · claude · page-audit banned = 0 on `/legal/terms`.
- [ ] 0.34. Privacy + GDPR: "EU regions (Frankfurt)" → hosted on AWS US (Oregon) via Supabase, and Railway; sub-processors Supabase, Railway, Upstash, Resend, Dodo Payments; SCCs + UK addendum; eu-rep@ dropped. · claude · page-audit banned "Frankfurt" and "eu-rep@" = 0 on `/legal/privacy` and `/legal/gdpr`.
- [ ] 0.35. Mailboxes collapsed from 11 `@boldteq.com` addresses to hello@ (+ security@, press@). · claude · `grep -rhoE "[a-z.-]+@boldteq\.com" src | sort -u` lists only hello@, security@, press@.

### Retired
- [ ] 0.36. `/book-a-demo` page, `demo-form.tsx` and its server action deleted. · claude · `ls src/app/book-a-demo` fails; `grep -rlniE "demo-form|DemoForm|bookDemo" src` = 0.
- [ ] 0.37. Every "Book a demo" button and link removed (nav, footer, site-links, FAQ, pricing, tools, compare, product CTA). · claude · `grep -rniE "book a demo|book-a-demo" src` = 0; page-audit "demo" group and banned-href = 0 on every route.
- [ ] 0.38. `CTA.demoLabel` / `CTA.demoHref` → `CTA.secondaryLabel` "See pricing" / `CTA.secondaryHref` "/pricing". · claude · `grep -rnE "demoLabel|demoHref" src` = 0.
- [ ] 0.39. Homepage `FinalCta` retired (InkBand, item 0.4). · claude · `grep -rn "FinalCta" src/app` = 0.
- [ ] 0.40. `/book-a-demo` and `/customers` out of the sitemap. · claude · `curl -s localhost:3100/sitemap.xml | grep -cE "book-a-demo|customers"` = 0.

### Waiting on Yash
- [ ] 0.41. Confirm the Messages wording: SMS and email today, Instagram and WhatsApp coming next. · yash
- [ ] 0.42. Confirm the mailbox set: hello@, security@, press@ on boldteq.com until limespun.com mail exists. · yash
- [ ] 0.43. Live social handles (same ask as item 16). · yash
- [ ] 0.44. Approve the 390 + 1440 contact sheets for the samples (`/product/calendar`, `/for/solo-artists`, `/legal/privacy`) before Wave 1 rolls the templates out. · yash · sheets at `.design-audit/w0/audit/sheet-*.png`.
- [ ] 0.45. Privacy sub-processors: is Twilio in use, and is there an EU representative? · yash
