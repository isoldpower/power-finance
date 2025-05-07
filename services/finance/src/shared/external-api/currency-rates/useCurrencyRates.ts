import {useQuery} from "@tanstack/react-query";
import {useSettingsContext} from "@internal/shared";

import {POLLING_INTERVAL, QUERY_KEY} from "./config.ts";
import {fetchCurrencies} from "./fetchCurrencies.ts";
import {useCallback, useMemo} from "react";


const useCurrencyRates = () => {
	const { mainCurrency } = useSettingsContext();

	const { data, fetchStatus, status } = useQuery({
		queryKey: [QUERY_KEY, mainCurrency],
		queryFn: ({ queryKey }) => fetchCurrencies(queryKey[1]),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchInterval: POLLING_INTERVAL,
		enabled: !!mainCurrency
	});

	const convertCurrencyToMain = useCallback((
		amount: number,
		currency: string
	) => {
		const rate = data?.find(item => {
			return item.to === currency;
		})?.rate;

		return rate ? amount / rate : 0;
	}, [data]);

	return useMemo(() => ({
		convertCurrencyToMain,
		currencies: data,
		fetchStatus,
		status
	}), [data, convertCurrencyToMain, fetchStatus, status]);
}

export { useCurrencyRates };