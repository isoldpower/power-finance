import type { TransactionPreviewDto } from "@entity/transactions";


const getMonthGroupedTransactions = (
	transactions: TransactionPreviewDto[]
) => {
	return transactions.reduce<Record<string, TransactionPreviewDto[]>>((groups, transaction) => {
		const date = new Date(transaction.created_at).toDateString();
		groups[date] ??= [];

		groups[date].push(transaction);
		return groups;
	}, {});
}

export { getMonthGroupedTransactions };