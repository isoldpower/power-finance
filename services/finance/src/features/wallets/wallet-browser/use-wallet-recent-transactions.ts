import { useMemo } from "react";
import { useTransactionsList } from "@feature/transactions";
import { Wallet } from "@entity/wallets";
import type { TransactionPreviewDto } from "@entity/transactions";


const useWalletRecentTransactions = (
	wallet: Wallet | undefined,
	recentCount: number = 3
): TransactionPreviewDto[] => {
	const { transactions } = useTransactionsList({ enabled: !!wallet });

	return useMemo(() => (wallet
		? transactions
			.filter((txn) => txn.source_wallet.id === wallet.id)
			.sort((first, second) => second.created_at.localeCompare(first.created_at))
			.slice(0, recentCount)
		: []
	), [transactions, wallet, recentCount]);
}

export { useWalletRecentTransactions };
