"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { BRAND, FONT, fadeUp, stagger } from "@/lib/brand";

type SizeFilter = "all" | "solo" | "small" | "multi-chair" | "chain";

interface Story {
  slug: string;
  name: string;
  role: string;
  city: string;
  chairs: string;
  quote: string;
  stats: Array<{ l: string; v: string }>;
  gradient: string;
  initials: string;
  size: Exclude<SizeFilter, "all">;
}

const stories: Story[] = [
  {
    slug: "miles-verena",
    name: "Miles Verena",
    role: "Owner · Sable & Sparrow",
    city: "Brooklyn, NY",
    chairs: "4 chairs · 6 artists",
    quote:
      "We used to lose forty minutes every morning to app-switching. Now I open Today and the schedule's loaded before my coffee.",
    stats: [
      { l: "Time recovered", v: "12 hr / wk" },
      { l: "Booking lift", v: "+22%" },
      { l: "Migration", v: "9 days" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustGlow} 50%, ${BRAND.amber} 100%)`,
    initials: "MV",
    size: "multi-chair",
  },
  {
    slug: "kaia-osei",
    name: "Kaia Osei",
    role: "Solo · Nine Lives Tattoo",
    city: "East London, UK",
    chairs: "1 chair · resident-only",
    quote:
      "My whole week starts with a six-minute triage now. Inbox sorts the urgent stuff before I've even opened the shop.",
    stats: [
      { l: "Triage time", v: "6 min" },
      { l: "Disputes won", v: "4 of 4" },
      { l: "Migration", v: "1 day" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rustGlow} 50%, ${BRAND.rust} 100%)`,
    initials: "KO",
    size: "solo",
  },
  {
    slug: "rafael-moreno",
    name: "Rafael Moreno",
    role: "Owner · Calle Negra",
    city: "Mexico City, MX",
    chairs: "9 artists · 2 floors",
    quote:
      "Limespun shows me a body — what's been worked, what's healing, what's left. Booking a back piece across ten weeks takes twelve minutes now.",
    stats: [
      { l: "Active sleeves", v: "14" },
      { l: "Guest residencies", v: "6 in 2025" },
      { l: "Disputes", v: "$0" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 50%, ${BRAND.rustGlow} 100%)`,
    initials: "RM",
    size: "chain",
  },
  {
    slug: "asha-mehra",
    name: "Asha Mehra",
    role: "Solo · Pluma Studio",
    city: "Amsterdam, NL",
    chairs: "1 chair · by appointment",
    quote:
      "REACH compliance was the unlock. Every bottle on a registry, every reaction logged. I sleep better.",
    stats: [
      { l: "Inks tracked", v: "84" },
      { l: "Compliance reports", v: "Auto" },
      { l: "Migration", v: "2 days" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.rustGlow} 100%)`,
    initials: "AM",
    size: "solo",
  },
  {
    slug: "tomas-bel",
    name: "Tomas Bel",
    role: "Owner · Salt House Tattoo",
    city: "Reykjavik, IS",
    chairs: "3 chairs · rotating guests",
    quote:
      "Guest residencies used to mean three spreadsheets. Now I drop them on the calendar and the booking page just works.",
    stats: [
      { l: "Residencies / yr", v: "11" },
      { l: "Setup time", v: "12 min" },
      { l: "Guest no-shows", v: "0" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.rust} 100%)`,
    initials: "TB",
    size: "small",
  },
  {
    slug: "lin-chen",
    name: "Lin Chen",
    role: "Owner · Aoiro Atelier",
    city: "Tokyo, JP",
    chairs: "2 chairs · resident",
    quote:
      "The AI brief generator changed how I prep. Reference, palette, line study — all in one tab.",
    stats: [
      { l: "Briefs / wk", v: "18" },
      { l: "Prep time saved", v: "9 hr / wk" },
      { l: "Migration", v: "3 days" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.amber} 100%)`,
    initials: "LC",
    size: "small",
  },
  {
    slug: "marcus-lane",
    name: "Marcus Lane",
    role: "Owner · Iron + Ash",
    city: "Austin, TX",
    chairs: "8 artists · 2 floors",
    quote:
      "Commission splits used to be Friday afternoon. Now they hit Stripe Connect on the invoice. We got our weekends back.",
    stats: [
      { l: "Artists paid", v: "8 / week" },
      { l: "Reconciliation time", v: "0 min" },
      { l: "Disputes", v: "0 in 2025" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.rust} 0%, ${BRAND.rustDeep} 50%, ${BRAND.amber} 100%)`,
    initials: "ML",
    size: "multi-chair",
  },
  {
    slug: "elena-ruiz",
    name: "Elena Ruiz",
    role: "Director · Cinco Manos Group",
    city: "Madrid, ES",
    chairs: "3 locations · 22 artists",
    quote:
      "Per-location P&L was the moment we knew. We can finally see which shop is healthy and which one needs help, in one dashboard.",
    stats: [
      { l: "Locations", v: "3" },
      { l: "Artists", v: "22" },
      { l: "Payroll runs", v: "Monthly · auto" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.amber} 0%, ${BRAND.sage} 100%)`,
    initials: "ER",
    size: "chain",
  },
  {
    slug: "jonah-park",
    name: "Jonah Park",
    role: "Solo · Quiet Hand Studio",
    city: "Seoul, KR",
    chairs: "1 chair · single artist",
    quote:
      "I don't run a business, I make tattoos. Limespun understood that. Every screen does its job and stays out of the way.",
    stats: [
      { l: "Sessions / wk", v: "12" },
      { l: "Admin time", v: "<3 hr / wk" },
      { l: "Migration", v: "Same day" },
    ],
    gradient: `linear-gradient(135deg, ${BRAND.sage} 0%, ${BRAND.amber} 50%, ${BRAND.rust} 100%)`,
    initials: "JP",
    size: "solo",
  },
];

const filters: Array<{ key: SizeFilter; label: string }> = [
  { key: "all", label: "All studios" },
  { key: "solo", label: "Solo" },
  { key: "small", label: "Small (2–5)" },
  { key: "multi-chair", label: "Multi-chair (6+)" },
  { key: "chain", label: "Chain" },
];

export function StoryGrid() {
  const [filter, setFilter] = useState<SizeFilter>("all");
  const visible =
    filter === "all" ? stories : stories.filter((s) => s.size === filter);

  return (
    <>
      {/* Filter chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 40,
        } as React.CSSProperties}
      >
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              style={{
                padding: "8px 18px",
                borderRadius: 100,
                background: active ? BRAND.onyx : BRAND.white,
                color: active ? BRAND.bone : BRAND.stoneDark,
                border: `1px solid ${active ? BRAND.onyx : BRAND.border}`,
                fontFamily: FONT.sans,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: active
                  ? "none"
                  : "0 1px 2px rgba(15,15,15,0.04)",
              } as React.CSSProperties}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={stagger}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          } as React.CSSProperties}
          className="v4-stories-grid"
        >
          {visible.map((story, i) => (
            <motion.div key={story.name} variants={fadeUp}>
              <Link
                href={`/customers/${story.slug}`}
                style={{ textDecoration: "none" } as React.CSSProperties}
              >
                <TestimonialCard {...story} index={i} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
