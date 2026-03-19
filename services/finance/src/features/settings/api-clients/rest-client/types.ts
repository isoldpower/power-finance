import type {
	ListRequest, ListResponse, IListHandler,
	PostRequest, PostResponse, IPostHandler,
	IDeleteHandler, DeleteRequest, DeleteResponse,
	IGetHandler, GetRequest, GetResponse, SpecificResource, IPatchHandler, PatchRequest, PatchResponse,
} from "@internal/shared";
import { WebhookDetailed, WebhookPreview, WebhookValuableFields } from "../types.ts";


interface IWebhookRESTApiClient extends 
	IPostHandler<WebhookValuableFields, WebhookDetailed>,
	IListHandler<WebhookPreview>,
	IGetHandler<object, WebhookDetailed>,
	IPatchHandler<Partial<WebhookValuableFields>, WebhookDetailed>,
	IDeleteHandler
{
	rotateSecret: (
		request: PostRequest<SpecificResource<unknown>, object>
	) => Promise<PostResponse<WebhookDetailed>>
}

type WebhookPostRequest = PostRequest<WebhookValuableFields, object>;
type WebhookPostResponse = PostResponse<WebhookDetailed>;

type WebhookListRequest = ListRequest;
type WebhookListResponse = ListResponse<WebhookPreview>;

type WebhookDeleteRequest = DeleteRequest<object>;
type WebhookDeleteResponse = DeleteResponse;

type WebhookGetRequest = GetRequest<object>;
type WebhookGetResponse = GetResponse<WebhookDetailed>;

type WebhookRotateRequest = PostRequest<SpecificResource<unknown>, object>;
type WebhookRotateResponse = PostResponse<WebhookDetailed>;

type WebhookUpdateRequest = PatchRequest<Partial<WebhookValuableFields>, object>;
type WebhookUpdateResponse = PatchResponse<WebhookDetailed>;

export type { WebhookPostRequest, WebhookPostResponse };
export type { WebhookListRequest, WebhookListResponse };
export type { WebhookDeleteRequest, WebhookDeleteResponse };
export type { WebhookGetRequest, WebhookGetResponse };
export type { WebhookRotateRequest, WebhookRotateResponse };
export type { WebhookUpdateRequest, WebhookUpdateResponse };
export type { IWebhookRESTApiClient };