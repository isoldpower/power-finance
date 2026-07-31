import { useCallback, useMemo } from "react";
import { useWatch } from "react-hook-form";

import { DEFAULT_ENTRY_CURRENCY } from "./config.ts";

import type { Control, FieldValues, UseFormReturn } from "react-hook-form";
import type { Wallet } from "@entity/wallets";
import type { TransactionEntryValues } from "./types.ts";


const useWalletsCurrencies = <T extends TransactionEntryValues & FieldValues>(
	wallets: Wallet[],
	form: UseFormReturn<T>,
) => {
	const control = form.control as unknown as Control<TransactionEntryValues>;
	const fromWallet = useWatch({ control, name: 'fromWallet' });
	const toWallet = useWatch({ control, name: 'toWallet' });
	const type = useWatch({ control, name: 'type' });

	const currencyOf = useCallback((walletId: string) => {
		return wallets.find((wallet) => wallet.id === walletId)?.balance.currency ?? DEFAULT_ENTRY_CURRENCY;
	}, [wallets]);

	const fromCurrency = useMemo(() => {
		return currencyOf(fromWallet);
	}, [currencyOf, fromWallet]);
	const toCurrency = useMemo(() => {
		return currencyOf(toWallet);
	}, [currencyOf, toWallet]);
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
