import type {
  DeleteRequest,
  GetRequest,
  ListRequest,
	PatchRequest,
  PostRequest,
  PutRequest
} from './request.js';
import type {
  DeleteResponse,
  GetResponse,
  ListResponse, PatchResponse,
  PostResponse,
  PutResponse
} from './response.js';

interface IGetHandler<
  TParams extends object,
  TResponse
> {
  get: (request: GetRequest<TParams>) => Promise<GetResponse<TResponse>>
}

interface IListHandler<
  TResponse,
  TParams extends object = object
> {
  list: (request: ListRequest<TParams>) => Promise<ListResponse<TResponse>>
}

interface IPostHandler<
  TRequest extends object,
  TResponse,
  TParams extends object = object
> {
  post: (request: PostRequest<TRequest, TParams>) => Promise<PostResponse<TResponse>>
}

interface IPutHandler<
  TRequest extends object,
  TResponse,
  TParams extends object = object
> {
  put: (request: PutRequest<TRequest, TParams>) => Promise<PutResponse<TResponse>>
}

interface IPatchHandler<
  TRequest extends object,
  TResponse,
  TParams extends object = object
> {
  patch: (request: PatchRequest<TRequest, TParams>) => Promise<PatchResponse<TResponse>>
}

interface IDeleteHandler<
  TParams extends object = object
> {
  delete: (request: DeleteRequest<TParams>) => Promise<DeleteResponse>
}

export type {
  IGetHandler,
  IListHandler,
  IPostHandler,
  IPutHandler,
  IPatchHandler,
  IDeleteHandler
};
