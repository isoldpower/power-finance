import type { CategoryRef } from "../types.ts";


const UNCATEGORIZED_LABEL = 'Uncategorized';
const OTHER_LABEL = 'Other';
const UNCATEGORIZED_KEY = '__none__';
const OTHER_KEY = '__other__';

const categoryLabel = (category: CategoryRef | null): string => {
	return category?.name ?? UNCATEGORIZED_LABEL;
}

const categoryKey = (category: CategoryRef | null): string => {
	return category?.id ?? UNCATEGORIZED_KEY;
}

export { categoryKey, categoryLabel, OTHER_KEY, OTHER_LABEL, UNCATEGORIZED_KEY, UNCATEGORIZED_LABEL };
