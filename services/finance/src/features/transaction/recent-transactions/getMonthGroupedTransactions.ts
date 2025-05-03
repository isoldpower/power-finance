import type { Transaction } from "@entity/transaction";

const getMonthGroupedTransactions = (
	transactions: Transaction[]
) => {
	return transactions.reduce((groups, transaction) => {
		const date = new Date(transaction.createdAt).toDateString();
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(transaction);
		return groups;
	}, {} as Record<string, Transaction[]>);
}

export { getMonthGroupedTransactions };