import {
	CategoryDatasetGetRequest,
	CategoryDatasetGetResponse,
	IAnalyticsRESTApiClient
} from "../rest-client/types.ts";

interface GetCategoryDatasetRequest {
	handler: Pick<IAnalyticsRESTApiClient, 'getCategoryDataset'>
	payload: CategoryDatasetGetRequest
}

type GetCategoryDatasetResponse = CategoryDatasetGetResponse;

async function getCategoryDataset(
	request: GetCategoryDatasetRequest
): Promise<GetCategoryDatasetResponse> {
	return request.handler.getCategoryDataset(request.payload);
}

export { getCategoryDataset };
export type { GetCategoryDatasetResponse, GetCategoryDatasetRequest };