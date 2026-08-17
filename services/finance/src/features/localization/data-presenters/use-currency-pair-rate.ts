import { useMemo } from "react";
import { useCurrencyRates } from "./use-currency-rates.ts";


interface UseCurrencyPairRateReturn {
	rate: number;
	isPending: boolean;
}

const useCurrencyPairRate = (from: string, to: string): UseCurrencyPairRateReturn => {
	const { rates, isPending } = useCurrencyRates(from);

	return useMemo(() => {
		if (from === to) return { rate: 1, isPending: false };

		return { rate: rates[to] ?? 1, isPending };
	}, [rates, from, to, isPending]);
};

export { useCurrencyPairRate };
export type { UseCurrencyPairRateReturn };
