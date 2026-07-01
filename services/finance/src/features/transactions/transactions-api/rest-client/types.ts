import type {
	DeleteRequest, DeleteResponse, IDeleteHandler,
	GetRequest, GetResponse, IGetHandler,
	ListRequest, ListResponse, IListHandler,
	PostRequest, PostResponse, IPostHandler
} from "@internal/shared";
import type { TransactionDetailed, TransactionPreview, TransactionMinimalPayload } from "../types.ts";

interface ITransactionsRESTApiClient extends
	IGetHandler<object, TransactionDetailed>,
	IPostHandler<TransactionMinimalPayload, TransactionDetailed>,
	IListHandler<TransactionPreview>,
	IDeleteHandler
{}

type TransactionGetRequest = GetRequest<object>;
type TransactionGetResponse = GetResponse<TransactionDetailed>;

type TransactionPostRequest = PostRequest<TransactionMinimalPayload, object>;
type TransactionPostResponse = PostResponse<TransactionDetailed>;

type TransactionListRequest = ListRequest;
type TransactionListResponse = ListResponse<TransactionPreview>;

type TransactionDeleteRequest = DeleteRequest<object>;
type TransactionDeleteResponse = DeleteResponse;

export type { TransactionGetRequest, TransactionGetResponse };
export type { TransactionPostRequest, TransactionPostResponse };
export type { TransactionListRequest, TransactionListResponse };
export type { TransactionDeleteRequest, TransactionDeleteResponse };
export type { ITransactionsRESTApiClient };
