import type {
	DeleteRequest, DeleteResponse, IDeleteHandler,
	GetRequest, GetResponse, IGetHandler,
	ListParams, ListRequest, ListResponse, IListHandler,
	PostRequest, PostResponse, IPostHandler,
	PutRequest, PutResponse, IPutHandler
} from "@app/api/model";
import type { TransactionDetailed, TransactionPreview, TransactionMinimalPayload, TransactionValuableFields } from "../types.ts";

interface ITransactionsRESTApiClient extends
	IGetHandler<object, TransactionDetailed>,
	IPostHandler<TransactionMinimalPayload, TransactionDetailed, object>,
	IListHandler<TransactionPreview, object>,
	IPutHandler<TransactionMinimalPayload, TransactionDetailed>,
	IDeleteHandler<object> {
}

type TransactionGetRequest = GetRequest<object>;
type TransactionGetResponse = GetResponse<TransactionDetailed>;

type TransactionPostRequest = PostRequest<TransactionValuableFields, object>;
type TransactionPostResponse = PostResponse<TransactionDetailed>;

type TransactionListRequest = ListRequest<ListParams>;
type TransactionListResponse = ListResponse<TransactionPreview>;

type TransactionPutRequest = PutRequest<TransactionValuableFields, object>;
type TransactionPutResponse = PutResponse<TransactionDetailed>;

type TransactionDeleteRequest = DeleteRequest<object>;
type TransactionDeleteResponse = DeleteResponse;

export type {TransactionGetRequest, TransactionGetResponse};
export type {TransactionPostRequest, TransactionPostResponse};
export type {TransactionListRequest, TransactionListResponse};
export type {TransactionPutRequest, TransactionPutResponse};
export type {TransactionDeleteRequest, TransactionDeleteResponse};
export type {ITransactionsRESTApiClient};