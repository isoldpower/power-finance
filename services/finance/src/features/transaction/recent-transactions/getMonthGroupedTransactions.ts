import type { Transaction } from "@entity/transaction";


const getMonthGroupedTransactions = (
	transactions: Transaction[]
) => {
	return transactions.reduce<Record<string, Transaction[] | undefined>>((groups, transaction) => {
		const date = new Date(transaction.createdAt).toDateString();
		groups[date] ??= [];

		groups[date].push(transaction);
		return groups;
	}, {});
}

export { getMonthGroupedTransactions };