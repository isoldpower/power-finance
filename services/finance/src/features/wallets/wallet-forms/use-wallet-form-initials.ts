import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";

import { MOCK_WALLET_TYPES } from "../mock.ts";
import { CREDIT_TYPE } from "./wallet-fields.ts";

import type { PanelWallet } from "../types.ts";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const useWalletFormInitials = (wallet?: PanelWallet): WalletFormSchema => {
	const { mainCurrency } = useSettingsContext();

	return useMemo(() => {
		if (!wallet) {
			return {
				name: '',
				type: MOCK_WALLET_TYPES[0],
				currency: mainCurrency,
				balance: '',
			} satisfies WalletFormSchema;
		}

		return {
			name: wallet.name,
			type: wallet.credit ? CREDIT_TYPE : MOCK_WALLET_TYPES[0],
			currency: wallet.currency,
			balance: '',
		} satisfies WalletFormSchema;
	}, [wallet, mainCurrency]);
}

export { useWalletFormInitials };
