import { useCallback } from "react";
import { useLocaleCurrency } from "@internal/shared";


type FormatAmount = (value: number) => string;

const useAmountFormat = (currency: string): FormatAmount => {
	const formatCurrency = useLocaleCurrency();

	return useCallback((value: number) => {
		return formatCurrency(value.toFixed(2), currency);
	}, [formatCurrency, currency]);
};

export { useAmountFormat };
export type { FormatAmount };
