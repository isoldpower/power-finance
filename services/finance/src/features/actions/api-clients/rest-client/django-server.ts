import type { AxiosInstance } from "axios";

import type {
	IActionsRESTApiClient,
	ActionListRequest,
	ActionListResponse,
	ActionResolveRequest,
	ActionResolveResponse,
} from "../types.ts";


class ActionsDjangoRESTApiClient implements IActionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public list(request: ActionListRequest): Promise<ActionListResponse> {
		const params = new URLSearchParams();
		params.set('resolved', String(request.params?.resolved ?? false));
		if (request.params?.limit) params.set('limit', String(request.params.limit));
		if (request.params?.cursor) params.set('cursor', request.params.cursor);

		return this.axiosInstance.get<ActionListResponse>(`/?${params.toString()}`)
			.then((response) => response.data);
	}

	public resolve(request: ActionResolveRequest): Promise<ActionResolveResponse> {
		return this.axiosInstance.post<ActionResolveResponse>(`/${request.id}/resolve/`)
			.then((response) => response.data);
	}
}

export { ActionsDjangoRESTApiClient };
