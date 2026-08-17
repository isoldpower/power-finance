import { useMemo } from "react";

import { useEntryWalletDefaults } from "../form-state";
import { DEFAULT_ENTRY_CATEGORY } from "../config.ts";

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
		category: DEFAULT_ENTRY_CATEGORY,
	} satisfies QuickAddSchema), [fromWallet, toWallet]);
}

export { useQuickAddInitials };
