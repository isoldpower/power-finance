export { CategoriesHttpRESTApiClient } from './http-server.ts';
export { CategoriesMockRESTApiClient } from './mock-server.ts';
export { CategoryCatalogMock, toCategoryRef } from './mock-catalog.ts';
export { BUILT_IN_CATEGORIES, CATEGORIES_STORAGE_KEY, builtInCategoryId } from './mock-seed.ts';

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
} from './types.ts';
export type { StoredCategory } from './mock-seed.ts';
