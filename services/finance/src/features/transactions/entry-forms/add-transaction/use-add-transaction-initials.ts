import { useMemo } from "react";

import { useEntryWalletDefaults } from "../form-state";
import { DEFAULT_ENTRY_CATEGORY, INITIAL_ENTRY_TYPE } from "../config.ts";

import type { Wallet } from "@entity/wallets";
import type { AddTransactionSchema } from "./add-transaction-schema.ts";


const useAddTransactionInitials = (wallets: Wallet[], preferredWalletId?: string): AddTransactionSchema => {
	const { fromWallet, toWallet } = useEntryWalletDefaults(wallets, INITIAL_ENTRY_TYPE, preferredWalletId);

	return useMemo(() => ({
		type: INITIAL_ENTRY_TYPE,
		amount: '',
		receiveAmount: '',
		fromWallet,
		toWallet,
		category: DEFAULT_ENTRY_CATEGORY,
	} satisfies AddTransactionSchema), [fromWallet, toWallet]);
}

export { useAddTransactionInitials };
