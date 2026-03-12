import type { TransactionDetailed, TransactionPreview } from "../types.ts";
import type {
	AdjustTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	TransactionDto,
	TransactionPreviewDto, 
	TransactionPreviewSide,
	TransactionSide,
	TransferTransactionData
} from "@entity/transaction";


const buildPreviewTransferTransaction = (
	response: TransactionPreview
): TransactionPreviewDto => {
	const data = response as TransferTransactionData<TransactionPreviewSide>;

	return {
		id: response.id,
		description: data.description,
		sender: data.sender,
		receiver: data.receiver,
		type: 'transfer',
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewExpenseTransaction = (
	response: TransactionPreview
): TransactionPreviewDto => {
	const data = response as ExpenseTransactionData<TransactionPreviewSide>;

	return {
		id: response.id,
		type: 'expense',
		description: data.description,
		sender: data.sender,
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewIncomeTransaction = (
	response: TransactionPreview
): TransactionPreviewDto => {
	const data = response as IncomeTransactionData<TransactionPreviewSide>;

	return {
		id: response.id,
		type: 'income',
		receiver: data.receiver,
		description: data.description,
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewAdjustTransaction = (
	response: TransactionPreview
): TransactionPreviewDto => {
	const data = response as AdjustTransactionData<TransactionPreviewSide>;

	return {
		id: response.id,
		type: 'adjust',
		receiver: data.receiver,
		description: data.description,
		createdAt: response.meta.created_at,
	} satisfies TransactionPreviewDto;
}

const buildTransferTransaction = (
	response: TransactionDetailed
): TransactionDto => {
	const data = response as TransferTransactionData<TransactionSide>;

	return {
		id: response.id,
		description: data.description,
		sender: data.sender,
		receiver: data.receiver,
		type: 'transfer',
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildExpenseTransaction = (
	response: TransactionDetailed
): TransactionDto => {
	const data = response as ExpenseTransactionData<TransactionSide>;

	return {
		id: response.id,
		type: 'expense',
		description: data.description,
		sender: data.sender,
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildIncomeTransaction = (
	response: TransactionDetailed
): TransactionDto => {
	const data = response as IncomeTransactionData<TransactionSide>;

	return {
		id: response.id,
		type: 'income',
		receiver: data.receiver,
		description: data.description,
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildAdjustTransaction = (
	response: TransactionDetailed
): TransactionDto => {
	const data = response as AdjustTransactionData<TransactionSide>;

	return {
		id: response.id,
		type: 'adjust',
		receiver: data.receiver,
		description: data.description,
		createdAt: response.meta.created_at,
	} satisfies TransactionDto;
}

const transactionPreviewResponseToFlat = (
	response: TransactionPreview
): TransactionPreviewDto => {
	const transactionType = response.type;
	
	switch (transactionType) {
		case 'transfer':
			return buildPreviewTransferTransaction(response);
		case 'expense':
			return buildPreviewExpenseTransaction(response);
		case 'income':
			return buildPreviewIncomeTransaction(response);
		case 'adjust':
			return buildPreviewAdjustTransaction(response);
		default:
			throw new Error(`Unknown transaction type: ${transactionType as string}`);
	}
}

const transactionDetailedResponseToFlat = (
	response: TransactionDetailed
): TransactionDto => {
	const transactionType = response.type;
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
			throw new Error(`Unknown transaction type: ${transactionType as string}`);
	}
}

export {
	transactionPreviewResponseToFlat,
	transactionDetailedResponseToFlat,
};