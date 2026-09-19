import type { HttpMiddleware, HttpRequestHandler } from "./types.ts";


function applyMiddlewares(
	middlewares: HttpMiddleware[],
	sendRequest: HttpRequestHandler,
): HttpRequestHandler {
	return middlewares.reduceRight<HttpRequestHandler>(
		(nextHandler, middleware) => (requestContext) => middleware.handle(requestContext, nextHandler),
		sendRequest,
	);
}

export { applyMiddlewares };
