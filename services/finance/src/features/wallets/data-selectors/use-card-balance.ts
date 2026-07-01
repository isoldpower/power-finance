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
		return wallet.credit
			? formatCurrency(-wallet.balance.amount, wallet.balance.currency)
			: formatCurrency(wallet.balance.amount, wallet.balance.currency)
	}, [wallet])
}

export {useCardBalance}