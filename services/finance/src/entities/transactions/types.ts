type TransactionDirection = 'in' | 'out';

interface TransactionWalletRef {
	id: string;
	name: string;
	color: string;
}

interface TransactionReceipt {
	merchant: string;
	date: string;
	category: string;
	confidence: number;
}

interface TransactionPreviewDto {
	id: string;
	amount: string;
	currency_code: string;
	direction: TransactionDirection;
	merchant: string;
	category: string;
	occurred_at: string;
	created_at: string;
	source_wallet: TransactionWalletRef;
}

interface TransactionDto extends TransactionPreviewDto {
	note: string;
	receipt?: TransactionReceipt;
	counterparty_wallet?: TransactionWalletRef;
}

export type { TransactionDto, TransactionPreviewDto, TransactionDirection, TransactionWalletRef, TransactionReceipt };
