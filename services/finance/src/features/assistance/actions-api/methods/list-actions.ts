import type { IActionsRESTApiClient, Action } from "../types.ts";

interface ListActionsRequest {
	handler: Pick<IActionsRESTApiClient, 'list'>;
	resolved?: boolean;
	limit?: number;
}

interface ListActionsResponse {
	data: Action[];
	meta: {
		limit: number;
		offset: number;
		total: number;
	};
}

async function listActions(request: ListActionsRequest): Promise<ListActionsResponse> {
	return request.handler.list({
		params: { resolved: request.resolved ?? false, limit: request.limit },
	});
}

export { listActions };
export type { ListActionsRequest, ListActionsResponse };
