import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import { delay, paginate, stringifySortedQuery } from "@shared/api";
import {
	ASSISTANT_MESSAGES_STORAGE_KEY,
	MOCK_REPLY,
	SEED_MESSAGES,
	SEED_OVERVIEW,
} from "./storage.ts";
import type { IStorage } from "@internal/shared";
import type { StoredMessage } from "./storage.ts";
import type {
	IAssistantRESTApiClient,
	AssistantClearRequest, AssistantClearResponse,
	AssistantMessagesRequest, AssistantMessagesResponse,
	AssistantOverviewRequest, AssistantOverviewResponse,
	AssistantSendRequest, AssistantSendResponse,
} from "./types.ts";

const DELTA_LATENCY = 120;
const DELTA_WORDS = 6;

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderMessages = (messages: StoredMessage[]): StoredMessage[] => {
	return [...messages].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

const chunkReply = (reply: string): string[] => {
	const words = reply.split(' ');
	const chunks: string[] = [];

	for (let index = 0; index < words.length; index += DELTA_WORDS) {
		const chunk = words.slice(index, index + DELTA_WORDS).join(' ');

		chunks.push(index + DELTA_WORDS >= words.length ? chunk : `${chunk} `);
	}

	return chunks;
};

class AssistantMockRESTApiClient implements IAssistantRESTApiClient {
	private readonly storage: IStorage<StoredMessage>;

	constructor(storageKey: string = ASSISTANT_MESSAGES_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredMessage>(storageKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) return;

		const now = Date.now();

		SEED_MESSAGES.forEach((message, index) => {
			const createdAt = new Date(now - (SEED_MESSAGES.length - index) * 60 * 1000).toISOString();

			this.storage.add({ ...message, id: uuidv4(), created_at: createdAt });
		});
	}

	public async overview(_payload: AssistantOverviewRequest): Promise<AssistantOverviewResponse> {
		await delay();

		return { data: SEED_OVERVIEW, meta: { cached: false } };
	}

	public async messages(payload: AssistantMessagesRequest): Promise<AssistantMessagesResponse> {
		await delay();

		const page = paginate(
			orderMessages(this.storage.list()),
			payload.params,
			stringifySortedQuery({ scope: 'messages' }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async send(payload: AssistantSendRequest): Promise<AssistantSendResponse> {
		const sentAt = new Date().toISOString();
		const question: StoredMessage = {
			id: uuidv4(),
			created_at: sentAt,
			role: 'user',
			status: 'complete',
			text: payload.data.text,
			refs: [],
		};
		const reply: StoredMessage = {
			id: uuidv4(),
			created_at: new Date(Date.now() + 1000).toISOString(),
			role: 'assistant',
			status: 'streaming',
			text: '',
			refs: [],
		};

		this.storage.add(question);
		payload.onAccepted?.({ user_message_id: question.id, message_id: reply.id });

		let text = '';

		for (const chunk of chunkReply(MOCK_REPLY)) {
			await delay(DELTA_LATENCY);

			if (payload.signal?.aborted) break;

			text += chunk;
			payload.onDelta?.({ text: chunk });
		}

		const answered: StoredMessage = { ...reply, status: 'complete', text: text || MOCK_REPLY };
		this.storage.add(answered);

		return answered;
	}

	public async clear(_payload: AssistantClearRequest): Promise<AssistantClearResponse> {
		await delay();

		const messages = this.storage.list();
		for (const message of messages) {
			this.storage.remove(message);
		}

		return { data: { deleted: messages.length }, meta: { cached: false } };
	}
}

export { AssistantMockRESTApiClient };
