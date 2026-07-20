/**
 * Filter pages, situation-based landing pages (by budget, time, skill).
 *
 * Each filter is a pure predicate over a business's data plus copy for the
 * page. Adding a new filter page is just adding an entry here. Filters are
 * deliberately honest: a budget filter shows businesses you can *start* within
 * that budget (startupCostLow), never businesses that merely list a low number
 * but actually need more.
 */

import type { CollectionEntry } from 'astro:content';

type BizData = CollectionEntry<'businesses'>['data'];

export type Filter = {
  slug: string;
  name: string;
  /** Short label used in nav / situation grids. */
  shortName: string;
  description: string;
  /** The honest "most important thing to know" for this situation. */
  mostImportant: string;
  match: (b: BizData) => boolean;
  /** Optional custom sort (default: startup cost ascending). */
  sort?: (a: BizData, b: BizData) => number;
};

const byStartupCostAsc = (a: BizData, b: BizData) => a.startupCostLow - b.startupCostLow;
const byEarningsDesc = (a: BizData, b: BizData) => b.monthlyEarningsHigh - a.monthlyEarningsHigh;

export const FILTERS: Filter[] = [
  {
    slug: 'businesses-under-500',
    name: 'Businesses You Can Start for Under $500',
    shortName: 'Under $500',
    description:
      'These are real businesses you can realistically begin with less than $500 in startup money. They keep your financial risk low, which means the worst case if it does not work is a few hundred dollars and some time, not your savings. The trade-off is that nearly all of them trade your hours for income at the start.',
    mostImportant:
      'A low startup cost is not the same as low effort. With under $500, you are buying yourself a low-risk start, but the business still needs your time, consistency, and a real plan for finding customers. Budget for insurance where it applies; skipping it to save money is the most expensive mistake on this list.',
    match: (b) => b.startupCostLow <= 500,
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-under-5000',
    name: 'Businesses You Can Start for Under $5,000',
    shortName: 'Under $5,000',
    description:
      'With up to $5,000 you have room for proper equipment, insurance, and a small marketing budget, enough to start most service businesses comfortably or get a lean product or online business off the ground. This budget removes the most common excuse for cutting corners on the tools that actually affect quality and safety.',
    mostImportant:
      'Spend on the few things that directly affect quality, safety, and your ability to get paid, reliable equipment, insurance, and a way for customers to find and trust you. Resist spending the rest on logos, fancy websites, or gear you do not yet need.',
    match: (b) => b.startupCostLow <= 5000,
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-under-25000',
    name: 'Businesses You Can Start for Under $25,000',
    shortName: 'Under $25,000',
    description:
      'A budget of $5,000 to $25,000 opens up capital-heavier businesses, vehicles, professional-grade equipment, initial inventory, or a small space. The upside is faster capacity and higher ceilings; the downside is that more of your own money is now at risk if demand is weaker than you expected.',
    mostImportant:
      'At this budget, validate demand before you deploy the capital. Take on a few jobs, pre-sell, or run the business lean first. Most failures at this level come from buying the full setup before proving that paying customers actually exist in your area.',
    match: (b) => b.startupCostLow <= 25000,
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-higher-investment',
    name: 'Businesses for a Larger Investment',
    shortName: 'Larger Budget',
    description:
      'These businesses can productively absorb a larger investment, typically because they need vehicles, commercial equipment, inventory, or a leased space. With more capital you can reach paying capacity faster and build something with a higher ceiling, but the financial stakes and the importance of doing your homework both rise sharply.',
    mostImportant:
      'More capital raises both the ceiling and the floor of risk. Treat real numbers as non-negotiable: get written quotes, understand your fixed monthly costs, and keep a cash reserve. A business that needs $25,000 to start needs a plan for the months before it pays that back.',
    match: (b) => b.startupCostHigh >= 10000,
    sort: byEarningsDesc,
  },
  {
    slug: 'businesses-from-home',
    name: 'Businesses You Can Run From Home',
    shortName: 'From Home',
    description:
      'Every business here can be run primarily from home or fully online, no storefront, no commute, no separate lease. That keeps overhead low and fits around family or another job. The honest catch is that working from home demands self-discipline and a clear boundary between work and life, or productivity quietly erodes.',
    mostImportant:
      'Working from home removes your commute, not your need for structure. The home businesses that succeed treat it like real work: set hours, a dedicated space, and a system for separating client time from everything else competing for your attention.',
    match: (b) => b.workLocations.includes('home') || b.workLocations.includes('online'),
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-no-experience',
    name: 'Businesses You Can Start With No Experience',
    shortName: 'No Experience',
    description:
      'These businesses can be started with no prior professional experience, the core skills are learnable on the job in days or weeks, not years. That makes them genuine entry points. Just be clear-eyed: "no experience to start" means you will be learning while you earn, and your early work will be slower and rougher than it will be in six months.',
    mostImportant:
      'No experience required does not mean no skill required, it means the skill is learnable quickly and the barrier to your first job is low. Price your early work honestly, over-deliver to build reviews, and reinvest your first earnings into getting better, faster.',
    match: (b) => b.noExperienceRequired,
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-for-beginners',
    name: 'Best Businesses for Beginners',
    shortName: 'For Beginners',
    description:
      'These are beginner-difficulty businesses: the model is simple to understand, the path to a first customer is short, and the common mistakes are well documented and avoidable. They are the best place to learn how running a business actually feels, invoicing, customers, pricing, without betting everything on getting it right the first time.',
    mostImportant:
      'Start simple on purpose. A beginner business is a low-stakes way to learn the real skills, sales, pricing, customer service, cash flow, that every later, bigger business will also need. Treat your first venture as paid education, not your final destination.',
    match: (b) => b.difficultyLevel === 'Beginner',
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-start-this-week',
    name: 'Businesses You Can Start This Week',
    shortName: 'Start This Week',
    description:
      'Each of these can realistically get its first paying customer within days to a couple of weeks. There is little to set up before you can charge money, which makes them ideal if you need income soon or simply want to test whether you enjoy the work before committing further. Fast to start does not mean fast to a full income, though.',
    mostImportant:
      'Starting fast is about removing friction, not skipping fundamentals. You can land a first customer this week, but still sort out basic insurance and a simple way to take payment first. Speed early is a huge advantage, use it to learn from real customers as quickly as possible.',
    match: (b) => b.speedToIncome === 'days' || b.speedToIncome === 'weeks',
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-part-time',
    name: 'Businesses You Can Start Part-Time',
    shortName: 'Part-Time',
    description:
      'These businesses work genuinely well part-time, you can run them around a job, school, or family with 5 to 20 hours a week. That makes them a low-risk way to test an idea and build income before deciding whether to go all in. Be realistic that part-time hours mean part-time income and a slower ramp.',
    mostImportant:
      'Part-time is the smartest way to de-risk a start: you keep your income while you learn whether the business and the work actually suit you. Protect a few consistent hours each week and treat them as non-negotiable, because the inconsistent part-timer rarely builds momentum.',
    match: (b) => b.partTimeFriendly,
    sort: byStartupCostAsc,
  },
  {
    slug: 'businesses-high-income',
    name: 'Businesses With High Income Potential',
    shortName: 'High Income',
    description:
      'These businesses have the highest realistic income ceilings on the site, but read that carefully. High potential is not high probability. Reaching the top of these ranges typically requires hiring, years of operating, real capital, or rare skill. We show the honest top end and exactly what it took to get there, not a fantasy.',
    mostImportant:
      'High income potential almost always means high effort, capital, or risk to reach. The top of these ranges is earned by operators who hire, systematize, and reinvest for years, not by beginners in month one. Judge these by their realistic year-one numbers first, and treat the ceiling as a long-term possibility.',
    match: (b) => b.priorities.includes('max-income') || b.monthlyEarningsHigh >= 12000,
    sort: byEarningsDesc,
  },
  {
    slug: 'businesses-grow-to-full-time',
    name: 'Businesses You Can Grow From Part-Time to Full-Time',
    shortName: 'Grow to Full-Time',
    description:
      'These businesses let you start part-time to test the water, then scale into a full-time income as demand and your confidence grow. They reward people who want an off-ramp from a job without leaping before there is a runway. The path is real, but it asks for patience through the awkward middle where you are doing both.',
    mostImportant:
      'The bridge from part-time to full-time is the hardest stretch, you are stretched across a job and a growing business at once. Set a clear, numbers-based trigger for going full-time (for example, when the business reliably replaces a set share of your income) rather than leaping on a good month or quitting on a bad day.',
    match: (b) => b.partTimeFriendly && b.monthlyEarningsHigh >= 5000,
    sort: byEarningsDesc,
  },
];

export const FILTER_MAP: Record<string, Filter> = Object.fromEntries(
  FILTERS.map((f) => [f.slug, f]),
);

export function getFilter(slug: string): Filter | undefined {
  return FILTER_MAP[slug];
}
