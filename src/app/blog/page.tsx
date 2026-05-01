"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/shared/hero-section";
import { CTASection } from "@/components/shared/cta-section";
import { BRAND, FONT, SHADOW, fadeUp, stagger } from "@/lib/brand";
import {
  blogPosts,
  categoryLabels,
  type BlogPost,
} from "@/lib/data/blog-posts";

// ─── Noise texture data-URI for cover bands ───────────────────────────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`;

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterKey = BlogPost["category"] | "all";

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ops", label: categoryLabels.ops },
  { key: "compliance", label: categoryLabels.compliance },
  { key: "craft", label: categoryLabels.craft },
  { key: "product", label: categoryLabels.product },
];

const TYPE_COLORS: Record<BlogPost["category"], string> = {
  ops: BRAND.rust,
  compliance: BRAND.sage,
  craft: BRAND.amber,
  product: BRAND.amber,
};

// ─── Post card ────────────────────────────────────────────────────────────────
function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
    <motion.div
      variants={fadeUp}
      custom={index}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: SHADOW.card }}
      style={{
        background: BRAND.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: SHADOW.soft,
        border: `1px solid ${BRAND.borderSoft}`,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        height: "100%",
      } as React.CSSProperties}
    >
      {/* Cover band */}
      <div
        style={{
          height: 200,
          background: post.gradient,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        } as React.CSSProperties}
      >
        {/* Noise overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: NOISE_SVG,
            backgroundSize: "256px 256px",
            opacity: 0.4,
            mixBlendMode: "overlay",
          } as React.CSSProperties}
        />

        {/* Category badge — top left */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "rgba(247,247,245,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 600,
            color: BRAND.bone,
            padding: "4px 10px",
            borderRadius: 100,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          } as React.CSSProperties}
        >
          {categoryLabels[post.category]}
        </div>

        {/* Read time — top right */}
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(247,247,245,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            fontFamily: FONT.mono,
            fontSize: 10,
            fontWeight: 600,
            color: BRAND.bone,
            padding: "4px 10px",
            borderRadius: 100,
            letterSpacing: "0.04em",
          } as React.CSSProperties}
        >
          {post.readTime}
        </div>

      </div>

      {/* Body */}
      <div
        style={{
          padding: "22px 24px 24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        } as React.CSSProperties}
      >
        <h2
          style={{
            fontFamily: FONT.serif,
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "-0.015em",
            color: BRAND.onyx,
            lineHeight: 1.25,
            marginBottom: 10,
          } as React.CSSProperties}
        >
          {post.title}
        </h2>

        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: BRAND.stoneDark,
            marginBottom: 16,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {post.excerpt}
        </p>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 14,
            borderTop: `1px solid ${BRAND.borderSoft}`,
          } as React.CSSProperties}
        >
          <div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                fontWeight: 600,
                color: BRAND.onyx,
                lineHeight: 1.3,
              } as React.CSSProperties}
            >
              {post.author.name}
            </div>
            <div
              style={{
                fontFamily: FONT.sans,
                fontSize: 11,
                color: BRAND.stoneLight,
                lineHeight: 1.4,
              } as React.CSSProperties}
            >
              {post.author.role}
            </div>
          </div>

          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 11,
              color: BRAND.stoneFaint,
            } as React.CSSProperties}
          >
            {formattedDate}
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────
function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: FONT.sans,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? BRAND.white : BRAND.stoneDark,
        background: active ? BRAND.onyx : BRAND.white,
        border: `1px solid ${active ? BRAND.onyx : BRAND.border}`,
        borderRadius: 100,
        padding: "8px 18px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        letterSpacing: active ? "-0.005em" : "0",
      } as React.CSSProperties}
    >
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeFilter);

  return (
    <div>
      <Nav />
      <main>
        <HeroSection
          variant="centered"
          eyebrow="The blog"
          eyebrowAccent="rust"
          headline="Practical writing for studio owners."
          italicWord="Practical"
          subhead="The 90-second morning triage. Deposit pool math. EU REACH compliance. Written by studio owners and the InkOS team — for the people who actually do the work."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://inkos.up.railway.app/signup",
          }}
          secondaryCTA={{ label: "Talk to us", href: "/book-a-demo" }}
        />

        {/* Posts section */}
        <section
          style={{
            background: BRAND.bone,
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
            {/* Filter chips */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 48,
              } as React.CSSProperties}
            >
              {FILTER_OPTIONS.map((opt) => (
                <FilterChip
                  key={opt.key}
                  label={opt.label}
                  active={activeFilter === opt.key}
                  onClick={() => setActiveFilter(opt.key)}
                />
              ))}
            </div>

            {/* Grid */}
            <motion.div
              className="blog-grid"
              variants={stagger}
              initial="hidden"
              animate="visible"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              } as React.CSSProperties}
            >
              {filtered.map((post, i) => (
                <BlogPostCard key={post.slug} post={post} index={i} />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  paddingTop: 80,
                  paddingBottom: 80,
                } as React.CSSProperties}
              >
                <p
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 16,
                    color: BRAND.stoneLight,
                  } as React.CSSProperties}
                >
                  No posts in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>

        <CTASection
          badge="Get the next one"
          headline="Subscribe for the studio playbook."
          italicWord="playbook"
          subhead="One email per month. Studio operations, compliance updates, the maths nobody else writes. No spam, no upsells."
          primaryCTA={{
            label: "Start a 14-day trial",
            href: "https://inkos.up.railway.app/signup",
          }}
          secondaryCTA={{
            label: "Talk to us",
            href: "/book-a-demo",
            icon: "play",
          }}
        />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
