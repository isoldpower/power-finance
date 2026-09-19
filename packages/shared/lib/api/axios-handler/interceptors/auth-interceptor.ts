import { AUTHORIZATION_HEADER } from "../config.ts";

import type {AxiosResponse, InternalAxiosRequestConfig} from "axios";


type GetTokenCallback = () => Promise<string | null>;

class AxiosAuthInterceptor  {
	constructor(getToken: GetTokenCallback) {
		this.tokenCallback = getToken;
	}
	
	private tokenCallback: GetTokenCallback;
	
	public async interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		const token = await this.tokenCallback();

		if (token) {
			config.headers[AUTHORIZATION_HEADER] = `Bearer ${token}`;
		} else {
			delete config.headers[AUTHORIZATION_HEADER];
		}

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

export { AxiosAuthInterceptor };