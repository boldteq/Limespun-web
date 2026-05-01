import type { Variants } from "framer-motion";

export const BRAND = {
  bone:       '#F7F7F5',
  boneCream:  '#FAFAF8',
  boneDeep:   '#EFEEEA',
  paper:      '#FCFBF7',
  white:      '#FFFFFF',
  onyx:       '#0F0F0F',
  ink:        '#1C1A18',
  smoke:      '#232120',
  char:       '#2A2725',
  coal:       '#3A3633',
  stoneDark:  '#4B4842',
  stone:      '#787774',
  stoneLight: '#9A9792',
  stoneFaint: '#6B6863',
  border:     '#E7E5E1',
  borderSoft: '#EFEEEA',
  borderInk:  '#3A3633',
  rust:       '#C8351F',
  rustBright: '#E8553F',
  rustGlow:   '#F26B4D',
  rustSoft:   '#FCE4DF',
  rustWash:   '#FBEFEB',
  rustDeep:   '#7A1A0A',
  sage:       '#5C8A55',
  sageSoft:   '#DFEAD9',
  sageWash:   '#EEF5E9',
  amber:      '#D89538',
  amberSoft:  '#F8E4C2',
  amberWash:  '#FBEFD8',
  crimson:    '#C73838',
  crimsonSoft:'#FEEBEB',
  warn:       '#C28840',
  success:    '#6B8367',
  danger:     '#B53B3B',
  dangerSoft: '#FEF2F2',
  dangerBorder: '#FCA5A5',
} as const;

export const FONT = {
  serif: "'Instrument Serif', Georgia, serif",
  sans:  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono:  "'JetBrains Mono', 'IBM Plex Mono', Menlo, monospace",
} as const;

export const SHADOW = {
  soft: '0 4px 16px -4px rgba(178,58,43,0.08), 0 2px 6px -2px rgba(15,15,15,0.04)',
  card: '0 12px 32px -8px rgba(178,58,43,0.10), 0 4px 12px -4px rgba(15,15,15,0.06)',
  hero: '0 32px 80px -16px rgba(178,58,43,0.18), 0 12px 32px -8px rgba(15,15,15,0.08)',
  glow: '0 0 0 1px rgba(178,58,43,0.12), 0 16px 40px -8px rgba(178,58,43,0.20)',
} as const;

export const GRADIENT = {
  heroBloom:   `radial-gradient(ellipse 80% 60% at 70% 20%, ${BRAND.rustWash} 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, ${BRAND.amberWash} 0%, transparent 55%)`,
  sectionWarm: `linear-gradient(180deg, ${BRAND.bone} 0%, ${BRAND.rustWash} 50%, ${BRAND.bone} 100%)`,
  sectionCool: `linear-gradient(180deg, ${BRAND.boneCream} 0%, ${BRAND.sageWash} 50%, ${BRAND.boneCream} 100%)`,
  cardRust:    `linear-gradient(135deg, ${BRAND.rustWash} 0%, ${BRAND.bone} 100%)`,
  cardSage:    `linear-gradient(135deg, ${BRAND.sageWash} 0%, ${BRAND.bone} 100%)`,
  cardAmber:   `linear-gradient(135deg, ${BRAND.amberWash} 0%, ${BRAND.bone} 100%)`,
  cornerRust:  `radial-gradient(circle at 0% 0%, ${BRAND.rustSoft} 0%, transparent 60%)`,
} as const;

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export type AccentKey = 'rust' | 'amber' | 'sage';

export const ACCENT_MAP: Record<AccentKey, { color: string; bg: string; glow: string }> = {
  rust:  { color: BRAND.rust,  bg: BRAND.rustWash,  glow: GRADIENT.cardRust },
  amber: { color: BRAND.amber, bg: BRAND.amberWash, glow: GRADIENT.cardAmber },
  sage:  { color: BRAND.sage,  bg: BRAND.sageWash,  glow: GRADIENT.cardSage },
};
