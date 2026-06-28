import type { AxiosInstance } from "axios";

import type {
	IAutomationsRESTApiClient,
	AutomationListRequest,
	AutomationListResponse,
	AutomationToggleRequest,
	AutomationToggleResponse,
	AutomationCreateRequest,
	AutomationCreateResponse,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
} from "../types.ts";


class AutomationsDjangoRESTApiClient implements IAutomationsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public list(request: AutomationListRequest): Promise<AutomationListResponse> {
		const params = new URLSearchParams();
		if (request.params?.enabled !== undefined) params.set('enabled', String(request.params.enabled));
		if (request.params?.limit) params.set('limit', String(request.params.limit));
		if (request.params?.cursor) params.set('cursor', request.params.cursor);

		return this.axiosInstance.get<AutomationListResponse>(`/?${params.toString()}`)
			.then((response) => response.data);
	}

	public toggle(request: AutomationToggleRequest): Promise<AutomationToggleResponse> {
		return this.axiosInstance.patch<AutomationToggleResponse>(`/${request.id}/`, { enabled: request.enabled })
			.then((response) => response.data);
	}

	public create(request: AutomationCreateRequest): Promise<AutomationCreateResponse> {
		return this.axiosInstance.post<AutomationCreateResponse>(`/`, request.data)
			.then((response) => response.data);
	}

	public delete(request: AutomationDeleteRequest): Promise<AutomationDeleteResponse> {
		return this.axiosInstance.delete<AutomationDeleteResponse>(`/${request.id}/`)
			.then((response) => response.data);
	}
}

export { AutomationsDjangoRESTApiClient };
