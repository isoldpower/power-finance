import { useAxiosInstance } from "@internal/shared";
import { API_BASE_PATH } from "../config.ts";
import { useApiTokenGetter } from "../guest-demo/use-api-token-getter.ts";

import type { AxiosInstance } from "axios";
import type { ApiServerOptions } from "./types.ts";


function useResourceAxios(options: ApiServerOptions, resourcePath: string): AxiosInstance {
	const getToken = useApiTokenGetter(options);

	return useAxiosInstance({
		getToken,
		baseUrl: `${options.baseUrl}${API_BASE_PATH}${resourcePath}`,
		sandbox: options.sandbox,
		demoSession: options.demoSession,
	});
}

export { useResourceAxios };
