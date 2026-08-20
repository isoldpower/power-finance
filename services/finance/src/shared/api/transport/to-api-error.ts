import { apiErrorFromEnvelope, ApiError } from "../envelope";

import type { AxiosError } from "axios";


function toApiError(error: unknown): ApiError {
	const errorResponse = (error as AxiosError | undefined)?.response;
	const errorMessage = (error as Error | undefined)?.message ?? 'Request failed';

	if (!errorResponse) {
		return new ApiError('internal_error', errorMessage);
	}

	return apiErrorFromEnvelope(errorResponse.data, errorMessage);
}

export { toApiError };
