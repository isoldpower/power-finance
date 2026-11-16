import type { Category, CategoryRef } from "@entity/categories";
import type { CategoryDto, CategoryRefDto } from "../types.ts";


const categoryRefFromApi = (dto: CategoryRefDto): CategoryRef => ({
	id: dto.id,
	name: dto.name,
	isGlobal: dto.is_global,
});

const optionalCategoryRefFromApi = (
	dto: CategoryRefDto | null | undefined
): CategoryRef | null => (
	dto ? categoryRefFromApi(dto) : null
);

const categoryFromApi = (dto: CategoryDto): Category => ({
	...categoryRefFromApi(dto),
	kind: dto.kind,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	deletedAt: dto.deleted_at,
});

export { categoryFromApi, categoryRefFromApi, optionalCategoryRefFromApi };
