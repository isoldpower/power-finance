import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { moneyFlowFromApi } from "../mutators";

import type { AnalyticsQuery } from "@entity/filters";
import type { MoneyFlow } from "@entity/flow";
import type { IMoneyFlowRESTApiClient } from "../rest-client";


interface GetMoneyFlowRequest {
	handler: Pick<IMoneyFlowRESTApiClient, 'getMoneyFlow'>;
	query: AnalyticsQuery;
}

async function getMoneyFlow(request: GetMoneyFlowRequest): Promise<MoneyFlow> {
	const response = await request.handler.getMoneyFlow({ 
		params: analyticsParamsToApi(request.query)
	});

	return moneyFlowFromApi(response.data);
}

export { getMoneyFlow };
export type { GetMoneyFlowRequest };
