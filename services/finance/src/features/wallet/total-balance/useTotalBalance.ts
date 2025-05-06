import { useCallback, useMemo } from "react";
import { useSettingsContext } from "@internal/shared";

import { useCurrencyRates } from "@shared/external-api";
import type { Wallet } from "@entity/wallet";


const useTotalBalance = (wallets: Wallet[]) => {
	const { mainCurrency, locale } = useSettingsContext();
	const { convertCurrencyToMain } = useCurrencyRates();

	const computeTotalBalance = useCallback(() => {
		return wallets.reduce((sum, wallet) => {
			const convertedBalance = convertCurrencyToMain(wallet.balance, wallet.currency);
			const adjustedBalance = wallet.reversed ? -convertedBalance : convertedBalance;
			return sum + adjustedBalance;
		}, 0);
	}, [wallets, convertCurrencyToMain]);

	const formatCurrency = useCallback((
		amount: number,
		currency = mainCurrency
	) => {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency
		}).format(amount);
	}, [locale, mainCurrency]);

	return useMemo(() => {
		const totalBalance = computeTotalBalance();

		return formatCurrency(totalBalance);
	}, [computeTotalBalance, formatCurrency]);
}

export { useTotalBalance };