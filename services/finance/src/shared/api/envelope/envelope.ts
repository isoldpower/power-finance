import type { CacheMeta, CollectionMeta, MutationMeta } from "./meta";


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
	CollectionResponse,
	MutationResponse,
	ResourceResponse,
	ResourceTimestamps,
};
