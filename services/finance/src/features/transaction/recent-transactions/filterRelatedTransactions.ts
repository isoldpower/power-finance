import type { TransactionPreviewDto } from "@entity/transaction";

const filterRelatedTransactions = (
	walletId: string | undefined,
	transactions: TransactionPreviewDto[]
) => {
	return transactions.filter((transaction) => {
		const displayAll = !walletId;
		const isSource = transaction.sender?.wallet_id === walletId;
		const isDestination = transaction.receiver?.wallet_id === walletId;

		return displayAll || isSource || isDestination;
	});
}

export { filterRelatedTransactions };