import type { AutomationDto } from "../types.ts";


const AUTOMATIONS_STORAGE_KEY = 'automations-v1';

type StoredAutomation = AutomationDto;

const SEED_AUTOMATIONS: Omit<StoredAutomation, 'id' | 'created_at'>[] = [
	{
		updated_at: null,
		deleted_at: null,
		name: 'Auto-categorise coffee shops',
		icon: 'tag',
		enabled: true,
		trigger: {
			type: 'event',
			event: 'transaction.created',
			schedule: null,
			filter_body: {
				and: [
					{ field_name: 'name', operator: 'icontains', value: 'coffee' },
					{ field_name: 'amount', operator: 'lte', value: '25.00' },
				],
			},
		},
		effects: [{ type: 'set_category', params: { category: 'Dining' } }],
		last_run_at: null,
		runs: 14,
	},
	{
		updated_at: null,
		deleted_at: null,
		name: 'Alert on large charge',
		icon: 'alert',
		enabled: true,
		trigger: {
			type: 'event',
			event: 'transaction.created',
			schedule: null,
			filter_body: {
				and: [{ field_name: 'amount', operator: 'gte', value: '500.00' }],
			},
		},
		effects: [{ type: 'notify', params: { severity: 'warning', title: 'Large charge posted' } }],
		last_run_at: null,
		runs: 2,
	},
	{
		updated_at: null,
		deleted_at: null,
		name: 'Monthly savings sweep',
		icon: 'transfer',
		enabled: false,
		trigger: {
			type: 'schedule',
			event: null,
			schedule: 'monthly',
			filter_body: null,
		},
		effects: [
			{
				type: 'transfer',
				params: {
					from_wallet_id: '',
					to_wallet_id: '',
					money: { amount: '200.00', currency: 'USD' },
				},
			},
			{ type: 'notify', params: { severity: 'info', title: 'Savings sweep ran' } },
		],
		last_run_at: null,
		runs: 0,
	},
];

export { AUTOMATIONS_STORAGE_KEY, SEED_AUTOMATIONS };
export type { StoredAutomation };
