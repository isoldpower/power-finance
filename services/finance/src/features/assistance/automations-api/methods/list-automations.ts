import { pageFromMeta } from "@shared/api";
import { automationFromApi, automationQueryToApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { Automation, AutomationQuery } from "@entity/assistance";
import type { IAutomationsRESTApiClient } from "../rest-client";

interface ListAutomationsRequest {
	handler: Pick<IAutomationsRESTApiClient, 'list'>;
	query?: AutomationQuery;
	page?: PageParams;
}

interface ListAutomationsResponse {
	page: Page<Automation>;
}

async function listAutomations(request: ListAutomationsRequest): Promise<ListAutomationsResponse> {
	const response = await request.handler.list({
		params: { ...automationQueryToApi(request.query), ...request.page },
	});

	return { page: pageFromMeta(response.data.map(automationFromApi), response.meta) };
}

export { listAutomations };
export type { ListAutomationsRequest, ListAutomationsResponse };
