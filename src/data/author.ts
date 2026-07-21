/**
 * Attribution for the site.
 *
 *  - AUTHOR is Daniel Hernandez, the founder who started and launched the
 *    project. His story is on the About page, with his photo.
 *  - EDITORIAL is the byline used on every article and article card. The
 *    breakdowns are produced and reviewed by the editorial team, so articles
 *    are credited to the team rather than to one person.
 */
export const AUTHOR = {
  name: 'Daniel Hernandez',
  role: 'Founder of Honestly Profitable',
  /** Drop a square headshot here (JPG) and it appears on the About page. */
  photo: '/authors/daniel-hernandez.jpg',
  initials: 'DH',
  url: '/about',
} as const;

export const EDITORIAL = {
  name: 'Honestly Profitable Editorial Team',
  byline: 'Created by the Honestly Profitable Editorial Team',
  /** Where the byline links to (the About page / who we are). */
  url: '/about',
} as const;
