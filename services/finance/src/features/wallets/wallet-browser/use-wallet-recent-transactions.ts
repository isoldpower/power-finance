import {useMemo} from "react";
import {toTransactionRow, useTransactionsList, WalletRef} from "@feature/transactions";
import {Wallet} from "@entity/wallets";
import {useLocaleCurrency} from "@shared/utils";


const useWalletRecentTransactions = (
	wallet: Wallet | undefined,
	recentCount: number = 3
) => {
	const format = useLocaleCurrency();
	const { transactions } = useTransactionsList({ enabled: !!wallet });
	
	const walletTransactions = useMemo(() => (wallet 
		? transactions
			.filter((txn) => txn.source_wallet.id === wallet.id)
			.sort((first, second) => second.created_at.localeCompare(first.created_at))
		: undefined
	), [transactions, wallet]);
	
	return useMemo(() => {
		if (wallet && walletTransactions) {
			const walletById = new Map<string, WalletRef>([
				[wallet.id, {name: wallet.name, currency: wallet.balance.currency}],
			]);

			return walletTransactions
				.slice(0, recentCount)
				.map((transaction) => toTransactionRow(transaction, walletById, format));
		}
		
		return [];
	}, [format, recentCount, wallet, walletTransactions]);
}

export { useWalletRecentTransactions };