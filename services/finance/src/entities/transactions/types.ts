import type { Money } from "@entity/localization";
import type { LedgerEntry } from "@entity/accounts";


type TransactionEntryType = 'expense' | 'income' | 'transfer';

type TransactionType = 'expense' | 'income';

type TransactionOrigin = 'manual' | 'scanned';

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
	analysis: TransactionAnalysis;
}

type TransactionPosting = LedgerEntry;

interface TransactionChain {
	chainId: string;
	transactions: Transaction[];
}

interface TransactionDraft {
	name: string;
	currency: string;
	amount: number;
	walletId: string;
	origin: TransactionOrigin;
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
