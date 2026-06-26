import type {
	IActionsRESTApiClient,
	Action,
	ActionListRequest,
	ActionListResponse,
	ActionResolveRequest,
	ActionResolveResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const SEED: Action[] = [
	{ id: 'a1', kind: 'recurring', title: 'Confirm recurring rent — $1,450.00', subtitle: 'Detected on Main Checking · due Jun 30', primaryLabel: 'Approve', secondaryLabel: 'Skip' },
	{ id: 'a2', kind: 'duplicate', title: 'Possible duplicate — Coffee $4.80', subtitle: 'Two matching charges 2 minutes apart', primaryLabel: 'Merge', secondaryLabel: 'Keep both' },
	{ id: 'a3', kind: 'uncategorized', title: '3 transactions need a category', subtitle: 'Categorize to keep reports accurate', primaryLabel: 'Review', secondaryLabel: 'Later' },
];


class ActionsMockRESTApiClient implements IActionsRESTApiClient {
	private actions: Action[] = [...SEED];

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

		return delay({
			message: `Resolved action ${request.id}`,
			meta: { id: request.id, success: true },
		});
	}
}

export { ActionsMockRESTApiClient };
