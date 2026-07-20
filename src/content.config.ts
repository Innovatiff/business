import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The business collection.
 *
 * Each business lives in one JSON file under src/content/businesses/.
 * Adding a new business page is as simple as dropping in a new JSON file that
 * matches this schema, no code changes required. This is how the site scales
 * to 500 pages.
 *
 * The schema is intentionally strict so every page carries real, structured
 * numbers (costs, earnings, time-to-income, difficulty) rather than prose
 * alone. The extra tagging fields (skills, workLocations, etc.) power the
 * Business Finder and the budget/skill/time filter pages.
 */

const moneyItem = z.object({
  item: z.string(),
  low: z.number(),
  high: z.number(),
  /** true when this is an annual/recurring cost rather than one-time. */
  annual: z.boolean().optional(),
  /** true when this cost can be skipped at the very start. */
  optional: z.boolean().optional(),
});

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

export const SKILL_KEYS = [
  'hands',
  'people',
  'writing',
  'tech',
  'sales',
  'finance',
  'teaching',
  'creative',
  'health',
  'food',
] as const;

export const WORK_LOCATIONS = ['home', 'mobile', 'space', 'online', 'flexible'] as const;

export const PRIORITIES = [
  'max-income',
  'low-risk',
  'flexibility',
  'sellable',
  'helping',
  'alongside-job',
] as const;

/** Bucketed time-to-first-income for matching against the finder deadline. */
export const SPEED_BUCKETS = ['days', 'weeks', 'months', 'long'] as const;

const businesses = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/businesses' }),
  schema: z.object({
    // --- Identity & SEO ---
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),

    // --- Quick numbers (the box at the top of every page) ---
    startupCostLow: z.number(),
    startupCostHigh: z.number(),
    monthlyEarningsLow: z.number(),
    monthlyEarningsHigh: z.number(),
    timeToFirstIncome: z.string(),
    difficultyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    bestFor: z.string(),
    biggestRisk: z.string(),

    // --- Matching metadata (powers finder + filter pages) ---
    /** Bucket used to match against "how soon do you need income". */
    speedToIncome: z.enum(SPEED_BUCKETS),
    /** Minimum realistic hours/week to make this viable. */
    minWeeklyHours: z.number(),
    /** Skills this business rewards or requires. */
    skills: z.array(z.enum(SKILL_KEYS)).default([]),
    /** Where the work can be done. */
    workLocations: z.array(z.enum(WORK_LOCATIONS)).default([]),
    /** Which "what matters most" goals this business serves well. */
    priorities: z.array(z.enum(PRIORITIES)).default([]),
    /** Can a beginner with no prior experience realistically start? */
    noExperienceRequired: z.boolean().default(false),
    /** Is this genuinely workable part-time / alongside a job? */
    partTimeFriendly: z.boolean().default(false),
    /** Featured on the homepage. */
    featured: z.boolean().default(false),

    // --- Long-form content sections ---
    whatItIs: z.string(),
    dailyReality: z.string(),
    startupCostsItemized: z.array(moneyItem),
    realEarnings: z.object({
      yearOne: z.string(),
      experienced: z.string(),
      topEarners: z.string(),
      whatAffectsMost: z.string().optional(),
      perHour: z.string(),
    }),
    howToStart: z.array(z.string()),
    skillsRequired: z.object({
      mustHave: z.array(z.string()),
      canLearn: z.array(z.string()),
      separators: z.array(z.string()),
    }),
    whatPeopleGetWrong: z.array(z.string()),
    toolsAndEquipment: z.array(
      z.object({
        item: z.string(),
        note: z.string(),
        low: z.number().optional(),
        high: z.number().optional(),
      }),
    ),
    howToFindCustomers: z.object({
      methods: z.array(z.string()),
      whereCustomersAre: z.string(),
      timeToClientBase: z.string(),
      wasteOfTime: z.string(),
    }),
    howItScales: z.object({
      toFullTime: z.string(),
      hireAndStepBack: z.string(),
      sellable: z.string(),
      whatScalingRequires: z.string(),
    }),
    fitChecklist: z.object({
      strongFit: z.array(z.string()),
      poorFit: z.array(z.string()),
      askYourself: z.array(z.string()),
    }),
    faqs: z.array(faqItem),
    similarBusinesses: z.array(z.string()).default([]),
    dataSources: z.array(z.string()),
    lastReviewed: z.string(),

    // --- Optional rich blocks (progressive enhancement) ---
    // Pages render fully without these; when present they add depth, more
    // numbers, and worked examples, and they make pages visually distinct.

    /** Optional explicit layout variant. If omitted, one is derived from the slug. */
    layoutVariant: z.enum(['a', 'b', 'c']).optional(),

    /** Extra numeric callouts shown in a "by the numbers" band (margin, avg job value, etc.). */
    keyMetrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          note: z.string().optional(),
        }),
      )
      .optional(),

    /** How the revenue actually adds up, real price points and the math behind them. */
    revenueModel: z
      .object({
        intro: z.string().optional(),
        pricePoints: z
          .array(
            z.object({
              service: z.string(),
              price: z.string(),
              note: z.string().optional(),
            }),
          )
          .default([]),
        mathExample: z.string().optional(),
        volumeToTarget: z.string().optional(),
      })
      .optional(),

    /** Recurring monthly operating costs, a small P&L below the startup costs. */
    monthlyOperating: z
      .array(
        z.object({
          item: z.string(),
          low: z.number(),
          high: z.number(),
          note: z.string().optional(),
        }),
      )
      .optional(),

    /** Concrete worked examples: side-hustle vs. full-time vs. small team, with real dollars. */
    scenarios: z
      .array(
        z.object({
          label: z.string(),
          revenue: z.string(),
          profit: z.string().optional(),
          hours: z.string().optional(),
          summary: z.string(),
        }),
      )
      .optional(),

    /** A realistic month-by-month (or stage-by-stage) ramp. */
    timeline: z
      .array(
        z.object({
          period: z.string(),
          milestone: z.string(),
          income: z.string().optional(),
        }),
      )
      .optional(),

    /** How the numbers shift by market/region. */
    regionalVariation: z
      .object({
        summary: z.string(),
        markets: z
          .array(z.object({ area: z.string(), note: z.string() }))
          .default([]),
      })
      .optional(),
  }),
});

export const collections = { businesses };
