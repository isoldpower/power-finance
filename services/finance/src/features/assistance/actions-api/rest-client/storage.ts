import type { ActionDto } from "../types.ts";


const ACTIONS_STORAGE_KEY = 'actions-v1';

type StoredAction = ActionDto;

const SEVERITY_RANK: Record<StoredAction['severity'], number> = {
	critical: 3,
	warning: 2,
	info: 1,
};

const SEED_ACTIONS: Omit<StoredAction, 'id' | 'created_at' | 'last_seen_at'>[] = [
	{
		updated_at: null,
		deleted_at: null,
		source: 'scheduler',
		kind: 'insufficient_funds',
		severity: 'critical',
		status: 'pending',
		title: 'Rent charges tomorrow',
		body: 'Main Checking has 980.00 USD available and the payment is 1,450.00 USD.',
		subject: null,
		money: { amount: '1450.00', currency: 'USD' },
		group_key: 'recurring:rent',
		occurrences: 3,
		expires_at: null,
		resolved_at: null,
		resolutions: [
			{ id: 'top_up', label: 'Move money', intent: 'primary', applies: false },
			{ id: 'dismiss', label: 'Ignore', intent: 'secondary', applies: false },
		],
	},
	{
		updated_at: null,
		deleted_at: null,
		source: 'assistant',
		kind: 'duplicate',
		severity: 'warning',
		status: 'pending',
		title: 'Possible duplicate — Coffee 4.80 USD',
		body: 'Two matching charges landed two minutes apart.',
		subject: null,
		money: { amount: '4.80', currency: 'USD' },
		group_key: null,
		occurrences: 1,
		expires_at: null,
		resolved_at: null,
		resolutions: [
			{ id: 'merge', label: 'Merge', intent: 'primary', applies: true },
			{ id: 'keep_both', label: 'Keep both', intent: 'secondary', applies: false },
			{ id: 'dismiss', label: 'Ignore', intent: 'secondary', applies: false },
		],
	},
	{
		updated_at: null,
		deleted_at: null,
		source: 'assistant',
		kind: 'uncategorized',
		severity: 'info',
		status: 'pending',
		title: '3 transactions need a category',
		body: 'Purchases from last week look like groceries.',
		subject: null,
		money: { amount: '142.30', currency: 'USD' },
		group_key: null,
		occurrences: 1,
		expires_at: null,
		resolved_at: null,
		resolutions: [
			{ id: 'apply', label: 'Categorise as Groceries', intent: 'primary', applies: true },
			{ id: 'review', label: 'Review', intent: 'secondary', applies: false },
			{ id: 'dismiss', label: 'Ignore', intent: 'secondary', applies: false },
		],
	},
];

const DISMISS_RESOLUTION = 'dismiss';

export { ACTIONS_STORAGE_KEY, DISMISS_RESOLUTION, SEED_ACTIONS, SEVERITY_RANK };
export type { StoredAction };
