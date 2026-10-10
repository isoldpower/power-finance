import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { AxiosInterceptor } from "./interface.ts";


abstract class BaseAxiosInterceptor implements AxiosInterceptor {
	public abstract interceptRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig>;

	public interceptResponseSuccess(
		value: AxiosResponse<unknown, unknown>
	): AxiosResponse<unknown, unknown> | Promise<AxiosResponse<unknown, unknown>> {
		return value;
	}

	/* An onRejected handler that returns turns the failure into a success, so the
	   rejection has to be passed on rather than handed back. */
	public interceptResponseFault(error: unknown): Promise<never> {
		return Promise.reject(error instanceof Error ? error : new Error(String(error)));
	}
}

export { BaseAxiosInterceptor };
