import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { overviewFromApi } from "../mutators";

import type { AnalyticsQuery } from "@entity/filters";
import type { Overview } from "@entity/overview";
import type { IOverviewRESTApiClient } from "../rest-client";


interface GetOverviewRequest {
	handler: Pick<IOverviewRESTApiClient, 'getOverview'>;
	query: AnalyticsQuery;
}

async function getOverview(request: GetOverviewRequest): Promise<Overview> {
	const response = await request.handler.getOverview({
		params: analyticsParamsToApi(request.query) 
	});

	return overviewFromApi(response.data);
}

export { getOverview };
export type { GetOverviewRequest };
