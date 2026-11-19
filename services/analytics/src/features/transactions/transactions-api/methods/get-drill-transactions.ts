import { analyticsParamsToApi } from "@feature/filters/ledger-api";
import { drillTransactionsFromApi, transactionsFilterToApi } from "../mutators";

import type { AnalyticsQuery } from "@entity/filters";
import type { DrillTransactions, TransactionsFilter, TransactionsOrder } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface GetDrillTransactionsRequest {
	handler: Pick<ITransactionsRESTApiClient, 'getTransactions'>;
	query: AnalyticsQuery;
	filter: TransactionsFilter;
	order: TransactionsOrder;
	limit: number;
}

async function getDrillTransactions(request: GetDrillTransactionsRequest): Promise<DrillTransactions> {
	const response = await request.handler.getTransactions({
		params: {
			...analyticsParamsToApi(request.query),
			...transactionsFilterToApi(request.filter),
			order: request.order,
			limit: request.limit,
		},
	});

	return drillTransactionsFromApi(response.data, response.meta);
}

export { getDrillTransactions };
export type { GetDrillTransactionsRequest };
