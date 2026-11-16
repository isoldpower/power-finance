import { useCallback, useMemo } from "react";
import { useCategories } from "../data-presenters";

import type { CategoryKind, CategoryRef } from "@entity/categories";


interface UseCategorySelectParams {
	kind: CategoryKind;
	value: CategoryRef | null;
	onChange: (value: CategoryRef | null) => void;
}

interface UseCategorySelectReturn {
	options: CategoryRef[];
	handleChange: (categoryId: string) => void;
}

const useCategorySelect = ({ kind, value, onChange }: UseCategorySelectParams): UseCategorySelectReturn => {
	const { categories } = useCategories(kind);

	const options = useMemo<CategoryRef[]>(() => {
		const listed = categories.some((category) => category.id === value?.id);

		return value === null || listed ? categories : [...categories, value];
	}, [categories, value]);

	const handleChange = useCallback((categoryId: string) => {
		onChange(options.find((option) => option.id === categoryId) ?? null);
	}, [onChange, options]);

	return useMemo(() => ({ options, handleChange }), [options, handleChange]);
};

export { useCategorySelect };
export type { UseCategorySelectParams, UseCategorySelectReturn };
