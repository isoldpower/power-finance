import type {
	ApiEnvelope,
	CollectionResponse,
	MutationMeta,
	EmbeddedMeta,
	MutationResponse,
	ResourceResponse,
	PageParams
} from "@shared/api";
import type {
	CategoryDto,
	ReceiptScanDto,
	TransactionAdjustBody,
	TransactionChainBody,
	TransactionChainDto,
	TransactionCreateBody,
	TransactionDetailDto,
	TransactionDto,
	TransactionPatchBody,
	TransactionSearchBody,
	TransactionSearchParams,
} from "../types.ts";


interface TransactionListRequest {
	params?: PageParams;
}

type TransactionListResponse = CollectionResponse<TransactionDto>;

interface TransactionGetRequest {
	id: string;
	params?: PageParams;
}

type TransactionGetResponse = ResourceResponse<TransactionDetailDto>;

interface TransactionSearchRequest {
	data: TransactionSearchBody;
	params?: TransactionSearchParams;
}

type TransactionSearchResponse = CollectionResponse<TransactionDto>;

interface TransactionPostRequest {
	data: TransactionCreateBody;
	idempotencyKey: string;
}

type TransactionPostResponse = MutationResponse<TransactionDto>;

interface TransactionPatchRequest {
	id: string;
	data: TransactionPatchBody;
}

type TransactionPatchResponse = MutationResponse<TransactionDto>;

interface TransactionAdjustRequest {
	id: string;
	data: TransactionAdjustBody;
	idempotencyKey: string;
}

type TransactionAdjustResponse = MutationResponse<TransactionDto>;

interface TransactionDeleteRequest {
	id: string;
}

type TransactionDeleteResponse = MutationResponse<TransactionDto>;

interface TransactionChainRequest {
	data: TransactionChainBody;
	idempotencyKey: string;
}

type TransactionChainResponse = ApiEnvelope<TransactionChainDto, MutationMeta & EmbeddedMeta<'transactions'>>;

interface TransactionChainDeleteRequest {
	chainId: string;
}

type TransactionChainDeleteResponse = ApiEnvelope<TransactionChainDto, EmbeddedMeta<'transactions'>>;

interface TransactionCategoriesRequest {
	params?: object;
}

interface TransactionCategoriesResponse {
	data: CategoryDto[];
}

interface TransactionScanRequest {
	params: { receiptId?: string };
}

interface TransactionScanResponse {
	data: ReceiptScanDto;
}

interface ITransactionsRESTApiClient {
	list: (request: TransactionListRequest) => Promise<TransactionListResponse>;
	get: (request: TransactionGetRequest) => Promise<TransactionGetResponse>;
	search: (request: TransactionSearchRequest) => Promise<TransactionSearchResponse>;
	post: (request: TransactionPostRequest) => Promise<TransactionPostResponse>;
	patch: (request: TransactionPatchRequest) => Promise<TransactionPatchResponse>;
	adjust: (request: TransactionAdjustRequest) => Promise<TransactionAdjustResponse>;
	delete: (request: TransactionDeleteRequest) => Promise<TransactionDeleteResponse>;
	postChain: (request: TransactionChainRequest) => Promise<TransactionChainResponse>;
	deleteChain: (request: TransactionChainDeleteRequest) => Promise<TransactionChainDeleteResponse>;
	listCategories: (request: TransactionCategoriesRequest) => Promise<TransactionCategoriesResponse>;
	scanReceipt: (request: TransactionScanRequest) => Promise<TransactionScanResponse>;
}

export type {
	ITransactionsRESTApiClient,
	TransactionAdjustRequest,
	TransactionAdjustResponse,
	TransactionCategoriesRequest,
	TransactionCategoriesResponse,
	TransactionChainDeleteRequest,
	TransactionChainDeleteResponse,
	TransactionChainRequest,
	TransactionChainResponse,
	TransactionDeleteRequest,
	TransactionDeleteResponse,
	TransactionGetRequest,
	TransactionGetResponse,
	TransactionListRequest,
	TransactionListResponse,
	TransactionPatchRequest,
	TransactionPatchResponse,
	TransactionPostRequest,
	TransactionPostResponse,
	TransactionScanRequest,
	TransactionScanResponse,
	TransactionSearchRequest,
	TransactionSearchResponse,
};
