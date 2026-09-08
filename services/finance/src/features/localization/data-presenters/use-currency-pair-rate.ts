import { useMemo } from "react";
import { useCurrencyRates } from "./use-currency-rates.ts";
import { UNIT_RATE } from "./cache-config.ts";


interface UseCurrencyPairRateReturn {
	rate: string;
	isPending: boolean;
}

const useCurrencyPairRate = (from: string, to: string): UseCurrencyPairRateReturn => {
	const { rates, isPending } = useCurrencyRates(from);

	return useMemo(() => {
		if (from === to) return { rate: UNIT_RATE, isPending: false };

		return { rate: rates[to] ?? UNIT_RATE, isPending };
	}, [rates, from, to, isPending]);
};

export { useCurrencyPairRate };
export type { UseCurrencyPairRateReturn };
