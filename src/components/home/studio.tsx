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
} from "lucide-react";
import { BRAND, FONT, SHADOW, fadeUp, stagger } from "@/lib/brand";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";

interface Module {
  name: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  href: string;
  tag?: string;
}

const accentCycle = [BRAND.rust, BRAND.amber, BRAND.sage] as const;
const iconBgCycle = [BRAND.rustSoft, BRAND.amberSoft, BRAND.sageSoft] as const;

const modules: Module[] = [
  { name: "Today", desc: "Morning launchpad", icon: Sparkles, href: "/product/today" },
  { name: "Inbox", desc: "Action items in one feed", icon: Inbox, href: "/product/inbox" },
  { name: "Calendar", desc: "Multi-chair scheduling", icon: Calendar, href: "/product/calendar" },
  { name: "Messages", desc: "Unified client chat", icon: MessageSquare, href: "/product/messages" },
  { name: "Appointments", desc: "Booking & deposits", icon: Clock, href: "/product/appointments" },
  { name: "Clients", desc: "CRM with allergy alerts", icon: Users, href: "/product/clients" },
  { name: "Projects", desc: "Multi-session sleeves", icon: LayoutGrid, href: "/product/projects", tag: "NEW" },
  { name: "Flash & Portfolio", desc: "Design library", icon: ImageIcon, href: "/product/portfolio" },
  { name: "Forms", desc: "Consent & waivers", icon: FileText, href: "/product/forms" },
  { name: "Team", desc: "Artists, guests, payroll", icon: Heart, href: "/product/team" },
  { name: "Payments", desc: "Commission auto-splits", icon: CreditCard, href: "/product/payments" },
  { name: "Inventory", desc: "Ink, needles, REACH", icon: Package, href: "/product/inventory" },
  { name: "Analytics", desc: "Revenue, retention, mix", icon: BarChart3, href: "/product/analytics" },
  { name: "Marketing", desc: "Campaigns & loyalty", icon: Megaphone, href: "/product/marketing" },
  { name: "AI Studio", desc: "Design assist & briefs", icon: Sparkles, href: "/product/ai-design", tag: "NEW" },
];

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
      {/* Top accent strip */}
      <div
        aria-hidden="true"
        style={{ height: 3, background: accent, flexShrink: 0 } as React.CSSProperties}
      />

      <div style={{ padding: "16px 16px 18px", flex: 1 } as React.CSSProperties}>
        {/* Icon + NEW tag row */}
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

        {/* Name */}
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

        {/* Description */}
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

export function Studio() {
  return (
    <section
      style={{
        position: "relative",
        background: BRAND.bone,
        paddingTop: 100,
        paddingBottom: 100,
        overflow: "hidden",
      } as React.CSSProperties}
    >
      {/* Sage corner glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 480,
          height: 480,
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
        {/* Section header */}
        <div style={{ marginBottom: 52 } as React.CSSProperties}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionEyebrow label="The studio" accent="sage" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              fontFamily: FONT.sans,
              fontSize: "clamp(30px, 4vw, 50px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: BRAND.onyx,
              fontWeight: 600,
              marginBottom: 16,
              maxWidth: 640,
            } as React.CSSProperties}
          >
            Fifteen rooms, one floor.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{
              fontFamily: FONT.sans,
              fontSize: 17,
              lineHeight: 1.6,
              color: BRAND.stoneDark,
              maxWidth: 560,
            } as React.CSSProperties}
          >
            Each one connected. The kiosk knows what the calendar knows. The allergy flag in Clients surfaces in Today. Payments understand the project deposit pool. Every room is the same building.
          </motion.p>
        </div>

        {/* Module grid: 5 cols desktop, 3 tablet, 2 mobile */}
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
  );
}
