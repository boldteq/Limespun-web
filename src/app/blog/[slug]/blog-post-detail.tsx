"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/shared/cta-section";
import { SectionEyebrow } from "@/components/shared/section-eyebrow";
import { BRAND, FONT, SHADOW } from "@/lib/brand";
import { categoryLabels, type BlogContentBlock, type BlogPost } from "@/lib/data/blog-posts";

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p
          style={{
            fontFamily: FONT.sans,
            fontSize: 17,
            lineHeight: 1.75,
            color: BRAND.stoneDark,
            marginBottom: 20,
          } as React.CSSProperties}
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          style={{
            fontFamily: FONT.sans,
            fontSize: 26,
            fontWeight: 700,
            color: BRAND.onyx,
            letterSpacing: "-0.02em",
            marginTop: 40,
            marginBottom: 16,
          } as React.CSSProperties}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            fontFamily: FONT.sans,
            fontSize: 19,
            fontWeight: 700,
            color: BRAND.onyx,
            letterSpacing: "-0.015em",
            marginTop: 32,
            marginBottom: 12,
          } as React.CSSProperties}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul style={{ paddingLeft: 22, marginBottom: 24 } as React.CSSProperties}>
          {block.items.map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: FONT.sans,
                fontSize: 16,
                lineHeight: 1.7,
                color: BRAND.stoneDark,
                marginBottom: 8,
              } as React.CSSProperties}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          style={{
            borderLeft: `3px solid ${BRAND.rust}`,
            paddingLeft: 24,
            marginTop: 32,
            marginBottom: 32,
          } as React.CSSProperties}
        >
          <p
            style={{
              fontFamily: FONT.serif,
              fontSize: 24,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: BRAND.onyx,
              marginBottom: block.attribution ? 12 : 0,
            } as React.CSSProperties}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite
              style={{
                fontFamily: FONT.sans,
                fontSize: 13,
                color: BRAND.stoneLight,
                fontStyle: "normal",
              } as React.CSSProperties}
            >
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );
    case "callout": {
      const bg =
        block.tone === "rust"
          ? BRAND.rustWash
          : block.tone === "amber"
          ? BRAND.amberWash
          : BRAND.sageWash;
      const border =
        block.tone === "rust"
          ? BRAND.rust
          : block.tone === "amber"
          ? BRAND.amber
          : BRAND.sage;
      return (
        <div
          style={{
            padding: 22,
            borderRadius: 14,
            background: bg,
            border: `1px solid ${border}30`,
            marginTop: 24,
            marginBottom: 24,
            fontFamily: FONT.sans,
            fontSize: 15,
            fontWeight: 500,
            lineHeight: 1.6,
            color: BRAND.onyx,
          } as React.CSSProperties}
        >
          {block.text}
        </div>
      );
    }
    case "code":
      return (
        <pre
          style={{
            padding: 20,
            borderRadius: 12,
            background: BRAND.onyx,
            color: BRAND.bone,
            fontFamily: FONT.mono,
            fontSize: 13,
            lineHeight: 1.6,
            overflow: "auto",
            marginTop: 16,
            marginBottom: 24,
          } as React.CSSProperties}
        >
          <code>{block.text}</code>
        </pre>
      );
  }
}

export function BlogPostDetail({ post, related }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
        {/* Cover band */}
        <section style={{ paddingTop: 100, paddingBottom: 60 } as React.CSSProperties}>
          <div
            style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}
          >
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: FONT.sans,
                fontSize: 13,
                color: BRAND.stoneDark,
                textDecoration: "none",
                marginBottom: 24,
              } as React.CSSProperties}
            >
              <ArrowLeft size={14} /> All posts
            </Link>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              } as React.CSSProperties}
            >
              <span
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: BRAND.rust,
                  padding: "4px 10px",
                  background: BRAND.rustSoft,
                  borderRadius: 100,
                } as React.CSSProperties}
              >
                {categoryLabels[post.category]}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color: BRAND.stoneLight,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                } as React.CSSProperties}
              >
                <Clock size={11} /> {post.readTime}
              </span>
              <span
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 12,
                  color: BRAND.stoneLight,
                } as React.CSSProperties}
              >
                {date}
              </span>
            </div>

            <h1
              style={{
                fontFamily: FONT.serif,
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: BRAND.onyx,
                fontWeight: 400,
                marginBottom: 16,
              } as React.CSSProperties}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontFamily: FONT.sans,
                fontSize: 18,
                lineHeight: 1.6,
                color: BRAND.stoneDark,
                marginBottom: 32,
              } as React.CSSProperties}
            >
              {post.excerpt}
            </p>

            {/* Author */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 40,
              } as React.CSSProperties}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 100,
                  background: post.gradient,
                  flexShrink: 0,
                } as React.CSSProperties}
              />
              <div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 14,
                    fontWeight: 700,
                    color: BRAND.onyx,
                  } as React.CSSProperties}
                >
                  {post.author.name}
                </div>
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 12,
                    color: BRAND.stoneLight,
                  } as React.CSSProperties}
                >
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Hero image band */}
            <div
              style={{
                height: 280,
                borderRadius: 16,
                background: post.gradient,
                marginBottom: 48,
              } as React.CSSProperties}
            />

            {/* Body */}
            <article>
              {post.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </article>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section
            style={{
              background: BRAND.boneCream,
              paddingTop: 80,
              paddingBottom: 80,
              borderTop: `1px solid ${BRAND.border}`,
            } as React.CSSProperties}
          >
            <div
              style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" } as React.CSSProperties}
            >
              <SectionEyebrow label="More from " accent="amber" />
              <h2
                style={{
                  fontFamily: FONT.serif,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  color: BRAND.onyx,
                  marginBottom: 32,
                  letterSpacing: "-0.02em",
                } as React.CSSProperties}
              >
                {categoryLabels[post.category]}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${related.length}, 1fr)`,
                  gap: 20,
                } as React.CSSProperties}
              >
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    style={{ textDecoration: "none", color: "inherit" } as React.CSSProperties}
                  >
                    <article
                      style={{
                        background: BRAND.white,
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: SHADOW.soft,
                        border: `1px solid ${BRAND.borderSoft}`,
                        height: "100%",
                      } as React.CSSProperties}
                    >
                      <div
                        style={{ height: 140, background: r.gradient } as React.CSSProperties}
                      />
                      <div style={{ padding: 22 } as React.CSSProperties}>
                        <h3
                          style={{
                            fontFamily: FONT.serif,
                            fontSize: 20,
                            color: BRAND.onyx,
                            marginBottom: 10,
                            letterSpacing: "-0.015em",
                            lineHeight: 1.25,
                          } as React.CSSProperties}
                        >
                          {r.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: FONT.sans,
                            fontSize: 13,
                            color: BRAND.stoneDark,
                            lineHeight: 1.55,
                            marginBottom: 12,
                          } as React.CSSProperties}
                        >
                          {r.excerpt}
                        </p>
                        <div
                          style={{
                            fontFamily: FONT.sans,
                            fontSize: 12,
                            color: BRAND.stoneLight,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          } as React.CSSProperties}
                        >
                          <span>{r.author.name}</span>
                          <span>·</span>
                          <span>{r.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          badge="Get the next one"
          headline="Subscribe for the studio playbook."
          italicWord="playbook"
          subhead="One email per month. Studio operations, compliance updates, the maths nobody else writes."
          primaryCTA={{ label: "Get started", href: "https://app.limespun.com/signup" }}
          secondaryCTA={{ label: "Talk to us", href: "/book-a-demo", icon: "play" }}
        />
      </main>
      <Footer />
    </div>
  );
}
