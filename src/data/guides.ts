/**
 * Guides, editorial "best of" listicle pages generated from the real business
 * library. Each guide pairs hand-written editorial (intro, outro, FAQ) with a
 * data-driven pick() over the actual businesses, so pages are substantial,
 * unique, and richly internally linked, good for long-tail search.
 */
import type { CollectionEntry } from 'astro:content';

type Biz = CollectionEntry<'businesses'>;

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Short lead shown under the H1. */
  lead: string;
  intro: string[];
  /** Label for the "why it made the list" column. */
  pickNote: (b: Biz) => string;
  pick: (all: Biz[]) => Biz[];
  outro: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

const byStartupLow = (a: Biz, b: Biz) => a.data.startupCostLow - b.data.startupCostLow;
const byEarnHigh = (a: Biz, b: Biz) => b.data.monthlyEarningsHigh - a.data.monthlyEarningsHigh;

export const GUIDES: Guide[] = [
  {
    slug: 'best-businesses-to-start-with-little-money',
    title: 'Best Businesses to Start With Little Money',
    metaTitle: 'Best Businesses to Start With Little Money (Under $500)',
    metaDescription:
      'Honest picks for the best businesses you can start for under $500, real startup costs, realistic earnings, and what each one actually takes. No hype.',
    lead: 'You do not need a big bank account to start, you need a low-cost model, a real skill or willingness to learn, and the discipline to show up. Here are the businesses that genuinely start for under $500.',
    intro: [
      'Almost every "start a business with no money" list online is selling a course. This one is not. These are businesses whose realistic minimum startup cost is genuinely under $500, usually because they sell your time and effort rather than expensive equipment or inventory.',
      'Low startup cost does not mean low effort or guaranteed income. It means your money at risk is small, so a slow start costs you time rather than savings. That is the honest trade-off, and it is a good one when you are starting from little.',
    ],
    pickNote: (b) => b.data.bestFor,
    pick: (all) => all.filter((b) => b.data.startupCostLow <= 500).sort(byStartupLow).slice(0, 24),
    outro: [
      'The common thread: these businesses reward reliability and reputation more than capital. One well-reviewed operator out-earns a dozen flaky competitors. Pick one that fits a skill you have or can learn quickly, do excellent work, and ask every happy customer for a review.',
      'Before you commit, read the full breakdown for any business that interests you, each page has the honest earnings ranges, the biggest risk, and what most people get wrong.',
    ],
    faqs: [
      {
        question: 'What business can I start with almost no money?',
        answer:
          'Service businesses are usually the answer, cleaning, lawn care, pet care, errands, tutoring, freelance writing, and similar models can start for under a few hundred dollars because you are selling your time and skill, not buying equipment or inventory. The businesses on this page all have a realistic minimum startup cost under $500.',
      },
      {
        question: 'Can you really start a business with no money at all?',
        answer:
          'Almost never truly $0, you will usually need at least a little for insurance, a basic tool or two, and simple marketing. But several models here start for well under $100. Be wary of anyone claiming a genuine zero-cost, guaranteed-income business; that is a marketing hook, not reality.',
      },
      {
        question: 'Which cheap business is most profitable?',
        answer:
          'It depends on your skills and market, but low-cost service businesses with repeat customers (cleaning, lawn care, pet sitting) or higher-skill freelance work (copywriting, bookkeeping) tend to reach a solid full-time income fastest. Use our earnings ranges on each page to compare honestly.',
      },
    ],
    related: ['best-businesses-to-start-from-home', 'best-businesses-with-no-experience', 'best-side-business-ideas'],
  },
  {
    slug: 'best-businesses-to-start-from-home',
    title: 'Best Businesses to Start From Home',
    metaTitle: 'Best Businesses to Start From Home (Honest List)',
    metaDescription:
      'The best businesses you can genuinely run from home, with real startup costs, realistic earnings, and an honest look at what each one takes.',
    lead: 'Working from home saves rent and commute, but it demands discipline and a model that does not need a storefront or a crew. These businesses genuinely work from a home base.',
    intro: [
      'A home-based business trades overhead for self-discipline. There is no rent eating your margins, but there is also no boss and no separation between work and life, the operators who succeed build real structure around their day.',
      'Every business below can be run primarily from home, at least at the start. Some are fully online; others are home-based but mobile (you travel to clients). Each page tells you which, plus the honest income range and the biggest risk.',
    ],
    pickNote: (b) => b.data.bestFor,
    pick: (all) =>
      all.filter((b) => b.data.workLocations.includes('home') || b.data.workLocations.includes('online')).sort(byStartupLow).slice(0, 24),
    outro: [
      'The honest catch with home businesses is isolation and blurred boundaries, not the work itself. Set hours, get out of the house for meetings or errands, and treat it like a real job, because it is one.',
      'Open any breakdown for the full picture: what it costs, what it realistically earns, and whether it can grow beyond your own hours.',
    ],
    faqs: [
      {
        question: 'What is the most profitable business to run from home?',
        answer:
          'Higher-skill online services, bookkeeping, copywriting, consulting, web work, tend to have the best margins because there is almost no cost of goods and you can raise rates as you build a reputation. Home-based service businesses like pet care or cleaning scale through hiring rather than rates. Compare the earnings ranges on each page.',
      },
      {
        question: 'Do I need a license to run a business from home?',
        answer:
          'Often yes, many areas require a basic business license, and some have home-occupation rules or HOA restrictions, especially if clients visit or you store inventory. Food businesses have their own cottage-food laws. Always check your local rules before you start; each business page flags where licensing matters.',
      },
      {
        question: 'Can I start a home business while working full-time?',
        answer:
          'Many of these are genuinely part-time-friendly, especially online services and weekend service work. The realistic path is to build it on the side until it can replace part of your income, then decide whether to go full-time. Our part-time side business guide highlights the best fits.',
      },
    ],
    related: ['best-side-business-ideas', 'best-businesses-to-start-with-little-money', 'best-businesses-with-no-experience'],
  },
  {
    slug: 'best-businesses-with-no-experience',
    title: 'Best Businesses to Start With No Experience',
    metaTitle: 'Best Businesses to Start With No Experience',
    metaDescription:
      'Starting from zero? These businesses can realistically be started with no prior experience, with honest startup costs, earnings, and what to learn first.',
    lead: 'No experience is not the same as no effort. These businesses can be started by a motivated beginner, because the core skills are learnable quickly and the barrier to a first paying customer is low.',
    intro: [
      'Every experienced operator started as a beginner. The businesses on this list are the ones where you can realistically go from zero to your first paying customer without years of training, the skills are learnable on the job, and competence comes from reps, not credentials.',
      '"No experience required" still means you have to learn and do the work well. What it removes is the multi-year apprenticeship or degree some fields demand. Each page tells you exactly which skills you must have up front and which you can learn as you go.',
    ],
    pickNote: (b) => b.data.bestFor,
    pick: (all) => all.filter((b) => b.data.noExperienceRequired).sort(byStartupLow).slice(0, 24),
    outro: [
      'Beginners win by being reliable and coachable, not by pretending to be experts. Under-promise, over-deliver, and treat your first jobs as paid practice that builds reviews and word of mouth.',
      'Read the full breakdown before you start, especially the "what people get wrong" section, which is where most beginners stumble.',
    ],
    faqs: [
      {
        question: 'What business is easiest to start with no experience?',
        answer:
          'Low-skill service businesses like cleaning, lawn care, junk removal, and pet care are the easiest entry points, the work is learnable in days and the equipment is minimal. From there, higher-skill beginner-friendly options like virtual assistance or reselling take a bit longer to learn but pay more.',
      },
      {
        question: 'How do I start a business if I have no skills?',
        answer:
          'Pick a model where the core skill is learnable quickly, then learn it deliberately, free tutorials, one paid course if needed, and lots of practice on your first (possibly discounted) jobs. The businesses here are chosen precisely because a motivated beginner can become competent fast.',
      },
      {
        question: 'Is it risky to start a business with no experience?',
        answer:
          'The main risk is doing poor work and damaging your reputation early. Mitigate it by starting small, being honest with early customers, carrying basic insurance where relevant, and learning from every job. Low-cost models keep the financial risk small while you build competence.',
      },
    ],
    related: ['best-businesses-to-start-with-little-money', 'best-businesses-to-start-from-home', 'best-side-business-ideas'],
  },
  {
    slug: 'best-side-business-ideas',
    title: 'Best Part-Time Side Business Ideas',
    metaTitle: 'Best Part-Time Side Business Ideas (Around a Job)',
    metaDescription:
      'The best side businesses you can genuinely run part-time around a job, realistic startup costs, honest earnings, and the hours each one really needs.',
    lead: 'A good side business fits into evenings and weekends, earns real money without demanding a full-time schedule, and can grow if you want it to. These genuinely work around a job.',
    intro: [
      'The best side business is one you can actually sustain alongside your real life. That rules out anything needing daytime availability or 40 hours a week to be viable. The businesses here are chosen because they are genuinely workable in roughly 5–20 hours a week.',
      'A side business is also the lowest-risk way to test whether you want to run something full-time. You keep your income while you learn the work, build a base, and decide, with real data, whether to scale up.',
    ],
    pickNote: (b) => `About ${b.data.minWeeklyHours}+ hrs/week to be viable`,
    pick: (all) => all.filter((b) => b.data.partTimeFriendly).sort(byStartupLow).slice(0, 24),
    outro: [
      'The trap with side businesses is under-pricing because "it is just a side thing." Charge properly from the start, your time is worth the same in the evening as it is during the day.',
      'Each page notes whether the business can grow to full-time and what that would take, so you can pick one with the ceiling you want.',
    ],
    faqs: [
      {
        question: 'What is the best side business to start?',
        answer:
          'The best one fits your schedule and skills. Weekend service work (cleaning, detailing, lawn care), online freelancing, and reselling are popular because they flex around a job and start cheaply. Use the hours-per-week note and earnings range on each page to find your fit.',
      },
      {
        question: 'How many hours a week does a side business take?',
        answer:
          'Most of these are viable in roughly 5–20 hours a week, though the first income takes longer than the ongoing rhythm. Each business page lists a realistic minimum weekly hours to make it work, so you can match it to the time you actually have.',
      },
      {
        question: 'Can a side business become full-time?',
        answer:
          'Many can. The honest path is to grow it on the side until the income and demand justify the leap, then transition deliberately rather than quitting on hope. Every breakdown includes a "how it scales" section covering exactly this.',
      },
    ],
    related: ['best-businesses-to-start-from-home', 'best-businesses-to-start-with-little-money', 'highest-income-small-businesses'],
  },
  {
    slug: 'highest-income-small-businesses',
    title: 'Highest-Income Small Businesses to Start',
    metaTitle: 'Highest-Income Small Businesses to Start',
    metaDescription:
      'Small businesses with the highest realistic income potential, with honest earnings ranges, what they cost, and what it truly takes to earn at the top.',
    lead: 'Higher income almost always means higher skill, more capital, or more responsibility, usually a mix. These are the businesses with the strongest realistic income ceiling, told honestly.',
    intro: [
      'It is easy to list "high-income businesses" and quote only the top numbers. We will not. These businesses do have strong income potential, but every one of them earns it through some combination of real skill, meaningful startup capital, licensing, or the willingness to manage people and risk.',
      'We rank these by the realistic monthly income a strong solo or small operation can reach, not the rare outlier. The top-earner numbers, and exactly what it took to get there, are on each individual page.',
    ],
    pickNote: (b) => b.data.bestFor,
    pick: (all) => all.filter((b) => b.data.monthlyEarningsHigh >= 15000).sort(byEarnHigh).slice(0, 24),
    outro: [
      'Higher income comes with higher stakes, more capital at risk, more regulation, or more people to manage. That is the honest trade. Match the ambition to your appetite for risk and complexity.',
      'Open any breakdown to see the full earnings range, the capital required, the biggest risk, and what separates the top earners from the average operator.',
    ],
    faqs: [
      {
        question: 'What small business has the highest income potential?',
        answer:
          'Skilled trades that scale into crews (HVAC, electrical, remodeling), professional services (consulting, bookkeeping at scale), and capital-backed businesses (real estate, certain food and service operations) tend to have the strongest ceilings. But the ceiling requires skill, capital, or management, the businesses here show the honest range for each.',
      },
      {
        question: 'Do high-income businesses cost more to start?',
        answer:
          'Usually, yes, higher income often requires more capital, licensing, or equipment up front. Some skill-based services are exceptions, earning well on low startup cost but demanding real expertise. Each page shows both the startup cost and the earnings so you can weigh the trade-off.',
      },
      {
        question: 'Are these income figures guaranteed?',
        answer:
          'No. These are realistic ranges based on reported data and operator accounts, not guarantees. Most operators land in the middle of the range, many earn less at first, and the top numbers took years and effort to reach. We show honest ranges precisely so you can plan for reality.',
      },
    ],
    related: ['best-businesses-to-start-with-little-money', 'best-side-business-ideas', 'best-businesses-to-start-from-home'],
  },
];

export const GUIDE_MAP: Record<string, Guide> = Object.fromEntries(GUIDES.map((g) => [g.slug, g]));
