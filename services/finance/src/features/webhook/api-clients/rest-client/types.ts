import type {
	ListRequest, ListResponse, IListHandler,
	PostRequest, PostResponse, IPostHandler,
} from "@internal/shared";
import { WebhookDetailed, WebhookPreview, WebhookValuableFields } from "../types.ts";


interface IWebhookRESTApiClient extends 
	IPostHandler<WebhookValuableFields, WebhookDetailed>,
	IListHandler<WebhookPreview>
{}

type WebhookPostRequest = PostRequest<WebhookValuableFields, object>;
type WebhookPostResponse = PostResponse<WebhookDetailed>;

type WebhookListRequest = ListRequest;
type WebhookListResponse = ListResponse<WebhookPreview>;

export type { WebhookPostRequest, WebhookPostResponse };
export type { WebhookListRequest, WebhookListResponse };
export type { IWebhookRESTApiClient };