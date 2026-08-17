import type { ApiEnvelope, CollectionResponse, EmbeddedMeta, MutationResponse, PageParams } from "@shared/api";
import type {
	WalletCreateBody,
	WalletDetailDto,
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
	params?: PageParams;
}

type WalletGetResponse = ApiEnvelope<WalletDetailDto, EmbeddedMeta<'recent'>>;

interface WalletPostRequest {
	data: WalletCreateBody;
	idempotencyKey?: string;
}

type WalletPostResponse = MutationResponse<WalletDto>;

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
	WalletSearchRequest,
	WalletSearchResponse,
};
