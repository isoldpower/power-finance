import { useMemo } from "react";
import { CurrencyCatalogHttpRESTApiClient, CurrencyCatalogMockRESTApiClient } from "@internal/shared";

import { CURRENCIES_BASE_PATH } from "../config.ts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ICurrencyCatalogRESTApiClient } from "@internal/shared";
import type { ApiServerOptions } from "./types.ts";


interface UseCurrenciesApiResponse {
	rest: ICurrencyCatalogRESTApiClient;
}

function useCurrenciesApi(options: ApiServerOptions): UseCurrenciesApiResponse {
	const axiosInstance = useResourceAxios(options, CURRENCIES_BASE_PATH);

	const restClient = useMemo<ICurrencyCatalogRESTApiClient>(() => {
		return options.mode === 'live'
			? new CurrencyCatalogHttpRESTApiClient(axiosInstance, options.versions)
			: new CurrencyCatalogMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useCurrenciesApi };
export type { UseCurrenciesApiResponse };
