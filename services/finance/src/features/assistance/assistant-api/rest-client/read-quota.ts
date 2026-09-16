import type { AssistantQuotaDto } from "../types.ts";


const QUOTA_FIELD = 'quota';

const isCount = (value: unknown): value is number => (
	typeof value === 'number' && Number.isFinite(value)
);

function readQuota(envelope: Record<string, unknown>): AssistantQuotaDto | null {
	const candidate = envelope[QUOTA_FIELD];

	if (typeof candidate !== 'object' || candidate === null) {
		return null;
	}

	const { messages_left: messagesLeft, allowance } = candidate as Partial<AssistantQuotaDto>;

	return isCount(messagesLeft) && isCount(allowance)
		? { messages_left: messagesLeft, allowance }
		: null;
}

export { readQuota };
