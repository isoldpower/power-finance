import { useQuery } from "@tanstack/react-query";
import { useSettingsContext } from "@internal/shared";

import { POLLING_INTERVAL, QUERY_KEY } from "./config.ts";
import { fetchCurrencies } from "./fetchCurrencies.ts";
import { convertCurrency } from "./convertCurrency.ts";
import { useCallback, useMemo } from "react";

const useCurrencyRates = () => {
	const { mainCurrency } = useSettingsContext();

	const { data, fetchStatus } = useQuery({
		queryKey: [QUERY_KEY, mainCurrency],
		queryFn: ({ queryKey }) => fetchCurrencies(queryKey[1] as string),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchInterval: POLLING_INTERVAL,
	});

	const convertCurrencyToMain = useCallback((
		amount: number,
		currency: string
	) => {
		const rate = data?.find((item) => item.to === currency)?.rate;

		return rate ? amount * Math.pow(rate, -1) : 0;
	}, [data]);

	const convertFromTo = useCallback(async (
		amount: number,
		from: string,
		to: string
	) => {
		const rate = await convertCurrency(from, to);
		if (!rate) return 0;

		return amount * rate.rate;
	}, [data]);

	return useMemo(() => ({
		convertCurrencyToMain,
		currencies: data,
		convertFromTo,
		fetchStatus
	}), [data, convertCurrencyToMain, convertFromTo, fetchStatus]);
}

export { useCurrencyRates };