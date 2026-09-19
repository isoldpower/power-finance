import { SANDBOX_HEADER } from "../config.ts";

import type {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import type { AxiosInterceptor } from "./interface.ts";


class AxiosSandboxInterceptor implements AxiosInterceptor {
	constructor(sandbox?: string) {
		this.sandbox = sandbox || null;
	}
	
	private sandbox: string | null;
	
	public async interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		if (this.sandbox) {
			config.headers[SANDBOX_HEADER] = this.sandbox;
		} else {
			delete config.headers[SANDBOX_HEADER];
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

export { AxiosSandboxInterceptor };