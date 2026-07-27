import type {
	DeleteRequest, DeleteResponse, IDeleteHandler,
	GetRequest, GetResponse, IGetHandler,
	ListParams, ListRequest, ListResponse, IListHandler,
	PatchRequest, PatchResponse, IPatchHandler,
	PostRequest, PostResponse, IPostHandler
} from "@internal/shared";
import type { TransactionDetailed, TransactionPreview, TransactionMinimalPayload, TransactionPatchFields, TransactionChainPayload, TransactionChainResult } from "../types.ts";

interface TransactionListParams extends ListParams {
	wallet_id?: string
}

interface ITransactionsRESTApiClient extends
	IGetHandler<object, TransactionDetailed>,
	IPostHandler<TransactionMinimalPayload, TransactionDetailed>,
	IListHandler<TransactionPreview, TransactionListParams>,
	IPatchHandler<TransactionPatchFields, TransactionDetailed>,
	IDeleteHandler
{
	chain: (request: TransactionChainRequest) => Promise<TransactionChainResponse>
}

type TransactionGetRequest = GetRequest<object>;
type TransactionGetResponse = GetResponse<TransactionDetailed>;

type TransactionPostRequest = PostRequest<TransactionMinimalPayload, object>;
type TransactionPostResponse = PostResponse<TransactionDetailed>;

type TransactionListRequest = ListRequest<TransactionListParams>;
type TransactionListResponse = ListResponse<TransactionPreview>;

type TransactionPatchRequest = PatchRequest<TransactionPatchFields, object>;
type TransactionPatchResponse = PatchResponse<TransactionDetailed>;

type TransactionChainRequest = PostRequest<TransactionChainPayload, object>;
type TransactionChainResponse = TransactionChainResult;

type TransactionDeleteRequest = DeleteRequest<object>;
type TransactionDeleteResponse = DeleteResponse;

export type { TransactionGetRequest, TransactionGetResponse };
export type { TransactionPostRequest, TransactionPostResponse };
export type { TransactionListRequest, TransactionListResponse, TransactionListParams };
export type { TransactionPatchRequest, TransactionPatchResponse };
export type { TransactionChainRequest, TransactionChainResponse };
export type { TransactionDeleteRequest, TransactionDeleteResponse };
export type { ITransactionsRESTApiClient };
