import { balanceMetricsFromApi } from "../mutators";

import type { BalanceMetrics } from "@entity/metrics";
import type { IMetricsRESTApiClient } from "../rest-client";


interface GetBalanceMetricsRequest {
	handler: Pick<IMetricsRESTApiClient, 'balance'>;
}

type GetBalanceMetricsResponse = BalanceMetrics;

async function getBalanceMetrics(request: GetBalanceMetricsRequest): Promise<GetBalanceMetricsResponse> {
	const response = await request.handler.balance({});

	return balanceMetricsFromApi(response.data);
}

export { getBalanceMetrics };
export type { GetBalanceMetricsRequest, GetBalanceMetricsResponse };
