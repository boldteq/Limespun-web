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
