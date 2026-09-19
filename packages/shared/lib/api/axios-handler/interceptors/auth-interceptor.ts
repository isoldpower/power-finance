import { AUTHORIZATION_HEADER } from "../config.ts";
import { BaseAxiosInterceptor } from "./base-interceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


type GetTokenCallback = () => Promise<string | null>;

class AxiosAuthInterceptor extends BaseAxiosInterceptor {
	constructor(getToken: GetTokenCallback) {
		super();
		this.tokenCallback = getToken;
	}

	private readonly tokenCallback: GetTokenCallback;

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
}

export { AxiosAuthInterceptor };
