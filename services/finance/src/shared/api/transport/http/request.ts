import {
	applyMiddlewares,
	errorTranslationMiddleware,
	idempotencyMiddleware,
	querySerializationMiddleware,
	sendAxiosRequest,
	writeVersionMiddleware,
} from "./middleware";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HttpMiddleware, HttpRequestHandler } from "./middleware";
import type { WriteVersionStore } from "./write-version-store.ts";


interface RequestOptions {
	writeVersionStore?: WriteVersionStore;
	idempotencyKey?: string;
}

const DEFAULT_MIDDLEWARES: HttpMiddleware[] = [
	errorTranslationMiddleware,
	querySerializationMiddleware,
	idempotencyMiddleware,
	writeVersionMiddleware,
];

function createRequestSender(middlewares: HttpMiddleware[] = DEFAULT_MIDDLEWARES): HttpRequestHandler {
	return applyMiddlewares(middlewares, sendAxiosRequest);
}

const sendThroughDefaultMiddlewares = createRequestSender();

async function request<TResponse>(
	axiosInstance: AxiosInstance,
	requestConfiguration: AxiosRequestConfig,
	writeVersionStore?: WriteVersionStore,
	options: Omit<RequestOptions, 'writeVersionStore'> = {},
): Promise<TResponse> {
	const responseResult = await sendThroughDefaultMiddlewares({
		axiosInstance,
		requestConfiguration,
		writeVersionStore,
		idempotencyKey: options.idempotencyKey,
	});

	return responseResult.data as TResponse;
}

export { createRequestSender, DEFAULT_MIDDLEWARES, request };
export type { RequestOptions };
