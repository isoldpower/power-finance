interface PaginationMeta {
	limit: number | null;
	total: number;
	next_cursor: string | null;
	prev_cursor: string | null;
}

interface CacheMeta {
	cached?: boolean;
}

type CollectionMeta<TExtra extends object = object> = PaginationMeta & CacheMeta & TExtra;

type EmbeddedMeta<TField extends string, TExtra extends object = object> =
	Record<TField, PaginationMeta> & CacheMeta & TExtra;

interface MutationMeta {
	idempotent_replay?: boolean;
}

export type {
	CacheMeta,
	CollectionMeta,
	EmbeddedMeta,
	MutationMeta,
	PaginationMeta,
};