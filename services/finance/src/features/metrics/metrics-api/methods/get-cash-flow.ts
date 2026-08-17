import { cashFlowFromApi } from "../mutators";
import type { CashFlow } from "@entity/metrics";
import type { IMetricsRESTApiClient } from "../rest-client";

interface GetCashFlowRequest {
	handler: Pick<IMetricsRESTApiClient, 'cashFlow'>;
	since?: string;
}

type GetCashFlowResponse = CashFlow;

async function getCashFlow(request: GetCashFlowRequest): Promise<GetCashFlowResponse> {
	const response = await request.handler.cashFlow({ params: { since: request.since } });

	return cashFlowFromApi(response.data);
}

export { getCashFlow };
export type { GetCashFlowRequest, GetCashFlowResponse };
