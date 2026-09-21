"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Inbox,
  Calendar,
  MessageSquare,
  Clock,
  Users,
  LayoutGrid,
  ImageIcon,
  FileText,
  Heart,
  CreditCard,
  Package,
  BarChart3,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, SHADOW, GRADIENT, fadeUp, stagger } from "@/lib/brand";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Module {
  name: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  href: string;
  tag?: string;
}

// ── Module data ───────────────────────────────────────────────────────────────

const accentCycle = [BRAND.rust, BRAND.amber, BRAND.sage] as const;
const iconBgCycle = [BRAND.rustSoft, BRAND.amberSoft, BRAND.sageSoft] as const;

const modules: Module[] = [
  { name: "Today",            desc: "Morning launchpad",       icon: Sparkles,      href: "/product/today" },
  { name: "Inbox",            desc: "Action items in one feed", icon: Inbox,         href: "/product/inbox" },
  { name: "Calendar",         desc: "Multi-chair scheduling",   icon: Calendar,      href: "/product/calendar" },
  { name: "Messages",         desc: "Unified client chat",      icon: MessageSquare, href: "/product/messages" },
  { name: "Appointments",     desc: "Booking & deposits",       icon: Clock,         href: "/product/appointments" },
  { name: "Clients",          desc: "CRM with allergy alerts",  icon: Users,         href: "/product/clients" },
  { name: "Projects",         desc: "Multi-session sleeves",    icon: LayoutGrid,    href: "/product/projects", tag: "NEW" },
  { name: "Flash & Portfolio",desc: "Design library",           icon: ImageIcon,     href: "/product/portfolio" },
  { name: "Forms",            desc: "Consent & waivers",        icon: FileText,      href: "/product/forms" },
  { name: "Team",             desc: "Artists, guests, payroll", icon: Heart,         href: "/product/team" },
  { name: "Payments",         desc: "Commission auto-splits",   icon: CreditCard,    href: "/product/payments" },
  { name: "Inventory",        desc: "Ink, needles, REACH",      icon: Package,       href: "/product/inventory" },
  { name: "Analytics",        desc: "Revenue, retention, mix",  icon: BarChart3,     href: "/product/analytics" },
  { name: "Marketing",        desc: "Campaigns & loyalty",      icon: Megaphone,     href: "/product/marketing" },
  { name: "AI Studio",        desc: "Design assist & briefs",   icon: Sparkles,      href: "/product/ai-design", tag: "NEW" },
];

// ── ModuleCard ─────────────────────────────────────────────────────────────────

function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const accent = accentCycle[index % 3];
  const iconBg = iconBgCycle[index % 3];
  const IconComponent = mod.icon;

  return (
    <motion.a
      variants={fadeUp}
      href={mod.href}
      whileHover={{ y: -3, boxShadow: SHADOW.card }}
      style={{
        display: "flex",
        flexDirection: "column",
        background: BRAND.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: SHADOW.soft,
        border: `1px solid ${BRAND.borderSoft}`,
        textDecoration: "none",
        transition: "box-shadow 0.20s ease, transform 0.20s ease",
        cursor: "pointer",
      } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        style={{ height: 3, background: accent, flexShrink: 0 } as React.CSSProperties}
      />
      <div style={{ padding: "16px 16px 18px", flex: 1 } as React.CSSProperties}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          } as React.CSSProperties}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            } as React.CSSProperties}
          >
            <IconComponent size={20} color={accent} strokeWidth={1.8} />
          </div>
          {mod.tag && (
            <div
              style={{
                padding: "2px 8px",
                borderRadius: 100,
                background: BRAND.rustSoft,
                fontFamily: FONT.mono,
                fontSize: 10,
                fontWeight: 700,
                color: BRAND.rust,
                letterSpacing: "0.04em",
              } as React.CSSProperties}
            >
              {mod.tag}
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            fontWeight: 700,
            color: BRAND.onyx,
            letterSpacing: "-0.01em",
            marginBottom: 4,
          } as React.CSSProperties}
        >
          {mod.name}
        </div>
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 12,
            color: BRAND.stoneLight,
            lineHeight: 1.4,
          } as React.CSSProperties}
        >
          {mod.desc}
        </div>
      </div>
    </motion.a>
  );
}

// ── CategoryCard ──────────────────────────────────────────────────────────────

interface CategoryCardProps {
  accent: "rust" | "amber" | "sage";
  title: string;
  modules: string;
  body: string;
  link: { label: string; href: string };
}

const categoryAccentMap = {
  rust:  { color: BRAND.rust,  wash: BRAND.rustWash,  soft: BRAND.rustSoft  },
  amber: { color: BRAND.amber, wash: BRAND.amberWash, soft: BRAND.amberSoft },
  sage:  { color: BRAND.sage,  wash: BRAND.sageWash,  soft: BRAND.sageSoft  },
} as const;

function CategoryCard({ accent, title, modules: mods, body, link }: CategoryCardProps) {
  const a = categoryAccentMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: BRAND.white,
        borderRadius: 18,
        padding: 28,
        boxShadow: SHADOW.soft,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* 3px top strip */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: a.color,
        } as React.CSSProperties}
      />
      {/* Corner glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0,
          width: 140, height: 140,
          background: `radial-gradient(circle at 100% 0%, ${a.wash} 0%, transparent 70%)`,
          pointerEvents: "none",
        } as React.CSSProperties}
      />
      <div style={{ position: "relative" } as React.CSSProperties}>
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            fontWeight: 700,
            color: BRAND.onyx,
            letterSpacing: "-0.015em",
            marginBottom: 6,
            lineHeight: 1.2,
          } as React.CSSProperties}
        >
          {title}
        </h3>
        <div
          style={{
            display: "inline-flex",
            padding: "3px 10px",
            borderRadius: 100,
            background: a.soft,
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 600,
            color: a.color,
            letterSpacing: "0.04em",
            marginBottom: 14,
          } as React.CSSProperties}
        >
          {mods}
        </div>
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            lineHeight: 1.65,
            color: BRAND.stoneDark,
            margin: 0,
          } as React.CSSProperties}
        >
          {body}
        </p>
      </div>
      <a
        href={link.href}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: FONT.sans,
          fontSize: 13,
          fontWeight: 600,
          color: a.color,
          textDecoration: "none",
          marginTop: "auto",
        } as React.CSSProperties}
      >
        {link.label}
        <ArrowRight size={13} strokeWidth={2.2} />
      </a>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.bone,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      <Nav />
      <main>
        {/* 1. Hero */}
        <HeroSection
          variant="centered"
          eyebrow="The product"
          eyebrowAccent="rust"
          headline="Fifteen rooms, one floor."
          italicWord="rooms"
          subhead="Every operation in your studio — bookings, deposits, projects, payments, inventory — designed as one connected system. No exports. No syncing. The shop, held in one place."
          primaryCTA={{ label: "Start a 14-day trial", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Book a walkthrough", href: "/book-a-demo", icon: "play" }}
        />

        {/* 2. Module categories */}
        <section
          style={{
            background: GRADIENT.sectionWarm,
            paddingTop: 100,
            paddingBottom: 100,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 32px",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 48, maxWidth: 700 } as React.CSSProperties}
            >
              <SectionEyebrow label="What's inside" accent="amber" />
              <h2
                style={{
                  fontFamily: FONT.sans,
                  fontSize: "clamp(30px, 4vw, 46px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  marginBottom: 14,
                } as React.CSSProperties}
              >
                Three bands. Fifteen modules.
              </h2>
              <p
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: BRAND.stoneDark,
                  margin: 0,
                } as React.CSSProperties}
              >
                Run the day. Hold the work. Grow the studio.
              </p>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              } as React.CSSProperties}
              className="v4-category-grid"
            >
              <CategoryCard
                accent="rust"
                title="Run the day"
                modules="Today · Inbox · Calendar · Messages · Appointments"
                body="Open the app, see the day. The 90-second triage. Multi-chair scheduling. Unified client chat. Bookings with deposit logic baked in."
                link={{ label: "See Calendar", href: "/product/calendar" }}
              />
              <CategoryCard
                accent="amber"
                title="Hold the work"
                modules="Clients · Projects · Forms · Flash & Portfolio · Team"
                body="Multi-session sleeves as projects. Allergy intelligence. Kiosk consent. Photo timelines. Guest residencies. The studio as a body of work."
                link={{ label: "See Projects", href: "/product/projects" }}
              />
              <CategoryCard
                accent="sage"
                title="Grow the studio"
                modules="Payments · Inventory · Analytics · Marketing · AI Studio"
                body="Commission auto-splits. EU REACH inventory. Per-location P&L. Loyalty mechanics. AI design briefs. Every signal you need to scale."
                link={{ label: "See Payments", href: "/product/payments" }}
              />
            </div>
          </div>
        </section>

        {/* 3. All 15 modules grid */}
        <section
          style={{
            position: "relative",
            background: BRAND.bone,
            paddingTop: 100,
            paddingBottom: 100,
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0, right: 0,
              width: 480, height: 480,
              background: `radial-gradient(circle at 100% 0%, ${BRAND.sageWash} 0%, transparent 60%)`,
              pointerEvents: "none",
            } as React.CSSProperties}
          />
          <div
            style={{
              position: "relative",
              maxWidth: 1120,
              margin: "0 auto",
              padding: "0 24px",
            } as React.CSSProperties}
          >
            <div style={{ marginBottom: 48 } as React.CSSProperties}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <SectionEyebrow label="Every module" accent="rust" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                style={{
                  fontFamily: FONT.sans,
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: BRAND.onyx,
                  marginBottom: 0,
                  maxWidth: 540,
                } as React.CSSProperties}
              >
                Click into any room.
              </motion.h2>
            </div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 16,
              } as React.CSSProperties}
              className="v4-modules-grid"
            >
              {modules.map((mod, i) => (
                <ModuleCard key={mod.name} mod={mod} index={i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. Pull quote */}
        <section
          style={{
            background: BRAND.white,
            paddingTop: 80,
            paddingBottom: 80,
          } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "0 32px",
              textAlign: "center",
            } as React.CSSProperties}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: BRAND.bone,
                borderRadius: 20,
                padding: "40px 48px",
                boxShadow: SHADOW.soft,
                position: "relative",
                overflow: "hidden",
              } as React.CSSProperties}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
                } as React.CSSProperties}
              />
              <blockquote
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  lineHeight: 1.35,
                  color: BRAND.onyx,
                  fontWeight: 400,
                  fontStyle: "italic",
                  margin: "0 0 20px",
                  letterSpacing: "-0.01em",
                } as React.CSSProperties}
              >
                &ldquo;Limespun is the first software that understood the shop is a body of work, not a calendar full of strangers.&rdquo;
              </blockquote>
              <cite
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  color: BRAND.stoneDark,
                  fontStyle: "normal",
                  display: "block",
                } as React.CSSProperties}
              >
                Miles Verena &mdash; Sable & Sparrow
              </cite>
            </motion.div>
          </div>
        </section>

        {/* 5. Closing CTA */}
        <CTASection
          badge="Open every room"
          headline="See the whole studio."
          italicWord="whole"
          subhead="14-day trial. No card. White-glove migration above Solo. Free walkthrough if you'd rather see it live."
          primaryCTA={{ label: "Start a 14-day trial", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Book a walkthrough", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
