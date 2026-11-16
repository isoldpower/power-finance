import { useMemo } from "react";

import type { AnalyticsQuery } from "@entity/filters";


const MAX_CALENDAR_DAYS = 364;
const DAY_MS = 86_400_000;

const useCalendarQuery = (query: AnalyticsQuery): AnalyticsQuery => useMemo(() => {
	const until = new Date(query.range.until).getTime();
	const since = Math.max(new Date(query.range.since).getTime(), until - MAX_CALENDAR_DAYS * DAY_MS);

	return { ...query, range: { since: new Date(since).toISOString(), until: query.range.until } };
}, [query]);

export { useCalendarQuery };
