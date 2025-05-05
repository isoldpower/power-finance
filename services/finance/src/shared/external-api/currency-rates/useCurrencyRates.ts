import { useQuery } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";

import { POLLING_INTERVAL, QUERY_KEY } from "./config.ts";
import { fetchCurrencies } from "./fetchCurrencies.ts";
import { useCallback, useMemo } from "react";


const useCurrencyRates = () => {
	const { mainCurrency } = useSettingsContext();

	const { data, fetchStatus, status, refetch } = useQuery({
		queryKey: [QUERY_KEY, mainCurrency],
		queryFn: ({ queryKey }) => fetchCurrencies(queryKey[1] as string),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchInterval: POLLING_INTERVAL,
		enabled: !!mainCurrency
	});

	const convertCurrencyToMain = useCallback(async (
		amount: number,
		currency: string
	) => {
		const currentData = data ?? (await refetch()).data;
		const rate = currentData?.find(item => item.to === currency)?.rate;

		return rate ? amount / rate : 0;
	}, [data, refetch]);

	return useMemo(() => ({
		convertCurrencyToMain,
		currencies: data,
		fetchStatus,
		status
	}), [data, convertCurrencyToMain, fetchStatus, status]);
}

export { useCurrencyRates };