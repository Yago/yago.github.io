import { type ReactElement, useEffect, useState } from 'react';

const CONTRIBUTIONS_URL =
  'https://github-contributions-api.jogruber.de/v4/Yago?y=last';

const WEEKDAY_LABELS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
] as const;
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

const CELL = 11;
const GAP = 3;
const WEEK_COUNT = 53;
const LABEL_COLUMN = 30;
const MONTH_ROW = 16;

type Level = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  date: string;
  count: number;
  level: Level;
};

type MonthLabel = {
  index: number;
  text: string;
};

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const isLevel = (value: unknown): value is Level =>
  value === 0 || value === 1 || value === 2 || value === 3 || value === 4;

const isContributionDay = (value: unknown): value is ContributionDay => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('date' in value) || !('count' in value) || !('level' in value))
    return false;

  return (
    typeof value.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    typeof value.count === 'number' &&
    isLevel(value.level)
  );
};

const isContributionYear = (
  value: unknown,
): value is { contributions: ContributionDay[] } => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('contributions' in value)
  ) {
    return false;
  }

  return (
    Array.isArray(value.contributions) &&
    value.contributions.every(isContributionDay)
  );
};

const parseIsoDate = (iso: string): Date => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const emptyWeeks = (): (ContributionDay | null)[][] =>
  Array.from({ length: WEEK_COUNT }, () =>
    Array.from({ length: 7 }, () => null),
  );

const toWeeks = (
  days: readonly ContributionDay[],
): (ContributionDay | null)[][] => {
  if (days.length === 0) return emptyWeeks();

  const leading = parseIsoDate(days[0].date).getDay();
  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...days,
  ];
  const weeks: (ContributionDay | null)[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    const week = cells.slice(index, index + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
};

const monthLabelsFor = (
  weeks: readonly (readonly (ContributionDay | null)[])[],
): readonly MonthLabel[] => {
  const labels: MonthLabel[] = [];
  let previousMonth = -1;
  let previousIndex = -3;

  weeks.forEach((week, index) => {
    const sample = week.find((day) => day !== null);
    if (!sample) return;

    const month = parseIsoDate(sample.date).getMonth();
    if (month === previousMonth) return;

    previousMonth = month;
    if (index - previousIndex < 2) return;

    labels.push({ index, text: MONTH_LABELS[month] });
    previousIndex = index;
  });

  return labels;
};

const cellTitle = (day: ContributionDay): string => {
  const formatted = dateFormat.format(parseIsoDate(day.date));
  if (day.count === 0) return `No contributions on ${formatted}`;
  if (day.count === 1) return `1 contribution on ${formatted}`;
  return `${day.count} contributions on ${formatted}`;
};

const graphSize = (weekCount: number): { width: number; height: number } => ({
  width: LABEL_COLUMN + weekCount * (CELL + GAP) - GAP,
  height: MONTH_ROW + 7 * (CELL + GAP) - GAP,
});

/**
 * GitHub contribution calendar for the last 12 months.
 * Draws an empty grid until the public contributions API answers.
 */
const ContributionGraph = (): ReactElement => {
  const [days, setDays] = useState<readonly ContributionDay[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await fetch(CONTRIBUTIONS_URL, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const body: unknown = await response.json();
        if (!isContributionYear(body)) return;

        setDays(body.contributions);
      } catch {
        return;
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  const weeks = days === null ? emptyWeeks() : toWeeks(days);
  const { width, height } = graphSize(weeks.length);
  const months = monthLabelsFor(weeks);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="contrib-graph h-auto w-full"
      role="img"
      aria-label="GitHub contributions over the last 12 months"
    >
      {months.map((month) => (
        <text
          key={month.text + month.index}
          x={LABEL_COLUMN + month.index * (CELL + GAP)}
          y={11}
          className="contrib-label"
        >
          {month.text}
        </text>
      ))}
      {WEEKDAY_LABELS.map((label, dayIndex) => (
        <text
          key={label}
          x={0}
          y={MONTH_ROW + dayIndex * (CELL + GAP) + CELL / 2}
          className="contrib-label"
          dominantBaseline="middle"
        >
          {label}
        </text>
      ))}
      {weeks.map((week, weekIndex) =>
        week.map((day, dayIndex) => {
          const x = LABEL_COLUMN + weekIndex * (CELL + GAP);
          const y = MONTH_ROW + dayIndex * (CELL + GAP);

          return (
            <rect
              key={day?.date ?? `empty-${weekIndex}-${dayIndex}`}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx={2}
              className={day ? `contrib-${day.level}` : 'contrib-0'}
            >
              {day && <title>{cellTitle(day)}</title>}
            </rect>
          );
        }),
      )}
    </svg>
  );
};

export default ContributionGraph;
