import { v4 as uuidv4 } from "uuid";

import type { WebhookDraft, WebhookEndpoint, WebhookSubscription } from "@entity/configuration";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticWebhookId = (): string => `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;

const isOptimisticWebhookId = (id: string): boolean => id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);

const webhookFromDraft = (
	draft: WebhookDraft,
	id: string,
	createdAt: string,
): WebhookEndpoint => ({
	id,
	createdAt,
	updatedAt: null,
	title: draft.title,
	url: draft.url,
	enabled: draft.enabled,
});

const subscriptionFromEvent = (
	event: string,
	id: string,
	webhookId: string,
	createdAt: string,
): WebhookSubscription => ({ id, createdAt, webhookId, event });

export {
	isOptimisticWebhookId,
	optimisticWebhookId,
	subscriptionFromEvent,
	webhookFromDraft,
};
