import type { TransactionPreviewDto } from "@entity/transaction";

const filterRelatedTransactions = (
	walletId: string | undefined,
	transactions: TransactionPreviewDto[]
) => {
	return transactions.filter((transaction) => {
		const displayAll = !walletId;
		const isSource = transaction.source_wallet_id === walletId;

		return displayAll || isSource;
	});
}

export { filterRelatedTransactions };
