import type { TransactionPreviewDto } from "@entity/transaction";


function getRecentTransactions(transactions: TransactionPreviewDto[]): TransactionPreviewDto[] {
	const now = new Date();
	const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	return transactions.filter((transaction) => {
		const date = new Date(transaction.created_at);
		const isInLastDay = date >= weekAgo;
		const isProcessed = date <= now;

		return isInLastDay && isProcessed;
	}).sort((a, b) => {
		return Date.parse(b.created_at) - Date.parse(a.created_at)
	});
}

export { getRecentTransactions };