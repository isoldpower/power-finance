import type { Period } from "../types.ts";


const DAY_IN_MS = 24 * 60 * 60 * 1000;

const PERIOD_DAYS: Record<Period, number> = {
	'1W': 7,
	'1M': 30,
	'3M': 91,
	'1Y': 365,
};

const periodSince = (period: Period): string => {
	const since = new Date(Date.now() - PERIOD_DAYS[period] * DAY_IN_MS);
	since.setHours(0, 0, 0, 0);

	return since.toISOString();
};

export { periodSince, PERIOD_DAYS };
