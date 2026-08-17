import { ApiError } from "@shared/api";
import type { ApiErrorPayload } from "@shared/api/envelope/errors.ts";


const isApiError = (error: unknown): error is ApiError => {
	return error instanceof ApiError;
}

const isApiErrorEnvelope = (payload: unknown): payload is ApiErrorPayload => {
	if (typeof payload !== 'object' || payload === null) {
		return false;
	}

	const candidate = (payload as { error?: unknown }).error;

	return typeof candidate === 'object' && candidate !== null && 'code' in candidate;
};

const apiErrorFromEnvelope = (payload: unknown, fallbackMessage: string): ApiError => {
	if (!isApiErrorEnvelope(payload)) {
		return new ApiError('internal_error', fallbackMessage);
	}

	return new ApiError(
		payload.error.code,
		payload.error.message,
		payload.error.details ?? [],
		payload.meta?.request_id ?? null,
	);
};

export { isApiError, isApiErrorEnvelope, apiErrorFromEnvelope };