import { useMemo } from "react";

import type { AnalyticsQuery } from "@entity/filters";


const usePreviousQuery = (query: AnalyticsQuery): AnalyticsQuery => {
	return useMemo(() => {
		const since = new Date(query.range.since).getTime();
		const until = new Date(query.range.until).getTime();

		return {
			...query,
			range: {
				since: new Date(since - (until - since)).toISOString(),
				until: query.range.since,
			},
		};
	}, [query]);
};

export { usePreviousQuery };
