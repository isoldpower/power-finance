import type { AxiosInstance } from "axios";

import type {
	AssistantContentGetRequest,
	AssistantContentGetResponse,
	IAssistantRESTApiClient,
} from "../types.ts";


class AssistantDjangoRESTApiClient implements IAssistantRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	getContent(
		request: AssistantContentGetRequest
	): Promise<AssistantContentGetResponse> {
		return this.axiosInstance.get<AssistantContentGetResponse>('/', { params: request.params })
			.then((response) => response.data);
	}
}

export { AssistantDjangoRESTApiClient };
