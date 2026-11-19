import type { CategoryDraft, CategoryPatch, CategoryRef } from "@entity/categories";
import type { CategoryCreateBody, CategoryPatchBody } from "../types.ts";


const categoryDraftToApi = (draft: CategoryDraft): CategoryCreateBody => ({
	kind: draft.kind,
	name: draft.name.trim(),
});

const categoryPatchToApi = (patch: CategoryPatch): CategoryPatchBody => ({
	name: patch.name.trim(),
});

const categoryIdToApi = (
	category: CategoryRef | null
): string | null => {
	return category?.id ?? null;
}

export { categoryDraftToApi, categoryIdToApi, categoryPatchToApi };
