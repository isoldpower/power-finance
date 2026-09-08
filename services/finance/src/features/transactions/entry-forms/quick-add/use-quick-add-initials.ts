import { useMemo } from "react";

import { useEntryWalletDefaults } from "../form-state";
import { DEFAULT_ENTRY_CATEGORY, INITIAL_ENTRY_TYPE } from "../config.ts";

import type { Wallet } from "@entity/wallets";
import type { QuickAddSchema } from "./quick-add-schema.ts";


const useQuickAddInitials = (wallets: Wallet[], preferredWalletId?: string): QuickAddSchema => {
	const { fromWallet, toWallet } = useEntryWalletDefaults(wallets, INITIAL_ENTRY_TYPE, preferredWalletId);

	return useMemo(() => ({
		fromWallet,
		toWallet,
		type: INITIAL_ENTRY_TYPE,
		amount: '',
		receiveAmount: '',
		category: DEFAULT_ENTRY_CATEGORY,
	} satisfies QuickAddSchema), [fromWallet, toWallet]);
}

export { useQuickAddInitials };
