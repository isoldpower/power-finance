import { toApiError } from "../../errors";

import type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult } from "./types.ts";


async function translateFailures(
	requestContext: HttpRequestContext,
	sendNext: HttpRequestHandler,
): Promise<HttpResponseResult> {
	try {
		return await sendNext(requestContext);
	} catch (thrownFailure) {
		throw toApiError(thrownFailure);
	}
}

const errorTranslationMiddleware: HttpMiddleware = {
	name: 'error-translation',
	handle: translateFailures,
};

export { errorTranslationMiddleware };
