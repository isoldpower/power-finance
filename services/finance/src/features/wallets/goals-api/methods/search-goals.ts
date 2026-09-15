import { pageFromMeta } from "@shared/api";
import { goalFromApi, goalQueryToApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { Goal, GoalQuery } from "@entity/wallets";
import type { IGoalsRESTApiClient } from "../rest-client";


interface SearchGoalsRequest {
	handler: Pick<IGoalsRESTApiClient, 'search'>;
	query: GoalQuery;
	page?: PageParams;
}

interface SearchGoalsResponse {
	page: Page<Goal>;
}

async function searchGoals(request: SearchGoalsRequest): Promise<SearchGoalsResponse> {
	const response = await request.handler.search({
		data: goalQueryToApi(request.query),
		params: request.page,
	});

	return { page: pageFromMeta(response.data.map(goalFromApi), response.meta) };
}

export { searchGoals };
export type { SearchGoalsRequest, SearchGoalsResponse };
