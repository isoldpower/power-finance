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

interface ApiEnvelope<TData, TMeta extends object = object> {
	data: TData;
	meta: TMeta;
}

type ResourceResponse<TData, TMeta extends object = CacheMeta> = ApiEnvelope<TData, TMeta>;

type CollectionResponse<TData, TExtra extends object = object> = ApiEnvelope<TData[], CollectionMeta<TExtra>>;

type MutationResponse<TData> = ApiEnvelope<TData, MutationMeta>;

interface ResourceTimestamps {
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

export type {
	ApiEnvelope,
	CacheMeta,
	CollectionMeta,
	CollectionResponse,
	EmbeddedMeta,
	MutationMeta,
	MutationResponse,
	PaginationMeta,
	ResourceResponse,
	ResourceTimestamps,
};
