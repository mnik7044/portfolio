export type ContributionDay = {
  date: string;
  level: number;
  count: number;
  /** 0 = Sunday … 6 = Saturday */
  row: number;
  /** week index, oldest first */
  col: number;
};

export type ContributionCalendar = {
  /** 0 when GitHub's markup no longer exposes counts; the grid still renders. */
  total: number;
  days: ContributionDay[];
  weeks: number;
  from: string;
  to: string;
};

const TIMEOUT_MS = 8_000;

/**
 * Reads the public contribution calendar GitHub renders on profile pages.
 * It includes private-repo contributions when the user has enabled that on their
 * profile, which is the only way to show work done in private company repos.
 *
 * At build time a failure returns null and the section simply doesn't render.
 * During ISR regeneration a failure throws, so Next keeps serving the last good page
 * instead of caching a graph-less one for the next 12 hours.
 */
export async function getContributionCalendar(user: string): Promise<ContributionCalendar | null> {
  try {
    const html = await withTimeout(fetchCalendar(user), TIMEOUT_MS);
    const calendar = parseCalendar(html);
    if (!calendar) throw new Error('GitHub contribution markup could not be parsed');
    return calendar;
  } catch (error) {
    const regenerating = process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE !== 'phase-production-build';
    if (regenerating) throw error;
    return null;
  }
}

async function fetchCalendar(user: string) {
  const response = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
    headers: { 'User-Agent': 'nikhil-mishra-portfolio', Accept: 'text/html' },
    next: { revalidate: 43_200 },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
  return response.text();
}

// Next drops `signal` when it revalidates a stale fetch entry, so the timeout must not depend on it.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${ms} ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export function parseCalendar(html: string): ContributionCalendar | null {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)) {
    const text = match[2].replace(/<[^>]+>/g, ' ');
    const amount = /^\s*([\d,]+)\s+contributions?\b/i.exec(text);
    counts.set(match[1], amount ? Number(amount[1].replace(/,/g, '')) : 0);
  }

  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="[^"]*"[^>]*>/g)) {
    const tag = match[0];
    const date = /\bdata-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)?.[1];
    const id = /\bid="([^"]+)"/.exec(tag)?.[1];
    const level = Number(/\bdata-level="(\d)"/.exec(tag)?.[1] ?? 0);
    const position = id ? /contribution-day-component-(\d+)-(\d+)/.exec(id) : null;
    if (!date || !id || !position) continue;
    days.push({ date, level, count: counts.get(id) ?? 0, row: Number(position[1]), col: Number(position[2]) });
  }

  // A full year is ~365 cells; anything far short means the markup changed.
  if (days.length < 300) return null;

  const fromTooltips = days.reduce((sum, day) => sum + day.count, 0);
  const heading = /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i.exec(html.replace(/\s+/g, ' '));
  const fromHeading = heading ? Number(heading[1].replace(/,/g, '')) : 0;

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  return {
    total: fromTooltips || fromHeading,
    days,
    weeks: Math.max(...days.map((day) => day.col)) + 1,
    from: sorted[0].date,
    to: sorted[sorted.length - 1].date,
  };
}
