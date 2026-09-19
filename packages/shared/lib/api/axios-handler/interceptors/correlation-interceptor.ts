import { CORRELATION_HEADER } from "../config.ts";
import { BaseAxiosInterceptor } from "./base-interceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


class AxiosCorrelationInterceptor extends BaseAxiosInterceptor {
	public interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		config.headers[CORRELATION_HEADER] = crypto.randomUUID();

		return Promise.resolve(config);
	}
}

export { AxiosCorrelationInterceptor };
