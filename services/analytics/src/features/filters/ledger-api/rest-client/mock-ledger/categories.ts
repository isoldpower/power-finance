import { LocalStorageMock } from "@internal/shared";

import { UNCATEGORIZED_TOKEN } from "../../types.ts";

import type { CategoryRefDto } from "../../types.ts";
import type { LedgerRow } from "./types.ts";


const FINANCE_CATEGORIES_KEY = 'categories-v1';
const TRANSACTION_KIND = 'transaction';

const BUILT_IN_TRANSACTION_CATEGORIES = [
	'Income', 'Food', 'Groceries', 'Dining', 'Housing', 'Utilities', 'Transport', 'Health', 'Entertainment',
	'Leisure', 'Shopping', 'Travel', 'Education', 'Subscriptions', 'Savings', 'Gifts', 'Other',
];

interface FinanceStoredCategory {
	id: string;
	kind: string;
	name: string;
	is_global: boolean;
	deleted_at: string | null;
}

const slug = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

const builtInCategory = (name: string): CategoryRefDto => ({
	id: `builtin-${TRANSACTION_KIND}-${slug(name)}`,
	name,
	is_global: true,
});

const BUILT_IN_CATEGORIES: CategoryRefDto[] = BUILT_IN_TRANSACTION_CATEGORIES.map(builtInCategory);

const builtInByName = (name: string | null | undefined): CategoryRefDto | null => {
	if (!name) {
		return null;
	}

	const needle = name.trim().toLowerCase();

	return BUILT_IN_CATEGORIES.find((category) => category.name.toLowerCase() === needle) ?? null;
};

const seedCategory = (name: string | null): CategoryRefDto | null => {
	if (name === null) {
		return null;
	}

	return builtInByName(name) ?? { id: `seed-${TRANSACTION_KIND}-${slug(name)}`, name, is_global: false };
};

const readFinanceCategories = (): CategoryRefDto[] => new LocalStorageMock<FinanceStoredCategory>(FINANCE_CATEGORIES_KEY)
	.list()
	.filter((category) => category.kind === TRANSACTION_KIND)
	.map((category) => ({ id: category.id, name: category.name, is_global: category.is_global }));

const collectCategories = (rows: LedgerRow[], catalog: CategoryRefDto[]): CategoryRefDto[] => {
	const known = new Map(catalog.map((category) => [category.id, category]));

	rows.forEach((row) => {
		if (row.category !== null && !known.has(row.category.id)) {
			known.set(row.category.id, row.category);
		}
	});

	return [...known.values()];
};

const categoryKeyOf = (category: CategoryRefDto | null): string => category?.id ?? UNCATEGORIZED_TOKEN;

export { BUILT_IN_CATEGORIES, builtInByName, categoryKeyOf, collectCategories, readFinanceCategories, seedCategory };
