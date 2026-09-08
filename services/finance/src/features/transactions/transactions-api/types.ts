import type { MoneyDto, PageParams, ResourceTimestamps, SearchPayload } from "@shared/api";


type TransactionTypeDto = 'expense' | 'income';

type TransactionOriginDto = 'manual' | 'scanned' | 'automation';

type TransactionOriginBodyDto = 'manual' | 'scanned';

interface TransactionWalletDto {
	id: string;
	name: string;
}

interface TransactionEvidenceDto {
	url: string;
}

interface TransactionDto extends ResourceTimestamps {
	id: string;
	name: string;
	money: MoneyDto;
	type: TransactionTypeDto;
	origin: TransactionOriginDto;
	wallet: TransactionWalletDto;
	category: string | null;
	chain_id: string | null;
}

interface TransactionAnalysisDto {
	balanced: boolean;
	comment: string | null;
}

interface TransactionPostingDto {
	id: string;
	account_id: string;
	title: string;
	icon: string;
	debit: boolean;
	position: number;
	money: MoneyDto;
}

interface TransactionDetailDto extends TransactionDto {
	evidence: TransactionEvidenceDto | null;
	postings: TransactionPostingDto[];
	analysis: TransactionAnalysisDto | null;
}

interface TransactionCreateBody {
	name: string;
	currency: string;
	amount: string;
	wallet_id: string;
	origin: TransactionOriginBodyDto;
	type: TransactionTypeDto;
	category: string | null;
	evidence: TransactionEvidenceDto | null;
}

interface TransactionAdjustBody {
	amount: string;
}

interface TransactionPatchBody {
	name?: string;
	category?: string | null;
	evidence?: TransactionEvidenceDto | null;
}

interface TransactionChainEntryBody extends TransactionCreateBody {
	temporary_id: string;
	after: string | null;
}

interface TransactionChainBody {
	transactions: TransactionChainEntryBody[];
}

interface TransactionChainDto {
	chain_id: string;
	transactions: TransactionDto[];
}

type TransactionSearchField =
	| 'wallet_id'
	| 'chain_id'
	| 'amount'
	| 'currency'
	| 'name'
	| 'category'
	| 'type'
	| 'origin'
	| 'created_at';

type TransactionSearchBody = SearchPayload<TransactionSearchField>;

type TransactionSearchParams = PageParams;

const TRANSACTION_CHAIN_LIMIT = 100;

export { TRANSACTION_CHAIN_LIMIT };
export type {
	TransactionAdjustBody,
	TransactionAnalysisDto,
	TransactionChainBody,
	TransactionChainDto,
	TransactionChainEntryBody,
	TransactionCreateBody,
	TransactionDetailDto,
	TransactionDto,
	TransactionEvidenceDto,
	TransactionOriginBodyDto,
	TransactionOriginDto,
	TransactionPatchBody,
	TransactionPostingDto,
	TransactionSearchBody,
	TransactionSearchField,
	TransactionSearchParams,
	TransactionTypeDto,
	TransactionWalletDto,
};

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
