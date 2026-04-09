import type { TransactionPreviewDto } from "@entity/transaction";

const filterRelatedTransactions = (
	walletId: string | undefined,
	transactions: TransactionPreviewDto[]
) => {
	return transactions.filter((transaction) => {
		const displayAll = !walletId;
		const isSource = transaction.sender?.walletId === walletId;
		const isDestination = transaction.receiver?.walletId === walletId;

		return displayAll || isSource || isDestination;
	});
}

export { filterRelatedTransactions };