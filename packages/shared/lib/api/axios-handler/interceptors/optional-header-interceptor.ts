import { BaseAxiosInterceptor } from "./base-interceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


class AxiosOptionalHeaderInterceptor extends BaseAxiosInterceptor {
	constructor(header: string, value?: string) {
		super();
		this.header = header;
		this.value = value === undefined || value === '' ? null : value;
	}

	private readonly header: string;

	private readonly value: string | null;

	public interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		if (this.value === null) {
			delete config.headers[this.header];
		} else {
			config.headers[this.header] = this.value;
		}

		return Promise.resolve(config);
	}
}

export { AxiosOptionalHeaderInterceptor };
