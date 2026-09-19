import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";


interface AxiosInterceptor<TRequest = unknown, TResponse = unknown> {
	interceptRequest(
		config: InternalAxiosRequestConfig<TRequest>
	): Promise<InternalAxiosRequestConfig<TRequest>>;
	
	interceptResponseSuccess(
		value: AxiosResponse<TResponse, TRequest>
	): AxiosResponse<TResponse, TRequest> | Promise<AxiosResponse<TResponse, TRequest>>;
	
	interceptResponseFault(
		error: unknown
	): Promise<never>;
}

export type { AxiosInterceptor };
