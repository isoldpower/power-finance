import type {
	IAutomationsRESTApiClient,
	AutomationRule,
	AutomationListRequest,
	AutomationListResponse,
	AutomationToggleRequest,
	AutomationToggleResponse,
	AutomationCreateRequest,
	AutomationCreateResponse,
	AutomationDeleteRequest,
	AutomationDeleteResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const STORAGE_KEY = 'mock:automations';

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const SEED: AutomationRule[] = [
	{ id: 'r1', icon: '🏷', name: 'Auto-categorize coffee shops', statusText: 'active', statusTone: 'pos', trigger: 'merchant ~ "coffee"', action: 'set category Dining', frequency: 'realtime', enabled: true },
	{ id: 'r2', icon: '💸', name: 'Sweep to Emergency Fund', statusText: 'active', statusTone: 'pos', trigger: 'balance > $8,000', action: 'transfer $250', frequency: 'monthly', enabled: true },
	{ id: 'r3', icon: '🔔', name: 'Alert on large charge', statusText: 'active', statusTone: 'pos', trigger: 'expense > $500', action: 'notify me', frequency: 'realtime', enabled: true },
	{ id: 'r4', icon: '📊', name: 'Weekly spending digest', statusText: 'paused', statusTone: 'warn', trigger: 'every Monday', action: 'email summary', frequency: 'weekly', enabled: false },
	{ id: 'r5', icon: '🧾', name: 'Flag missing receipts', statusText: 'active', statusTone: 'pos', trigger: 'expense > $75 no receipt', action: 'add to needs-action', frequency: 'daily', enabled: true },
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

	public toggle(request: AutomationToggleRequest): Promise<AutomationToggleResponse> {
		this.rules = this.rules.map((rule) => rule.id === request.id
			? {
				...rule,
				enabled: request.enabled,
				statusText: request.enabled ? 'active' : 'paused',
				statusTone: request.enabled ? 'pos' : 'warn',
			}
			: rule);
		saveRules(this.rules);

		const updated = this.rules.find((rule) => rule.id === request.id) ?? SEED[0];

		return delay({ data: { ...updated } });
	}

	public create(request: AutomationCreateRequest): Promise<AutomationCreateResponse> {
		const rule: AutomationRule = {
			id: `r${String(Date.now())}`,
			icon: request.data.icon ?? '⚙',
			name: request.data.name,
			statusText: 'active',
			statusTone: 'pos',
			trigger: request.data.trigger,
			action: request.data.action,
			frequency: request.data.frequency,
			enabled: true,
		};
		this.rules = [rule, ...this.rules];
		saveRules(this.rules);

		return delay({ data: { ...rule } });
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
