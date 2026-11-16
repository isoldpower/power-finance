import type { DateRange, PeriodPreset } from "../types.ts";


type FixedPreset = Exclude<PeriodPreset, 'custom'>;

const DAY_MS = 86_400_000;

const PRESET_DAYS: Record<Exclude<FixedPreset, 'YTD'>, number> = {
	'1M': 30,
	'3M': 91,
	'6M': 182,
	'1Y': 365,
};

const startOfDay = (instant: number): Date => {
	const date = new Date(instant);
	date.setHours(0, 0, 0, 0);

	return date;
};

const shiftDays = (date: Date, days: number): Date => {
	const shifted = new Date(date);
	shifted.setDate(shifted.getDate() + days);

	return shifted;
};

const presetRange = (preset: FixedPreset, now: number): DateRange => {
	const until = shiftDays(startOfDay(now), 1);
	const since = preset === 'YTD'
		? new Date(until.getFullYear(), 0, 1)
		: shiftDays(until, -PRESET_DAYS[preset]);

	return { since: since.toISOString(), until: until.toISOString() };
};

const rangeDays = (range: DateRange): number => {
	const sinceMs = new Date(range.since).getTime();
	const untilMs = new Date(range.until).getTime();
	const durationMs = untilMs - sinceMs;

	return Math.round(durationMs / DAY_MS);
};

const dayRange = (date: string): DateRange => {
	const [year, month, day] = date.split('-').map(Number);
	const since = new Date(year, month - 1, day);

	return { 
		since: since.toISOString(),
		until: shiftDays(since, 1).toISOString()
	};
};

export { dayRange, presetRange, rangeDays };
export type { FixedPreset };
