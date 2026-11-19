import { v4 as uuidv4 } from "uuid";

import {
	ApiError,
	delay,
	IdempotencyStore,
	LocalStorageMock,
	paginate,
	stringifySortedQuery,
} from "@internal/shared";
import { CategoryCatalogMock } from "./mock-catalog.ts";
import { CATEGORIES_STORAGE_KEY } from "./mock-seed.ts";
import { CATEGORY_NAME_MAX_LENGTH } from "../types.ts";

import type { IStorage } from "@internal/shared";
import type { CategoryDto, CategoryKindDto } from "../types.ts";
import type { StoredCategory } from "./mock-seed.ts";
import type {
	ICategoriesRESTApiClient,
	CategoryDeleteRequest, CategoryDeleteResponse,
	CategoryListRequest, CategoryListResponse,
	CategoryPatchRequest, CategoryPatchResponse,
	CategoryPostRequest, CategoryPostResponse,
} from "./types.ts";


const CATEGORY_KINDS: CategoryKindDto[] = ['transaction', 'wallet'];

const invalid = (field: string, message: string): ApiError => new ApiError(
	'validation_failed',
	'Request body failed validation',
	{ details: [{ field, code: 'invalid', message }] },
);

const assertKind = (kind: unknown, field: string): CategoryKindDto => {
	if (!CATEGORY_KINDS.includes(kind as CategoryKindDto)) {
		throw invalid(field, 'Kind must be transaction or wallet');
	}

	return kind as CategoryKindDto;
};

const normalizeName = (name: string): string => {
	const trimmed = name.trim();

	if (trimmed === '') {
		throw invalid('name', 'Enter a category name');
	}

	if (trimmed.length > CATEGORY_NAME_MAX_LENGTH) {
		throw invalid('name', `Keep the name under ${String(CATEGORY_NAME_MAX_LENGTH)} characters`);
	}

	return trimmed;
};

const byName = (left: CategoryDto, right: CategoryDto): number => left.name.localeCompare(right.name);

const orderCategories = (categories: CategoryDto[]): CategoryDto[] => [
	...categories.filter((category) => category.is_global).sort(byName),
	...categories.filter((category) => !category.is_global).sort(byName),
];

class CategoriesMockRESTApiClient implements ICategoriesRESTApiClient {
	private readonly storage: IStorage<StoredCategory>;
	private readonly catalog: CategoryCatalogMock;
	private readonly idempotency = new IdempotencyStore<CategoryDto>();

	constructor(storageKey: string = CATEGORIES_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredCategory>(storageKey);
		this.catalog = new CategoryCatalogMock(storageKey);
	}

	private assertUnique(kind: CategoryKindDto, name: string, exceptId?: string): void {
		const needle = name.toLowerCase();
		const taken = this.catalog.all().some((category) => (
			category.kind === kind
			&& category.deleted_at === null
			&& category.id !== exceptId
			&& category.name.toLowerCase() === needle
		));

		if (taken) {
			throw new ApiError('conflict', `A ${kind} category named ${name} already exists`);
		}
	}

	private requireOwned(id: string): StoredCategory {
		const category = this.catalog.find(id);

		if (!category || category.deleted_at !== null) {
			throw new ApiError('not_found', `Category ${id} does not exist`);
		}
		if (category.is_global) {
			throw new ApiError('conflict', 'Built-in categories cannot be renamed or deleted');
		}

		return category;
	}

	private replace(previous: StoredCategory, next: StoredCategory): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: CategoryListRequest): Promise<CategoryListResponse> {
		const kind = payload.params?.kind === undefined ? undefined : assertKind(payload.params.kind, 'kind');

		await delay();

		const visible = this.catalog.all().filter((category) => (
			category.deleted_at === null && (kind === undefined || category.kind === kind)
		));
		const page = paginate(
			orderCategories(visible),
			payload.params,
			stringifySortedQuery({ kind: kind ?? null }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async post(payload: CategoryPostRequest): Promise<CategoryPostResponse> {
		this.idempotency.require(payload.idempotencyKey);

		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);

		if (replay) {
			return { data: replay, meta: { idempotent_replay: true } };
		}

		const kind = assertKind(payload.data.kind, 'kind');
		const name = normalizeName(payload.data.name);

		await delay();

		this.assertUnique(kind, name);

		const category: StoredCategory = {
			id: uuidv4(),
			kind,
			name,
			is_global: false,
			created_at: new Date().toISOString(),
			updated_at: null,
			deleted_at: null,
		};

		this.storage.add(category);
		this.idempotency.remember(payload.idempotencyKey, payload.data, category);

		return { data: category, meta: { idempotent_replay: false } };
	}

	public async patch(payload: CategoryPatchRequest): Promise<CategoryPatchResponse> {
		const name = normalizeName(payload.data.name);

		await delay();

		const category = this.requireOwned(payload.id);
		this.assertUnique(category.kind, name, category.id);

		const renamed: StoredCategory = { ...category, name, updated_at: new Date().toISOString() };
		this.replace(category, renamed);

		return { data: renamed, meta: {} };
	}

	public async delete(payload: CategoryDeleteRequest): Promise<CategoryDeleteResponse> {
		await delay();

		const category = this.requireOwned(payload.id);
		const deleted: StoredCategory = { ...category, deleted_at: new Date().toISOString() };
		this.replace(category, deleted);

		return { data: deleted, meta: {} };
	}
}

export { CategoriesMockRESTApiClient };
