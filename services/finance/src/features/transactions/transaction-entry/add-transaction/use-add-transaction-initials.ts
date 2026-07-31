import { useMemo } from "react";

import { useEntryWalletDefaults } from "../../entry-forms";
import { DEFAULT_ENTRY_CATEGORY } from "./config.ts";

import type { Wallet } from "@entity/wallets";
import type { AddTransactionSchema } from "./add-transaction-schema.ts";


const useAddTransactionInitials = (wallets: Wallet[]): AddTransactionSchema => {
	const { fromWallet, toWallet } = useEntryWalletDefaults(wallets);

	return useMemo(() => ({
		type: 'expense',
		amount: '',
		receiveAmount: '',
		fromWallet,
		toWallet,
		category: DEFAULT_ENTRY_CATEGORY,
	} satisfies AddTransactionSchema), [fromWallet, toWallet]);
}

export { useAddTransactionInitials };
