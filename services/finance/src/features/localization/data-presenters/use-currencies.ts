import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { getCurrencies } from "../currencies-api/methods/get-currencies.ts";
import { CURRENCY_CACHE_KEYS } from "./cache-config.ts";
import type { CurrencyMeta } from "@entity/localization";
import type { FxCurrency } from "../currencies-api/types.ts";

const CATALOG_STALE_TIME = 24 * 60 * 60 * 1000;

interface UseCurrenciesReturn {
	currencies: CurrencyMeta[];
	codes: string[];
	byCode: Record<string, CurrencyMeta | undefined>;
	isPending: boolean;
	isError: boolean;
}

const toCurrencyMeta = (currency: FxCurrency): CurrencyMeta => ({
	code: currency.code,
	symbol: currency.symbol,
	name: currency.name,
});

const useCurrencies = (): UseCurrenciesReturn => {
	const apiContext = useApiContext();

	const query = useQuery<FxCurrency[]>({
		queryKey: [CURRENCY_CACHE_KEYS.currencies],
		queryFn: () => getCurrencies({ handler: apiContext.fxServers.rest }),
		staleTime: CATALOG_STALE_TIME,
	});

	return useMemo(() => {
		const currencies = (query.data ?? []).map(toCurrencyMeta);

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
