import type { TransactionDetailed, TransactionPreview } from "../types.ts";
import type {
	AdjustTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	Transaction,
	TransactionType,
	TransferTransactionData
} from "src/entities/transaction";


const buildTransferTransaction = (
	response: TransactionPreview
): Transaction => {
	const data = response.data as TransferTransactionData;

	return {
		id: response.id,
		description: data.description,
		from: data.from,
		to: data.to,
		type: 'transfer',
		createdAt: response.meta.createdAt
	} satisfies Transaction;
}

const buildExpenseTransaction = (
	response: TransactionPreview
): Transaction => {
	const data = response.data as ExpenseTransactionData;

	return {
		id: response.id,
		type: 'expense',
		description: data.description,
		from: data.from,
		createdAt: response.meta.createdAt
	} satisfies Transaction;
}

const buildIncomeTransaction = (
	response: TransactionPreview
): Transaction => {
	const data = response.data as IncomeTransactionData;

	return {
		id: response.id,
		type: 'income',
		to: data.to,
		description: data.description,
		createdAt: response.meta.createdAt
	} satisfies Transaction;
}

const buildAdjustTransaction = (
	response: TransactionPreview
): Transaction => {
	const data = response.data as AdjustTransactionData;

	return {
		id: response.id,
		type: 'adjust',
		to: data.to,
		description: data.description,
		createdAt: response.meta.createdAt
	} satisfies Transaction;
}

const detailedBuildWrapper = (
	routine: (response: TransactionPreview) => Transaction,
	response: TransactionDetailed
): Transaction => {
	const preview = routine(response);

	return Object.assign(preview, {
		createdAt: response.meta.createdAt,
	}) satisfies Transaction;
}

const transactionPreviewResponseToFlat = (
	response: TransactionPreview
): Transaction => {
	const transactionType = response.type as TransactionType;
	switch (transactionType) {
		case 'transfer':
			return buildTransferTransaction(response);
		case 'expense':
			return buildExpenseTransaction(response);
		case 'income':
			return buildIncomeTransaction(response);
		case 'adjust':
			return buildAdjustTransaction(response);
		default:
			throw new Error(`Unknown transaction type: ${transactionType}`);
	}
}

const transactionDetailedResponseToFlat = (
	response: TransactionDetailed
): Transaction => {
	const transactionType = response.type as TransactionType;
	switch (transactionType) {
		case 'transfer':
			return detailedBuildWrapper(buildTransferTransaction, response);
		case 'expense':
			return detailedBuildWrapper(buildExpenseTransaction, response);
		case 'income':
			return detailedBuildWrapper(buildIncomeTransaction, response);
		case 'adjust':
			return detailedBuildWrapper(buildAdjustTransaction, response);
		default:
			throw new Error(`Unknown transaction type: ${transactionType}`);
	}
}

export {
	transactionPreviewResponseToFlat,
	transactionDetailedResponseToFlat,
};