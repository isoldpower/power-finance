import type { LedgerEntryDto } from "@feature/accounts/accounts-api";
import type { MoneyDto, PageParams, ResourceTimestamps, SearchOrder, SearchPayload } from "@shared/api";

type TransactionTypeDto = 'expense' | 'income';

type TransactionOriginDto = 'manual' | 'scanned';

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

interface TransactionDetailDto extends TransactionDto {
	evidence: TransactionEvidenceDto | null;
	postings: LedgerEntryDto[];
	analysis: TransactionAnalysisDto;
}

interface TransactionCreateBody {
	name: string;
	currency: string;
	amount: string;
	wallet_id: string;
	origin: TransactionOriginDto;
	type: TransactionTypeDto;
	category: string | null;
	evidence: TransactionEvidenceDto | null;
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

interface TransactionSearchParams extends PageParams {
	order?: SearchOrder;
}

const TRANSACTION_CHAIN_LIMIT = 100;

export { TRANSACTION_CHAIN_LIMIT };
export type {
	TransactionAnalysisDto,
	TransactionChainBody,
	TransactionChainDto,
	TransactionChainEntryBody,
	TransactionCreateBody,
	TransactionDetailDto,
	TransactionDto,
	TransactionEvidenceDto,
	TransactionOriginDto,
	TransactionPatchBody,
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
