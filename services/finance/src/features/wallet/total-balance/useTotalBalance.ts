import {Wallet} from "@entity/wallet";
import {useSettingsContext} from "@internal/shared";
import {useCallback, useMemo} from "react";

const useTotalBalance = (wallets: Wallet[]) => {
	const { mainCurrency, locale } = useSettingsContext();

	const totalBalance = useMemo(() => {
		return wallets.reduce((sum, wallet) => {
			const adjustedBalance = wallet.reversed ? -wallet.balance : wallet.balance;
			return sum + adjustedBalance;
		}, 0);
	}, [wallets]);

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
		return formatCurrency(totalBalance);
	}, [totalBalance, formatCurrency]);
}

export { useTotalBalance };