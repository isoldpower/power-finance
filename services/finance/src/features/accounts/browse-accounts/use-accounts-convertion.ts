import { useCallback, useMemo } from "react";
import { useConvertMoney } from "@feature/localization";
import { absoluteAmount, isNegativeAmount, sumAmounts } from "@shared/api";
import { useLocaleCurrency } from "@shared/formatting";

import type { Money } from "@entity/localization";


const useAccountsConvertion = () => {
	const { convert, targetCurrency } = useConvertMoney();
	const formatMoney = useLocaleCurrency();

	const convertToUserCurrency = useCallback((money: Money) => {
		return convert(money).formatted;
	}, [convert]);
	const convertToUserCurrencyWithSign = useCallback((money: Money) => {
		const sign = isNegativeAmount(money.amount) ? '−' : '+';
		const convertedMoney = convertToUserCurrency({
			amount: absoluteAmount(money.amount),
			currency: money.currency,
		});

		return `${sign}${convertedMoney}`;
	}, [convertToUserCurrency]);
	const sumToUserCurrency = useCallback((money: Money[]) => {
		const total = sumAmounts(money.map((moneyPiece) => convert(moneyPiece).amount));

		return formatMoney(total, targetCurrency);
	}, [convert, formatMoney, targetCurrency]);

	return useMemo(() => ({
		convertToUserCurrency,
		convertToUserCurrencyWithSign,
		sumToUserCurrency,
	}), [convertToUserCurrency, convertToUserCurrencyWithSign, sumToUserCurrency]);
}

export { useAccountsConvertion };
