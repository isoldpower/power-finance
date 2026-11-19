import { READ_AT_LEAST_HEADER } from "../../api/index.ts";

import type { AxiosInstance } from "axios";
import type {
	GuestDemoReadinessProbeRequest,
	GuestDemoReadinessProbeResponse,
	IGuestDemoReadinessRESTApiClient,
} from "./types.ts";


class GuestDemoReadinessHttpRESTApiClient implements IGuestDemoReadinessRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public async probe(payload: GuestDemoReadinessProbeRequest): Promise<GuestDemoReadinessProbeResponse> {
		const response = await this.axiosInstance.request({
			method: payload.probe.method,
			url: payload.probe.path,
			data: payload.probe.body,
			headers: { [READ_AT_LEAST_HEADER]: payload.writeVersion },
			validateStatus: () => true,
		});

		return { status: response.status };
	}
}

export { GuestDemoReadinessHttpRESTApiClient };
