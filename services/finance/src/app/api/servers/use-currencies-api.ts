import { useMemo } from "react";

import { CurrenciesHttpRESTApiClient, CurrenciesMockRESTApiClient } from "@feature/localization";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ICurrenciesRESTApiClient } from "@feature/localization";
import type { ApiServerOptions } from "./types.ts";


const CURRENCIES_PATH = '/currencies';

interface UseCurrenciesApiResponse {
	rest: ICurrenciesRESTApiClient;
}

function useCurrenciesApi(options: ApiServerOptions): UseCurrenciesApiResponse {
	const axiosInstance = useResourceAxios(options, CURRENCIES_PATH);

	const restClient = useMemo<ICurrenciesRESTApiClient>(() => {
		return options.mode === 'live'
			? new CurrenciesHttpRESTApiClient(axiosInstance, options.versions)
			: new CurrenciesMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useCurrenciesApi };
export type { UseCurrenciesApiResponse };
