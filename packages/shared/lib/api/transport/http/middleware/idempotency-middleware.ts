import { idempotencyHeaders } from "../idempotency.ts";
import { withAdditionalHeaders } from "./with-additional-headers.ts";

import type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult } from "./types.ts";


function attachIdempotencyKey(
	requestContext: HttpRequestContext,
	sendNext: HttpRequestHandler,
): Promise<HttpResponseResult> {
	if (requestContext.idempotencyKey === undefined) {
		return sendNext(requestContext);
	}

	return sendNext(withAdditionalHeaders(
		requestContext,
		idempotencyHeaders(requestContext.idempotencyKey),
	));
}

const idempotencyMiddleware: HttpMiddleware = {
	name: 'idempotency',
	handle: attachIdempotencyKey,
};

export { idempotencyMiddleware };
