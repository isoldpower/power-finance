import type { IAutomationsRESTApiClient, AutomationRule } from "../types.ts";

interface ListAutomationsRequest {
	handler: Pick<IAutomationsRESTApiClient, 'list'>;
	enabled?: boolean;
	limit?: number;
}

interface ListAutomationsResponse {
	data: AutomationRule[];
	meta: {
		limit: number;
		offset: number;
		total: number;
	};
}

async function listAutomations(request: ListAutomationsRequest): Promise<ListAutomationsResponse> {
	return request.handler.list({
		params: { enabled: request.enabled, limit: request.limit },
	});
}

export { listAutomations };
export type { ListAutomationsRequest, ListAutomationsResponse };
