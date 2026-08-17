import { actionFromApi } from "../mutators";
import type { Action } from "@entity/assistance";
import type { IActionsRESTApiClient } from "../rest-client";

interface ResolveActionRequest {
	handler: Pick<IActionsRESTApiClient, 'resolve'>;
	id: string;
	resolutionId: string;
	idempotencyKey?: string;
}

type ResolveActionResponse = Action;

async function resolveAction(request: ResolveActionRequest): Promise<ResolveActionResponse> {
	const response = await request.handler.resolve({
		id: request.id,
		data: { resolution_id: request.resolutionId },
		idempotencyKey: request.idempotencyKey,
	});

	return actionFromApi(response.data);
}

export { resolveAction };
export type { ResolveActionRequest, ResolveActionResponse };
