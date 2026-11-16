import type { CategoryDto, CategoryKindDto } from "../types.ts";


const CATEGORIES_STORAGE_KEY = 'categories-v1';

type StoredCategory = CategoryDto;

const BUILT_IN_NAMES: Record<CategoryKindDto, string[]> = {
	transaction: [
		'Income', 'Food', 'Groceries', 'Dining', 'Housing', 'Utilities', 'Transport', 'Health', 'Entertainment',
		'Leisure', 'Shopping', 'Travel', 'Education', 'Subscriptions', 'Savings', 'Gifts', 'Other',
	],
	wallet: ['Banking', 'Savings', 'Cash', 'Credit', 'Investments', 'Travel', 'Other'],
};

const BUILT_IN_CREATED_AT = '2026-01-01T00:00:00+00:00';

const builtInCategoryId = (kind: CategoryKindDto, name: string): string => (
	`builtin-${kind}-${name.toLowerCase().replace(/\s+/g, '-')}`
);

const BUILT_IN_CATEGORIES: CategoryDto[] = (Object.keys(BUILT_IN_NAMES) as CategoryKindDto[]).flatMap(
	(kind) => BUILT_IN_NAMES[kind].map((name): CategoryDto => ({
		id: builtInCategoryId(kind, name),
		kind,
		name,
		is_global: true,
		created_at: BUILT_IN_CREATED_AT,
		updated_at: null,
		deleted_at: null,
	})),
);

export { BUILT_IN_CATEGORIES, CATEGORIES_STORAGE_KEY, builtInCategoryId };
export type { StoredCategory };
