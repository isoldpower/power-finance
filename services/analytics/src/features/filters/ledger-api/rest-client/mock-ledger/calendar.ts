import { ApiError } from "@internal/shared";

import type { LedgerWindow } from "./types.ts";


type BucketGranularity = 'day' | 'week' | 'month';

interface Bucket {
	start: number;
	end: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_GRANULARITY_LIMIT_DAYS = 45;
const WEEK_GRANULARITY_LIMIT_DAYS = 200;
const MAX_BUCKETS = 400;

const startOfLocalDay = (instant: number): number => {
	const date = new Date(instant);
	date.setHours(0, 0, 0, 0);

	return date.getTime();
};

const addLocalDays = (instant: number, days: number): number => {
	const date = new Date(instant);
	date.setDate(date.getDate() + days);

	return date.getTime();
};

const isoWeekday = (instant: number): number => {
	const day = new Date(instant).getDay();

	return day === 0 ? 7 : day;
};

const localHour = (instant: number): number => new Date(instant).getHours();

const startOfLocalWeek = (instant: number): number => addLocalDays(startOfLocalDay(instant), 1 - isoWeekday(instant));

const startOfLocalMonth = (instant: number): number => {
	const date = new Date(startOfLocalDay(instant));
	date.setDate(1);

	return date.getTime();
};

const addLocalMonths = (instant: number, months: number): number => {
	const date = new Date(instant);
	date.setMonth(date.getMonth() + months);

	return date.getTime();
};

const pad = (value: number): string => value.toString().padStart(2, '0');

const localDayKey = (instant: number): string => {
	const date = new Date(instant);

	return `${date.getFullYear().toString()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const resolveGranularity = (requested: string | undefined, window: LedgerWindow): BucketGranularity => {
	if (requested === 'day' || requested === 'week' || requested === 'month') {
		return requested;
	}

	const days = (window.until - window.since) / DAY_MS;
	if (days <= DAY_GRANULARITY_LIMIT_DAYS) {
		return 'day';
	}

	return days <= WEEK_GRANULARITY_LIMIT_DAYS ? 'week' : 'month';
};

const alignStart = (instant: number, granularity: BucketGranularity): number => {
	if (granularity === 'day') {
		return startOfLocalDay(instant);
	}

	return granularity === 'week' ? startOfLocalWeek(instant) : startOfLocalMonth(instant);
};

const advance = (instant: number, granularity: BucketGranularity): number => {
	if (granularity === 'day') {
		return addLocalDays(instant, 1);
	}

	return granularity === 'week' ? addLocalDays(instant, 7) : addLocalMonths(instant, 1);
};

const buildBuckets = (window: LedgerWindow, granularity: BucketGranularity): Bucket[] => {
	const buckets: Bucket[] = [];
	let cursor = alignStart(window.since, granularity);

	while (cursor < window.until) {
		const next = advance(cursor, granularity);
		buckets.push({ start: Math.max(cursor, window.since), end: Math.min(next, window.until) });
		cursor = next;

		if (buckets.length > MAX_BUCKETS) {
			throw new ApiError('validation_failed', 'Too many buckets for the requested granularity', {
				details: [{ field: 'granularity', code: 'granularity_too_fine', message: 'Choose a coarser granularity' }],
			});
		}
	}

	return buckets;
};

const bucketIndexOf = (buckets: Bucket[], instant: number): number => {
	let low = 0;
	let high = buckets.length - 1;

	while (low <= high) {
		const middle = (low + high) >> 1;
		const bucket = buckets[middle];

		if (instant < bucket.start) {
			high = middle - 1;
		}
		else if (instant >= bucket.end) {
			low = middle + 1;
		}
		else {
			return middle;
		}
	}

	return -1;
};

const buildDays = (window: LedgerWindow): Bucket[] => buildBuckets(window, 'day');

export {
	addLocalDays,
	bucketIndexOf,
	buildBuckets,
	buildDays,
	DAY_MS,
	isoWeekday,
	localDayKey,
	localHour,
	resolveGranularity,
	startOfLocalDay,
};
export type { Bucket, BucketGranularity };
