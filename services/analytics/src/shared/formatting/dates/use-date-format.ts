import { useCallback } from "react";
import { resolveLocale, useSettingsContext } from "@internal/shared";

import type { BucketUnit } from "./types.ts";


interface DateFormatters {
	formatDay: (iso: string) => string;
	formatBucket: (iso: string, unit: BucketUnit) => string;
	formatRange: (since: string, until: string) => string;
	formatDateTime: (iso: string) => string;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const BUCKET_OPTIONS: Record<BucketUnit, Intl.DateTimeFormatOptions> = {
	day: { month: 'short', day: 'numeric' },
	week: { month: 'short', day: 'numeric' },
	month: { month: 'short', year: '2-digit' },
};

const useDateFormat = (): DateFormatters => {
	const { locale } = useSettingsContext();
	const safeLocale = resolveLocale(locale);

	const formatDay = useCallback((iso: string) => new Date(iso).toLocaleDateString(safeLocale, {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	}), [safeLocale]);

	const formatBucket = useCallback((iso: string, unit: BucketUnit) => {
		return new Date(iso).toLocaleDateString(safeLocale, BUCKET_OPTIONS[unit]);
	}, [safeLocale]);

	const formatRange = useCallback((since: string, until: string) => {
		const lastDay = new Date(new Date(until).getTime() - DAY_MS);
		const formatter = new Intl.DateTimeFormat(safeLocale, { month: 'short', day: 'numeric', year: 'numeric' });

		return `${formatter.format(new Date(since))} – ${formatter.format(lastDay)}`;
	}, [safeLocale]);

	const formatDateTime = useCallback((iso: string) => new Date(iso).toLocaleString(safeLocale, {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}), [safeLocale]);

	return { formatDay, formatBucket, formatRange, formatDateTime };
};

export { useDateFormat };
export type { DateFormatters };
