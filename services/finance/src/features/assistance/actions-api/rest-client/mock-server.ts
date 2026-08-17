import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import { ApiError, delay, IdempotencyStore, paginate, stringifySortedQuery } from "@shared/api";
import {
	ACTIONS_STORAGE_KEY,
	DISMISS_RESOLUTION,
	SEED_ACTIONS,
	SEVERITY_RANK,
} from "./storage.ts";
import type { IStorage } from "@internal/shared";
import type { StoredAction } from "./storage.ts";
import type { ActionDto } from "../types.ts";
import type {
	IActionsRESTApiClient,
	ActionListRequest, ActionListResponse,
	ActionResolveRequest, ActionResolveResponse,
} from "./types.ts";

const SEED_OFFSETS_MS = [0, 45 * 60 * 1000, 3 * 60 * 60 * 1000];

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderActions = (actions: StoredAction[]): StoredAction[] => {
	return [...actions].sort((left, right) => {
		const bySeverity = SEVERITY_RANK[right.severity] - SEVERITY_RANK[left.severity];
		if (bySeverity !== 0) return bySeverity;

		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

class ActionsMockRESTApiClient implements IActionsRESTApiClient {
	private readonly storage: IStorage<StoredAction>;
	private readonly idempotency = new IdempotencyStore<ActionDto>();

	constructor(storageKey: string = ACTIONS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredAction>(storageKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) return;

		const now = Date.now();

		SEED_ACTIONS.forEach((action, index) => {
			const createdAt = new Date(now - (SEED_OFFSETS_MS[index] ?? 0)).toISOString();

			this.storage.add({ ...action, id: uuidv4(), created_at: createdAt, last_seen_at: createdAt });
		});
	}

	private require(id: string): StoredAction {
		const action = this.storage.get(id);
		if (!action) throw new ApiError('not_found', `Action ${id} does not exist`);

		return action;
	}

	private replace(previous: StoredAction, next: StoredAction): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: ActionListRequest): Promise<ActionListResponse> {
		await delay();

		const status = payload.params?.status ?? 'pending';
		const source = payload.params?.source;
		const severity = payload.params?.severity;

		const matching = this.storage.list().filter((action) => {
			if (action.status !== status) return false;
			if (source && action.source !== source) return false;
			if (severity && action.severity !== severity) return false;

			return true;
		});

		const page = paginate(
			orderActions(matching),
			payload.params,
			stringifySortedQuery({ status, source: source ?? null, severity: severity ?? null }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async resolve(payload: ActionResolveRequest): Promise<ActionResolveResponse> {
		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		await delay();

		const action = this.require(payload.id);

		if (action.status !== 'pending') {
			throw new ApiError('action_already_resolved', `Action ${payload.id} is no longer pending`);
		}

		const chosen = action.resolutions.find((resolution) => resolution.id === payload.data.resolution_id);

		if (!chosen) {
			throw new ApiError('unknown_resolution', `Resolution ${payload.data.resolution_id} is not offered here`);
		}

		const answeredAt = new Date().toISOString();
		const answered: StoredAction = {
			...action,
			status: chosen.id === DISMISS_RESOLUTION ? 'dismissed' : 'resolved',
			updated_at: answeredAt,
			resolved_at: answeredAt,
			resolutions: [],
		};

		this.replace(action, answered);
		this.idempotency.remember(payload.idempotencyKey, payload.data, answered);

		return { data: answered, meta: { idempotent_replay: false } };
	}
}

export { ActionsMockRESTApiClient };
