import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { CurrenciesMockRESTApiClient } from "@feature/localization";
import { API_BASE_PATH } from "../config.ts";
import type { ICurrenciesRESTApiClient } from "@feature/localization";

interface UseCurrenciesApiResponse {
	rest: ICurrenciesRESTApiClient;
}

function useCurrenciesApi(baseUrl: string): UseCurrenciesApiResponse {
	const currenciesAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/currencies`
	});

	const restCurrenciesClient = useMemo<ICurrenciesRESTApiClient>(() => {
		return new CurrenciesMockRESTApiClient();
	}, [currenciesAxiosInstance]);

	return useMemo(() => ({
		rest: restCurrenciesClient
	}), [restCurrenciesClient]);
}

export { useCurrenciesApi };
export type { UseCurrenciesApiResponse };
