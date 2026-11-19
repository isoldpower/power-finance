import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { balanceHistoryFromApi } from "../mutators";

import type { AnalyticsQuery } from "@entity/filters";
import type { BalanceHistory } from "@entity/flow";
import type { IBalancesRESTApiClient } from "../rest-client";


interface GetBalanceHistoryRequest {
	handler: Pick<IBalancesRESTApiClient, 'getBalanceHistory'>;
	query: AnalyticsQuery;
	points: number;
}

async function getBalanceHistory(request: GetBalanceHistoryRequest): Promise<BalanceHistory> {
	const response = await request.handler.getBalanceHistory({
		params: { 
			...analyticsParamsToApi(request.query), 
			points: request.points
		},
	});

	return balanceHistoryFromApi(response.data);
}

export { getBalanceHistory };
export type { GetBalanceHistoryRequest };
