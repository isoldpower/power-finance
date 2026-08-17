import { useMemo } from "react";
import { useTransactionsSearch } from "@feature/transactions";

import type { Transaction, TransactionQuery } from "@entity/transactions";
import type { Wallet } from "@entity/wallets";


const useWalletRecentTransactions = (
	wallet: Wallet | undefined,
	recentCount: number = 3
): Transaction[] => {
	const query = useMemo<TransactionQuery>(() => ({
		walletIds: wallet ? [wallet.id] : undefined,
	}), [wallet]);

	const { transactions } = useTransactionsSearch(
		query,
		{ order: 'DESC', limit: recentCount },
		{ enabled: Boolean(wallet) }
	);

	return transactions;
}

export { useWalletRecentTransactions };
