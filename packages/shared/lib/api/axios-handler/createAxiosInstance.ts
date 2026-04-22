import axios from 'axios';

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
		timeout: 5000,
		timeoutErrorMessage: 'Request timeout exceeded. Connection appears to be too slow',
		withCredentials: true
	});

	axiosInstance.interceptors.request.use(async (config) => {
		const token = await getToken();

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete config.headers.Authorization;
		}

		const method = config.method?.toUpperCase();
		if (method && !['GET', 'HEAD', 'OPTIONS'].includes(method)) {
			config.headers['Idempotency-Key'] = crypto.randomUUID();
		}

		return config;
	});
	
	return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };