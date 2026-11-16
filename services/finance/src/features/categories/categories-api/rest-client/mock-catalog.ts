import { ApiError, LocalStorageMock } from "@internal/shared";
import { BUILT_IN_CATEGORIES, CATEGORIES_STORAGE_KEY } from "./mock-seed.ts";

import type { IStorage } from "@internal/shared";
import type { CategoryDto, CategoryKindDto, CategoryRefDto } from "../types.ts";
import type { StoredCategory } from "./mock-seed.ts";


const CATEGORY_ID_FIELD = 'category_id';

const toCategoryRef = (category: CategoryDto): CategoryRefDto => ({
	id: category.id,
	name: category.name,
	is_global: category.is_global,
});

class CategoryCatalogMock {
	private readonly storage: IStorage<StoredCategory>;

	constructor(storageKey: string = CATEGORIES_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredCategory>(storageKey);
	}

	public owned(): StoredCategory[] {
		return this.storage.list();
	}

	public all(): CategoryDto[] {
		return [
			...BUILT_IN_CATEGORIES,
			...this.owned()
		];
	}

	public find(id: string): CategoryDto | undefined {
		return this.all().find((category) => {
			return category.id === id;
		});
	}

	public refOf(id: string | null | undefined): CategoryRefDto | null {
		if (!id) {
			return null;
		}

		const category = this.find(id);
		return category 
			? toCategoryRef(category) 
			: null;
	}

	public builtInIdByName(
		kind: CategoryKindDto,
		name: string | null | undefined
	): string | null {
		if (!name) {
			return null;
		}

		const needle = name.trim().toLowerCase();
		const match = BUILT_IN_CATEGORIES.find((category) => (
			category.kind === kind && category.name.toLowerCase() === needle
		));

		return match?.id ?? null;
	}

	public requireAssignable(
		id: string, 
		kind: CategoryKindDto,
		field: string = CATEGORY_ID_FIELD
	): CategoryDto {
		const category = this.find(id);

		if (!category || category.deleted_at !== null) {
			throw new ApiError('not_found', `Category ${id} does not exist`);
		} else if (category.kind !== kind) {
			throw new ApiError('validation_failed', 'Request body failed validation', {
				details: [{ field, code: 'invalid', message: `Category is not a ${kind} category` }],
			});
		}

		return category;
	}

	public assign(
		id: string | null | undefined, 
		kind: CategoryKindDto
	): string | null {
		return id ? this.requireAssignable(id, kind).id : null;
	}
}

export { CategoryCatalogMock, toCategoryRef };
