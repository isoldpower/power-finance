import { v4 as uuidv4 } from "uuid";

import type { Category, CategoryDraft, CategoryPatch } from "@entity/categories";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticCategoryId = (): string => {
	return `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;
}

const isOptimisticCategoryId = (id: string): boolean => {
	return id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);
}

const categoryFromDraft = (
	draft: CategoryDraft, 
	id: string,
	createdAt: string
): Category => ({
	id,
	kind: draft.kind,
	name: draft.name.trim(),
	isGlobal: false,
	createdAt,
	updatedAt: null,
	deletedAt: null,
});

const patchCategory = (category: Category, patch: CategoryPatch): Category => ({
	...category,
	name: patch.name.trim(),
});

export { categoryFromDraft, isOptimisticCategoryId, optimisticCategoryId, patchCategory };
