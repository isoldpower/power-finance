import { pageFromMeta } from "@shared/api";
import { automationFromApi, automationSearchToApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { Automation, AutomationSearchQuery } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";


interface SearchAutomationsRequest {
	handler: Pick<IAutomationsRESTApiClient, 'search'>;
	query: AutomationSearchQuery;
	page?: PageParams;
}

interface SearchAutomationsResponse {
	page: Page<Automation>;
}

async function searchAutomations(
	request: SearchAutomationsRequest,
): Promise<SearchAutomationsResponse> {
	const response = await request.handler.search({
		data: automationSearchToApi(request.query),
		params: request.page,
	});

	return { page: pageFromMeta(response.data.map(automationFromApi), response.meta) };
}

export { searchAutomations };
export type { SearchAutomationsRequest, SearchAutomationsResponse };
