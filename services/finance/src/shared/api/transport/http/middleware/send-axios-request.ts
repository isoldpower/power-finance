import type { ResponseHeaders } from "../../headers";
import type { HttpRequestContext, HttpResponseResult } from "./types.ts";


async function sendAxiosRequest(requestContext: HttpRequestContext): Promise<HttpResponseResult> {
	const axiosResponse = await requestContext.axiosInstance.request<unknown>(
		requestContext.requestConfiguration,
	);

	return {
		data: axiosResponse.data,
		headers: axiosResponse.headers as ResponseHeaders,
		status: axiosResponse.status,
	};
}

export { sendAxiosRequest };
