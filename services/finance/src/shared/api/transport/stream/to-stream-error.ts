import { ApiError, apiErrorFromEnvelope } from "../../envelope";
import { codeForStatus } from "../to-api-error.ts";


async function toStreamError(response: Response): Promise<ApiError> {
	const options = { status: response.status };

	try {
		const envelopedError = apiErrorFromEnvelope(await response.json(), response.statusText, options);

		return envelopedError.enveloped
			? envelopedError
			: new ApiError(codeForStatus(response.status), response.statusText, {
				...options,
				enveloped: false,
			});
	} catch {
		return new ApiError(codeForStatus(response.status), response.statusText, {
			...options,
			enveloped: false,
		});
	}
}

export { toStreamError };
