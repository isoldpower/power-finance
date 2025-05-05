import {useMemo} from "react";
import type {Wallet} from "@entity/wallet";

const useCardBalance = (wallet: Wallet) => {
	const formatCurrency = (amount: number, currency: string) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency
		}).format(amount);
	};

	return useMemo(() => {
		return wallet.reversed
			? formatCurrency(-wallet.balance, wallet.currency)
			: formatCurrency(wallet.balance, wallet.currency)
	}, [wallet])
}

export {useCardBalance}