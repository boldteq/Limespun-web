// Page audit: screenshots, metrics and pass/fail checks for any set of routes at any widths.
// Generalises deep-capture.mjs (sections, text metrics, contrast approx, lastLineWords, interactive boxes),
// home-pass.mjs (console + page errors), nav-check.mjs (same-origin link check) and pricing-check.mjs.
//
// Usage:
//   node .design-audit/page-audit.mjs <baseUrl> <outDir> <route,...|@file> [--widths 320,390,768,1024,1280,1440]
//        [--full] [--no-axe] [--batch 6] [--strict]
//
//   routes     comma list ("/,/pricing") or @file with one route per line ('#' starts a comment line).
//              "/x#404" asserts a 404 page; "/x#308" asserts a permanent redirect whose Location resolves 200.
//   --widths   viewport widths. Default 390,1440; --full defaults to 320,390,768,1024,1280,1440.
//   --full     also keeps every text record, interactive box and style inventory in metrics-<w>.json.
//   --no-axe   skip axe-core (wcag2a + wcag2aa).
//   --batch    routes per contact sheet (default 6).
//   --strict   exit 1 when any route fails (default: exit 0; the verdict lives in report.json).
//
// outDir may be passed unquoted even when it contains spaces: every positional between the base URL
// and the routes argument is joined back into one path.
//
// Output (absolute paths only):
//   <outDir>/<route-slug>/<w>-fold.png, <w>-full.png, <w>-s<i>.png, metrics-<w>.json, route.json
//   <outDir>/report.json (per-route pass/fail summary), <outDir>/sheet-<n>.png (+ .html) contact sheets
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// fileURLToPath decodes %20; never build paths from URL.pathname.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPT_DIR);
const require = createRequire(path.join(ROOT, "package.json"));
const { chromium, request } = require(`${execSync("npm root -g").toString().trim()}/@playwright/mcp/node_modules/playwright`);
const AXE_PATH = require.resolve("axe-core/axe.min.js");
const CHROME = `${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const ALL_WIDTHS = [320, 390, 768, 1024, 1280, 1440];

// ---------- args ----------
const USAGE = "Usage: node .design-audit/page-audit.mjs <baseUrl> <outDir> <route,...|@file> [--widths 390,1440] [--full] [--no-axe] [--batch 6] [--strict]";
const flags = { widths: null, full: false, axe: true, batch: 6, strict: false };
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const value = () => (a.includes("=") ? a.slice(a.indexOf("=") + 1) : argv[++i]);
  if (a === "--full") flags.full = true;
  else if (a === "--no-axe") flags.axe = false;
  else if (a === "--strict") flags.strict = true;
  else if (a === "--widths" || a.startsWith("--widths=")) flags.widths = String(value()).split(",").map(Number).filter((n) => n > 0);
  else if (a === "--batch" || a.startsWith("--batch=")) flags.batch = Math.max(1, Number(value()) || 6);
  else if (a.startsWith("--")) { console.error(`Unknown flag ${a}\n${USAGE}`); process.exit(2); }
  else positional.push(a);
}
if (positional.length < 3) { console.error(USAGE); process.exit(2); }

const BASE = positional[0].replace(/\/+$/, "");
const OUT = path.resolve(positional.slice(1, -1).join(" "));
const routesArg = positional[positional.length - 1];
const WIDTHS = flags.widths?.length ? flags.widths : flags.full ? ALL_WIDTHS : [390, 1440];
const heightFor = (w) => (w < 500 ? 844 : w < 900 ? 1024 : w < 1200 ? 768 : 900);

function readRoutes(arg) {
  let lines;
  if (arg.startsWith("@")) {
    const rel = arg.slice(1);
    const file = [path.resolve(rel), path.resolve(ROOT, rel)].find((f) => existsSync(f));
    if (!file) { console.error(`Routes file not found: ${rel}`); process.exit(2); }
    lines = readFileSync(file, "utf8").split(/\r?\n/);
  } else lines = arg.split(",");
  return lines
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((raw) => {
      const m = raw.match(/^(.*?)(?:#(404|308))?$/);
      const route = (m[1] || "/").startsWith("/") ? m[1] || "/" : `/${m[1]}`;
      const expect = m[2] ?? "200";
      const base = route === "/" ? "home" : route.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "_");
      return { raw, route, expect, slug: expect === "200" ? base : `${base}-${expect}` };
    });
}
const ROUTES = readRoutes(routesArg);

const banned = JSON.parse(readFileSync(path.join(SCRIPT_DIR, "banned.json"), "utf8"));
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const literalRe = (s) => `${/^\w/.test(s) ? "\\b" : ""}${escapeRe(s)}${/\w$/.test(s) ? "\\b" : ""}`;
const bannedFor = (route) =>
  banned.phrases
    .filter((p) => !(p.allowOn ?? []).some((pre) => route.startsWith(pre)))
    .map((p) => ({ phrase: p.phrase, group: p.group, reason: p.reason, source: p.regex ?? literalRe(p.phrase) }));

// Mobile doc-height budgets (measured at 390). Report only, never fail.
function budgetFor(route) {
  if (route === "/") return null; // homepage is locked
  if (route.startsWith("/legal/")) return null; // policy length is set by the policy
  if (/^\/blog\/[^/]+/.test(route)) return null; // articles
  if (route.startsWith("/product/")) return 8500;
  if (route.startsWith("/for/")) return 7000;
  return 6000;
}

// ---------- styles injected into the page ----------
const HIDE_DEV = "nextjs-portal{display:none!important}";
const FORCE_REVEAL =
  ".ls-reveal,[data-reveal]{opacity:1!important;transform:none!important;transition:none!important;animation:none!important;filter:none!important}";
const HIDE_NAV =
  'nav[aria-label="Primary"],.fixed:has(nav[aria-label="Primary"]),.limespun-nav-mobile{visibility:hidden!important}';

// ---------- in-page collector (serialised into the browser; plain JS only) ----------
function collectPage({ bannedList, bannedHrefs, full, questionHeadlines }) {
  const vis = (el) =>
    el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  const a11yHidden = (el) => !!el.closest('[aria-hidden="true"],[inert]');
  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
  const describe = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
    return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${cls ? `.${cls}` : ""}`;
  };
  const whereOf = (el) => {
    const region = el.closest("[data-audit-region]");
    const landmark = el.closest("nav,header,footer,aside,dialog");
    const h = region?.querySelector("h1,h2,h3");
    if (region) return `s${region.getAttribute("data-audit-region")}${h ? ` "${clean(h.textContent).slice(0, 40)}"` : ""}`;
    return landmark ? landmark.tagName.toLowerCase() : "page";
  };
  const px = (v) => Math.round(parseFloat(v) * 10) / 10;

  // Regions: partition <main> into its top-level sections (recursing through wrappers), then the site footer.
  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT", "NEXTJS-PORTAL", "LINK", "META"]);
  const regionsOf = (el, depth) => {
    const out = [];
    for (const c of el.children) {
      if (SKIP_TAGS.has(c.tagName)) continue;
      if (c.getBoundingClientRect().height < 40) continue;
      if (c.tagName === "SECTION" || depth >= 3 || !c.querySelector("section")) out.push(c);
      else out.push(...regionsOf(c, depth + 1));
    }
    return out;
  };
  const main = document.querySelector("main");
  const siteFooter = [...document.querySelectorAll("footer")].find((f) => !f.closest("main"));
  const regions = main
    ? [...regionsOf(main, 0), siteFooter].filter(Boolean)
    : [...document.body.children].filter((c) => !SKIP_TAGS.has(c.tagName) && c.getBoundingClientRect().height >= 40);
  document.querySelectorAll("[data-audit-region]").forEach((e) => e.removeAttribute("data-audit-region"));
  regions.forEach((r, i) => r.setAttribute("data-audit-region", String(i)));

  // Overflow: elements that break out of a non-overflowing parent, with no clipping ancestor.
  const overflowX = document.documentElement.scrollWidth - innerWidth;
  const overflowOffenders = [];
  if (overflowX > 0) {
    const clipped = (el) => {
      for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
        if (a === document.body) return false;
        if (getComputedStyle(a).overflowX !== "visible") return true;
      }
      return false;
    };
    const over = new Set();
    for (const el of document.body.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > innerWidth + 1 && !clipped(el)) over.add(el);
    }
    for (const el of over) {
      if (over.has(el.parentElement)) continue;
      const r = el.getBoundingClientRect();
      overflowOffenders.push({ el: describe(el), where: whereOf(el), right: Math.round(r.right), width: Math.round(r.width), text: clean(el.textContent).slice(0, 50) });
      if (overflowOffenders.length >= 8) break;
    }
  }

  // Headings (as the accessibility tree sees them).
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .filter((h) => !a11yHidden(h) && vis(h))
    .map((h) => ({ level: Number(h.tagName[1]), text: clean(h.textContent).slice(0, 90), where: whereOf(h) }));
  const headingSkips = [];
  let prev = 1;
  for (const h of headings) {
    if (h.level > prev + 1) headingSkips.push({ from: `h${prev}`, to: `h${h.level}`, text: h.text, where: h.where });
    prev = h.level;
  }
  const questionHeads = questionHeadlines ? headings.filter((h) => h.level <= 2 && /\?\s*$/.test(h.text)) : [];

  // Metadata.
  const metaContent = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const typesOf = (j, acc) => {
    if (Array.isArray(j)) j.forEach((x) => typesOf(x, acc));
    else if (j && typeof j === "object") {
      if (j["@type"]) acc.push(...[].concat(j["@type"]));
      Object.values(j).forEach((v) => typeof v === "object" && typesOf(v, acc));
    }
    return acc;
  };
  const meta = {
    title: document.title,
    description: metaContent('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    ogImage: metaContent('meta[property="og:image"]'),
    ogTitle: metaContent('meta[property="og:title"]'),
    ogDescription: metaContent('meta[property="og:description"]'),
    robots: metaContent('meta[name="robots"]'),
    lang: document.documentElement.getAttribute("lang"),
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try {
        return { ok: true, types: [...new Set(typesOf(JSON.parse(s.textContent), []))] };
      } catch (e) {
        return { ok: false, error: String(e.message).slice(0, 120), head: s.textContent.slice(0, 120) };
      }
    }),
  };

  // Links.
  const links = [];
  const anchorsMissing = [];
  const bannedLinks = [];
  for (const a of document.querySelectorAll("a[href]")) {
    const raw = a.getAttribute("href");
    let u;
    try { u = new URL(a.href); } catch { continue; }
    const text = clean(a.getAttribute("aria-label") || a.textContent).slice(0, 50);
    if (!/^https?:$/.test(u.protocol)) continue;
    const same = u.origin === location.origin;
    if (same && u.hash && u.pathname === location.pathname && u.search === location.search) {
      const id = decodeURIComponent(u.hash.slice(1));
      if (id && !document.getElementById(id)) anchorsMissing.push({ href: raw, text, where: whereOf(a) });
      continue;
    }
    if (same) {
      for (const b of bannedHrefs) {
        if (u.pathname === b.href || u.pathname.startsWith(`${b.href}/`)) bannedLinks.push({ href: raw, text, where: whereOf(a), reason: b.reason });
      }
    }
    links.push({ href: raw, path: same ? u.pathname + u.search : null, external: !same, text, where: whereOf(a) });
  }

  // Tap targets under 44px.
  const tapTargets = [];
  for (const el of document.querySelectorAll("a,button,input,summary,select,[role=tab]")) {
    if (a11yHidden(el) || !vis(el)) continue;
    if (el.tagName === "INPUT" && el.type === "hidden") continue;
    const box = (el.tagName === "INPUT" && /^(checkbox|radio)$/.test(el.type) && el.closest("label")) || el;
    const r = box.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) continue; // sr-only skip links
    if (r.width >= 44 && r.height >= 44) continue;
    const cs = getComputedStyle(el);
    const inline = el.tagName === "A" && cs.display === "inline" && clean(el.parentElement?.textContent).length > clean(el.textContent).length + 3;
    tapTargets.push({ t: clean(el.getAttribute("aria-label") || el.textContent || el.getAttribute("placeholder") || el.name).slice(0, 40), tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height), inline, where: whereOf(el) });
  }

  // Banned copy: every text node (hidden ones too; closed FAQ answers and other breakpoints still ship),
  // grouped by nearest block ancestor and joined with spaces so words never fuse.
  const blockCache = new Map();
  const blockOf = (el) => {
    let a = el;
    while (a && a !== document.body) {
      if (blockCache.has(a)) return blockCache.get(a);
      const d = getComputedStyle(a).display;
      if (!d.startsWith("inline") && d !== "contents") break;
      a = a.parentElement;
    }
    const b = a || document.body;
    blockCache.set(el, b);
    return b;
  };
  const segments = [];
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || !n.textContent.trim()) return NodeFilter.FILTER_REJECT;
      if (p.closest("script,style,noscript,template,nextjs-portal")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let last = null;
  while (tw.nextNode()) {
    const b = blockOf(tw.currentNode.parentElement);
    if (last && last.el === b) last.text += ` ${tw.currentNode.textContent}`;
    else segments.push((last = { el: b, text: tw.currentNode.textContent }));
  }
  const metaText = [meta.title, meta.description, meta.ogTitle, meta.ogDescription].filter(Boolean).join(" | ");
  const bannedHits = [];
  const seenHit = new Set();
  const compiled = bannedList.map((b) => ({ ...b, re: new RegExp(b.source, "gi") }));
  const scan = (text, where, visible, mock) => {
    const t = clean(text);
    const found = [];
    for (const b of compiled) {
      b.re.lastIndex = 0;
      let m;
      while ((m = b.re.exec(t))) {
        found.push({ b, start: m.index, end: m.index + m[0].length, match: m[0] });
        if (!m[0].length) b.re.lastIndex++;
      }
    }
    // "Book a demo" also matches "demo": keep only the widest match covering a span.
    const kept = found.filter((f) => !found.some((o) => o !== f && o.start <= f.start && o.end >= f.end && o.end - o.start > f.end - f.start));
    for (const f of kept) {
      const snippet = t.slice(Math.max(0, f.start - 40), f.end + 40);
      const key = `${f.b.phrase}|${snippet}`;
      if (seenHit.has(key)) continue;
      seenHit.add(key);
      bannedHits.push({ phrase: f.b.phrase, group: f.b.group, match: f.match, snippet, where, visible, mock });
    }
  };
  for (const s of segments) scan(s.text, whereOf(s.el), vis(s.el), a11yHidden(s.el));
  scan(metaText, "meta", true, false);
  for (const s of document.querySelectorAll('script[type="application/ld+json"]')) scan(s.textContent, "json-ld", true, false);

  // Section metrics (+ per-text typography, contrast approx and last-line words).
  const lum = (rgb) => {
    const m = rgb.match(/[\d.]+/g);
    if (!m) return null;
    const [r, g, bb] = m.slice(0, 3).map((x) => {
      const c = Number(x) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bb;
  };
  const alpha = (c) => {
    const m = c.match(/[\d.]+/g);
    return m && m.length === 4 ? Number(m[3]) : 1;
  };
  const bgOf = (el) => {
    for (let a = el; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !cs.backgroundImage.startsWith("url")) return "rgb(242,140,100)"; // striped ember frame approx
      if (alpha(cs.backgroundColor) > 0.5) return cs.backgroundColor;
    }
    return "rgb(255,255,255)";
  };
  const contrast = (fg, bg) => {
    const a = lum(fg), c = lum(bg);
    if (a == null || c == null) return null;
    const [hi, lo] = a > c ? [a, c] : [c, a];
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
  };
  const lineInfo = (el) => {
    const r = document.createRange();
    r.selectNodeContents(el);
    const tops = [...new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)))];
    const words = el.textContent.trim().split(/\s+/).length;
    let lastLineWords = null;
    if (tops.length > 1) {
      const lastTop = Math.max(...tops);
      const nodes = [];
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) nodes.push(w.currentNode);
      let count = 0;
      outer: for (let i = nodes.length - 1; i >= 0; i--) {
        for (const mm of [...nodes[i].textContent.matchAll(/\S+/g)].reverse()) {
          const rr = document.createRange();
          rr.setStart(nodes[i], mm.index);
          rr.setEnd(nodes[i], mm.index + mm[0].length);
          const rc = rr.getClientRects()[0];
          if (rc && Math.abs(Math.round(rc.top) - lastTop) <= 3) count++;
          else break outer;
        }
      }
      lastLineWords = count;
    }
    return { lines: tops.length, lastLineWords, words };
  };

  const lowContrast = [];
  const widows = [];
  const sections = regions.map((sec, i) => {
    const cs = getComputedStyle(sec);
    const r = sec.getBoundingClientRect();
    const top = r.top + scrollY;
    const h = sec.querySelector("h1,h2,h3");
    const inner = sec.querySelector(":scope > div") ?? sec;
    const ir = inner.getBoundingClientRect();
    const texts = [];
    const seen = new Set();
    const w = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const el = w.currentNode.parentElement;
      if (!el || !w.currentNode.textContent.trim() || seen.has(el)) continue;
      if (el.closest(".sr-only,script,style")) continue;
      const ecs = getComputedStyle(el);
      if (!vis(el)) continue;
      const er = el.getBoundingClientRect();
      if (er.width === 0) continue;
      seen.add(el);
      const tag = el.tagName.toLowerCase();
      const fs = px(ecs.fontSize);
      const mock = a11yHidden(el);
      const bg = bgOf(el);
      const ratio = contrast(ecs.color, bg);
      const rec = {
        tag,
        text: clean(el.textContent).slice(0, 70),
        mock,
        fs,
        fw: ecs.fontWeight,
        lh: ecs.lineHeight,
        ls: ecs.letterSpacing,
        fam: /serif/i.test(ecs.fontFamily) && !/sans/i.test(ecs.fontFamily.split(",")[0]) ? "serif" : "sans",
        color: ecs.color,
        bg,
        contrast: ratio,
        x: Math.round(er.left),
        y: Math.round(er.top + scrollY - top),
        w: Math.round(er.width),
        chars: Math.round(er.width / (parseFloat(ecs.fontSize) * 0.5)),
        ...(/^(h1|h2|h3|p|blockquote|li|dd|dt)$/.test(tag) ? lineInfo(el) : {}),
      };
      const large = fs >= 24 || (fs >= 18.66 && Number(ecs.fontWeight) >= 700);
      const need = large ? 3 : 4.5;
      if (!mock && ratio != null && ratio < need && alpha(ecs.color) > 0.1)
        lowContrast.push({ text: rec.text, fs, color: rec.color, bg, contrast: ratio, need, where: `s${i}` });
      if (!mock && rec.lines > 1 && rec.lastLineWords === 1 && rec.words >= 4 && (/^h[1-3]$/.test(tag) || (tag === "p" && fs >= 17)))
        widows.push({ tag, text: rec.text, fs, lines: rec.lines, where: `s${i}` });
      texts.push(rec);
    }
    const out = {
      i,
      tag: sec.tagName.toLowerCase(),
      id: sec.id || null,
      heading: h ? clean(h.textContent).slice(0, 60) : null,
      top: Math.round(top),
      height: Math.round(r.height),
      bg: cs.backgroundColor,
      padTop: cs.paddingTop,
      padBottom: cs.paddingBottom,
      containerLeft: Math.round(ir.left),
      containerWidth: Math.round(ir.width),
      textCount: texts.length,
    };
    if (full) {
      out.texts = texts;
      out.interactive = [...sec.querySelectorAll("a,button,input,summary,select,[role=tab],[role=radio]")]
        .filter((e) => e.getBoundingClientRect().width > 0)
        .map((e) => {
          const er = e.getBoundingClientRect();
          return { t: clean(e.getAttribute("aria-label") || e.textContent).slice(0, 40), w: Math.round(er.width), h: Math.round(er.height), href: e.getAttribute("href") };
        });
      const st = { radii: new Set(), shadows: new Set(), bgs: new Set() };
      sec.querySelectorAll("*").forEach((e) => {
        const s = getComputedStyle(e);
        if (s.borderRadius !== "0px") st.radii.add(s.borderRadius);
        if (s.boxShadow !== "none") st.shadows.add(s.boxShadow.slice(0, 90));
        if (alpha(s.backgroundColor) > 0) st.bgs.add(s.backgroundColor);
      });
      out.radii = [...st.radii];
      out.shadows = [...st.shadows].slice(0, 8);
      out.bgs = [...st.bgs];
    }
    return out;
  });

  const firstHeading = headings[0]?.text ?? null;
  return {
    viewport: innerWidth,
    docHeight: document.documentElement.scrollHeight,
    overflowX,
    overflowOffenders,
    headings,
    h1Count: headings.filter((x) => x.level === 1).length,
    headingSkips,
    questionHeads,
    firstHeading,
    meta,
    links,
    anchorsMissing,
    bannedLinks,
    tapTargets,
    bannedHits,
    lowContrast: lowContrast.slice(0, 40),
    widows,
    sections,
  };
}

async function runAxe() {
  const r = await window.axe.run(
    { exclude: [["nextjs-portal"]] },
    { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] }, resultTypes: ["violations"] },
  );
  return r.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    helpUrl: v.helpUrl,
    nodes: v.nodes.slice(0, 25).map((n) => {
      const t = n.target;
      let el = null;
      try { el = typeof t[0] === "string" ? document.querySelector(t[0]) : null; } catch { el = null; }
      return {
        target: t.map((x) => (Array.isArray(x) ? x.join(" >> ") : x)).join(" | "),
        html: n.html.slice(0, 160),
        summary: (n.failureSummary || "").replace(/\s+/g, " ").slice(0, 220),
        decorative: !!el?.closest('[aria-hidden="true"]'),
      };
    }),
    nodeCount: v.nodes.length,
  }));
}

// ---------- helpers ----------
const issue = (level, check, detail, width) => ({ level, check, detail, width });
function aggregate(list) {
  const map = new Map();
  for (const it of list) {
    const key = `${it.level}|${it.check}|${it.detail}`;
    if (!map.has(key)) map.set(key, { check: it.check, detail: it.detail, widths: [] });
    if (it.width != null && !map.get(key).widths.includes(it.width)) map.get(key).widths.push(it.width);
  }
  return [...map.values()];
}
const writeJson = (file, data) => writeFileSync(file, JSON.stringify(data, null, 1));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- run ----------
const t0 = Date.now();
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });
const api = await request.newContext({ baseURL: BASE, timeout: 120000 });

const linkCache = new Map(); // path -> { ok, status, chain }
async function checkPath(p) {
  if (linkCache.has(p)) return linkCache.get(p);
  const chain = [];
  let url = new URL(p, BASE).toString();
  let result = null;
  try {
    for (let hop = 0; hop < 5; hop++) {
      const res = await api.get(url, { maxRedirects: 0, failOnStatusCode: false });
      const status = res.status();
      chain.push(status);
      if (status >= 300 && status < 400 && res.headers().location) {
        url = new URL(res.headers().location, url).toString();
        continue;
      }
      result = { ok: status === 200, status, chain, final: new URL(url).pathname };
      break;
    }
    result ??= { ok: false, status: chain.at(-1), chain, final: url, error: "too many redirects" };
  } catch (e) {
    result = { ok: false, status: null, chain, error: String(e.message).split("\n")[0] };
  }
  linkCache.set(p, result);
  return result;
}
const ogCache = new Map();
async function checkOgImage(raw) {
  const u = new URL(raw, BASE);
  const remapped = u.origin !== new URL(BASE).origin;
  const local = new URL(u.pathname + u.search, BASE).toString();
  if (ogCache.has(local)) return ogCache.get(local);
  let r;
  try {
    const res = await api.get(local, { failOnStatusCode: false });
    const type = res.headers()["content-type"] ?? "";
    r = { status: res.status(), type, ok: res.status() === 200 && type.startsWith("image/"), remapped };
  } catch (e) {
    r = { status: null, ok: false, error: String(e.message).split("\n")[0], remapped };
  }
  ogCache.set(local, r);
  return r;
}

// Soft-404 fingerprint: what the not-found page looks like right now.
let probe404 = { title: null, firstHeading: null };
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, bypassCSP: true });
  const p = await ctx.newPage();
  try {
    await p.goto(`${BASE}/__page-audit-404-probe`, { waitUntil: "load", timeout: 120000 });
    probe404 = await p.evaluate(() => ({ title: document.title, firstHeading: (document.querySelector("h1,h2")?.textContent || "").replace(/\s+/g, " ").trim() || null }));
  } catch { /* keep defaults */ }
  await ctx.close();
}

const results = [];
for (const r of ROUTES) {
  const rt0 = Date.now();
  const dir = path.join(OUT, r.slug);
  mkdirSync(dir, { recursive: true });
  const issues = [];
  const perWidth = {};
  const summary = { route: r.route, raw: r.raw, expect: r.expect, slug: r.slug, dir };

  // Redirect assertion: HTTP only, no render.
  if (r.expect === "308") {
    try {
      const res = await api.get(r.route, { maxRedirects: 0, failOnStatusCode: false });
      const status = res.status();
      const loc = res.headers().location ?? null;
      summary.httpStatus = status;
      summary.location = loc;
      if (status !== 308 && status !== 301) issues.push(issue("fail", "redirect", `expected 308, got ${status}${loc ? ` -> ${loc}` : ""}`));
      else if (status === 301) issues.push(issue("warn", "redirect", "301 (expected 308)"));
      if (loc) {
        const dest = await checkPath(new URL(loc, new URL(r.route, BASE)).pathname);
        summary.destination = dest;
        if (!dest.ok) issues.push(issue("fail", "redirect", `Location ${loc} resolves ${dest.status} (${dest.chain.join("->")})`));
      } else if (status === 308 || status === 301) issues.push(issue("fail", "redirect", "no Location header"));
    } catch (e) {
      issues.push(issue("fail", "harness", String(e.message).split("\n")[0]));
    }
  } else {
    for (const w of WIDTHS) {
      const wt0 = Date.now();
      const ctx = await browser.newContext({ viewport: { width: w, height: heightFor(w) }, deviceScaleFactor: 1, bypassCSP: true });
      const page = await ctx.newPage();
      const url = `${BASE}${r.route}`;
      const consoleErrors = [];
      page.on("console", (m) => {
        if (m.type() !== "error") return;
        const at = m.location()?.url ?? "";
        // The document's own non-200 logs a resource error; the status check already judges it.
        const samePath = (() => { try { return new URL(at).pathname === new URL(url).pathname; } catch { return false; } })();
        if (/^Failed to load resource/.test(m.text()) && samePath) return;
        consoleErrors.push({ text: m.text().slice(0, 300), at: at.slice(0, 160) });
      });
      page.on("pageerror", (e) => consoleErrors.push({ text: `pageerror: ${String(e.message).slice(0, 300)}`, at: "" }));
      const shots = { fold: null, full: null, sections: 0 };
      let m = null;
      let axe = null;
      try {
        const resp = await page.goto(url, { waitUntil: "load", timeout: 120000 });
        await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => issues.push(issue("warn", "harness", "networkidle not reached in 20s", w)));
        const status = resp?.status() ?? null;
        const redirectedFrom = resp?.request().redirectedFrom()?.url() ?? null;
        summary.httpStatus = status;
        summary.finalUrl = page.url();
        if (r.expect === "404" && status !== 404) issues.push(issue("fail", "status", `expected 404, got ${status}`, w));
        if (r.expect === "200" && status !== 200) issues.push(issue("fail", "status", `expected 200, got ${status}`, w));
        if (r.expect === "200" && redirectedFrom) issues.push(issue("warn", "status", `redirected to ${new URL(page.url()).pathname}`, w));

        await page.addStyleTag({ content: HIDE_DEV });
        await page.evaluate(() => document.fonts.ready);
        await sleep(700);
        await page.screenshot({ path: path.join(dir, `${w}-fold.png`), animations: "disabled" });
        shots.fold = `${w}-fold.png`;

        // Scroll through once so IntersectionObserver reveals fire, then force anything left visible.
        await page.evaluate(async () => {
          const step = Math.max(240, Math.round(innerHeight * 0.8));
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo({ top: y, behavior: "instant" });
            await new Promise((res) => setTimeout(res, 70));
          }
          window.scrollTo({ top: 0, behavior: "instant" });
        });
        await page.addStyleTag({ content: FORCE_REVEAL });
        await sleep(250);

        // axe before collectPage so its selectors never include the data-audit-region markers.
        if (flags.axe) {
          await page.addScriptTag({ path: AXE_PATH });
          axe = await page.evaluate(runAxe);
        }

        m = await page.evaluate(collectPage, {
          bannedList: bannedFor(r.route),
          bannedHrefs: banned.bannedHrefs ?? [],
          full: flags.full,
          questionHeadlines: banned.questionHeadlines !== false,
        });

        await page.screenshot({ path: path.join(dir, `${w}-full.png`), fullPage: true, animations: "disabled" });
        shots.full = `${w}-full.png`;

        await page.addStyleTag({ content: HIDE_NAV });
        for (const s of m.sections) {
          const loc = page.locator(`[data-audit-region="${s.i}"]`);
          if (!(await loc.count())) continue;
          try {
            await loc.first().scrollIntoViewIfNeeded({ timeout: 5000 });
            await sleep(120);
            await loc.first().screenshot({ path: path.join(dir, `${w}-s${s.i}.png`), animations: "disabled", timeout: 20000 });
            shots.sections++;
          } catch (e) {
            issues.push(issue("warn", "harness", `section s${s.i} screenshot: ${String(e.message).split("\n")[0]}`, w));
          }
        }
      } catch (e) {
        issues.push(issue("fail", "harness", String(e.message).split("\n")[0].slice(0, 200), w));
      }

      // ---- judge this width ----
      for (const c of consoleErrors) {
        const at = /^Failed to load resource/.test(c.text) && c.at ? ` @ ${c.at.split("?")[0]}` : "";
        issues.push(issue("fail", "console", `${c.text.slice(0, 160)}${at}`, w));
      }
      if (m) {
        if (m.overflowX > 0)
          issues.push(issue("fail", "overflow", `page scrolls sideways by ${m.overflowX}px (${m.overflowOffenders.slice(0, 3).map((o) => `${o.el} @${o.where}`).join("; ")})`, w));
        if (m.h1Count !== 1) issues.push(issue("fail", "headings", `${m.h1Count} h1 (expected exactly 1)`, w));
        for (const s of m.headingSkips) issues.push(issue("fail", "headings", `${s.from} -> ${s.to} skip at "${s.text.slice(0, 50)}"`, w));
        for (const q of m.questionHeads) issues.push(issue("fail", "banned", `question headline h${q.level} "${q.text.slice(0, 60)}"`, w));
        for (const b of m.bannedHits)
          issues.push(issue("fail", "banned", `"${b.phrase}" -> "${b.match}" @${b.where}${b.visible ? "" : " (hidden at this width)"}${b.mock ? " (mockup)" : ""}: …${b.snippet}…`, w));
        for (const b of m.bannedLinks) issues.push(issue("fail", "banned-href", `link to ${b.href} ("${b.text}") @${b.where}`, w));
        // Warn only: a script may own the hash (e.g. the hero's #pricing-lifetime opens the Lifetime tab).
        for (const a of m.anchorsMissing) issues.push(issue("warn", "anchor", `${a.href} has no element with that id ("${a.text}") @${a.where}`, w));
        const nonInline = m.tapTargets.filter((t) => !t.inline);
        // 44px matters on touch widths; desktop lists stay in metrics-<w>.json.
        if (nonInline.length && w <= 1024)
          issues.push(issue("warn", "tap-targets", `${nonInline.length} under 44px: ${nonInline.slice(0, 5).map((t) => `"${t.t}" ${t.w}x${t.h}`).join(", ")}${nonInline.length > 5 ? " …" : ""}`, w));
        // The contrast approximation is only a stand-in when axe is off; with axe on it stays in metrics-<w>.json.
        if (!flags.axe) for (const c of m.lowContrast.slice(0, 6)) issues.push(issue("warn", "contrast", `~${c.contrast}:1 (needs ${c.need}) "${c.text.slice(0, 40)}" ${c.fs}px @${c.where}`, w));
        for (const wd of m.widows.slice(0, 6)) issues.push(issue("warn", "widow", `${wd.tag} ${wd.fs}px ends on one word: "${wd.text.slice(0, 50)}" @${wd.where}`, w));
        if (w === 390) {
          const budget = budgetFor(r.route);
          if (budget && m.docHeight > budget) issues.push(issue("warn", "doc-height", `${m.docHeight}px at 390 (budget ${budget})`, w));
        }
        if (r.expect === "200" && summary.httpStatus !== 200) {
          /* a hard status failure is already reported */
        } else if (r.expect === "200" && probe404.firstHeading && m.firstHeading === probe404.firstHeading)
          issues.push(issue("fail", "soft-404", `renders the not-found page ("${m.firstHeading}")`, w));
        else if (r.expect === "200" && /\b(404|page not found)\b/i.test(m.meta.title ?? "")) issues.push(issue("fail", "soft-404", `title "${m.meta.title}"`, w));
      }
      if (axe) {
        for (const v of axe) {
          const real = v.nodes.filter((n) => !(v.id === "color-contrast" && n.decorative));
          const deco = v.nodes.length - real.length;
          const blocking = v.impact === "serious" || v.impact === "critical";
          if (real.length)
            issues.push(issue(blocking ? "fail" : "warn", "axe", `${v.impact} ${v.id} x${real.length}: ${v.help} [${real.slice(0, 2).map((n) => n.target).join(" ; ")}]`, w));
          if (deco) issues.push(issue("warn", "axe", `${v.id} x${deco} inside aria-hidden mockups (decorative)`, w));
        }
      }

      perWidth[w] = {
        ms: Date.now() - wt0,
        overflowX: m?.overflowX ?? null,
        docHeight: m?.docHeight ?? null,
        consoleErrors: consoleErrors.length,
        h1: m?.h1Count ?? null,
        headingSkips: m?.headingSkips.length ?? null,
        tapTargetsUnder44: m ? m.tapTargets.filter((t) => !t.inline).length : null,
        banned: m?.bannedHits.length ?? null,
        sections: m?.sections.length ?? null,
        axe: axe
          ? axe.reduce((acc, v) => ((acc[v.impact ?? "unknown"] = (acc[v.impact ?? "unknown"] ?? 0) + v.nodeCount), acc), {})
          : null,
        shots,
      };
      if (m) {
        writeJson(path.join(dir, `metrics-${w}.json`), { route: r.route, width: w, consoleErrors, axe, ...m });
        summary.meta ??= m.meta;
        summary.links ??= m.links;
      }
      await ctx.close();
    }

    // ---- once per route: metadata + links ----
    const meta = summary.meta;
    if (meta) {
      const titleLen = (meta.title ?? "").length;
      const descLen = (meta.description ?? "").length;
      if (!titleLen) issues.push(issue("fail", "meta", "no <title>"));
      else if (titleLen > 60) issues.push(issue("fail", "meta", `title ${titleLen} chars (max 60): "${meta.title}"`));
      for (const j of meta.jsonLd) if (!j.ok) issues.push(issue("fail", "meta", `JSON-LD does not parse: ${j.error}`));
      if (r.expect === "200" && summary.httpStatus === 200) {
        if (!meta.description) issues.push(issue("fail", "meta", "no meta description"));
        else if (descLen < 120 || descLen > 160) issues.push(issue("fail", "meta", `description ${descLen} chars (want 120-160)`));
        if (!meta.canonical) issues.push(issue("fail", "meta", "no canonical link"));
        else {
          const cp = new URL(meta.canonical, BASE).pathname.replace(/\/+$/, "") || "/";
          const rp = r.route.replace(/\/+$/, "") || "/";
          if (cp !== rp) issues.push(issue("warn", "meta", `canonical points to ${cp}`));
        }
        if (!meta.ogImage) issues.push(issue("fail", "meta", "no og:image"));
        else {
          const og = await checkOgImage(meta.ogImage);
          summary.ogImage = { url: meta.ogImage, ...og };
          if (!og.ok) issues.push(issue("fail", "meta", `og:image ${og.status ?? og.error} ${og.type ?? ""}`.trim()));
        }
      } else if (r.expect === "404" && !/noindex/i.test(meta.robots ?? "")) issues.push(issue("warn", "meta", "404 page has no robots noindex"));
    }
    const sameOrigin = [...new Set((summary.links ?? []).filter((l) => l.path).map((l) => l.path.split("#")[0]))];
    const broken = [];
    for (const p of sameOrigin) {
      const res = await checkPath(p);
      if (!res.ok) broken.push({ path: p, status: res.status, chain: res.chain, error: res.error });
    }
    for (const b of broken) issues.push(issue("fail", "links", `${b.path} -> ${b.status ?? b.error}${b.chain?.length > 1 ? ` (${b.chain.join("->")})` : ""}`));
    summary.linkCheck = { sameOrigin: sameOrigin.length, external: (summary.links ?? []).filter((l) => l.external).length, broken };
    delete summary.links;
  }

  summary.perWidth = perWidth;
  summary.failures = aggregate(issues.filter((i) => i.level === "fail"));
  summary.warnings = aggregate(issues.filter((i) => i.level === "warn"));
  summary.pass = summary.failures.length === 0;
  summary.ms = Date.now() - rt0;
  writeJson(path.join(dir, "route.json"), summary);
  results.push(summary);
  console.log(`${summary.pass ? "PASS" : "FAIL"}  ${r.raw.padEnd(34)} ${String(summary.httpStatus ?? "-").padEnd(4)} ${summary.failures.length} fail / ${summary.warnings.length} warn  ${(summary.ms / 1000).toFixed(1)}s`);
}

// ---------- contact sheets: narrow + wide fold side by side per route ----------
const narrow = WIDTHS.includes(390) ? 390 : Math.min(...WIDTHS);
const wide = WIDTHS.includes(1440) ? 1440 : Math.max(...WIDTHS);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const sheets = [];
const sheetPage = await (await browser.newContext({ viewport: { width: 1240, height: 900 }, deviceScaleFactor: 1 })).newPage();
for (let b = 0; b * flags.batch < results.length; b++) {
  const batch = results.slice(b * flags.batch, (b + 1) * flags.batch);
  const img = (res, w) => {
    const f = path.join(res.dir, `${w}-fold.png`);
    return existsSync(f) ? `<img src="${esc(`${res.slug}/${w}-fold.png`.split("/").map(encodeURIComponent).join("/"))}" alt="">` : `<div class="none">no ${w} shot</div>`;
  };
  const rows = batch
    .map((res) => {
      const head = `<div class="head"><b>${esc(res.raw)}</b><span class="${res.pass ? "pass" : "fail"}">${res.pass ? "PASS" : "FAIL"}</span><span>HTTP ${esc(res.httpStatus ?? "-")}${res.location ? ` → ${esc(res.location)}` : ""}</span><span class="mute">${res.failures.length} fail · ${res.warnings.length} warn</span></div>`;
      const fails = res.failures.length
        ? `<ul class="fails">${res.failures.slice(0, 6).map((f) => `<li><b>${esc(f.check)}</b> ${esc(f.detail.slice(0, 150))}${f.widths.length ? ` <i>[${f.widths.join(",")}]</i>` : ""}</li>`).join("")}${res.failures.length > 6 ? `<li>… ${res.failures.length - 6} more in report.json</li>` : ""}</ul>`
        : "";
      const body = res.expect === "308" ? `<div class="redirect">Redirect route: no render. ${esc(res.destination ? `Destination ${res.destination.final} → ${res.destination.status}` : "")}</div>` : `<div class="shots"><div class="n">${img(res, narrow)}</div><div class="w">${img(res, wide)}</div></div>`;
      return `<section>${head}${fails}${body}</section>`;
    })
    .join("");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;padding:24px;background:#F3ECE3;font:13px/1.45 -apple-system,system-ui,sans-serif;color:#1D1E1C;width:1192px}
h1{font-size:15px;margin:0 0 16px}
section{background:#fff;border:1px solid #E7DFD5;border-radius:12px;padding:14px 16px;margin-bottom:14px}
.head{display:flex;gap:14px;align-items:baseline;font-size:14px}.pass{color:#1F6B3A;font-weight:700}.fail{color:#A3271E;font-weight:700}.mute{color:#6B6762}
.fails{margin:8px 0 0;padding-left:18px;color:#4A4845;font-size:12px}.fails b{color:#A3271E}
.shots{display:grid;grid-template-columns:234px 1fr;gap:16px;margin-top:12px;align-items:start}
img{display:block;width:100%;border:1px solid #E7DFD5;border-radius:6px}.none,.redirect{color:#6B6762;padding:12px 0}
</style></head><body><h1>Page audit · sheet ${b + 1} · ${esc(BASE)} · ${narrow}px + ${wide}px fold · ${new Date().toISOString().slice(0, 16).replace("T", " ")}</h1>${rows}</body></html>`;
  const htmlPath = path.join(OUT, `sheet-${b + 1}.html`);
  const pngPath = path.join(OUT, `sheet-${b + 1}.png`);
  writeFileSync(htmlPath, html);
  await sheetPage.goto(pathToFileURL(htmlPath).toString(), { waitUntil: "load" });
  await sheetPage.screenshot({ path: pngPath, fullPage: true });
  sheets.push(pngPath);
}

await browser.close();
await api.dispose();

const passed = results.filter((x) => x.pass).length;
const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  outDir: OUT,
  widths: WIDTHS,
  axe: flags.axe,
  full: flags.full,
  durationMs: Date.now() - t0,
  totals: { routes: results.length, passed, failed: results.length - passed },
  probe404,
  sheets,
  routes: results.map(({ dir: _dir, ...rest }) => rest),
};
writeJson(path.join(OUT, "report.json"), report);
console.log(`\n${passed}/${results.length} routes pass · ${WIDTHS.join(",")}px · axe ${flags.axe ? "on" : "off"} · ${(report.durationMs / 1000).toFixed(1)}s`);
console.log(`report: ${path.join(OUT, "report.json")}`);
for (const s of sheets) console.log(`sheet:  ${s}`);
if (flags.strict && passed < results.length) process.exit(1);
