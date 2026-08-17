import { useMemo } from "react";
import { useTransactionsSearch } from "@feature/transactions";

import type { Transaction, TransactionQuery } from "@entity/transactions";
import type { Wallet } from "@entity/wallets";


interface PeriodFlow {
	in: number;
	out: number;
	periodLabel: string;
}

interface DatedTransaction {
	transaction: Transaction;
	postedAt: Date;
}

const isSameMonth = (first: Date, second: Date): boolean => {
	return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth();
};

const monthLabel = (date: Date): string => date.toLocaleDateString(undefined, { month: 'long' });

const useWalletsPeriodFlow = (wallet: Wallet): PeriodFlow => {
	const query = useMemo<TransactionQuery>(() => ({ walletIds: [wallet.id] }), [wallet.id]);
	const { transactions } = useTransactionsSearch(query);
	const walletTransactions = useMemo<DatedTransaction[]>(() => (
		transactions
			.map((transaction) => ({
				transaction,
				postedAt: new Date(transaction.createdAt),
			}))
			.filter(({ postedAt }) => !Number.isNaN(postedAt.getTime()))
			.sort((first, second) => second.postedAt.getTime() - first.postedAt.getTime())
	), [transactions]);

	return useMemo(() => {
		const now = new Date();
		const latest = walletTransactions.at(0)?.postedAt;
		const reference = !latest || isSameMonth(latest, now) ? now : latest;

		return walletTransactions.reduce<PeriodFlow>((accumulatedFlow, { transaction, postedAt }) => {
			if (!isSameMonth(postedAt, reference)) {
				return accumulatedFlow;
			}

			const { amount } = transaction.money;

			return transaction.type === 'income'
				? { ...accumulatedFlow, in: accumulatedFlow.in + amount }
				: { ...accumulatedFlow, out: accumulatedFlow.out - amount };
		}, { in: 0, out: 0, periodLabel: monthLabel(reference) });
	}, [walletTransactions]);
}

export { useWalletsPeriodFlow };
export type { PeriodFlow };
