import type { Pending } from "@shared/data";


type CategoryKind = 'transaction' | 'wallet';

interface CategoryRef {
	id: string;
	name: string;
	isGlobal: boolean;
}

interface Category extends CategoryRef, Pending {
	kind: CategoryKind;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

interface CategoryDraft {
	kind: CategoryKind;
	name: string;
}

interface CategoryPatch {
	name: string;
}

export type { Category, CategoryDraft, CategoryKind, CategoryPatch, CategoryRef };
