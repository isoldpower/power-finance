import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getSpendingCalendar } from "../patterns-api";
import { SPENDING_CACHE_KEYS } from "./cache-config.ts";
import { useCalendarQuery } from "./calendar-partials/use-calendar-query.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery } from "@entity/filters";
import type { SpendingCalendar } from "@entity/spending";


type UseSpendingCalendarReturn = UseQueryResult<SpendingCalendar> & {
	calendar: SpendingCalendar | undefined;
	clamped: boolean;
};

const useSpendingCalendar = (query: AnalyticsQuery): UseSpendingCalendarReturn => {
	const { patternServers } = useApiContext();
	const calendarQuery = useCalendarQuery(query);

	const result = useQuery({
		queryKey: [SPENDING_CACHE_KEYS.calendar, calendarQuery],
		queryFn: () => getSpendingCalendar({ handler: patternServers.rest, query: calendarQuery }),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({
		...result,
		calendar: result.data,
		clamped: calendarQuery.range.since !== query.range.since,
	}), [result, calendarQuery, query]);
};

export { useSpendingCalendar };
export type { UseSpendingCalendarReturn };
