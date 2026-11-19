import { useCallback } from "react";
import { useLocaleCurrency } from "@internal/shared";

import type { MoneyLike } from "./types.ts";


type FormatMoneyLike = (money: MoneyLike) => string;

const useMoneyFormat = (): FormatMoneyLike => {
	const formatCurrency = useLocaleCurrency();

	return useCallback((money: MoneyLike) => formatCurrency(money.amount, money.currency), [formatCurrency]);
};

export { useMoneyFormat };
export type { FormatMoneyLike };
