import {
	BalanceHistoryDatasetGetRequest,
	BalanceHistoryDatasetGetResponse,
	IAnalyticsRESTApiClient
} from "../rest-client/types.ts";

interface GetBalanceHistoryRequest {
	handler: Pick<IAnalyticsRESTApiClient, 'getBalanceHistoryDataset'>
	payload: BalanceHistoryDatasetGetRequest
}

type GetBalanceHistoryResponse = BalanceHistoryDatasetGetResponse;

async function getBalanceHistoryDataset(
	request: GetBalanceHistoryRequest
): Promise<GetBalanceHistoryResponse> {
	return request.handler.getBalanceHistoryDataset(request.payload);
}

export { getBalanceHistoryDataset };
export type { GetBalanceHistoryResponse, GetBalanceHistoryRequest };