import { apiErrorFromEnvelope, ApiError } from "../../envelope";
import { readNumericResponseHeader, RETRY_AFTER_HEADER } from "../headers";
import { apiErrorCodeForStatus, FALLBACK_API_ERROR_CODE } from "./api-error-code-for-status.ts";

import type { AxiosError } from "axios";
import type { ResponseHeaders } from "../headers";


const FALLBACK_FAILURE_MESSAGE = 'Request failed';

interface FailedResponseDetails {
	status: number;
	data: unknown;
	headers: ResponseHeaders;
}

function readFailedResponse(thrownFailure: unknown): FailedResponseDetails | null {
	const axiosResponse = (thrownFailure as AxiosError | undefined)?.response;

	if (!axiosResponse) {
		return null;
	}

	return {
		status: axiosResponse.status,
		data: axiosResponse.data,
		headers: axiosResponse.headers as ResponseHeaders,
	};
}

function readFailureMessage(thrownFailure: unknown): string {
	return (thrownFailure as Error | undefined)?.message ?? FALLBACK_FAILURE_MESSAGE;
}

function toApiError(thrownFailure: unknown): ApiError {
	const failureMessage = readFailureMessage(thrownFailure);
	const failedResponse = readFailedResponse(thrownFailure);

	if (failedResponse === null) {
		return new ApiError(
			FALLBACK_API_ERROR_CODE,
			failureMessage,
			{ enveloped: false },
		);
	}

	const errorOptions = {
		status: failedResponse.status,
		retryAfterSeconds: readNumericResponseHeader(
			failedResponse.headers,
			RETRY_AFTER_HEADER,
		),
	};
	const envelopedError = apiErrorFromEnvelope(
		failedResponse.data,
		failureMessage,
		errorOptions,
	);

	if (envelopedError.enveloped) {
		return envelopedError;
	}

	return new ApiError(apiErrorCodeForStatus(failedResponse.status), failureMessage, {
		...errorOptions,
		enveloped: false,
	});
}

export { toApiError };
