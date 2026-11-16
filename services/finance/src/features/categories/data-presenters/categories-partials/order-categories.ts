import type { Category } from "@entity/categories";


const byName = (left: Category, right: Category): number => left.name.localeCompare(right.name);

const orderCategories = (categories: Category[]): Category[] => [
	...categories.filter((category) => category.isGlobal).sort(byName),
	...categories.filter((category) => !category.isGlobal).sort(byName),
];

export { orderCategories };
