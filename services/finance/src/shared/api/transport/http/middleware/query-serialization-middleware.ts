import { serializeQueryParameters } from "../query-parameters.ts";

import type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult } from "./types.ts";


function serializeQuery(
	requestContext: HttpRequestContext,
	sendNext: HttpRequestHandler,
): Promise<HttpResponseResult> {
	return sendNext({
		...requestContext,
		requestConfiguration: {
			paramsSerializer: { 
				serialize: serializeQueryParameters,
			},
			...requestContext.requestConfiguration,
		},
	});
}

const querySerializationMiddleware: HttpMiddleware = {
	name: 'query-serialization',
	handle: serializeQuery,
};

export { querySerializationMiddleware };
