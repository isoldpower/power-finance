import { useAxiosInstance } from "@internal/shared";
import { ANALYTICS_BASE_PATH } from "../config.ts";
import { useApiTokenGetter } from "./use-api-token-getter.ts";

import type { AxiosInstance } from "axios";
import type { ApiServerOptions } from "./types.ts";


function useResourceAxios(options: ApiServerOptions, basePath = ANALYTICS_BASE_PATH): AxiosInstance {
	const getToken = useApiTokenGetter();

	return useAxiosInstance({
		getToken,
		baseUrl: `${options.baseUrl}${basePath}`,
		sandbox: options.sandbox,
		demoSession: options.demoSession,
	});
}

export { useResourceAxios };
