import { ApiError, apiErrorFromEnvelope } from "../../envelope";


const toStreamError = async (response: Response): Promise<ApiError> => {
	try {
		return apiErrorFromEnvelope(await response.json(), response.statusText);
	} catch {
		return new ApiError('internal_error', response.statusText);
	}
};

export { toStreamError };
