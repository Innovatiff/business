/** Small formatting helpers shared across components. */

/** "$1,500", whole-dollar, no cents. */
export function money(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

/** "$500 – $5,000" or "Free – $200" when low is 0. */
export function moneyRange(low: number, high: number): string {
  const lowStr = low === 0 ? 'Free' : money(low);
  return `${lowStr} – ${money(high)}`;
}

/** "$1,500 – $8,000 / mo" */
export function monthlyRange(low: number, high: number): string {
  return `${money(low)} – ${money(high)} / mo`;
}

const DIFFICULTY_CLASS: Record<string, string> = {
  Beginner: 'badge-beginner',
  Intermediate: 'badge-intermediate',
  Advanced: 'badge-advanced',
};

export function difficultyClass(level: string): string {
  return DIFFICULTY_CLASS[level] ?? 'badge-beginner';
}

/** Convert "2026-06" or "2026-06-01" to "June 2026". */
export function reviewedDate(value: string): string {
  const [year, month] = value.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const m = months[Number(month) - 1];
  return m ? `${m} ${year}` : value;
}
