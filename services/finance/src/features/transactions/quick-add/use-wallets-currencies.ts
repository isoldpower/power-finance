import {useCallback, useMemo} from "react";
import {UseFormReturn, useWatch} from "react-hook-form";
import {QuickAddSchema} from "@feature/transactions";
import {Wallet} from "@entity/wallets";


const useWalletsCurrencies = (
	wallets: Wallet[],
	form: UseFormReturn<QuickAddSchema>,
) => {
	const currencyOf = useCallback((walletId: string) => {
		return wallets.find((wallet) => wallet.id === walletId)?.balance.currency ?? 'USD';
	}, [wallets]);

	const fromValue = useWatch({
		control: form.control,
		name: 'fromWallet'
	});
	const toValue = useWatch({
		control: form.control,
		name: 'toWallet'
	});
	const type = useWatch({
		control: form.control,
		name: 'type'
	});
	
	const fromCurrency = useMemo(() => {
		return currencyOf(fromValue);
	}, [currencyOf, fromValue]);
	const toCurrency = useMemo(() => {
		return currencyOf(toValue);
	}, [currencyOf, toValue]);
	const currency = useMemo(() => {
		return type === 'income' ? toCurrency : fromCurrency;
	}, [type, toCurrency, fromCurrency]);
	
	return {
		fromCurrency,
		toCurrency,
		currency,
		type,
	};
}

export { useWalletsCurrencies };