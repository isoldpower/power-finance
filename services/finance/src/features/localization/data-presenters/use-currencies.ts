import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { rememberCurrencySymbol, rememberFractionDigits } from "@shared/formatting";
import { listCurrencies } from "../currencies-api";
import { CURRENCY_CACHE_KEYS } from "./cache-config.ts";
import { CATALOG_STALE_TIME } from "./api-config.ts";

import type { CurrencyMeta } from "@entity/localization";
import type { ListCurrenciesResponse } from "../currencies-api";


interface UseCurrenciesReturn {
	currencies: CurrencyMeta[];
	codes: string[];
	byCode: Record<string, CurrencyMeta | undefined>;
	isPending: boolean;
	isError: boolean;
}

const rememberCatalog = (currencies: CurrencyMeta[]): void => {
	for (const currency of currencies) {
		rememberFractionDigits(currency.code, currency.decimals);
		rememberCurrencySymbol(currency.code, currency.symbol);
	}
};

const useCurrencies = (): UseCurrenciesReturn => {
	const apiContext = useApiContext();

	const query = useQuery<ListCurrenciesResponse>({
		queryKey: [CURRENCY_CACHE_KEYS.currencies],
		queryFn: () => listCurrencies({ handler: apiContext.currencyServers.rest }),
		staleTime: CATALOG_STALE_TIME,
	});

	return useMemo(() => {
		const currencies = query.data?.currencies ?? [];
		rememberCatalog(currencies);

		return {
			currencies,
			codes: currencies.map((currency) => currency.code),
			byCode: Object.fromEntries(currencies.map((currency) => [currency.code, currency])),
			isPending: query.isPending,
			isError: query.isError,
		};
	}, [query.data, query.isError, query.isPending]);
};

export { useCurrencies };
export type { UseCurrenciesReturn };
