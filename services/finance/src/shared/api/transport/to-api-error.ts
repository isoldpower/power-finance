import { apiErrorFromEnvelope, ApiError } from "../envelope";

import type { AxiosError } from "axios";


const FALLBACK_ERROR_MESSAGE = 'Request failed';

const toApiError = (error: unknown): ApiError => {
	const errorResponse = (error as AxiosError | undefined)?.response;
	const errorMessage = (error as Error | undefined)?.message ?? FALLBACK_ERROR_MESSAGE;

	if (!errorResponse) return new ApiError('internal_error', errorMessage);

	return apiErrorFromEnvelope(errorResponse.data, errorMessage);
};

export { toApiError };
