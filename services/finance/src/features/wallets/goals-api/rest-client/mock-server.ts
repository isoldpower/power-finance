import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import {
	ApiError,
	createMatcher,
	delay,
	IdempotencyStore,
	paginate,
	parseAmount,
	serializeAmount,
	stringifySortedQuery,
	validateFilter,
} from "@shared/api";
import { storedTransactionToDto, TRANSACTIONS_STORAGE_KEY, walletDelta } from "@feature/transactions/transactions-api";
import { GOALS_STORAGE_KEY } from "./mock-seed.ts";
import type { IStorage } from "@internal/shared";
import type { LedgerEntryDto } from "@feature/accounts/accounts-api";
import type { StoredTransaction } from "@feature/transactions/transactions-api";
import type { StoredGoal } from "./mock-seed.ts";
import type { FieldPolicy } from "@shared/api";
import type { GoalDto, GoalSearchField } from "../types.ts";
import type {
	IGoalsRESTApiClient,
	GoalDeleteRequest, GoalDeleteResponse,
	GoalGetRequest, GoalGetResponse,
	GoalListRequest, GoalListResponse,
	GoalPatchRequest, GoalPatchResponse,
	GoalPostRequest, GoalPostResponse,
	GoalSearchRequest, GoalSearchResponse,
} from "./types.ts";



const SEARCH_FIELDS: FieldPolicy<GoalSearchField> = {
	name: ['eq', 'neq', 'in', 'contains', 'icontains'],
	currency: ['eq', 'neq', 'in'],
	target: ['eq', 'gt', 'gte', 'lt', 'lte'],
	progress: ['eq', 'gt', 'gte', 'lt', 'lte'],
	finish_at: ['gt', 'gte', 'lt', 'lte'],
	created_at: ['gt', 'gte', 'lt', 'lte'],
};

interface GoalRecord {
	goal: StoredGoal;
	progress: string;
}

const leafValue = (record: GoalRecord, field: GoalSearchField): string | null => {
	switch (field) {
		case 'name':
			return record.goal.name;
		case 'currency':
			return record.goal.currency;
		case 'target':
			return record.goal.target;
		case 'progress':
			return record.progress;
		case 'finish_at':
			return record.goal.finish_at;
		case 'created_at':
			return record.goal.created_at;
	}
};

const matchesNode = createMatcher<GoalRecord, GoalSearchField>(
	SEARCH_FIELDS,
	(record, field) => leafValue(record, field),
	{ numericFields: ['target', 'progress'] },
);

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderGoals = (goals: StoredGoal[]): StoredGoal[] => {
	return [...goals].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

class GoalsMockRESTApiClient implements IGoalsRESTApiClient {
	private readonly storage: IStorage<StoredGoal>;
	private readonly transactions: IStorage<StoredTransaction>;
	private readonly idempotency = new IdempotencyStore<GoalDto>();

	constructor(storageKey: string = GOALS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredGoal>(storageKey);
		this.transactions = new LocalStorageMock<StoredTransaction>(TRANSACTIONS_STORAGE_KEY);
	}

	private ledger(goalId: string): StoredTransaction[] {
		return this.transactions.list()
			.filter((item) => item.wallet_id === goalId && item.deleted_at === null)
			.sort((left, right) => compareDesc(left.created_at, right.created_at));
	}

	private progress(goal: StoredGoal): string {
		const total = this.ledger(goal.id).reduce((sum, item) => sum + walletDelta(item), 0);

		return serializeAmount(total);
	}

	private history(goalId: string): LedgerEntryDto[] {
		return this.ledger(goalId).map((item) => {
			const dto = storedTransactionToDto(item);

			return {
				id: dto.id,
				title: dto.name,
				debit: dto.type === 'income',
				created_at: dto.created_at,
				source_transaction: dto.id,
				icon: '',
				money: dto.money,
			};
		});
	}

	private require(id: string): StoredGoal {
		const goal = this.storage.get(id);
		if (!goal) throw new ApiError('not_found', `Goal ${id} does not exist`);

		return goal;
	}

	private toDto(goal: StoredGoal): GoalDto {
		return {
			id: goal.id,
			name: goal.name,
			url: goal.url,
			currency: goal.currency,
			finish_at: goal.finish_at,
			created_at: goal.created_at,
			updated_at: goal.updated_at,
			deleted_at: goal.deleted_at,
			target: { amount: goal.target, currency: goal.currency },
			progress: { amount: this.progress(goal), currency: goal.currency },
		};
	}

	private replace(previous: StoredGoal, next: StoredGoal): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: GoalListRequest): Promise<GoalListResponse> {
		await delay();

		const open = orderGoals(this.storage.list().filter((goal) => goal.deleted_at === null));
		const page = paginate(open, payload.params, stringifySortedQuery({ scope: 'list' }));

		return {
			data: page.items.map((goal) => this.toDto(goal)),
			meta: { ...page.meta, cached: false },
		};
	}

	public async search(payload: GoalSearchRequest): Promise<GoalSearchResponse> {
		validateFilter(SEARCH_FIELDS, payload.data.filter_body);

		await delay();

		const open = orderGoals(this.storage.list().filter((goal) => goal.deleted_at === null));
		const matching = open
			.map((goal) => ({ goal, progress: this.progress(goal) }))
			.filter((record) => matchesNode(record, payload.data.filter_body));
		const page = paginate(
			matching,
			payload.params,
			stringifySortedQuery({ filter: payload.data.filter_body }),
		);

		return {
			data: page.items.map((record) => this.toDto(record.goal)),
			meta: { ...page.meta, cached: false },
		};
	}

	public async get(payload: GoalGetRequest): Promise<GoalGetResponse> {
		await delay();

		const goal = this.require(payload.id);
		const history = paginate(
			this.history(goal.id),
			payload.params,
			stringifySortedQuery({ id: payload.id }),
		);

		return {
			data: { ...this.toDto(goal), history: history.items },
			meta: { history: history.meta, cached: false },
		};
	}

	public async post(payload: GoalPostRequest): Promise<GoalPostResponse> {
		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		await delay();

		const goal: StoredGoal = {
			id: uuidv4(),
			name: payload.data.name,
			url: null,
			currency: payload.data.currency,
			finish_at: payload.data.finish_at,
			created_at: new Date().toISOString(),
			updated_at: null,
			deleted_at: null,
			target: payload.data.target,
		};

		this.storage.add(goal);

		const dto = this.toDto(goal);
		this.idempotency.remember(payload.idempotencyKey, payload.data, dto);

		return { data: dto, meta: { idempotent_replay: false } };
	}

	public async patch(payload: GoalPatchRequest): Promise<GoalPatchResponse> {
		await delay();

		const goal = this.require(payload.id);
		const updated: StoredGoal = {
			...goal,
			name: payload.data.name ?? goal.name,
			finish_at: payload.data.finish_at ?? goal.finish_at,
			target: payload.data.target ?? goal.target,
			updated_at: new Date().toISOString(),
		};

		this.replace(goal, updated);

		return { data: this.toDto(updated), meta: {} };
	}

	public async delete(payload: GoalDeleteRequest): Promise<GoalDeleteResponse> {
		await delay();

		const goal = this.require(payload.id);

		if (goal.deleted_at === null && parseAmount(this.progress(goal)) !== 0) {
			throw new ApiError('goal_not_empty', 'Goal still holds money and cannot be closed');
		}

		const closed: StoredGoal = { ...goal, deleted_at: goal.deleted_at ?? new Date().toISOString() };
		this.replace(goal, closed);

		return { data: this.toDto(closed), meta: {} };
	}
}

export { GoalsMockRESTApiClient, SEARCH_FIELDS as GOAL_SEARCH_FIELDS };
