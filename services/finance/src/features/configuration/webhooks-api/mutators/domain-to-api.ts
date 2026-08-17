import type { DeliveryQuery, WebhookDraft, WebhookPatch } from "@entity/configuration";
import type { DeliveryListParams, WebhookCreateBody, WebhookPatchBody } from "../types.ts";

const webhookDraftToApi = (draft: WebhookDraft): WebhookCreateBody => ({
	title: draft.title,
	url: draft.url,
	enabled: draft.enabled,
});

const webhookPatchToApi = (patch: WebhookPatch): WebhookPatchBody => ({
	...(patch.title === undefined ? {} : { title: patch.title }),
	...(patch.url === undefined ? {} : { url: patch.url }),
	...(patch.enabled === undefined ? {} : { enabled: patch.enabled }),
});

const deliveryQueryToApi = (query: DeliveryQuery | undefined): DeliveryListParams => ({
	...(query?.status === undefined ? {} : { status: query.status }),
	...(query?.event === undefined ? {} : { event: query.event }),
});

export { deliveryQueryToApi, webhookDraftToApi, webhookPatchToApi };
