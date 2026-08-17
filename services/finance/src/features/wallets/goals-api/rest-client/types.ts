import type { ApiEnvelope, CollectionResponse, EmbeddedMeta, MutationResponse, PageParams } from "@shared/api";
import type { GoalCreateBody, GoalDetailDto, GoalDto, GoalPatchBody } from "../types.ts";

interface GoalListRequest {
	params?: PageParams;
}

type GoalListResponse = CollectionResponse<GoalDto>;

interface GoalGetRequest {
	id: string;
	params?: PageParams;
}

type GoalGetResponse = ApiEnvelope<GoalDetailDto, EmbeddedMeta<'history'>>;

interface GoalPostRequest {
	data: GoalCreateBody;
	idempotencyKey?: string;
}

type GoalPostResponse = MutationResponse<GoalDto>;

interface GoalPatchRequest {
	id: string;
	data: GoalPatchBody;
}

type GoalPatchResponse = MutationResponse<GoalDto>;

interface GoalDeleteRequest {
	id: string;
}

type GoalDeleteResponse = MutationResponse<GoalDto>;

interface IGoalsRESTApiClient {
	list: (request: GoalListRequest) => Promise<GoalListResponse>;
	get: (request: GoalGetRequest) => Promise<GoalGetResponse>;
	post: (request: GoalPostRequest) => Promise<GoalPostResponse>;
	patch: (request: GoalPatchRequest) => Promise<GoalPatchResponse>;
	delete: (request: GoalDeleteRequest) => Promise<GoalDeleteResponse>;
}

export type {
	IGoalsRESTApiClient,
	GoalDeleteRequest,
	GoalDeleteResponse,
	GoalGetRequest,
	GoalGetResponse,
	GoalListRequest,
	GoalListResponse,
	GoalPatchRequest,
	GoalPatchResponse,
	GoalPostRequest,
	GoalPostResponse,
};
