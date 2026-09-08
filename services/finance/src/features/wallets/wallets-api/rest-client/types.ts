import type {
	ApiEnvelope,
	CollectionResponse,
	EmbeddedMeta,
	MutationResponse,
	PageParams
} from "@shared/api";
import type {
	WalletCreateBody,
	WalletDetailDto,
	WalletDetailParams,
	WalletPeriodDto,
	WalletReplaceBody,
	WalletDto,
	WalletPatchBody,
	WalletSearchBody,
	WalletSearchParams,
} from "../types.ts";


interface WalletListRequest {
	params?: PageParams;
}

type WalletListResponse = CollectionResponse<WalletDto>;

interface WalletGetRequest {
	id: string;
	params?: WalletDetailParams;
}

type WalletGetResponse = ApiEnvelope<WalletDetailDto, EmbeddedMeta<'recent', { period: WalletPeriodDto }>>;

interface WalletPostRequest {
	data: WalletCreateBody;
	idempotencyKey?: string;
}

type WalletPostResponse = MutationResponse<WalletDto>;

interface WalletPutRequest {
	id: string;
	data: WalletReplaceBody;
}

type WalletPutResponse = MutationResponse<WalletDto>;

interface WalletPatchRequest {
	id: string;
	data: WalletPatchBody;
}

type WalletPatchResponse = MutationResponse<WalletDto>;

interface WalletDeleteRequest {
	id: string;
}

type WalletDeleteResponse = MutationResponse<WalletDto>;

interface WalletSearchRequest {
	data: WalletSearchBody;
	params?: WalletSearchParams;
}

type WalletSearchResponse = CollectionResponse<WalletDto>;

interface IWalletsRESTApiClient {
	list: (request: WalletListRequest) => Promise<WalletListResponse>;
	get: (request: WalletGetRequest) => Promise<WalletGetResponse>;
	post: (request: WalletPostRequest) => Promise<WalletPostResponse>;
	put: (request: WalletPutRequest) => Promise<WalletPutResponse>;
	patch: (request: WalletPatchRequest) => Promise<WalletPatchResponse>;
	delete: (request: WalletDeleteRequest) => Promise<WalletDeleteResponse>;
	search: (request: WalletSearchRequest) => Promise<WalletSearchResponse>;
}

export type {
	IWalletsRESTApiClient,
	WalletDeleteRequest,
	WalletDeleteResponse,
	WalletGetRequest,
	WalletGetResponse,
	WalletListRequest,
	WalletListResponse,
	WalletPatchRequest,
	WalletPatchResponse,
	WalletPostRequest,
	WalletPostResponse,
	WalletPutRequest,
	WalletPutResponse,
	WalletSearchRequest,
	WalletSearchResponse,
};
