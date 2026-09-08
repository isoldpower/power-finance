import { apiErrorFromEnvelope, ApiError } from "../envelope";
import { RETRY_AFTER_HEADER } from "./config.ts";
import { readNumericHeader } from "./response-headers.ts";

import type { AxiosError } from "axios";
import type { ApiErrorCode } from "../envelope";


const STATUS_CODES: Record<number, ApiErrorCode> = {
	400: 'bad_request',
	401: 'unauthorized',
	403: 'forbidden',
	404: 'not_found',
	409: 'conflict',
	422: 'validation_failed',
	429: 'rate_limited',
	503: 'service_unavailable',
};

function codeForStatus(status: number): ApiErrorCode {
	return STATUS_CODES[status] ?? 'internal_error';
}

function toApiError(error: unknown): ApiError {
	const errorResponse = (error as AxiosError | undefined)?.response;
	const errorMessage = (error as Error | undefined)?.message ?? 'Request failed';

	if (!errorResponse) {
		return new ApiError('internal_error', errorMessage, { enveloped: false });
	}

	const responseHeaders = errorResponse.headers as Record<string, unknown> | undefined;
	const options = {
		status: errorResponse.status,
		retryAfterSeconds: readNumericHeader(responseHeaders, RETRY_AFTER_HEADER),
	};

	const envelopedError = apiErrorFromEnvelope(errorResponse.data, errorMessage, options);

	return envelopedError.enveloped
		? envelopedError
		: new ApiError(codeForStatus(errorResponse.status), errorMessage, {
			...options,
			enveloped: false,
		});
}

export { codeForStatus, toApiError };
