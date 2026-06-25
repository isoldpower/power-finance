import {
	MoneyFlowDatasetGetRequest,
	MoneyFlowDatasetGetResponse,
	IAnalyticsRESTApiClient
} from "../rest-client/types.ts";

interface GetCategoryMoneyFlowRequest {
	handler: Pick<IAnalyticsRESTApiClient, 'getMoneyFlowDataset'>
	payload: MoneyFlowDatasetGetRequest
}

type GetCategoryMoneyFlowResponse = MoneyFlowDatasetGetResponse;

async function getMoneyFlowDataset(
	request: GetCategoryMoneyFlowRequest
): Promise<GetCategoryMoneyFlowResponse> {
	return request.handler.getMoneyFlowDataset(request.payload);
}

export { getMoneyFlowDataset };
export type { GetCategoryMoneyFlowResponse, GetCategoryMoneyFlowRequest };