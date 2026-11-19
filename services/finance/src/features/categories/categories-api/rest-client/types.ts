import type { CollectionResponse, MutationResponse } from "@internal/shared";
import type { CategoryCreateBody, CategoryDto, CategoryListParams, CategoryPatchBody } from "../types.ts";


interface CategoryListRequest {
	params?: CategoryListParams;
}

type CategoryListResponse = CollectionResponse<CategoryDto>;

interface CategoryPostRequest {
	data: CategoryCreateBody;
	idempotencyKey: string;
}

type CategoryPostResponse = MutationResponse<CategoryDto>;

interface CategoryPatchRequest {
	id: string;
	data: CategoryPatchBody;
}

type CategoryPatchResponse = MutationResponse<CategoryDto>;

interface CategoryDeleteRequest {
	id: string;
}

type CategoryDeleteResponse = MutationResponse<CategoryDto>;

interface ICategoriesRESTApiClient {
	list: (request: CategoryListRequest) => Promise<CategoryListResponse>;
	post: (request: CategoryPostRequest) => Promise<CategoryPostResponse>;
	patch: (request: CategoryPatchRequest) => Promise<CategoryPatchResponse>;
	delete: (request: CategoryDeleteRequest) => Promise<CategoryDeleteResponse>;
}

export type {
	ICategoriesRESTApiClient,
	CategoryDeleteRequest,
	CategoryDeleteResponse,
	CategoryListRequest,
	CategoryListResponse,
	CategoryPatchRequest,
	CategoryPatchResponse,
	CategoryPostRequest,
	CategoryPostResponse,
};
