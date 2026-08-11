type TransactionDirection = 'in' | 'out';

type TransactionOrigin = 'manual' | 'imported' | 'recurring';

type TransactionEntrySide = 'debit' | 'credit';

interface TransactionEntryDto {
	account: string;
	side: TransactionEntrySide;
	amount: string;
}

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
	origin: TransactionOrigin;
	entries: TransactionEntryDto[];
	source_wallet: TransactionWalletRef;
}

interface TransactionDto extends TransactionPreviewDto {
	note: string;
	receipt?: TransactionReceipt;
	counterparty_wallet?: TransactionWalletRef;
}

export type { TransactionDto, TransactionPreviewDto, TransactionDirection, TransactionWalletRef, TransactionReceipt };
export type { TransactionOrigin, TransactionEntryDto, TransactionEntrySide };

interface TransactionCategory {
	id: string;
	label: string;
}

interface ReceiptScanField {
	label: string;
	value: string;
	ai: boolean;
}

interface ReceiptScan {
	amount: number;
	currency: string;
	confidence: number;
	fields: ReceiptScanField[];
}

export type { TransactionCategory, ReceiptScan };
