import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// HonestlyProfitable.com — Honestly Profitable
export default defineConfig({
  site: 'https://honestlyprofitable.com',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
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
