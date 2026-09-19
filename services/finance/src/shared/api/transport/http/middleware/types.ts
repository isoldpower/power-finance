import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { ResponseHeaders } from "../../headers";
import type { WriteVersionStore } from "../write-version-store.ts";


interface HttpRequestContext {
	axiosInstance: AxiosInstance;
	requestConfiguration: AxiosRequestConfig;
	writeVersionStore: WriteVersionStore | undefined;
	idempotencyKey: string | undefined;
}

interface HttpResponseResult {
	data: unknown;
	headers: ResponseHeaders;
	status: number;
}

type HttpRequestHandler = (requestContext: HttpRequestContext) => Promise<HttpResponseResult>;

interface HttpMiddleware {
	name: string;
	handle: (
		requestContext: HttpRequestContext,
		sendNext: HttpRequestHandler,
	) => Promise<HttpResponseResult>;
}

export type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult };
