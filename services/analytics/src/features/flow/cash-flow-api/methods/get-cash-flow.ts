import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { cashFlowFromApi } from "../mutators";

import type { AnalyticsQuery, Granularity } from "@entity/filters";
import type { CashFlow } from "@entity/flow";
import type { ICashFlowRESTApiClient } from "../rest-client";


interface GetCashFlowRequest {
	handler: Pick<ICashFlowRESTApiClient, 'getCashFlow'>;
	query: AnalyticsQuery;
	granularity: Granularity;
}

async function getCashFlow(request: GetCashFlowRequest): Promise<CashFlow> {
	const response = await request.handler.getCashFlow({
		params: { 
			...analyticsParamsToApi(request.query), 
			granularity: request.granularity 
		},
	});

	return cashFlowFromApi(response.data, response.meta);
}

export { getCashFlow };
export type { GetCashFlowRequest };
