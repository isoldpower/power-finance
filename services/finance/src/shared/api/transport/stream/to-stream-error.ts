import { ApiError, apiErrorFromEnvelope } from "../../envelope";


async function toStreamError(response: Response): Promise<ApiError> {
	try {
		return apiErrorFromEnvelope(await response.json(), response.statusText);
	} catch {
		return new ApiError('internal_error', response.statusText);
	}
}

export { toStreamError };
