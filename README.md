# ProfitPath

**Every business explained honestly — startup cost, real earnings, time to profit, and exactly how to start today.**

ProfitPath ([HonestlyProfitable.com](https://honestlyprofitable.com)) is a serious, research-driven
business reference. It is **one website with many pages** — a structured library plus an interactive
Business Finder that helps anyone find, evaluate, and start a profitable business that fits their real
budget, time, skills, and situation. No hype, no courses to sell, no affiliate pressure.

Built with [Astro](https://astro.build) as a fast, SEO-friendly static site designed to scale to 500
evergreen business pages by adding data files — not by hand-coding pages.

## Quick start

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # build static site to ./dist
npm run preview  # preview the production build
npm run check    # type-check (astro check)
```

## How it is structured

```
src/
  config.ts                 # site brand, nav, AdSense + Analytics config, disclaimer
  content.config.ts         # the business data SCHEMA (Zod) — single source of truth
  content/businesses/*.json # ONE JSON file per business page (the content)
  data/
    categories.ts           # the 10 categories + category FAQs + 500-page target plan
    filters.ts              # situation/budget/skill/time filter pages (pure predicates)
    finder.ts               # Business Finder questions + matching algorithm (framework-free)
  lib/format.ts             # money/range/date formatting helpers
  layouts/BaseLayout.astro  # the ONE global layout (header, footer, head, analytics)
  components/               # reusable UI (QuickNumbers, BusinessCard, FAQ, AdSlot, ...)
  pages/
    index.astro             # homepage
    find-my-business.astro   # the interactive Business Finder
    businesses/index.astro   # browse all businesses
    businesses/[slug].astro  # individual business page template (1 per JSON file)
    [listing].astro          # generates all category + filter pages
    about, contact, privacy-policy, terms, disclaimer,
    how-we-research-businesses, data-sources, submit-a-business-idea
public/
  robots.txt, ads.txt, favicon.svg, og-default.svg
```

Pages are generated automatically: drop a JSON file in `src/content/businesses/`, and its individual
page, its category page, the relevant filter pages, the Business Finder, and the sitemap all pick it
up on the next build.

## Adding a new business page

1. Copy an existing file in `src/content/businesses/` (e.g. `pressure-washing-business.json`) to a
   new file named `<slug>.json`.
2. Fill in every field. The schema in `src/content.config.ts` is enforced at build time — if a field
   is missing or the wrong type, the build fails with a clear error. Notable fields:
   - `category` must be one of the slugs in `src/data/categories.ts`.
   - `difficultyLevel`: `Beginner` | `Intermediate` | `Advanced`.
   - `speedToIncome`: `days` | `weeks` | `months` | `long` (drives finder/filter matching).
   - `skills`, `workLocations`, `priorities`: enum arrays (see `content.config.ts`).
   - `similarBusinesses`: slugs of other existing businesses (used for internal links).
3. Run `npm run build`. The new page and all listings update automatically.

### Content standards (non-negotiable)

ProfitPath's value is trust. Every page must:
- Use realistic, sourced **ranges** — never single best-case numbers.
- Separate beginner / experienced / top-earner earnings honestly.
- State the difficulty, the biggest risk, and what most people get wrong.
- Avoid hype ("guaranteed", "passive income overnight", "anyone can do this", etc.).
- Cite data sources and carry a `lastReviewed` date.

See `/how-we-research-businesses` for the full process.

## Scaling to 500 pages

`src/data/categories.ts` documents the planned per-category distribution (the `targetPages` field):
Service 80, Online 80, Trades 60, Food 40, Retail 50, Creative 50, Wellness 40, Real Estate 30,
Technology 40, Local 30. Growth = adding JSON files; no architectural changes required.

## AdSense

Ads are **disabled by default** and stay disabled until approval. To enable after approval:

1. Set `PUBLIC_ADSENSE_ENABLED=true` and `PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`.
2. Update `public/ads.txt` with the same publisher id.

Ad slots (`<AdSlot />`) render nothing until then. Placement follows Google Publisher policies:
between content sections, after FAQs, related-businesses area, and a desktop sidebar — **never**
inside the Business Finder, its results, or adjacent to the cost/earnings boxes.

## Analytics & privacy

Firebase/Google Analytics loads asynchronously and records only standard pageview/engagement events.
The Business Finder runs entirely in the browser — answers are never stored or transmitted, no account
is required, and no financial information is collected. Disable analytics with `PUBLIC_ANALYTICS=false`.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `PUBLIC_ADSENSE_ENABLED` | `false` | Master switch for live AdSense |
| `PUBLIC_ADSENSE_CLIENT` | `''` | `ca-pub-...` publisher id |
| `PUBLIC_ADSENSE_PLACEHOLDERS` | `false` | Show labelled ad placeholders during dev |
| `PUBLIC_ANALYTICS` | `true` | Set `false` to disable Firebase Analytics |

---

Educational information only. Not financial, legal, or investment advice. Individual results vary.
