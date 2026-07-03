/**
 * Per-page theming for business pages.
 *
 * Two levers give every business page a distinct look while keeping one
 * cohesive design system:
 *   1. A category ACCENT palette — each of the 14 categories has its own accent
 *      color, so an automotive page reads differently from a pet page.
 *   2. A deterministic LAYOUT VARIANT (a | b | c) derived from the slug, so two
 *      businesses in the same category still get different hero + section
 *      treatments. A business can override this with `layoutVariant` in its JSON.
 */

export type Accent = {
  /** Primary accent color. */
  accent: string;
  /** Darker shade for text/links on light backgrounds. */
  dark: string;
  /** Very light tint for section/hero backgrounds. */
  tint: string;
  /** Slightly stronger tint for borders/chips. */
  soft: string;
};

const ACCENTS: Record<string, Accent> = {
  'service-businesses': { accent: '#0d9488', dark: '#0f766e', tint: '#f0fdfa', soft: '#ccfbf1' },
  'online-businesses': { accent: '#6366f1', dark: '#4f46e5', tint: '#eef2ff', soft: '#e0e7ff' },
  'trades-and-skilled-work': { accent: '#ea580c', dark: '#c2410c', tint: '#fff7ed', soft: '#ffedd5' },
  'food-and-beverage': { accent: '#e11d48', dark: '#be123c', tint: '#fff1f2', soft: '#ffe4e6' },
  'retail-and-products': { accent: '#db2777', dark: '#be185d', tint: '#fdf2f8', soft: '#fce7f3' },
  'creative-and-content': { accent: '#7c3aed', dark: '#6d28d9', tint: '#f5f3ff', soft: '#ede9fe' },
  'health-and-wellness': { accent: '#059669', dark: '#047857', tint: '#ecfdf5', soft: '#d1fae5' },
  'real-estate-and-property': { accent: '#2563eb', dark: '#1d4ed8', tint: '#eff6ff', soft: '#dbeafe' },
  'technology-and-software': { accent: '#0891b2', dark: '#0e7490', tint: '#ecfeff', soft: '#cffafe' },
  'local-and-community': { accent: '#ca8a04', dark: '#a16207', tint: '#fefce8', soft: '#fef9c3' },
  automotive: { accent: '#475569', dark: '#334155', tint: '#f8fafc', soft: '#e2e8f0' },
  'education-and-coaching': { accent: '#0369a1', dark: '#075985', tint: '#f0f9ff', soft: '#e0f2fe' },
  'events-and-entertainment': { accent: '#c026d3', dark: '#a21caf', tint: '#fdf4ff', soft: '#fae8ff' },
  'pet-and-animal': { accent: '#65a30d', dark: '#4d7c0f', tint: '#f7fee7', soft: '#ecfccb' },
};

const DEFAULT_ACCENT: Accent = { accent: '#0f172a', dark: '#0f172a', tint: '#eef2ff', soft: '#e2e8f0' };

export function accentFor(categorySlug: string): Accent {
  return ACCENTS[categorySlug] ?? DEFAULT_ACCENT;
}

export type Variant = 'a' | 'b' | 'c';

/**
 * Deterministic layout variant from a slug (stable across builds), unless the
 * business explicitly sets one. Uses a small string hash so the distribution is
 * even and a business always gets the same variant.
 */
export function variantFor(slug: string, override?: Variant): Variant {
  if (override === 'a' || override === 'b' || override === 'c') return override;
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return (['a', 'b', 'c'] as const)[h % 3];
}

/** Inline CSS custom properties to scope the accent onto a page wrapper. */
export function accentVars(a: Accent): string {
  return `--accent:${a.accent};--accent-dark:${a.dark};--accent-tint:${a.tint};--accent-soft:${a.soft};`;
}
