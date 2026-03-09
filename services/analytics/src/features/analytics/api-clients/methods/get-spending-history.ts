import {
	SpendingHeatmapDatasetGetRequest,
	SpendingHeatmapDatasetGetResponse,
	IAnalyticsRESTApiClient
} from "../rest-client/types.ts";

interface GetCategorySpendingHeatmapRequest {
	handler: Pick<IAnalyticsRESTApiClient, 'getSpendingHeatmapDataset'>
	payload: SpendingHeatmapDatasetGetRequest
}

type GetCategorySpendingHeatmapResponse = SpendingHeatmapDatasetGetResponse;

async function getSpendingHeatmapDataset(
	request: GetCategorySpendingHeatmapRequest
): Promise<GetCategorySpendingHeatmapResponse> {
	return request.handler.getSpendingHeatmapDataset(request.payload);
}

export { getSpendingHeatmapDataset };
export type { GetCategorySpendingHeatmapResponse, GetCategorySpendingHeatmapRequest };