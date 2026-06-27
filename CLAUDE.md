# Honestly Profitable — working notes for Claude

Honestly Profitable (HonestlyProfitable.com) is **one** Astro static site — a serious, honest business
reference plus an interactive Business Finder. See `README.md` for full architecture.

## Prime directive: trust over everything

This is NOT a get-rich-quick / hype site. When writing or editing any business content:
- Use realistic, sourced **ranges**, never single best-case numbers.
- Separate beginner / experienced / top-earner earnings.
- Always state difficulty, the biggest risk, and what people get wrong.
- Never use hype: "guaranteed", "passive income overnight", "anyone can do this", "make $X your
  first month", "quit your job tomorrow", "no skills required".
- Cite data sources and keep `lastReviewed` current.

## Key facts

- **Content = data.** Each business is one JSON file in `src/content/businesses/`, validated by the
  Zod schema in `src/content.config.ts`. Add a business = add a JSON file; pages/listings/sitemap
  update automatically. Never hand-code individual business pages.
- **Build / verify:** `npm run build` (validates all content). `npm run check` for types.
- **Categories** live in `src/data/categories.ts`; **filter pages** in `src/data/filters.ts`;
  **finder questions + matching** in `src/data/finder.ts` (framework-free so it runs client-side).
- **Ads** are disabled by default (`src/components/AdSlot.astro` + `ADSENSE` in `src/config.ts`).
  Never place ads inside the finder/results or next to cost/earnings boxes.
- **Privacy:** finder runs fully client-side; never store finder answers, never require accounts,
  never collect financial info.

## Conventions

- One global layout: `src/layouts/BaseLayout.astro`. All pages use it.
- Money/format helpers: `src/lib/format.ts`.
- Color tokens + base styles: `src/styles/global.css`. Component styles are scoped in `.astro` files.
- Do not put the model identifier or session URLs into committed files.
