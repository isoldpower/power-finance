import { useCallback, useMemo } from "react";
import { useConvertMoney } from "@feature/localization";


const useAccountsConvertion = () => {
	const { convert } = useConvertMoney();
	
	const convertToUserCurrency = useCallback((usd: number) => {
		return convert({ amount: usd, currency: 'USD'}).formatted;
	}, [convert]);
	const convertToUserCurrencyWithSign = useCallback((usd: number) => {
		const sign = usd >= 0 ? '+' : '−';
		const convertedMoney = convertToUserCurrency(Math.abs(usd));

		return `${sign}${convertedMoney}`;
	}, [convertToUserCurrency]);
	
	return useMemo(() => ({
		convertToUserCurrency,
		convertToUserCurrencyWithSign,
	}), [convertToUserCurrency, convertToUserCurrencyWithSign]);
}

export { useAccountsConvertion };