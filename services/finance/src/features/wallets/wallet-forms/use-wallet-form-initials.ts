import { useMemo } from "react";
import { useSettingsContext } from "@internal/shared";

import { useWalletKinds } from "../data-presenters";

import type { PanelWallet } from "@entity/wallets";
import type { WalletFormSchema } from "./wallet-form-schema.ts";


const useWalletFormInitials = (wallet?: PanelWallet): WalletFormSchema => {
	const { mainCurrency } = useSettingsContext();
	const { kinds } = useWalletKinds();

	return useMemo(() => {
		const defaultKind = kinds[0]?.label ?? '';
		const creditKind = kinds.find((kind) => kind.credit)?.label ?? defaultKind;

		if (!wallet) {
			return {
				name: '',
				type: defaultKind,
				currency: mainCurrency,
				balance: '',
			} satisfies WalletFormSchema;
		}

		return {
			name: wallet.name,
			type: wallet.credit ? creditKind : defaultKind,
			currency: wallet.currency,
			balance: '',
		} satisfies WalletFormSchema;
	}, [wallet, mainCurrency, kinds]);
}

export { useWalletFormInitials };
