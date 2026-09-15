import type { CachesSnapshot } from "@shared/data";
import type { WebhookEndpoint, WebhookSubscription } from "@entity/configuration";


type WebhookCachesSnapshot = CachesSnapshot<WebhookEndpoint, WebhookEndpoint>;

type SubscriptionCachesSnapshot = CachesSnapshot<WebhookSubscription, never>;

export type { SubscriptionCachesSnapshot, WebhookCachesSnapshot };
