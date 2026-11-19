import { UNCATEGORIZED_TOKEN } from "../types.ts";

import type { AnalyticsQuery } from "@entity/filters";
import type { AnalyticsParamsDto } from "../types.ts";


const analyticsParamsToApi = (query: AnalyticsQuery): AnalyticsParamsDto => ({
	since: query.range.since,
	until: query.range.until,
	currency: query.currency,
	timezone: query.timezone,
	wallet_id: query.walletIds.length > 0 ? [...query.walletIds] : undefined,
});

const categoryToApi = (categoryId: string | null): string => {
	return categoryId ?? UNCATEGORIZED_TOKEN;
}

export { analyticsParamsToApi, categoryToApi };
