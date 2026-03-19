import { useSettingsContext } from "@internal/shared";
import { useMemo } from "react";

import type { DeleteWalletSchema, WalletSchema } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";


const useNewDefaultValues = (): WalletSchema => {
	const { mainCurrency } = useSettingsContext();

	return useMemo(() => ({
		name: '',
		balance: 0,
		currency: mainCurrency,
		type: 'debit'
	}), [mainCurrency]);
}

const useEditDefaultValues = (wallet: Wallet): WalletSchema => {
	return useMemo(() => ({
		name: wallet.name,
		type: wallet.credit ? 'credit' : 'debit',
		balance: wallet.balance.amount,
		currency: wallet.balance.currency,
	}), [wallet])
};

const useDeleteDefaultValues = (wallet: Wallet): DeleteWalletSchema => {
	return useMemo(() => ({
		id: wallet.id
	}), [wallet]);
}

export { useNewDefaultValues, useEditDefaultValues, useDeleteDefaultValues };