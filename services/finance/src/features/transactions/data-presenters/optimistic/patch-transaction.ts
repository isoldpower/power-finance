import type { Transaction, TransactionDetails, TransactionPatch } from "@entity/transactions";


const patchTransaction = <TTransaction extends Transaction>(
	transaction: TTransaction,
	patch: TransactionPatch,
): TTransaction => ({
	...transaction,
	name: patch.name ?? transaction.name,
	category: patch.category === undefined ? transaction.category : patch.category,
});

const patchTransactionDetails = (
	transaction: TransactionDetails,
	patch: TransactionPatch,
): TransactionDetails => ({
	...patchTransaction(transaction, patch),
	evidence: patch.evidence === undefined ? transaction.evidence : patch.evidence,
});

const adjustTransactionAmount = <TTransaction extends Transaction>(
	transaction: TTransaction,
	amount: string,
): TTransaction => ({
	...transaction,
	money: { ...transaction.money, amount },
});

export { adjustTransactionAmount, patchTransaction, patchTransactionDetails };
