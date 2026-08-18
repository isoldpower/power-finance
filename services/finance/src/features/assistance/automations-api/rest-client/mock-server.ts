import { v4 as uuidv4 } from "uuid";
import { LocalStorageMock } from "@internal/shared";
import {
	ApiError,
	delay,
	IdempotencyStore,
	isCanonicalAmount,
	paginate,
	stringifySortedQuery,
	validateFilter,
} from "@shared/api";
import { TRANSACTION_SEARCH_FIELDS } from "@feature/transactions/transactions-api";
import { WALLET_SEARCH_FIELDS } from "@feature/wallets/wallets-api";
import { AUTOMATIONS_STORAGE_KEY, SEED_AUTOMATIONS } from "./mock-seed.ts";

import type { IStorage } from "@internal/shared";
import type { FilterNode } from "@shared/api";
import type { StoredAutomation } from "./mock-seed.ts";
import type {
	AutomationDto,
	AutomationEffectDto,
	AutomationTriggerBody,
	AutomationTriggerDto,
	EffectParamsDto,
} from "../types.ts";
import type {
	IAutomationsRESTApiClient,
	AutomationDeleteRequest, AutomationDeleteResponse,
	AutomationGetRequest, AutomationGetResponse,
	AutomationListRequest, AutomationListResponse,
	AutomationPatchRequest, AutomationPatchResponse,
	AutomationPostRequest, AutomationPostResponse,
} from "./types.ts";


type TriggerSubject = 'transaction' | 'wallet';

const SEVERITIES = ['info', 'warning', 'critical'];

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderAutomations = (automations: StoredAutomation[]): StoredAutomation[] => {
	return [...automations].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

const invalid = (field: string, code: 'required' | 'trigger_field_conflict' | 'effect_unknown_type' | 'effect_params_invalid' | 'effect_subject_mismatch', message: string): ApiError => {
	return new ApiError('validation_failed', message, [{ field, code, message }]);
};

const subjectOf = (trigger: AutomationTriggerDto): TriggerSubject => {
	return trigger.type === 'event' ? 'transaction' : 'wallet';
};

const stringParam = (params: EffectParamsDto, key: string): string | null => {
	const value = params[key];

	return typeof value === 'string' && value.length > 0 ? value : null;
};

const assertTransfer = (params: EffectParamsDto, index: number): void => {
	const money = params.money;
	const amount = typeof money === 'object' && money !== null ? (money as { amount?: unknown }).amount : undefined;
	const currency = typeof money === 'object' && money !== null ? (money as { currency?: unknown }).currency : undefined;

	if (stringParam(params, 'from_wallet_id') === null || stringParam(params, 'to_wallet_id') === null) {
		throw invalid(`effects[${String(index)}].params`, 'effect_params_invalid', 'transfer needs both wallet references');
	}

	if (typeof amount !== 'string' || !isCanonicalAmount(amount) || typeof currency !== 'string') {
		throw invalid(`effects[${String(index)}].params`, 'effect_params_invalid', 'transfer needs a canonical money object');
	}
};

const assertEffect = (effect: AutomationEffectDto, index: number, subject: TriggerSubject): void => {
	const field = `effects[${String(index)}].params`;

	switch (effect.type) {
		case 'set_category': {
			if (subject !== 'transaction') {
				throw invalid(`effects[${String(index)}]`, 'effect_subject_mismatch', 'set_category applies to transactions only');
			}
			if (stringParam(effect.params, 'category') === null) {
				throw invalid(field, 'effect_params_invalid', 'set_category needs a category');
			}

			return;
		}
		case 'notify': {
			const severity = stringParam(effect.params, 'severity');
			if (severity === null || !SEVERITIES.includes(severity) || stringParam(effect.params, 'title') === null) {
				throw invalid(field, 'effect_params_invalid', 'notify needs a severity and a title');
			}

			return;
		}
		case 'raise_action': {
			const severity = stringParam(effect.params, 'severity');
			const complete = severity !== null
				&& SEVERITIES.includes(severity)
				&& stringParam(effect.params, 'title') !== null
				&& stringParam(effect.params, 'body') !== null;

			if (!complete) {
				throw invalid(field, 'effect_params_invalid', 'raise_action needs a severity, a title and a body');
			}

			return;
		}
		case 'transfer': {
			assertTransfer(effect.params, index);

			return;
		}
		default:
			throw invalid(`effects[${String(index)}].type`, 'effect_unknown_type', `${effect.type} is not a documented effect`);
	}
};

const assertEffects = (effects: AutomationEffectDto[], subject: TriggerSubject): void => {
	if (effects.length === 0) {
		throw invalid('effects', 'required', 'A rule needs at least one effect');
	}

	effects.forEach((effect, index) => { assertEffect(effect, index, subject); });
};

const assertCondition = (condition: FilterNode | null, subject: TriggerSubject): void => {
	if (condition === null) return;

	if (subject === 'transaction') {
		validateFilter(TRANSACTION_SEARCH_FIELDS, condition);

		return;
	}

	validateFilter(WALLET_SEARCH_FIELDS, condition);
};

const normalizeTrigger = (body: AutomationTriggerBody): AutomationTriggerDto => {
	if (body.type === 'event' && (body.event === undefined || body.schedule !== undefined)) {
		throw invalid('trigger', 'trigger_field_conflict', 'An event trigger carries an event and no schedule');
	}

	if (body.type === 'schedule' && (body.schedule === undefined || body.event !== undefined)) {
		throw invalid('trigger', 'trigger_field_conflict', 'A schedule trigger carries a schedule and no event');
	}

	return {
		type: body.type,
		event: body.event ?? null,
		schedule: body.schedule ?? null,
		filter_body: body.filter_body ?? null,
	};
};

const validateRule = (trigger: AutomationTriggerDto, effects: AutomationEffectDto[]): void => {
	const subject = subjectOf(trigger);

	assertCondition(trigger.filter_body, subject);
	assertEffects(effects, subject);
};

class AutomationsMockRESTApiClient implements IAutomationsRESTApiClient {
	private readonly storage: IStorage<StoredAutomation>;
	private readonly idempotency = new IdempotencyStore<AutomationDto>();

	constructor(storageKey: string = AUTOMATIONS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredAutomation>(storageKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) return;

		const now = Date.now();

		SEED_AUTOMATIONS.forEach((automation, index) => {
			const createdAt = new Date(now - index * 60 * 60 * 1000).toISOString();

			this.storage.add({ ...automation, id: uuidv4(), created_at: createdAt });
		});
	}

	private require(id: string): StoredAutomation {
		const automation = this.storage.get(id);
		if (!automation) throw new ApiError('not_found', `Automation ${id} does not exist`);

		return automation;
	}

	private replace(previous: StoredAutomation, next: StoredAutomation): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: AutomationListRequest): Promise<AutomationListResponse> {
		await delay();

		const enabled = payload.params?.enabled;
		const matching = this.storage.list().filter((automation) => {
			if (automation.deleted_at !== null) return false;

			return enabled === undefined || automation.enabled === enabled;
		});

		const page = paginate(
			orderAutomations(matching),
			payload.params,
			stringifySortedQuery({ enabled: enabled ?? null }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async get(payload: AutomationGetRequest): Promise<AutomationGetResponse> {
		await delay();

		return { data: this.require(payload.id), meta: { cached: false } };
	}

	public async post(payload: AutomationPostRequest): Promise<AutomationPostResponse> {
		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		const trigger = normalizeTrigger(payload.data.trigger);
		validateRule(trigger, payload.data.effects);

		await delay();

		const automation: StoredAutomation = {
			id: uuidv4(),
			name: payload.data.name,
			icon: payload.data.icon,
			enabled: payload.data.enabled ?? true,
			trigger,
			effects: payload.data.effects,
			created_at: new Date().toISOString(),
			updated_at: null,
			deleted_at: null,
			last_run_at: null,
			runs: 0,
		};

		this.storage.add(automation);
		this.idempotency.remember(payload.idempotencyKey, payload.data, automation);

		return { data: automation, meta: { idempotent_replay: false } };
	}

	public async patch(payload: AutomationPatchRequest): Promise<AutomationPatchResponse> {
		const automation = this.require(payload.id);
		const trigger = payload.data.trigger ? normalizeTrigger(payload.data.trigger) : automation.trigger;
		const effects = payload.data.effects ?? automation.effects;

		validateRule(trigger, effects);

		await delay();

		const updated: StoredAutomation = {
			...automation,
			name: payload.data.name ?? automation.name,
			icon: payload.data.icon ?? automation.icon,
			enabled: payload.data.enabled ?? automation.enabled,
			trigger,
			effects,
			updated_at: new Date().toISOString(),
		};

		this.replace(automation, updated);

		return { data: updated, meta: {} };
	}

	public async delete(payload: AutomationDeleteRequest): Promise<AutomationDeleteResponse> {
		await delay();

		const automation = this.require(payload.id);
		const closed: StoredAutomation = {
			...automation,
			deleted_at: automation.deleted_at ?? new Date().toISOString(),
		};

		this.replace(automation, closed);

		return { data: closed, meta: {} };
	}
}

export { AutomationsMockRESTApiClient };
