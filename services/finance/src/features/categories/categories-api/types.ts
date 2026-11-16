import type { PageParams, ResourceTimestamps } from "@internal/shared";


type CategoryKindDto = 'transaction' | 'wallet';

interface CategoryRefDto {
	id: string;
	name: string;
	is_global: boolean;
}

interface CategoryDto extends CategoryRefDto, ResourceTimestamps {
	kind: CategoryKindDto;
}

interface CategoryCreateBody {
	kind: CategoryKindDto;
	name: string;
}

interface CategoryPatchBody {
	name: string;
}

interface CategoryListParams extends PageParams {
	kind?: CategoryKindDto;
}

const CATEGORY_NAME_MAX_LENGTH = 120;

export { CATEGORY_NAME_MAX_LENGTH };
export type {
	CategoryCreateBody,
	CategoryDto,
	CategoryKindDto,
	CategoryListParams,
	CategoryPatchBody,
	CategoryRefDto,
};
