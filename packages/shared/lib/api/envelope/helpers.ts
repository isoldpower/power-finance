import { ApiError, ApiErrorPayload } from "./errors.ts";

import type { ApiErrorOptions } from "./errors.ts";


const QUOTA_EXHAUSTED_CODE = 'assistant_quota_exhausted';

function isApiError(error: unknown): error is ApiError {
	return error instanceof ApiError;
}

function isQuotaExhausted(error: unknown): boolean {
	return isApiError(error) && error.code === QUOTA_EXHAUSTED_CODE;
}

function isApiErrorEnvelope(payload: unknown): payload is ApiErrorPayload {
	if (typeof payload !== 'object' || payload === null) {
		return false;
	}

	const candidate = (payload as { error?: unknown }).error;
	return typeof candidate === 'object' && candidate !== null && 'code' in candidate;
}

function apiErrorFromEnvelope(
	payload: unknown,
	fallbackMessage: string,
	options: ApiErrorOptions = {},
): ApiError {
	if (!isApiErrorEnvelope(payload)) {
		return new ApiError('internal_error', fallbackMessage, {
			...options,
			enveloped: false,
		});
	}

	return new ApiError(payload.error.code, payload.error.message, {
		...options,
		details: payload.error.details ?? [],
		requestId: payload.meta?.request_id ?? null,
		enveloped: true,
	});
}

export { isApiError, isApiErrorEnvelope, isQuotaExhausted, apiErrorFromEnvelope };
