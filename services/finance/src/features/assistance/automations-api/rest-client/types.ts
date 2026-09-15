import type { CollectionResponse, MutationResponse, ResourceResponse } from "@shared/api";
import type {
	AutomationCreateBody,
	AutomationDto,
	AutomationListParams,
	AutomationPatchBody,
	AutomationSearchBody,
	AutomationSearchParams,
} from "../types.ts";


interface AutomationListRequest {
	params?: AutomationListParams;
}

type AutomationListResponse = CollectionResponse<AutomationDto>;

interface AutomationGetRequest {
	id: string;
}

type AutomationGetResponse = ResourceResponse<AutomationDto>;

interface AutomationPostRequest {
	data: AutomationCreateBody;
	idempotencyKey?: string;
}

type AutomationPostResponse = MutationResponse<AutomationDto>;

interface AutomationPatchRequest {
	id: string;
	data: AutomationPatchBody;
}

type AutomationPatchResponse = MutationResponse<AutomationDto>;

interface AutomationDeleteRequest {
	id: string;
}

type AutomationDeleteResponse = MutationResponse<AutomationDto>;

interface AutomationSearchRequest {
	data: AutomationSearchBody;
	params?: AutomationSearchParams;
}

type AutomationSearchResponse = CollectionResponse<AutomationDto>;

interface IAutomationsRESTApiClient {
	list: (request: AutomationListRequest) => Promise<AutomationListResponse>;
	get: (request: AutomationGetRequest) => Promise<AutomationGetResponse>;
	post: (request: AutomationPostRequest) => Promise<AutomationPostResponse>;
	patch: (request: AutomationPatchRequest) => Promise<AutomationPatchResponse>;
	delete: (request: AutomationDeleteRequest) => Promise<AutomationDeleteResponse>;
	search: (request: AutomationSearchRequest) => Promise<AutomationSearchResponse>;
}

export type {
	IAutomationsRESTApiClient,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
	AutomationGetRequest,
	AutomationGetResponse,
	AutomationListRequest,
	AutomationListResponse,
	AutomationPatchRequest,
	AutomationPatchResponse,
	AutomationPostRequest,
	AutomationPostResponse,
	AutomationSearchRequest,
	AutomationSearchResponse,
};
