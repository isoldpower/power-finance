import { useCallback, useMemo } from "react";
import { useSettingsContext } from "@internal/shared";
import { useLocaleCurrency } from "@shared/formatting";
import { useCurrencyRates } from "./use-currency-rates.ts";

import type { ConvertedMoney, Money } from "@entity/localization";


interface UseConvertMoneyReturn {
	convert: (money: Money) => ConvertedMoney;
	isPending: boolean;
	targetCurrency: string;
}

const useConvertMoney = (): UseConvertMoneyReturn => {
	const { mainCurrency } = useSettingsContext();
	const { rates, isPending } = useCurrencyRates(mainCurrency);
	const formatCurrency = useLocaleCurrency();

	const convert = useCallback((money: Money): ConvertedMoney => {
		const rate = rates[money.currency];
		
		if (money.currency === mainCurrency || !rate) {
			return {
				amount: money.amount,
				currency: money.currency,
				formatted: formatCurrency(money.amount, money.currency),
				converted: false,
			};
		}

		const convertedAmount = money.amount / rate;
		return {
			amount: convertedAmount,
			currency: mainCurrency,
			formatted: formatCurrency(convertedAmount, mainCurrency),
			converted: true,
		};
	}, [rates, mainCurrency, formatCurrency]);

	return useMemo(() => ({
		convert,
		isPending,
		targetCurrency: mainCurrency,
	}), [convert, isPending, mainCurrency]);
};

export { useConvertMoney };
export type {UseConvertMoneyReturn };
