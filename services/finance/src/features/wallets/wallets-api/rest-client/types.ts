import type {
	DeleteRequest, DeleteResponse, IDeleteHandler,
	GetRequest, GetResponse, IGetHandler,
	ListRequest, ListResponse, IListHandler,
	PatchRequest, PatchResponse, IPatchHandler,
	PostRequest, PostResponse, IPostHandler,
	PutRequest, PutResponse, IPutHandler, ListParams,
} from "@internal/shared";
import type {
	WalletDetailed,
	WalletMinimalPayload,
	WalletPreview,
	WalletSearchRoot,
	WalletValuableFields,
	WalletKindDto
} from "../types.ts";


interface IWalletsRESTApiClient extends 
	IGetHandler<object, WalletDetailed>,
	IPostHandler<WalletMinimalPayload, WalletDetailed>,
	IListHandler<WalletPreview>,
	IPatchHandler<WalletMinimalPayload, WalletDetailed>,
	IPutHandler<WalletMinimalPayload, WalletDetailed>,
	IDeleteHandler 
{
	search: (request: PostRequest<WalletSearchRoot, ListParams>) => Promise<ListResponse<WalletPreview>>
	listKinds: (request: WalletKindsRequest) => Promise<WalletKindsResponse>
}

interface WalletKindsRequest { params: object }
interface WalletKindsResponse { data: WalletKindDto[] }

type WalletGetRequest = GetRequest<object>;
type WalletGetResponse = GetResponse<WalletDetailed>;

type WalletPostRequest = PostRequest<WalletValuableFields, object>;
type WalletPostResponse = PostResponse<WalletDetailed>;

type WalletsSearchRequest = PostRequest<WalletSearchRoot, ListParams>;
type WalletsSearchResponse = ListResponse<WalletPreview>;

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
export type {WalletsSearchRequest, WalletsSearchResponse};
export type {IWalletsRESTApiClient};

export type { WalletKindsRequest, WalletKindsResponse };
