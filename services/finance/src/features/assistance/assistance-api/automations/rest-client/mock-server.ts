import { DEFAULT_AUTOMATION_ICON } from "@entity/assistance";

import type {
	IAutomationsRESTApiClient,
	AutomationRule,
	AutomationListRequest,
	AutomationListResponse,
	AutomationGetRequest,
	AutomationGetResponse,
	AutomationToggleRequest,
	AutomationToggleResponse,
	AutomationCreateRequest,
	AutomationCreateResponse,
	AutomationUpdateRequest,
	AutomationUpdateResponse,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
} from "../types.ts";


const MOCK_DELAY_MS = 250;
const STORAGE_KEY = 'mock:automations';

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const SEED: AutomationRule[] = [
	{ id: 'r1', icon: 'tag', name: 'Auto-categorize coffee shops', trigger: 'merchant ~ "coffee"', action: 'set category Dining', frequency: 'realtime', enabled: true },
	{ id: 'r2', icon: 'transfer', name: 'Sweep to Emergency Fund', trigger: 'balance > $8,000', action: 'transfer $250', frequency: 'monthly', enabled: true },
	{ id: 'r3', icon: 'alert', name: 'Alert on large charge', trigger: 'expense > $500', action: 'notify me', frequency: 'realtime', enabled: true },
	{ id: 'r4', icon: 'report', name: 'Weekly spending digest', trigger: 'every Monday', action: 'email summary', frequency: 'weekly', enabled: false },
	{ id: 'r5', icon: 'receipt', name: 'Flag missing receipts', trigger: 'expense > $75 no receipt', action: 'add to needs-action', frequency: 'daily', enabled: true },
];

const loadRules = (): AutomationRule[] => {
	if (typeof window === 'undefined') return SEED.map((rule) => ({ ...rule }));
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === null) return SEED.map((rule) => ({ ...rule }));
		return JSON.parse(stored) as AutomationRule[];
	} catch {
		return SEED.map((rule) => ({ ...rule }));
	}
};

const saveRules = (rules: AutomationRule[]): void => {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
	} catch {
		// Ignore storage failures (private mode, quota) — falls back to in-memory only.
	}
};


class AutomationsMockRESTApiClient implements IAutomationsRESTApiClient {
	private rules: AutomationRule[] = loadRules();

	public list(request: AutomationListRequest): Promise<AutomationListResponse> {
		const filtered = request.params?.enabled === undefined
			? this.rules
			: this.rules.filter((rule) => rule.enabled === request.params?.enabled);
		const limit = request.params?.limit ?? filtered.length;
		const data = filtered.slice(0, limit).map((rule) => ({ ...rule }));

		return delay({
			data,
			meta: { total: filtered.length, offset: 0, limit: data.length },
		});
	}

	public get(request: AutomationGetRequest): Promise<AutomationGetResponse> {
		const rule = this.rules.find((entry) => entry.id === request.id);
		if (!rule) throw new Error("Not found");

		return delay({ data: { ...rule } });
	}

	public toggle(request: AutomationToggleRequest): Promise<AutomationToggleResponse> {
		this.rules = this.rules.map((rule) => rule.id === request.id
			? { ...rule, enabled: request.enabled }
			: rule);
		saveRules(this.rules);

		const updated = this.rules.find((rule) => rule.id === request.id) ?? SEED[0];

		return delay({ data: { ...updated } });
	}

	public create(request: AutomationCreateRequest): Promise<AutomationCreateResponse> {
		const rule: AutomationRule = {
			id: `r${String(Date.now())}`,
			icon: request.data.icon ?? DEFAULT_AUTOMATION_ICON,
			name: request.data.name,
			trigger: request.data.trigger,
			action: request.data.action,
			frequency: request.data.frequency,
			enabled: true,
		};
		this.rules = [rule, ...this.rules];
		saveRules(this.rules);

		return delay({ data: { ...rule } });
	}

	public update(request: AutomationUpdateRequest): Promise<AutomationUpdateResponse> {
		this.rules = this.rules.map((rule) => rule.id === request.id
			? { ...rule, ...request.data }
			: rule);
		saveRules(this.rules);

		const updated = this.rules.find((rule) => rule.id === request.id) ?? SEED[0];

		return delay({ data: { ...updated } });
	}

	public delete(request: AutomationDeleteRequest): Promise<AutomationDeleteResponse> {
		this.rules = this.rules.filter((rule) => rule.id !== request.id);
		saveRules(this.rules);

		return delay({
			message: `Deleted automation ${request.id}`,
			meta: { id: request.id, success: true },
		});
	}
}

export { AutomationsMockRESTApiClient };
