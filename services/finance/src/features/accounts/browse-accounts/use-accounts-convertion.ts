import { useCallback, useMemo } from "react";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/formatting";

import type { Money } from "@entity/localization";


const useAccountsConvertion = () => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatMoney = useLocaleCurrency();

	const convertToUserCurrency = useCallback((money: Money) => {
		return convert(money).formatted;
	}, [convert]);
	const convertToUserCurrencyWithSign = useCallback((money: Money) => {
		const sign = money.amount >= 0 ? '+' : '−';
		const convertedMoney = convertToUserCurrency({
			amount: Math.abs(money.amount),
			currency: money.currency,
		});

		return `${sign}${convertedMoney}`;
	}, [convertToUserCurrency]);
	const sumToUserCurrency = useCallback((money: Money[]) => {
		const total = money.reduce((sum, moneyPiece) => {
			return sum + convert(moneyPiece).amount;
		}, 0);

		return formatMoney(total, targetCurrency);
	}, [convert, formatMoney, targetCurrency]);

	return useMemo(() => ({
		convertToUserCurrency,
		convertToUserCurrencyWithSign,
		sumToUserCurrency,
	}), [convertToUserCurrency, convertToUserCurrencyWithSign, sumToUserCurrency]);
}

export { useAccountsConvertion };
