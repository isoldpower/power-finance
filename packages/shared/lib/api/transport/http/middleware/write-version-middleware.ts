import { withAdditionalHeaders } from "./with-additional-headers.ts";

import type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult } from "./types.ts";


async function carryWriteVersion(
	requestContext: HttpRequestContext,
	sendNext: HttpRequestHandler,
): Promise<HttpResponseResult> {
	const writeVersionStore = requestContext.writeVersionStore;

	if (writeVersionStore === undefined) {
		return sendNext(requestContext);
	}

	const responseResult = await sendNext(withAdditionalHeaders(
		requestContext,
		writeVersionStore.readAtLeastHeaders(),
	));
	writeVersionStore.captureWriteVersion(responseResult.headers);

	return responseResult;
}

const writeVersionMiddleware: HttpMiddleware = {
	name: 'write-version',
	handle: carryWriteVersion,
};

export { writeVersionMiddleware };
