import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// HonestlyProfitable.com — Honestly Profitable
const SITE = 'https://honestlyprofitable.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Build a slug -> lastmod map from the business content at build time, so the
 * sitemap advertises each page's REAL last-reviewed date instead of a single
 * build timestamp on every URL (a weak, churn-y signal for search engines).
 * lastReviewed is stored as "YYYY-MM"; we normalize to the first of that month.
 */
const businessDir = path.join(__dirname, 'src/content/businesses');
const lastmodBySlug = {};
let latest = '';
try {
  for (const file of fs.readdirSync(businessDir)) {
    if (!file.endsWith('.json')) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(businessDir, file), 'utf8'));
      const reviewed = typeof data.lastReviewed === 'string' ? data.lastReviewed.trim() : '';
      const iso = /^\d{4}-\d{2}$/.test(reviewed) ? `${reviewed}-01` : /^\d{4}-\d{2}-\d{2}$/.test(reviewed) ? reviewed : '';
      if (data.slug && iso) {
        lastmodBySlug[data.slug] = iso;
        if (iso > latest) latest = iso;
      }
    } catch {
      /* skip malformed file */
    }
  }
} catch {
  /* content dir unreadable — fall back below */
}
// Fallback "site updated" date used for non-business URLs (home, listings,
// filters, legal pages) and if no content could be read.
const siteLastmod = latest || new Date().toISOString().slice(0, 10);

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      serialize(item) {
        let pathname = item.url.startsWith(SITE) ? item.url.slice(SITE.length) : item.url;
        if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
        const m = pathname.match(/^\/businesses\/([^/]+)$/);
        item.lastmod = (m && lastmodBySlug[m[1]]) || siteLastmod;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
    // Emit flat files (about.html, businesses/foo.html) instead of
    // about/index.html. Combined with trailingSlash: 'never', the no-slash URL
    // that the sitemap and canonical tags advertise is the one served with a
    // 200 — so Netlify no longer 301-redirects /foo to /foo/, which is what
    // Search Console was flagging as "Page with redirect".
    format: 'file',
  },
  compressHTML: true,
});
