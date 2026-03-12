import type { TransactionPreviewDto } from "@entity/transaction";


const getMonthGroupedTransactions = (
	transactions: TransactionPreviewDto[]
) => {
	return transactions.reduce<Record<string, TransactionPreviewDto[]>>((groups, transaction) => {
		const date = new Date(transaction.createdAt).toDateString();
		groups[date] ??= [];

		groups[date].push(transaction);
		return groups;
	}, {});
}

export { getMonthGroupedTransactions };