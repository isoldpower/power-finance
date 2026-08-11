import { LocalStorageMock } from "@internal/shared";
import { v4 as uuidv4 } from "uuid";

import type { IStorage } from "@internal/shared";
import type { WebhookDetailed, WebhookPreview, WebhookWithSecret } from "../types.ts";
import type {
	IWebhookRESTApiClient,
	WebhookDeleteRequest,
	WebhookDeleteResponse,
	WebhookGetRequest,
	WebhookGetResponse,
	WebhookListRequest,
	WebhookListResponse,
	WebhookPostRequest,
	WebhookPostResponse,
	WebhookRotateRequest,
	WebhookRotateResponse,
	WebhookUpdateRequest,
	WebhookUpdateResponse,
} from "./types.ts";


const MOCK_DELAY_MS = 250;

const SECRET_BYTES = 24;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => { setTimeout(() => { resolve(value); }, MOCK_DELAY_MS); });

const buildSecret = (): string => {
	const bytes = new Uint8Array(SECRET_BYTES);
	crypto.getRandomValues(bytes);

	const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

	return `whsec_${hex}`;
};

interface StoredWebhook extends WebhookWithSecret {
	id: string;
}

const SEED_WEBHOOKS: Omit<StoredWebhook, 'id' | 'secret' | 'meta'>[] = [
	{ title: 'Ledger sync', url: 'https://hooks.example.com/finance/ledger' },
	{ title: 'Budget alerts', url: 'https://hooks.example.com/finance/alerts' },
];

const toPreview = (webhook: StoredWebhook): WebhookPreview => ({
	id: webhook.id,
	url: webhook.url,
	title: webhook.title,
});

const toDetailed = (webhook: StoredWebhook): WebhookDetailed => ({
	id: webhook.id,
	url: webhook.url,
	title: webhook.title,
	meta: webhook.meta,
});

class WebhookMockRESTApiClient implements IWebhookRESTApiClient {
	private readonly storage: IStorage<StoredWebhook>;

	constructor(storageKey = 'webhooks') {
		this.storage = new LocalStorageMock<StoredWebhook>(storageKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) { return; }

		SEED_WEBHOOKS.forEach((webhook) => {
			const now = new Date().toISOString();
			const id = uuidv4();

			this.storage.add({
				...webhook,
				id,
				secret: buildSecret(),
				meta: { id, created_at: now, updated_at: now },
			});
		});
	}

	private require(id: string): StoredWebhook {
		const webhook = this.storage.get(id);

		if (!webhook) { throw new Error(`Webhook ${id} not found`); }

		return webhook;
	}

	private replace(webhook: StoredWebhook): StoredWebhook {
		this.storage.remove(webhook);
		this.storage.add(webhook);

		return webhook;
	}

	async post(request: WebhookPostRequest): Promise<WebhookPostResponse> {
		const now = new Date().toISOString();
		const id = uuidv4();

		const created: StoredWebhook = {
			id,
			url: request.data.url,
			title: request.data.title,
			secret: buildSecret(),
			meta: { id, created_at: now, updated_at: now },
		};

		this.storage.add(created);

		return await delay({ ...created });
	}

	async list(request: WebhookListRequest): Promise<WebhookListResponse> {
		const all = this.storage.list();
		const offset = request.params?.offset ?? 0;
		const limit = request.params?.limit ?? all.length;

		return await delay({
			data: all.slice(offset, offset + limit).map(toPreview),
			meta: { limit, offset, total: all.length },
		});
	}

	async get(request: WebhookGetRequest): Promise<WebhookGetResponse> {
		return await delay(toDetailed(this.require(request.id)));
	}

	async patch(request: WebhookUpdateRequest): Promise<WebhookUpdateResponse> {
		const current = this.require(request.id);

		const updated: StoredWebhook = {
			...current,
			url: request.data.url ?? current.url,
			title: request.data.title ?? current.title,
			meta: { ...current.meta, updated_at: new Date().toISOString() },
		};

		return await delay(toDetailed(this.replace(updated)));
	}

	async rotateSecret(request: WebhookRotateRequest): Promise<WebhookRotateResponse> {
		const current = this.require(request.data.id);

		const rotated: StoredWebhook = {
			...current,
			secret: buildSecret(),
			meta: { ...current.meta, updated_at: new Date().toISOString() },
		};

		return await delay({ ...this.replace(rotated) });
	}

	async delete(request: WebhookDeleteRequest): Promise<WebhookDeleteResponse> {
		const current = this.require(request.id);

		this.storage.remove(current);

		return await delay({
			message: `Successfully deleted resource at ${request.id}`,
			meta: { id: request.id, success: true },
		});
	}
}

export { WebhookMockRESTApiClient };
