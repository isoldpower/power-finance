import type {
	WebhookDeliveryDto,
	WebhookEventTypeDto,
	WebhookSecretDto,
	WebhookSubscriptionDto
} from "../types.ts";


const WEBHOOKS_STORAGE_KEY = 'webhooks-v1';
const SUBSCRIPTIONS_STORAGE_KEY = 'webhook-subscriptions-v1';
const DELIVERIES_STORAGE_KEY = 'webhook-deliveries-v1';

type StoredWebhook = WebhookSecretDto;
type StoredSubscription = WebhookSubscriptionDto;
type StoredDelivery = WebhookDeliveryDto;

const EVENT_TYPES: WebhookEventTypeDto[] = [
	{ event: 'transaction.created', subject: 'transaction', description: 'A transaction was recorded.' },
	{ event: 'transaction.updated', subject: 'transaction', description: 'An existing transaction changed.' },
	{ event: 'transaction.deleted', subject: 'transaction', description: 'A transaction was cancelled.' },
	{ event: 'wallet.created', subject: 'wallet', description: 'A wallet was opened.' },
	{ event: 'wallet.updated', subject: 'wallet', description: "A wallet's details or balance changed." },
	{ event: 'goal.reached', subject: 'goal', description: "A goal's progress met its target." },
];

const SEED_WEBHOOKS: Pick<StoredWebhook, 'title' | 'url' | 'enabled'>[] = [
	{ title: 'Ledger sync', url: 'https://hooks.example.com/finance/ledger', enabled: true },
	{ title: 'Budget alerts', url: 'https://hooks.example.com/finance/alerts', enabled: true },
];

export {
	DELIVERIES_STORAGE_KEY,
	EVENT_TYPES,
	SEED_WEBHOOKS,
	SUBSCRIPTIONS_STORAGE_KEY,
	WEBHOOKS_STORAGE_KEY,
};
export type { StoredDelivery, StoredSubscription, StoredWebhook };
