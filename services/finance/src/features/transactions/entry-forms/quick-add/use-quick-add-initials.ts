import { useMemo } from "react";

import { useEntryWalletDefaults } from "../form-state/use-entry-wallet-defaults.ts";

import type { Wallet } from "@entity/wallets";
import type { QuickAddSchema } from "./quick-add-schema.ts";


const useQuickAddInitials = (wallets: Wallet[]): QuickAddSchema => {
	const { fromWallet, toWallet } = useEntryWalletDefaults(wallets);

	return useMemo(() => ({
		fromWallet,
		toWallet,
		type: 'expense',
		amount: '',
		receiveAmount: '',
	} satisfies QuickAddSchema), [fromWallet, toWallet]);
}

export { useQuickAddInitials };
