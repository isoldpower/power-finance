import type { WalletPreview } from "@feature/wallets/wallets-api/types.ts";


type TransactionDirection = 'in' | 'out';

type TransactionOrigin = 'manual' | 'imported' | 'recurring';

type TransactionEntrySide = 'debit' | 'credit';

interface TransactionEntry {
	account: string
	side: TransactionEntrySide
	amount: string
}

interface TransactionReceipt {
	merchant: string
	date: string
	category: string
	confidence: number
}

interface TransactionMeta {
	id: string
	created_at: string
	updated_at: string
}

interface TransactionPreviewWallet {
	id: string
	name: string
	color: string
}

interface TransactionPreview {
	id: string
	amount: string
	currency_code: string
	direction: TransactionDirection
	merchant: string
	category: string
	occurred_at: string
	created_at: string
	origin: TransactionOrigin
	scanned: boolean
	entries: TransactionEntry[]
	wallet: TransactionPreviewWallet
}

interface TransactionDetailed {
	id: string
	amount: string
	currency_code: string
	direction: TransactionDirection
	merchant: string
	category: string
	occurred_at: string
	origin: TransactionOrigin
	entries: TransactionEntry[]
	note: string
	receipt?: TransactionReceipt
	wallet: WalletPreview
	counterparty_wallet?: TransactionPreviewWallet
	chain_id?: string
	meta: TransactionMeta
}

interface TransactionMinimalPayload {
	source_wallet_id: string
	amount: string
	merchant?: string
	category?: string
	direction?: TransactionDirection
	occurred_at?: string
}

interface TransactionPatchFields {
	merchant: string
	category: string
	note: string
}

type TransactionChainItem = TransactionMinimalPayload & {
	temporary_id: string
	after: string | null
};

interface TransactionChainPayload {
	transactions: TransactionChainItem[]
}

interface TransactionChainResult {
	chain_id: string
	transactions: TransactionDetailed[]
}

export type { TransactionDirection, TransactionOrigin, TransactionEntry, TransactionEntrySide };
export type { TransactionReceipt, TransactionMeta, TransactionPreviewWallet };
export type { TransactionPreview, TransactionDetailed, TransactionMinimalPayload, TransactionPatchFields };
export type { TransactionChainItem, TransactionChainPayload, TransactionChainResult };

interface CategoryDto {
	id: string;
	label: string;
}

interface ReceiptScanFieldDto {
	label: string;
	value: string;
	ai: boolean;
}

interface ReceiptScanDto {
	amount: string;
	currency: string;
	confidence: number;
	fields: ReceiptScanFieldDto[];
}

export type { CategoryDto, ReceiptScanFieldDto, ReceiptScanDto };
