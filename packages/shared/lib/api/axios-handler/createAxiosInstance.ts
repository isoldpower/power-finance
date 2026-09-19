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

	for (const interceptor of interceptors) {
		axiosInstance.interceptors.response.use(
			interceptor.interceptResponseSuccess,
			interceptor.interceptResponseFault,
		);
		axiosInstance.interceptors.request.use(
			interceptor.interceptRequest
		);
	}

	return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };
