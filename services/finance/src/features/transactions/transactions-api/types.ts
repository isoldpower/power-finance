import type { CategoryRefDto } from "@feature/categories/categories-api";
import type { MoneyDto, PageParams, ResourceTimestamps, SearchOrder, SearchPayload } from "@internal/shared";


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

interface TransactionChainRefDto {
	id: string;
	size: number;
}

interface TransactionDto extends ResourceTimestamps {
	id: string;
	name: string;
	money: MoneyDto;
	type: TransactionTypeDto;
	origin: TransactionOriginDto;
	wallet: TransactionWalletDto;
	category: CategoryRefDto | null;
	chain?: TransactionChainRefDto | null;
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
	category_id: string | null;
	evidence: TransactionEvidenceDto | null;
}

interface TransactionAdjustBody {
	amount: string;
}

interface TransactionPatchBody {
	name?: string;
	category_id?: string | null;
	evidence?: TransactionEvidenceDto | null;
}

interface TransactionChainNewEntryBody extends TransactionCreateBody {
	temporary_id: string;
	after: string | null;
}

interface TransactionChainExistingEntryBody {
	temporary_id: string;
	after: string | null;
	transaction_id: string;
}

type TransactionChainEntryBody = TransactionChainNewEntryBody | TransactionChainExistingEntryBody;

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
	| 'category_id'
	| 'type'
	| 'origin'
	| 'created_at';

type TransactionSearchBody = SearchPayload<TransactionSearchField>;

type TransactionSearchParams = PageParams & {
	order?: SearchOrder;
};

const TRANSACTION_CHAIN_LIMIT = 100;

export { TRANSACTION_CHAIN_LIMIT };
export type {
	TransactionAdjustBody,
	TransactionAnalysisDto,
	TransactionChainBody,
	TransactionChainDto,
	TransactionChainRefDto,
	TransactionChainEntryBody,
	TransactionChainExistingEntryBody,
	TransactionChainNewEntryBody,
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

export type { ReceiptScanFieldDto, ReceiptScanDto };
