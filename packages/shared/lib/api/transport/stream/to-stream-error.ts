import { ApiError, apiErrorFromEnvelope } from "../../envelope";
import { apiErrorCodeForStatus } from "../errors";


function toStatusApiError(streamResponse: Response): ApiError {
	return new ApiError(
		apiErrorCodeForStatus(streamResponse.status),
		streamResponse.statusText,
		{ status: streamResponse.status, enveloped: false }
	);
}

async function toStreamError(streamResponse: Response): Promise<ApiError> {
	try {
		const envelopedError = apiErrorFromEnvelope(
			await streamResponse.json(),
			streamResponse.statusText,
			{ status: streamResponse.status },
		);

		return envelopedError.enveloped 
			? envelopedError 
			: toStatusApiError(streamResponse);
	} catch {
		return toStatusApiError(streamResponse);
	}
}

export { toStreamError };
