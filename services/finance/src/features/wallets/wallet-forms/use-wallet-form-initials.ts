import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";
import { DEFAULT_WALLET_COLOR } from "@entity/wallets";

import type { PanelWallet } from "@entity/wallets";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const useWalletFormInitials = (wallet?: PanelWallet): WalletFormSchema => {
	const { mainCurrency } = useSettingsContext();

	return useMemo(() => {
		if (!wallet) {
			return {
				name: '',
				category: '',
				currency: mainCurrency,
				balance: '',
				color: DEFAULT_WALLET_COLOR,
			} satisfies WalletFormSchema;
		}

		return {
			name: wallet.name,
			category: wallet.category,
			currency: wallet.currency,
			balance: '',
			color: wallet.color,
		} satisfies WalletFormSchema;
	}, [wallet, mainCurrency]);
}

export { useWalletFormInitials };
