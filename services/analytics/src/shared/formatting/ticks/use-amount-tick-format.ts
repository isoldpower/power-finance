import { useCallback } from "react";
import { useCompactAmount } from "./tick-partials/use-compact-amount.ts";


const useAmountTickFormat = (currency: string): ((value: number) => string) => {
	const formatCompact = useCompactAmount();

	return useCallback((value: number) => {
		return formatCompact(value, currency);
	}, [formatCompact, currency]);
};

export { useAmountTickFormat };
