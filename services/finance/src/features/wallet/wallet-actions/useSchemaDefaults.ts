import { useSettingsContext } from "@internal/shared";
import { useMemo } from "react";

import type { WalletSchema } from "@feature/wallet";
import type { Wallet } from "@entity/wallet";


const useNewDefaultValues = (): WalletSchema => {
	const { mainCurrency } = useSettingsContext();

	return {
		name: '',
		balance: 0,
		currency: mainCurrency,
		type: 'debit'
	};
}

const useEditDefaultValues = (wallet: Wallet): WalletSchema => {
	return useMemo(() => ({
		name: wallet.name,
		type: wallet.credit ? 'credit' : 'debit',
		balance: wallet.balance.amount,
		currency: wallet.balance.currency,
	}), [wallet])
};

export { useNewDefaultValues, useEditDefaultValues };