import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The business collection.
 *
 * Each business lives in one JSON file under src/content/businesses/.
 * Adding a new business page is as simple as dropping in a new JSON file that
 * matches this schema — no code changes required. This is how the site scales
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
  }),
});

export const collections = { businesses };
