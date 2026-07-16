/**
 * Honestly Profitable — central site configuration.
 *
 * One website, many pages. Everything that is shared across the site
 * (brand, navigation, AdSense, category/filter definitions) lives here so
 * the site can scale to 500 business pages by adding data, not code.
 */

export const SITE = {
  name: 'Honestly Profitable',
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
 * Two separate things:
 *   1. SITE CONNECTION — the AdSense loader script + `google-adsense-account`
 *      verification meta in <head>. This is what lets Google connect the site
 *      to your account and REVIEW it for approval. It must be present for the
 *      application to be approved, and it shows no visible ads on its own. It is
 *      always emitted (see BaseHead) because `client` has a real default below.
 *   2. AD UNITS — actual <ins class="adsbygoogle"> slots (AdSlot.astro). These
 *      stay OFF (`enabled`) until after approval, so nothing ad-like appears on
 *      the site while it is being reviewed.
 *
 * The publisher ID is PUBLIC information (it appears in ads.txt and page source
 * on every AdSense site), so it is safe to hardcode here as the default.
 */
export const ADSENSE = {
  /**
   * ca-pub-XXXXXXXXXXXXXXXX publisher ID. Hardcoded so the site is always
   * connected to AdSense for review; override with PUBLIC_ADSENSE_CLIENT.
   */
  client: import.meta.env.PUBLIC_ADSENSE_CLIENT || 'ca-pub-7759354256906782',
  /**
   * Whether to render actual ad UNITS. Off until approval. The site connection
   * (loader + verification meta) is emitted regardless, so review is unaffected.
   */
  enabled: import.meta.env.PUBLIC_ADSENSE_ENABLED === 'true',
  /** Show quiet labelled placeholders during dev so layout is reserved. */
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

export type NavChild = { label: string; href: string };
/** `href` is the landing page used for the flat mobile button for this group. */
export type NavGroup = { heading: string; href: string; items: NavChild[] };
export type NavItem = { label: string; href?: string; groups?: NavGroup[] };

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Find My Business', href: '/find-my-business' },
  { label: 'Browse Businesses', href: '/businesses' },
  {
    // Single dropdown that holds the budget / skill / time filters so the
    // header stays uncluttered.
    label: 'Browse by',
    groups: [
      {
        heading: 'Budget',
        href: '/businesses-under-5000',
        items: [
          { label: 'Under $500', href: '/businesses-under-500' },
          { label: '$500 to $5,000', href: '/businesses-under-5000' },
          { label: '$5,000 to $25,000', href: '/businesses-under-25000' },
          { label: 'Larger investment', href: '/businesses-higher-investment' },
          { label: 'High income potential', href: '/businesses-high-income' },
        ],
      },
      {
        heading: 'Skill',
        href: '/businesses-no-experience',
        items: [
          { label: 'No experience needed', href: '/businesses-no-experience' },
          { label: 'Best for beginners', href: '/businesses-for-beginners' },
          { label: 'Run from home', href: '/businesses-from-home' },
        ],
      },
      {
        heading: 'Time',
        href: '/businesses-part-time',
        items: [
          { label: 'Start this week', href: '/businesses-start-this-week' },
          { label: 'Part-time', href: '/businesses-part-time' },
          { label: 'Grow to full-time', href: '/businesses-grow-to-full-time' },
        ],
      },
    ],
  },
  { label: 'Calculators', href: '/calculators' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Free Calculators', href: '/calculators' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'How We Research Businesses', href: '/how-we-research-businesses' },
  { label: 'Editorial Standards', href: '/editorial-standards' },
  { label: 'Data Sources', href: '/data-sources' },
  { label: 'Submit a Business Idea', href: '/submit-a-business-idea' },
];

/** The standard disclaimer shown across the site. */
export const DISCLAIMER =
  'Honestly Profitable provides educational information about business models based on publicly reported data, operator interviews, industry sources, and general research. Individual results vary significantly. Starting a business involves financial risk. Nothing on this site is financial, legal, or investment advice. Always do your own research before spending money.';
