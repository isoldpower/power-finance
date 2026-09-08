import { useAxiosInstance } from "@internal/shared";

import { API_BASE_PATH } from "../config.ts";

import type { AxiosInstance } from "axios";
import type { ApiServerOptions } from "./types.ts";


function useResourceAxios(options: ApiServerOptions, resourcePath: string): AxiosInstance {
	return useAxiosInstance({
		baseUrl: `${options.baseUrl}${API_BASE_PATH}${resourcePath}`,
	});
}

export { useResourceAxios };
