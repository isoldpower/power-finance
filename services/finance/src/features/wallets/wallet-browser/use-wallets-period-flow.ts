import { useMemo } from "react";
import { useTransactionsList } from "@feature/transactions";

import type { Wallet } from "@entity/wallets";
import type { TransactionPreviewDto } from "@entity/transactions";


interface PeriodFlow {
	in: number;
	out: number;
	periodLabel: string;
}

interface DatedTransaction {
	transaction: TransactionPreviewDto;
	postedAt: Date;
}

const isSameMonth = (first: Date, second: Date): boolean => {
	return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth();
};

const monthLabel = (date: Date): string => date.toLocaleDateString(undefined, { month: 'long' });

const useWalletsPeriodFlow = (wallet: Wallet): PeriodFlow => {
	const { transactions } = useTransactionsList();
	const walletTransactions = useMemo<DatedTransaction[]>(() => (
		transactions
			.filter((transaction) => transaction.source_wallet.id === wallet.id)
			.map((transaction) => ({
				transaction,
				postedAt: new Date(transaction.occurred_at || transaction.created_at),
			}))
			.filter(({ postedAt }) => !Number.isNaN(postedAt.getTime()))
			.sort((first, second) => second.postedAt.getTime() - first.postedAt.getTime())
	), [transactions, wallet]);

	return useMemo(() => {
		const now = new Date();
		const latest = walletTransactions[0]?.postedAt;
		const reference = !latest || isSameMonth(latest, now) ? now : latest;

		return walletTransactions.reduce<PeriodFlow>((accumulatedFlow, { transaction, postedAt }) => {
			if (!isSameMonth(postedAt, reference)) {
				return accumulatedFlow;
			}

			const amount = parseFloat(transaction.amount) || 0;

			return amount >= 0
				? { ...accumulatedFlow, in: accumulatedFlow.in + amount }
				: { ...accumulatedFlow, out: accumulatedFlow.out + amount };
		}, { in: 0, out: 0, periodLabel: monthLabel(reference) });
	}, [walletTransactions]);
}

export { useWalletsPeriodFlow };
export type { PeriodFlow };
