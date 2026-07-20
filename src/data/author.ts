/**
 * The site's author. Daniel started Honestly Profitable, researches the
 * businesses, and is credited on every article. The photo lives in
 * /public/authors; if it is missing, the byline shows his initials instead of a
 * broken image, so the site always looks finished.
 */
export const AUTHOR = {
  name: 'Daniel Hernandez',
  role: 'Founder and editor',
  /** Drop a square headshot here (JPG) and it appears on every byline. */
  photo: '/authors/daniel-hernandez.jpg',
  initials: 'DH',
  /** Where the byline links to (his story). */
  url: '/about',
} as const;
