import { useMemo } from "react";

import { useEntryWalletDefaults } from "../form-state";
import { DEFAULT_ENTRY_CATEGORY, INITIAL_ENTRY_TYPE, NO_ADJUSTED_TRANSACTION } from "../config.ts";

import type { CategoryRef } from "@entity/categories";
import type { Wallet } from "@entity/wallets";
import type { AddTransactionSchema } from "./add-transaction-schema.ts";


const useAddTransactionInitials = (
	wallets: Wallet[],
	preferredWalletId?: string,
	adjusts: string = NO_ADJUSTED_TRANSACTION,
	category: CategoryRef | null = DEFAULT_ENTRY_CATEGORY,
): AddTransactionSchema => {
	const { fromWallet, toWallet } = useEntryWalletDefaults(wallets, INITIAL_ENTRY_TYPE, preferredWalletId);

	return useMemo(() => ({
		type: INITIAL_ENTRY_TYPE,
		amount: '',
		receiveAmount: '',
		fromWallet,
		toWallet,
		category,
		adjusts,
	} satisfies AddTransactionSchema), [fromWallet, toWallet, adjusts, category]);
}

export { useAddTransactionInitials };
