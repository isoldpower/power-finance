import type { Money } from "@entity/localization";


type TransactionEntryType = 'expense' | 'income' | 'transfer';

type TransactionType = 'expense' | 'income';

type TransactionOrigin = 'manual' | 'scanned' | 'automation';

type TransactionDraftOrigin = 'manual' | 'scanned';

interface TransactionWalletRef {
	id: string;
	name: string;
}

interface TransactionEvidence {
	url: string;
}

interface Transaction {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	money: Money;
	type: TransactionType;
	origin: TransactionOrigin;
	wallet: TransactionWalletRef;
	category: string | null;
	chainId: string | null;
}

interface TransactionAnalysis {
	balanced: boolean;
	comment: string | null;
}

interface TransactionDetails extends Transaction {
	evidence: TransactionEvidence | null;
	analysis: TransactionAnalysis | null;
}

interface TransactionPosting {
	id: string;
	accountId: string;
	title: string;
	icon: string;
	debit: boolean;
	position: number;
	money: Money;
}

interface TransactionChain {
	chainId: string;
	transactions: Transaction[];
}

interface TransactionDraft {
	name: string;
	currency: string;
	amount: string;
	walletId: string;
	origin: TransactionDraftOrigin;
	type: TransactionType;
	category: string | null;
	evidence: TransactionEvidence | null;
}

interface TransactionPatch {
	name?: string;
	category?: string | null;
	evidence?: TransactionEvidence | null;
}

interface TransactionChainEntryDraft extends TransactionDraft {
	temporaryId: string;
	after: string | null;
}

interface TransactionChainDraft {
	entries: TransactionChainEntryDraft[];
}

interface TransactionQuery {
	walletIds?: string[];
	chainId?: string;
	currencies?: string[];
	categories?: string[];
	types?: TransactionType[];
	search?: string;
	caseSensitive?: boolean;
	minAmount?: number;
	maxAmount?: number;
	createdAfter?: string;
	createdBefore?: string;
}


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

export type {
	Transaction,
	TransactionDetails,
	TransactionDraftOrigin,
	TransactionType,
	TransactionOrigin,
	TransactionAnalysis,
	TransactionEvidence,
	TransactionPosting,
	TransactionWalletRef,
	TransactionChain,
	TransactionDraft,
	TransactionPatch,
	TransactionChainDraft,
	TransactionChainEntryDraft,
	TransactionQuery,
	TransactionCategory,
	ReceiptScan,
	ReceiptScanField,
	TransactionEntryType
};
