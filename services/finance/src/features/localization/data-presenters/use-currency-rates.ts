import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";

import { useApiContext } from "@app/api";
import { getRates } from "@feature/localization";
import { CURRENCY_CACHE_KEYS } from "./cache-config.ts";
import type { FxRates } from "@feature/localization";

type UseCurrencyRatesReturn = UseQueryResult<FxRates> & {
	base: string;
	rates: Record<string, number>;
};

const useCurrencyRates = (baseOverride?: string): UseCurrencyRatesReturn => {
	const apiContext = useApiContext();
	const { mainCurrency } = useSettingsContext();
	const base = baseOverride ?? mainCurrency;

	const query = useQuery<FxRates>({
		queryKey: [CURRENCY_CACHE_KEYS.rates, base],
		queryFn: () => getRates({
			handler: apiContext.fxServers.rest,
			base,
		}),
		staleTime: 5 * 60 * 1000,
	});

	return useMemo(() => ({
		...query,
		base,
		rates: query.data?.rates ?? {},
	}), [query, base]);
};

export { useCurrencyRates };
export type { UseCurrencyRatesReturn };
