import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { counterpartyRankingFromApi } from "../mutators";

import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { CounterpartyRanking } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface GetCounterpartiesRequest {
	handler: Pick<ITransactionsRESTApiClient, 'getCounterparties'>;
	query: AnalyticsQuery;
	side: LedgerSide;
	limit: number;
}

async function getCounterparties(request: GetCounterpartiesRequest): Promise<CounterpartyRanking> {
	const response = await request.handler.getCounterparties({
		params: { ...analyticsParamsToApi(request.query), type: request.side, limit: request.limit },
	});

	return counterpartyRankingFromApi(response.data, response.meta);
}

export { getCounterparties };
export type { GetCounterpartiesRequest };
