import type { Transaction } from "@entity/transaction";

const filterRelatedTransactions = (
	walletId: string | undefined,
	transactions: Transaction[]
) => {
	return transactions.filter((transaction) => {
		const displayAll = !walletId;
		const isSource = transaction.from?.wallet.id === walletId;
		const isDestination = transaction.to?.wallet.id === walletId;

		return displayAll || isSource || isDestination;
	});
}

export { filterRelatedTransactions };