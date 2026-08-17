import { pageFromMeta } from "@shared/api";
import { goalFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { Goal } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";

interface ListGoalsRequest {
	handler: Pick<IGoalsRESTApiClient, 'list'>;
	page?: PageParams;
}

interface ListGoalsResponse {
	page: Page<Goal>;
}

async function listGoals(request: ListGoalsRequest): Promise<ListGoalsResponse> {
	const response = await request.handler.list({ params: request.page });

	return { page: pageFromMeta(response.data.map(goalFromApi), response.meta) };
}

export { listGoals };
export type { ListGoalsRequest, ListGoalsResponse };
