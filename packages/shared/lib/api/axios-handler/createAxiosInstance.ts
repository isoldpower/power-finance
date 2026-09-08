import axios from 'axios';

import {
	AUTHORIZATION_HEADER,
	CORRELATION_HEADER,
	REQUEST_TIMEOUT_MESSAGE,
	REQUEST_TIMEOUT_MS,
} from './config.ts';

interface AxiosInstanceOptions {
	baseUrl: string;
	getToken: () => Promise<string | null>;
}

const createAxiosInstance = ({
	baseUrl,
	getToken
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

		return config;
	});

	return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };
