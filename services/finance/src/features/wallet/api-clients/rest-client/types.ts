import type {
	DeleteRequest, DeleteResponse, IDeleteHandler,
	GetRequest, GetResponse, IGetHandler,
	ListRequest, ListResponse, IListHandler,
	PatchRequest, PatchResponse, IPatchHandler,
	PostRequest, PostResponse, IPostHandler,
	PutRequest, PutResponse, IPutHandler
} from "@app/api/model";
import type {WalletDetailed, WalletMinimalPayload, WalletPreview, WalletValuableFields} from "../types.ts";

interface IWalletsRESTApiClient extends IGetHandler<object, WalletDetailed>,
	IPostHandler<WalletMinimalPayload, WalletDetailed>,
	IListHandler<WalletPreview>,
	IPatchHandler<WalletMinimalPayload, WalletDetailed>,
	IPutHandler<WalletMinimalPayload, WalletDetailed>,
	IDeleteHandler {
}

type WalletGetRequest = GetRequest<object>;
type WalletGetResponse = GetResponse<WalletDetailed>;

type WalletPostRequest = PostRequest<WalletValuableFields, object>;
type WalletPostResponse = PostResponse<WalletDetailed>;

type WalletListRequest = ListRequest;
type WalletListResponse = ListResponse<WalletPreview>;

type WalletPatchRequest = PatchRequest<WalletValuableFields, object>
type WalletPatchResponse = PatchResponse<WalletDetailed>;

type WalletPutRequest = PutRequest<WalletValuableFields, object>;
type WalletPutResponse = PutResponse<WalletDetailed>;

type WalletDeleteRequest = DeleteRequest<object>;
type WalletDeleteResponse = DeleteResponse;

export type {WalletGetRequest, WalletGetResponse};
export type {WalletPostRequest, WalletPostResponse};
export type {WalletListRequest, WalletListResponse};
export type {WalletPatchRequest, WalletPatchResponse};
export type {WalletPutRequest, WalletPutResponse};
export type {WalletDeleteRequest, WalletDeleteResponse};
export type {IWalletsRESTApiClient};