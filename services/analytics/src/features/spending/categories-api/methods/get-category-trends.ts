import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { categoryTrendsFromApi } from "../mutators";

import type { AnalyticsQuery, Granularity, LedgerSide } from "@entity/filters";
import type { CategoryTrends } from "@entity/spending";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface GetCategoryTrendsRequest {
	handler: Pick<ICategoriesRESTApiClient, 'getTrends'>;
	query: AnalyticsQuery;
	side: LedgerSide;
	granularity: Granularity;
	limit?: number;
}

async function getCategoryTrends(request: GetCategoryTrendsRequest): Promise<CategoryTrends> {
	const response = await request.handler.getTrends({
		params: {
			...analyticsParamsToApi(request.query),
			type: request.side,
			granularity: request.granularity,
			limit: request.limit,
		},
	});

	return categoryTrendsFromApi(response.data, response.meta);
}

export { getCategoryTrends };
export type { GetCategoryTrendsRequest };
