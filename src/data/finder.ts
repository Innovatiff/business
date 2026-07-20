/**
 * Business Finder, questions and matching logic.
 *
 * This module is intentionally framework-free and side-effect-free so the same
 * `rankBusinesses` function can run in a client <script> for instant,
 * no-reload, no-account, no-storage results.
 *
 * Honesty rules baked into the algorithm:
 *  - Budget is a HARD filter. We never show a business you cannot start within
 *    your stated budget (compared against its realistic minimum).
 *  - Time is a HARD filter. We never show a business that needs more hours per
 *    week than you said you have.
 *  - Income deadline is a HARD filter. We never show a business that cannot
 *    realistically produce income inside your timeframe.
 *  - The remaining matches are ranked by fit, and every match must explain
 *    *why* it matched. We always surface the full realistic range, never the
 *    best case alone.
 */

export type Question = {
  id: string;
  section: string;
  prompt: string;
  help?: string;
  type: 'single' | 'multi';
  options: { value: string; label: string }[];
};

export const FINDER_SECTIONS = [
  'Your Budget',
  'Your Time',
  'Your Skills and Background',
  'Your Situation',
  'Your Honest Constraints',
] as const;

export const QUESTIONS: Question[] = [
  {
    id: 'budget',
    section: 'Your Budget',
    prompt: 'How much money can you realistically invest to start a business right now?',
    type: 'single',
    options: [
      { value: '100', label: 'Under $100' },
      { value: '500', label: '$100 to $500' },
      { value: '2000', label: '$500 to $2,000' },
      { value: '10000', label: '$2,000 to $10,000' },
      { value: '50000', label: '$10,000 to $50,000' },
      { value: '999999', label: '$50,000 or more' },
    ],
  },
  {
    id: 'hours',
    section: 'Your Time',
    prompt: 'How many hours per week can you dedicate to this business?',
    type: 'single',
    options: [
      { value: '5', label: 'Under 5 hours' },
      { value: '15', label: '5 to 15 hours' },
      { value: '30', label: '15 to 30 hours' },
      { value: '40', label: '30 to 40 hours' },
      { value: '60', label: 'Full time, 40 or more hours' },
    ],
  },
  {
    id: 'deadline',
    section: 'Your Time',
    prompt: 'How soon do you need this to generate income?',
    type: 'single',
    options: [
      { value: 'd30', label: 'Within 30 days' },
      { value: 'm3', label: 'Within 3 months' },
      { value: 'm6', label: 'Within 6 months' },
      { value: 'y1', label: 'Within a year' },
      { value: 'long', label: 'I am building for the long term' },
    ],
  },
  {
    id: 'skills',
    section: 'Your Skills and Background',
    prompt: 'Which of these do you have experience with?',
    help: 'Select all that apply.',
    type: 'multi',
    options: [
      { value: 'hands', label: 'Working with your hands or physical work' },
      { value: 'people', label: 'Talking to and working with people' },
      { value: 'writing', label: 'Writing or communication' },
      { value: 'tech', label: 'Technology or software' },
      { value: 'sales', label: 'Sales or marketing' },
      { value: 'finance', label: 'Finance or numbers' },
      { value: 'teaching', label: 'Teaching or explaining things' },
      { value: 'creative', label: 'Creative work, design, photography, video' },
      { value: 'health', label: 'Health or fitness' },
      { value: 'food', label: 'Food or cooking' },
      { value: 'none', label: 'None of the above, I am starting from zero' },
    ],
  },
  {
    id: 'location',
    section: 'Your Situation',
    prompt: 'Where will you work?',
    type: 'single',
    options: [
      { value: 'home', label: 'From home' },
      { value: 'mobile', label: 'Mobile, I can travel locally' },
      { value: 'space', label: 'I can rent or use a space' },
      { value: 'online', label: 'Online only' },
      { value: 'flexible', label: 'Flexible, whatever works' },
    ],
  },
  {
    id: 'priority',
    section: 'Your Situation',
    prompt: 'What matters most to you?',
    type: 'single',
    options: [
      { value: 'max-income', label: 'Maximum income potential' },
      { value: 'low-risk', label: 'Low startup risk' },
      { value: 'flexibility', label: 'Flexibility and freedom' },
      { value: 'sellable', label: 'Building something I can sell one day' },
      { value: 'helping', label: 'Making a difference or helping people' },
      { value: 'alongside-job', label: 'Something I can do alongside my current job' },
    ],
  },
  {
    id: 'concern',
    section: 'Your Honest Constraints',
    prompt: 'What concerns you most about starting a business?',
    type: 'single',
    options: [
      { value: 'money', label: 'I do not have enough money to start' },
      { value: 'time', label: 'I do not have enough time' },
      { value: 'skills', label: 'I do not have the right skills' },
      { value: 'fear', label: 'I am afraid of failure' },
      { value: 'choice', label: 'I do not know which idea to choose' },
      { value: 'tried', label: 'I have tried before and it did not work' },
    ],
  },
];

/** Compact record passed to the client for matching + display. */
export type MatchRecord = {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  startupCostLow: number;
  startupCostHigh: number;
  monthlyEarningsLow: number;
  monthlyEarningsHigh: number;
  timeToFirstIncome: string;
  difficultyLevel: string;
  bestFor: string;
  biggestRisk: string;
  speedToIncome: 'days' | 'weeks' | 'months' | 'long';
  minWeeklyHours: number;
  skills: string[];
  workLocations: string[];
  priorities: string[];
  noExperienceRequired: boolean;
  partTimeFriendly: boolean;
};

export type Answers = {
  budget?: string;
  hours?: string;
  deadline?: string;
  skills?: string[];
  location?: string;
  priority?: string;
  concern?: string;
};

export type Scored = {
  record: MatchRecord;
  score: number;
  reasons: string[];
};

const SPEED_INDEX: Record<string, number> = { days: 0, weeks: 1, months: 2, long: 3 };

/** Map an income deadline to the slowest speed bucket still acceptable. */
const DEADLINE_MAX_SPEED: Record<string, number> = {
  d30: 1, // within 30 days → days or weeks only
  m3: 2, // within 3 months → up to a few months
  m6: 3, // within 6 months → anything realistic
  y1: 3,
  long: 3,
};

const SKILL_LABELS: Record<string, string> = {
  hands: 'hands-on work',
  people: 'working with people',
  writing: 'writing and communication',
  tech: 'technology',
  sales: 'sales and marketing',
  finance: 'finance and numbers',
  teaching: 'teaching',
  creative: 'creative work',
  health: 'health and fitness',
  food: 'food and cooking',
};

const LOCATION_LABELS: Record<string, string> = {
  home: 'from home',
  mobile: 'on the move locally',
  space: 'from a space you can rent or use',
  online: 'fully online',
  flexible: 'wherever works for you',
};

const PRIORITY_LABELS: Record<string, string> = {
  'max-income': 'maximizing income potential',
  'low-risk': 'keeping startup risk low',
  flexibility: 'flexibility and freedom',
  sellable: 'building something you could sell',
  helping: 'helping people',
  'alongside-job': 'running it alongside a job',
};

/**
 * Rank businesses for a given set of answers.
 * Returns only businesses that pass the hard budget/time/speed filters,
 * sorted best-fit first, each with human-readable reasons.
 */
export function rankBusinesses(answers: Answers, records: MatchRecord[]): Scored[] {
  const budgetMax = answers.budget ? Number(answers.budget) : Infinity;
  const hoursMax = answers.hours ? Number(answers.hours) : Infinity;
  const maxSpeed = answers.deadline ? (DEADLINE_MAX_SPEED[answers.deadline] ?? 3) : 3;
  const userSkills = answers.skills ?? [];
  const skillsFromZero = userSkills.includes('none') || userSkills.length === 0;

  const results: Scored[] = [];

  for (const r of records) {
    // --- HARD filters (honesty: never show what someone cannot do) ---
    if (r.startupCostLow > budgetMax) continue;
    if (r.minWeeklyHours > hoursMax) continue;
    if (SPEED_INDEX[r.speedToIncome] > maxSpeed) continue;

    let score = 0;
    const reasons: string[] = [];

    // Skills overlap.
    if (!skillsFromZero) {
      const matched = r.skills.filter((s) => userSkills.includes(s));
      if (matched.length) {
        score += matched.length * 3;
        const names = matched.map((s) => SKILL_LABELS[s]).filter(Boolean);
        reasons.push(`Uses your experience with ${listJoin(names)}.`);
      }
    } else if (r.noExperienceRequired) {
      score += 4;
      reasons.push('Can be started with no prior experience.');
    }

    // Work location.
    if (answers.location) {
      if (answers.location === 'flexible' || r.workLocations.includes(answers.location)) {
        score += 3;
        reasons.push(`Works ${LOCATION_LABELS[answers.location] ?? 'for your situation'}.`);
      }
    }

    // What matters most.
    if (answers.priority && r.priorities.includes(answers.priority)) {
      score += 4;
      reasons.push(`Fits your goal of ${PRIORITY_LABELS[answers.priority]}.`);
    }

    // Time-based nudges.
    if (hoursMax <= 15 && r.partTimeFriendly) {
      score += 3;
      reasons.push('Genuinely workable part-time, around a job or family.');
    }

    // Budget comfort: reward businesses comfortably within budget.
    if (budgetMax !== Infinity && r.startupCostLow <= budgetMax * 0.6) {
      score += 1;
      reasons.push('Comfortably within your stated budget.');
    }

    // Constraint-aware nudges.
    if (answers.concern === 'money' && r.startupCostLow <= 500) {
      score += 2;
      reasons.push('Very low money at risk if it does not work out.');
    }
    if (answers.concern === 'skills' && r.noExperienceRequired) {
      score += 2;
    }
    if ((answers.concern === 'fear' || answers.concern === 'tried') && r.difficultyLevel === 'Beginner') {
      score += 2;
      reasons.push('A lower-stakes, beginner-friendly place to rebuild confidence.');
    }
    if (answers.concern === 'time' && r.partTimeFriendly) {
      score += 2;
    }

    // Speed bonus when income is needed soon.
    if (answers.deadline === 'd30' && r.speedToIncome === 'days') {
      score += 2;
      reasons.push('Can produce a first paying customer within days.');
    }

    // Guarantee at least one honest reason.
    if (reasons.length === 0) {
      reasons.push('Fits within your budget and available time.');
    }

    results.push({ record: r, score, reasons });
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Tie-break: lower barrier to entry first.
    return a.record.startupCostLow - b.record.startupCostLow;
  });

  return results;
}

function listJoin(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}
