import type {
	IListHandler,
	ListRequest,
	ListResponse,
	DeleteResponse,
} from "@internal/shared";

import type { Action } from "@entity/assistance";


interface ActionListParams {
	resolved?: boolean;
	limit?: number;
	cursor?: string;
}

type ActionListRequest = ListRequest<ActionListParams>;
type ActionListResponse = ListResponse<Action>;

interface ActionResolveRequest {
	id: string;
}

type ActionResolveResponse = DeleteResponse;

interface IActionsRESTApiClient extends IListHandler<Action, ActionListParams> {
	resolve: (request: ActionResolveRequest) => Promise<ActionResolveResponse>;
}

export type {
	Action,
	ActionListParams,
	ActionListRequest,
	ActionListResponse,
	ActionResolveRequest,
	ActionResolveResponse,
	IActionsRESTApiClient,
};
