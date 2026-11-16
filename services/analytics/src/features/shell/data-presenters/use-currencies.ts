import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { listCurrencies, rememberCurrencyCatalog } from "@internal/shared";
import { useApiContext } from "@app/api";
import { CURRENCY_CATALOG_STALE_TIME, LOCALIZATION_CACHE_KEYS } from "./cache-config.ts";

import type { CurrencyMeta } from "@internal/shared";


interface UseCurrenciesReturn {
	currencies: CurrencyMeta[];
	isPending: boolean;
}

const useCurrencies = (): UseCurrenciesReturn => {
	const { currencyServers } = useApiContext();
	const query = useQuery({
		queryKey: [LOCALIZATION_CACHE_KEYS.currencies],
		queryFn: () => listCurrencies({ 
			handler: currencyServers.rest
		}),
		staleTime: CURRENCY_CATALOG_STALE_TIME,
	});

	return useMemo(() => {
		const currencies = query.data?.currencies ?? [];
		rememberCurrencyCatalog(currencies);

		return { currencies, isPending: query.isPending };
	}, [query.data, query.isPending]);
};

export { useCurrencies };
export type { UseCurrenciesReturn };
