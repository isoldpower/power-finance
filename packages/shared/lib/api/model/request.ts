type SpecificResource<T> = T & {
  id: string
};

type ListParams = Partial<{
  limit: number
  offset: number
}>;

type GetRequest<Q extends object> = SpecificResource<{
  params?: Q
}>;

interface ListRequest<
  Q extends ListParams = ListParams
> {
  params?: Q
}

interface PostRequest<D extends object, Q extends object> {
  data: D
  params?: Q
}

type PutRequest<D extends object, Q extends object> = SpecificResource<{
  data: SpecificResource<D>
  params?: Q
}>;

type PatchRequest<D extends object, Q extends object> = SpecificResource<{
  data: Partial<D>
  params?: Q
}>;

type DeleteRequest<Q extends object> = SpecificResource<{
  params?: Q
}>;

export type { GetRequest, ListRequest, PostRequest, PutRequest, PatchRequest, DeleteRequest };
export type { SpecificResource, ListParams };
