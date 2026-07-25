import type { TransactionPreviewDto } from "@entity/transactions";


const filterRelatedTransactions = (
	walletId: string | undefined,
	transactions: TransactionPreviewDto[]
) => {
	return transactions.filter((transaction) => {
		const displayAll = !walletId;
		const isSource = transaction.source_wallet.id === walletId;

		return displayAll || isSource;
	});
}

export { filterRelatedTransactions };
