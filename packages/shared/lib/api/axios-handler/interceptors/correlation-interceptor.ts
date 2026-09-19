import { CORRELATION_HEADER } from "../config.ts";

import type {AxiosResponse, InternalAxiosRequestConfig} from "axios";


class AxiosCorrelationInterceptor {
	public async interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		config.headers[CORRELATION_HEADER] = crypto.randomUUID();

		return config;
	}

	public interceptResponseSuccess(
		value: AxiosResponse<unknown, unknown>
	): AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>> {
		return value;
	}

	public interceptResponseFault(error: unknown): unknown {
		return error;
	}
}

export { AxiosCorrelationInterceptor };