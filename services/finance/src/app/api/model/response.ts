import type { SpecificResource } from './request.js';

interface ListMeta {
  limit: number
  offset: number
  total: number
}

type DeleteMeta = SpecificResource<{
  deleted: boolean
}>;

type GetResponse<D = unknown> = SpecificResource<D>;

interface ListResponse<D = unknown> {
  data: D[]
  meta: ListMeta
}

type PostResponse<D = unknown> = SpecificResource<D>;

type PutResponse<D = unknown> = SpecificResource<D>;

type PatchResponse<D = unknown> = SpecificResource<D>;

interface DeleteResponse {
  message: string
  meta: DeleteMeta
}

export type { GetResponse, ListResponse, PostResponse, PutResponse, DeleteResponse, PatchResponse };
export type { ListMeta, DeleteMeta };
