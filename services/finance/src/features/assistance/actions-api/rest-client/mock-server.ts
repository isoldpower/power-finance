import type {
	IActionsRESTApiClient,
	Action,
	ActionListRequest,
	ActionListResponse,
	ActionResolveRequest,
	ActionResolveResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;
const STORAGE_KEY = 'mock:actions';

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const SEED: Action[] = [
	{ id: 'a1', kind: 'recurring', title: 'Confirm recurring rent — $1,450.00', subtitle: 'Detected on Main Checking · due Jun 30', primaryLabel: 'Approve', secondaryLabel: 'Skip' },
	{ id: 'a2', kind: 'duplicate', title: 'Possible duplicate — Coffee $4.80', subtitle: 'Two matching charges 2 minutes apart', primaryLabel: 'Merge', secondaryLabel: 'Keep both' },
	{ id: 'a3', kind: 'uncategorized', title: '3 transactions need a category', subtitle: 'Categorize to keep reports accurate', primaryLabel: 'Review', secondaryLabel: 'Later' },
];

const loadActions = (): Action[] => {
	if (typeof window === 'undefined') return SEED.map((action) => ({ ...action }));
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === null) return SEED.map((action) => ({ ...action }));
		return JSON.parse(stored) as Action[];
	} catch {
		return SEED.map((action) => ({ ...action }));
	}
};

const saveActions = (actions: Action[]): void => {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(actions));
	} catch {
		// Ignore storage failures (private mode, quota) — falls back to in-memory only.
	}
};


class ActionsMockRESTApiClient implements IActionsRESTApiClient {
	private actions: Action[] = loadActions();

	public list(request: ActionListRequest): Promise<ActionListResponse> {
		const limit = request.params?.limit ?? this.actions.length;
		const data = this.actions.slice(0, limit);

		return delay({
			data,
			meta: { total: this.actions.length, offset: 0, limit: data.length },
		});
	}

	public resolve(request: ActionResolveRequest): Promise<ActionResolveResponse> {
		this.actions = this.actions.filter((action) => action.id !== request.id);
		saveActions(this.actions);

		return delay({
			message: `Resolved action ${request.id}`,
			meta: { id: request.id, success: true },
		});
	}
}

export { ActionsMockRESTApiClient };
