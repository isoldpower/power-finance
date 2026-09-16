import type { AssistantQuota } from "../types.ts";


const LOW_QUOTA_RATIO = 0.2;
const MIN_LOW_QUOTA = 1;

interface QuotaNote {
	messagesLeft: number;
	allowance: number;
	low: boolean;
	exhausted: boolean;
}

const lowThreshold = (allowance: number): number => (
	Math.max(MIN_LOW_QUOTA, Math.floor(allowance * LOW_QUOTA_RATIO))
);

const quotaNote = (quota: AssistantQuota): QuotaNote => {
	const messagesLeft = Math.max(quota.messagesLeft, 0);

	return {
		messagesLeft,
		allowance: quota.allowance,
		low: messagesLeft > 0 && messagesLeft <= lowThreshold(quota.allowance),
		exhausted: messagesLeft === 0,
	};
};

export { quotaNote };
export type { QuotaNote };
