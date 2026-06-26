import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";

import { useApiContext } from "@app/api";
import { getRates } from "@feature/fx";
import { CACHE_KEYS } from "./cache-config.ts";
import type { FxRates } from "@feature/fx";

type UseFxRatesReturn = UseQueryResult<FxRates> & {
	base: string;
	rates: Record<string, number>;
};

const useFxRates = (baseOverride?: string): UseFxRatesReturn => {
	const apiContext = useApiContext();
	const { mainCurrency } = useSettingsContext();
	const base = baseOverride ?? mainCurrency;

	const query = useQuery<FxRates>({
		queryKey: [CACHE_KEYS.rates, base],
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

export { useFxRates };
export type { UseFxRatesReturn };
