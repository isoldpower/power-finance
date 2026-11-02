import { readResponseHeader, WRITE_VERSION_HEADER } from "@shared/api";

import type { AxiosInstance } from "axios";
import type { ApiEnvelope, ResponseHeaders } from "@shared/api";
import type { GuestDemoSessionDto } from "../types.ts";
import type { GuestDemoSessionPostResponse, IGuestDemoSessionsRESTApiClient } from "./types.ts";


class GuestDemoSessionsHttpRESTApiClient implements IGuestDemoSessionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public async post(): Promise<GuestDemoSessionPostResponse> {
		const response = await this.axiosInstance.request<ApiEnvelope<GuestDemoSessionDto>>({
			method: 'POST',
			url: '',
		});

		return {
			body: response.data,
			writeVersion: readResponseHeader(
				response.headers as ResponseHeaders,
				WRITE_VERSION_HEADER,
			),
		};
	}
}

export { GuestDemoSessionsHttpRESTApiClient };
