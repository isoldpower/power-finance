import axios from 'axios';

import { REQUEST_TIMEOUT_MESSAGE, REQUEST_TIMEOUT_MS } from './config.ts';
import { AxiosInterceptor } from "./interceptors/interface.ts";
import { AxiosCorrelationInterceptor } from "./interceptors/correlation-interceptor.ts";
import { AxiosAuthInterceptor } from "./interceptors/auth-interceptor.ts";
import { AxiosSandboxInterceptor } from "./interceptors/sandbox-interceptor.ts";


interface AxiosInstanceOptions {
	baseUrl: string;
	getToken: () => Promise<string | null>;
	sandbox?: string;
}

const createAxiosInstance = ({
	baseUrl,
	getToken,
	sandbox
}: AxiosInstanceOptions) => {
	const axiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: REQUEST_TIMEOUT_MS,
		timeoutErrorMessage: REQUEST_TIMEOUT_MESSAGE,
		withCredentials: false
	});
	const interceptors: AxiosInterceptor[] = [
		new AxiosAuthInterceptor(getToken),
		new AxiosCorrelationInterceptor(),
		new AxiosSandboxInterceptor(sandbox),
	]

	/* The handlers are registered as closures: axios calls them detached, so a
	   bare method reference would lose the interceptor it belongs to. */
	for (const interceptor of interceptors) {
		axiosInstance.interceptors.response.use(
			(response) => interceptor.interceptResponseSuccess(response),
			(error: unknown) => interceptor.interceptResponseFault(error),
		);
		axiosInstance.interceptors.request.use(
			(config) => interceptor.interceptRequest(config)
		);
	}

	return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };
