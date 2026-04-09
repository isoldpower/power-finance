import type { 
	TransactionDetailed as ApiTransactionDetailed,
	TransactionPreview as ApiTransactionPreview,
	TransactionSide as ApiTransactionSide,
	TransactionSideDetailed as ApiTransactionSideDetailed,
} from "../types.ts";
import type {
	AdjustTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	TransactionDto,
	TransactionPreviewDto,
	TransferTransactionData
} from "@entity/transaction";


const buildPreviewTransferTransaction = (
	response: ApiTransactionPreview
): TransactionPreviewDto => {
	const data = response as TransferTransactionData<ApiTransactionSide>;

	return {
		id: response.id,
		description: data.description,
		sender: {
			walletId: data.sender.wallet_id,
			currencyCode: data.sender.currency_code,
			amount: data.sender.amount,
		},
		receiver: {
			walletId: data.receiver.wallet_id,
			currencyCode: data.receiver.currency_code,
			amount: data.receiver.amount,
		},
		type: 'transfer',
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewExpenseTransaction = (
	response: ApiTransactionPreview
): TransactionPreviewDto => {
	const data = response as ExpenseTransactionData<ApiTransactionSide>;

	return {
		id: response.id,
		type: 'expense',
		description: data.description,
		sender: {
			walletId: data.sender.wallet_id,
			currencyCode: data.sender.currency_code,
			amount: data.sender.amount,
		},
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewIncomeTransaction = (
	response: ApiTransactionPreview
): TransactionPreviewDto => {
	const data = response as IncomeTransactionData<ApiTransactionSide>;

	return {
		id: response.id,
		type: 'income',
		receiver: {
			walletId: data.receiver.wallet_id,
			currencyCode: data.receiver.currency_code,
			amount: data.receiver.amount,
		},
		description: data.description,
		createdAt: response.meta.created_at
	} satisfies TransactionPreviewDto;
}

const buildPreviewAdjustTransaction = (
	response: ApiTransactionPreview
): TransactionPreviewDto => {
	const data = response as AdjustTransactionData<ApiTransactionSide>;

	return {
		id: response.id,
		type: 'adjust',
		receiver: {
			walletId: data.receiver.wallet_id,
			currencyCode: data.receiver.currency_code,
			amount: data.receiver.amount,
		},
		description: data.description,
		createdAt: response.meta.created_at,
	} satisfies TransactionPreviewDto;
}

const buildTransferTransaction = (
	response: ApiTransactionDetailed
): TransactionDto => {
	const data = response as TransferTransactionData<ApiTransactionSideDetailed>;

	return {
		id: response.id,
		description: data.description,
		sender: {
			wallet: data.sender.wallet,
			currencyCode: data.sender.currency_code,
			amount: data.sender.amount,
		},
		receiver: {
			wallet: data.receiver.wallet,
			currencyCode: data.receiver.currency_code,
			amount: data.sender.amount,
		},
		type: 'transfer',
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildExpenseTransaction = (
	response: ApiTransactionDetailed
): TransactionDto => {
	const data = response as ExpenseTransactionData<ApiTransactionSideDetailed>;

	return {
		id: response.id,
		type: 'expense',
		description: data.description,
		sender: {
			wallet: data.sender.wallet,
			currencyCode: data.sender.currency_code,
			amount: data.sender.amount,
		},
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildIncomeTransaction = (
	response: ApiTransactionDetailed
): TransactionDto => {
	const data = response as IncomeTransactionData<ApiTransactionSideDetailed>;

	return {
		id: response.id,
		type: 'income',
		receiver: {
			wallet: data.receiver.wallet,
			currencyCode: data.receiver.currency_code,
			amount: data.receiver.amount,
		},
		description: data.description,
		createdAt: response.meta.created_at
	} satisfies TransactionDto;
}

const buildAdjustTransaction = (
	response: ApiTransactionDetailed
): TransactionDto => {
	const data = response as AdjustTransactionData<ApiTransactionSideDetailed>;

	return {
		id: response.id,
		type: 'adjust',
		receiver: {
			wallet: data.receiver.wallet,
			currencyCode: data.receiver.currency_code,
			amount: data.receiver.amount,
		},
		description: data.description,
		createdAt: response.meta.created_at,
	} satisfies TransactionDto;
}

const transactionPreviewResponseToFlat = (
	response: ApiTransactionPreview
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
	response: ApiTransactionDetailed
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