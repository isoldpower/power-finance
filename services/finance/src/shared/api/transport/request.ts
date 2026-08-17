import { apiErrorFromEnvelope, ApiError } from "../envelope";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type QueryValue = string | number | boolean | string[] | undefined | null;

const WRITE_VERSION_HEADER = 'x-write-version';
const READ_AT_LEAST_HEADER = 'Read-At-Least';
const IDEMPOTENCY_HEADER = 'Idempotency-Key';

const buildQuery = (params: Record<string, QueryValue> | undefined): string => {
	if (!params) return '';

	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value)) {
			if (value.length === 0) continue;
			search.set(key, value.join(','));
			continue;
		}
		search.set(key, String(value));
	}

	const query = search.toString();

	return query ? `?${query}` : '';
};

class WriteVersionStore {
	private version: string | null = null;

	public capture(headers: Record<string, unknown> | undefined): void {
		const value = headers?.[WRITE_VERSION_HEADER];
		if (typeof value === 'string' && value.length > 0) this.version = value;
	}

	public headers(): Record<string, string> {
		return this.version ? { [READ_AT_LEAST_HEADER]: this.version } : {};
	}
}

const idempotencyHeaders = (key: string | undefined): Record<string, string> => {
	return key ? { [IDEMPOTENCY_HEADER]: key } : {};
};

const toApiError = (error: unknown): ApiError => {
	const response = (error as AxiosError | undefined)?.response;
	const message = (error as Error | undefined)?.message ?? 'Request failed';

	return response ? apiErrorFromEnvelope(response.data, message) : new ApiError('internal_error', message);
};

const request = async <TResponse>(
	instance: AxiosInstance,
	config: AxiosRequestConfig,
	versions?: WriteVersionStore,
): Promise<TResponse> => {
	try {
		const response = await instance.request<TResponse>(config);
		versions?.capture(response.headers as Record<string, unknown>);

		return response.data;
	} catch (error) {
		throw toApiError(error);
	}
};

export { buildQuery, idempotencyHeaders, request, toApiError, WriteVersionStore };
export { IDEMPOTENCY_HEADER, READ_AT_LEAST_HEADER, WRITE_VERSION_HEADER };
export type { QueryValue };
