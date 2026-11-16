import { useMemo } from "react";

import { CategoriesHttpRESTApiClient, CategoriesMockRESTApiClient } from "@feature/categories";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ICategoriesRESTApiClient } from "@feature/categories";
import type { ApiServerOptions } from "./types.ts";


const CATEGORIES_PATH = '/categories';

interface UseCategoriesApiResponse {
	rest: ICategoriesRESTApiClient;
}

function useCategoriesApi(options: ApiServerOptions): UseCategoriesApiResponse {
	const axiosInstance = useResourceAxios(options, CATEGORIES_PATH);

	const restClient = useMemo<ICategoriesRESTApiClient>(() => {
		return options.mode === 'live'
			? new CategoriesHttpRESTApiClient(axiosInstance, options.versions)
			: new CategoriesMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useCategoriesApi };
export type { UseCategoriesApiResponse };
