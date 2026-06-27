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
  },
  compressHTML: true,
});
