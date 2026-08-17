import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";

import { useApiContext } from "@app/api";
import { getRates } from "../currencies-api";
import { CURRENCY_CACHE_KEYS } from "./cache-config.ts";
import type { CurrencyRates } from "@entity/localization";

const RATES_STALE_TIME = 5 * 60 * 1000;

type UseCurrencyRatesReturn = UseQueryResult<CurrencyRates> & {
	base: string;
	rates: Record<string, number>;
};

const useCurrencyRates = (baseOverride?: string): UseCurrencyRatesReturn => {
	const apiContext = useApiContext();
	const { mainCurrency } = useSettingsContext();
	const base = baseOverride ?? mainCurrency;

	const query = useQuery<CurrencyRates>({
		queryKey: [CURRENCY_CACHE_KEYS.rates, base],
		queryFn: () => getRates({
			handler: apiContext.currencyServers.rest,
			base,
		}),
		staleTime: RATES_STALE_TIME,
	});

	return useMemo(() => ({
		...query,
		base,
		rates: query.data?.rates ?? {},
	}), [query, base]);
};

export { useCurrencyRates };
export type { UseCurrencyRatesReturn };
