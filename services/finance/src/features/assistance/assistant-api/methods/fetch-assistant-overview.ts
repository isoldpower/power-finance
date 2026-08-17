import { overviewFromApi } from "../mutators";
import type { AssistantOverview } from "@entity/assistance";
import type { IAssistantRESTApiClient } from "../rest-client";

interface FetchAssistantOverviewRequest {
	handler: Pick<IAssistantRESTApiClient, 'overview'>;
}

type FetchAssistantOverviewResponse = AssistantOverview;

async function fetchAssistantOverview(
	request: FetchAssistantOverviewRequest
): Promise<FetchAssistantOverviewResponse> {
	const response = await request.handler.overview({});

	return overviewFromApi(response.data);
}

export { fetchAssistantOverview };
export type { FetchAssistantOverviewRequest, FetchAssistantOverviewResponse };
