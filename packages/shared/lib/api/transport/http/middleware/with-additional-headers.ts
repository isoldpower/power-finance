import type { AxiosRequestConfig } from "axios";
import type { HttpRequestContext } from "./types.ts";


type RequestHeaders = AxiosRequestConfig['headers'];

function mergeHeaders(
	additionalHeaders: Record<string, string>,
	configuredHeaders: RequestHeaders,
): RequestHeaders {
	return Object.assign(
		{},
		additionalHeaders,
		configuredHeaders,
	) as RequestHeaders;
}

function withAdditionalHeaders(
	requestContext: HttpRequestContext,
	additionalHeaders: Record<string, string>,
): HttpRequestContext {
	return {
		...requestContext,
		requestConfiguration: {
			...requestContext.requestConfiguration,
			headers: mergeHeaders(
				additionalHeaders,
				requestContext.requestConfiguration.headers,
			),
		},
	};
}

export { withAdditionalHeaders };
