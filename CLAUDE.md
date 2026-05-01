# InkOS Marketing Site

## Project
Marketing site for InkOS — the studio OS for tattoo. Built on Stack A (Next.js 16.2.3 + TypeScript strict).

## Stack
- Next.js 16.2.3, React 19.2.4, TypeScript strict
- Tailwind CSS v4 (@tailwindcss/postcss, no tailwind.config.ts)
- Framer Motion for all animations
- Lucide React for icons
- Path alias: @/* → ./src/*

## Brand
- Brand constants: `src/lib/brand.ts`
- Tokens in CSS: `src/app/globals.css` (@theme inline)
- Fonts: Instrument Serif (serif headlines) + Inter (sans body) via next/font/google

## Rules
- No `any` types. No `@ts-ignore`.
- All motion components must have "use client"
- Import brand constants from @/lib/brand, never hardcode hex values
