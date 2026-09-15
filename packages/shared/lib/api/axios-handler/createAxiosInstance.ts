import axios from 'axios';

import {
	AUTHORIZATION_HEADER,
	CORRELATION_HEADER,
	REQUEST_TIMEOUT_MESSAGE,
	REQUEST_TIMEOUT_MS,
	SANDBOX_HEADER,
} from './config.ts';

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

	axiosInstance.interceptors.request.use(async (config) => {
		const token = await getToken();

		if (token) {
			config.headers[AUTHORIZATION_HEADER] = `Bearer ${token}`;
		} else {
			delete config.headers[AUTHORIZATION_HEADER];
		}

		config.headers[CORRELATION_HEADER] = crypto.randomUUID();

		if (sandbox) {
			config.headers[SANDBOX_HEADER] = sandbox;
		} else {
			delete config.headers[SANDBOX_HEADER];
		}

		return config;
	});

	return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };
