import { toApiError } from "./to-api-error.ts";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { WriteVersionStore } from "./write-version-store.ts";


const request = async <TResponse>(
	instance: AxiosInstance,
	requestConfig: AxiosRequestConfig,
	writeVersions?: WriteVersionStore,
): Promise<TResponse> => {
	try {
		const response = await instance.request<TResponse>(requestConfig);
		writeVersions?.capture(response.headers as Record<string, unknown>);

		return response.data;
	} catch (error) {
		throw toApiError(error);
	}
};

export { request };
