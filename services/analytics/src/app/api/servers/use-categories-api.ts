import { useMemo } from "react";

import { CategoriesHttpRESTApiClient, CategoriesMockRESTApiClient } from "@feature/spending";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ICategoriesRESTApiClient } from "@feature/spending";
import type { ApiServerOptions } from "./types.ts";


interface UseCategoriesApiResponse {
	rest: ICategoriesRESTApiClient;
}

function useCategoriesApi(options: ApiServerOptions): UseCategoriesApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<ICategoriesRESTApiClient>(() => {
		return options.mode === 'live'
			? new CategoriesHttpRESTApiClient(axiosInstance, options.versions)
			: new CategoriesMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useCategoriesApi };
export type { UseCategoriesApiResponse };
