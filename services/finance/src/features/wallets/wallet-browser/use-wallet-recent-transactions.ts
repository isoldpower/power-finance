import { useMemo } from "react";
import { useTransactionsList, useTransactionRowsView } from "@feature/transactions";
import { Wallet } from "@entity/wallets";


const useWalletRecentTransactions = (
	wallet: Wallet | undefined,
	recentCount: number = 3
) => {
	const { transactions } = useTransactionsList({ enabled: !!wallet });

	const walletTransactions = useMemo(() => (wallet
		? transactions
			.filter((txn) => txn.source_wallet.id === wallet.id)
			.sort((first, second) => second.created_at.localeCompare(first.created_at))
			.slice(0, recentCount)
		: []
	), [transactions, wallet, recentCount]);

	return useTransactionRowsView(walletTransactions);
}

export { useWalletRecentTransactions };
