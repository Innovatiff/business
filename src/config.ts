/**
 * ProfitPath — central site configuration.
 *
 * One website, many pages. Everything that is shared across the site
 * (brand, navigation, AdSense, category/filter definitions) lives here so
 * the site can scale to 500 business pages by adding data, not code.
 */

export const SITE = {
  name: 'ProfitPath',
  domain: 'honestlyprofitable.com',
  url: 'https://honestlyprofitable.com',
  tagline: 'Every business explained honestly.',
  description:
    'Honest, research-driven breakdowns of real businesses you can actually start — with real startup costs, realistic earnings, time to profit, and exactly how to begin.',
  promise:
    'Every business explained honestly — startup cost, real earnings, time to profit, and exactly how to start today.',
  email: 'hello@honestlyprofitable.com',
  locale: 'en_US',
} as const;

/**
 * AdSense / Google Publisher configuration.
 *
 * Ads are DISABLED by default and stay disabled until approval. To turn ads
 * on after approval:
 *   1. Set PUBLIC_ADSENSE_ENABLED=true in the environment (or flip `enabled`).
 *   2. Set PUBLIC_ADSENSE_CLIENT to your real ca-pub-XXXXXXXXXXXXXXXX id.
 *   3. Update /public/ads.txt with the same publisher id.
 *
 * Until then, ad slots render as quiet, clearly-labelled reserved placeholders
 * (never fake ads, never anything that looks clickable).
 */
export const ADSENSE = {
  /** Master switch. Reads PUBLIC_ADSENSE_ENABLED, defaults to false. */
  enabled: import.meta.env.PUBLIC_ADSENSE_ENABLED === 'true',
  /** ca-pub-XXXXXXXXXXXXXXXX — set via PUBLIC_ADSENSE_CLIENT after approval. */
  client: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '',
  /** Show quiet labelled placeholders before approval so layout is reserved. */
  showPlaceholders: import.meta.env.PUBLIC_ADSENSE_PLACEHOLDERS === 'true',
} as const;

/**
 * Firebase / Google Analytics.
 *
 * Firebase web config is public by design (it ships to the browser). Analytics
 * is loaded asynchronously so it never blocks rendering, and it only records
 * standard pageview/engagement events. We deliberately never send Business
 * Finder answers, financial details, or any personal information to analytics —
 * the finder runs entirely in the browser. Disable with PUBLIC_ANALYTICS=false.
 */
export const ANALYTICS = {
  enabled: import.meta.env.PUBLIC_ANALYTICS !== 'false',
  firebase: {
    apiKey: 'AIzaSyB6cqQhlfLHidqEk0bZNnsRR8PiHHODBok',
    authDomain: 'business-f4ce4.firebaseapp.com',
    projectId: 'business-f4ce4',
    storageBucket: 'business-f4ce4.firebasestorage.app',
    messagingSenderId: '1050384315513',
    appId: '1:1050384315513:web:d0d789ea626c133e8550a8',
    measurementId: 'G-KF3WZ2XNZM',
  },
} as const;

/**
 * Search engine / verification settings.
 *
 * Google Search Console site verification: paste the token from the
 * "HTML tag" verification method (the `content="..."` value) into the
 * PUBLIC_GOOGLE_SITE_VERIFICATION environment variable in Netlify, then
 * redeploy. It renders the required <meta> tag site-wide. (Alternatively,
 * drop Google's google<...>.html file into /public — both methods work.)
 */
export const SEO = {
  googleSiteVerification: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
} as const;

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Find My Business', href: '/find-my-business' },
  { label: 'Browse Businesses', href: '/businesses' },
  { label: 'By Budget', href: '/businesses-under-5000' },
  { label: 'By Skill', href: '/businesses-no-experience' },
  { label: 'By Time', href: '/businesses-part-time' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'How We Research Businesses', href: '/how-we-research-businesses' },
  { label: 'Data Sources', href: '/data-sources' },
  { label: 'Submit a Business Idea', href: '/submit-a-business-idea' },
];

/** The standard disclaimer shown across the site. */
export const DISCLAIMER =
  'ProfitPath provides educational information about business models based on publicly reported data, operator interviews, industry sources, and general research. Individual results vary significantly. Starting a business involves financial risk. Nothing on this site is financial, legal, or investment advice. Always do your own research before spending money.';
