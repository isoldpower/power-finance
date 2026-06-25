import {
	ExpenditureDatasetGetRequest,
	ExpenditureDatasetGetResponse,
	IAnalyticsRESTApiClient
} from "../rest-client/types.ts";

interface GetCategoryExpenditureRequest {
	handler: Pick<IAnalyticsRESTApiClient, 'getExpenditureDataset'>
	payload: ExpenditureDatasetGetRequest
}

type GetCategoryExpenditureResponse = ExpenditureDatasetGetResponse;

async function getExpenditureDataset(
	request: GetCategoryExpenditureRequest
): Promise<GetCategoryExpenditureResponse> {
	return request.handler.getExpenditureDataset(request.payload);
}

export { getExpenditureDataset };
export type { GetCategoryExpenditureResponse, GetCategoryExpenditureRequest };