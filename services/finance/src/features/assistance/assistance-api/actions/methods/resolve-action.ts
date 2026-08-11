import type { IActionsRESTApiClient, ActionResolveResponse } from "../types.ts";

interface ResolveActionRequest {
	handler: Pick<IActionsRESTApiClient, 'resolve'>;
	id: string;
}

type ResolveActionResponse = ActionResolveResponse;

async function resolveAction(request: ResolveActionRequest): Promise<ResolveActionResponse> {
	return request.handler.resolve({ id: request.id });
}

export { resolveAction };
export type { ResolveActionRequest, ResolveActionResponse };
