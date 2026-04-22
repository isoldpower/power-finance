import type {
	ListRequest, ListResponse, IListHandler,
	PostRequest, PostResponse, IPostHandler,
	IDeleteHandler, DeleteRequest, DeleteResponse,
	IGetHandler, GetRequest, GetResponse, SpecificResource, IPatchHandler, PatchRequest, PatchResponse,
} from "@internal/shared";
import type { WebhookDetailed, WebhookPreview, WebhookValuableFields, WebhookWithSecret } from "../types.ts";


interface IWebhookRESTApiClient extends
	IPostHandler<WebhookValuableFields, WebhookWithSecret>,
	IListHandler<WebhookPreview>,
	IGetHandler<object, WebhookDetailed>,
	IPatchHandler<Partial<WebhookValuableFields>, WebhookDetailed>,
	IDeleteHandler
{
	rotateSecret: (
		request: PostRequest<SpecificResource<unknown>, object>
	) => Promise<PostResponse<WebhookWithSecret>>
}

type WebhookPostRequest = PostRequest<WebhookValuableFields, object>;
type WebhookPostResponse = PostResponse<WebhookWithSecret>;

type WebhookListRequest = ListRequest;
type WebhookListResponse = ListResponse<WebhookPreview>;

type WebhookDeleteRequest = DeleteRequest<object>;
type WebhookDeleteResponse = DeleteResponse;

type WebhookGetRequest = GetRequest<object>;
type WebhookGetResponse = GetResponse<WebhookDetailed>;

type WebhookRotateRequest = PostRequest<SpecificResource<unknown>, object>;
type WebhookRotateResponse = PostResponse<WebhookWithSecret>;

type WebhookUpdateRequest = PatchRequest<Partial<WebhookValuableFields>, object>;
type WebhookUpdateResponse = PatchResponse<WebhookDetailed>;

export type { WebhookPostRequest, WebhookPostResponse };
export type { WebhookListRequest, WebhookListResponse };
export type { WebhookDeleteRequest, WebhookDeleteResponse };
export type { WebhookGetRequest, WebhookGetResponse };
export type { WebhookRotateRequest, WebhookRotateResponse };
export type { WebhookUpdateRequest, WebhookUpdateResponse };
export type { IWebhookRESTApiClient };
