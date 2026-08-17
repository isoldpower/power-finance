import type { CollectionResponse, MutationResponse } from "@shared/api";
import type { ActionDto, ActionListParams, ActionResolveBody } from "../types.ts";


interface ActionListRequest {
	params?: ActionListParams;
}

type ActionListResponse = CollectionResponse<ActionDto>;

interface ActionResolveRequest {
	id: string;
	data: ActionResolveBody;
	idempotencyKey?: string;
}

type ActionResolveResponse = MutationResponse<ActionDto>;

interface IActionsRESTApiClient {
	list: (request: ActionListRequest) => Promise<ActionListResponse>;
	resolve: (request: ActionResolveRequest) => Promise<ActionResolveResponse>;
}

export type {
	IActionsRESTApiClient,
	ActionListRequest,
	ActionListResponse,
	ActionResolveRequest,
	ActionResolveResponse,
};
