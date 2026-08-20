import { pageFromMeta } from "@shared/api";
import { actionFromApi, actionQueryToApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { Action, ActionQuery } from "@entity/assistance";
import type { IActionsRESTApiClient } from "../rest-client";


interface ListActionsRequest {
	handler: Pick<IActionsRESTApiClient, 'list'>;
	query?: ActionQuery;
	page?: PageParams;
}

interface ListActionsResponse {
	page: Page<Action>;
}

async function listActions(request: ListActionsRequest): Promise<ListActionsResponse> {
	const response = await request.handler.list({
		params: {
			...actionQueryToApi(request.query),
			...request.page,
		},
	});

	return {
		page: pageFromMeta(
			response.data.map(actionFromApi),
			response.meta,
		)
	};
}

export { listActions };
export type { ListActionsRequest, ListActionsResponse };
