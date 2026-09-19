import { SANDBOX_HEADER } from "../config.ts";
import { BaseAxiosInterceptor } from "./base-interceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


class AxiosSandboxInterceptor extends BaseAxiosInterceptor {
	constructor(sandbox?: string) {
		super();
		this.sandbox = sandbox === undefined || sandbox === '' ? null : sandbox;
	}

	private readonly sandbox: string | null;

	public interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		if (this.sandbox === null) {
			delete config.headers[SANDBOX_HEADER];
		} else {
			config.headers[SANDBOX_HEADER] = this.sandbox;
		}

		return Promise.resolve(config);
	}
}

export { AxiosSandboxInterceptor };
