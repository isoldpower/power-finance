import { rangeDays } from "../period";

import type { DateRange, Granularity } from "../types.ts";


const DAY_LIMIT = 45;
const WEEK_LIMIT = 200;
const MAX_BUCKETS = 400;

const autoGranularity = (range: DateRange): Granularity => {
	const days = rangeDays(range);
	if (days <= DAY_LIMIT) {
		return 'day';
	}

	return days <= WEEK_LIMIT ? 'week' : 'month';
};

const isGranularityAllowed = (range: DateRange, granularity: Granularity): boolean => {
	const days = rangeDays(range);
	const buckets = granularity === 'day' 
		? days 
		: granularity === 'week' 
			? days / 7
			: days / 30;

	return buckets <= MAX_BUCKETS && (granularity !== 'month' || days >= 28);
};

export { autoGranularity, isGranularityAllowed };
