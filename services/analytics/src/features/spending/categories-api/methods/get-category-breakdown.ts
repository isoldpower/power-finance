import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { categoryBreakdownFromApi } from "../mutators";

import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { CategoryBreakdown } from "@entity/spending";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface GetCategoryBreakdownRequest {
	handler: Pick<ICategoriesRESTApiClient, 'getBreakdown'>;
	query: AnalyticsQuery;
	side: LedgerSide;
}

async function getCategoryBreakdown(request: GetCategoryBreakdownRequest): Promise<CategoryBreakdown> {
	const response = await request.handler.getBreakdown({
		params: { 
			...analyticsParamsToApi(request.query),
			type: request.side
		},
	});

	return categoryBreakdownFromApi(response.data);
}

export { getCategoryBreakdown };
export type { GetCategoryBreakdownRequest };
