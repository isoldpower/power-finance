import type { Transaction } from "@entity/transaction";

function getRecentTransactions(transactions: Transaction[]): Transaction[] {
	const now = new Date();
	const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

	return transactions.filter((transaction) => {
		const date = new Date(transaction.createdAt);
		const isInLastDay = date >= twentyFourHoursAgo;
		const isProcessed = date <= now;

		return isInLastDay && isProcessed;
	}).sort((a, b) => {
		return Date.parse(b.createdAt) - Date.parse(a.createdAt)
	}).slice(0, 5);
}

export { getRecentTransactions };