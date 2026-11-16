import type { AxiosInstance } from "axios";
import type { ApiEnvelope } from "../../api/index.ts";
import type { DemoSessionDto, IDemoSessionsRESTApiClient } from "./types.ts";


class DemoSessionsHttpRESTApiClient implements IDemoSessionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public async issue(): Promise<ApiEnvelope<DemoSessionDto>> {
		const response = await this.axiosInstance.request<ApiEnvelope<DemoSessionDto>>({
			method: 'POST',
			url: '',
		});

		return response.data;
	}
}

export { DemoSessionsHttpRESTApiClient };
