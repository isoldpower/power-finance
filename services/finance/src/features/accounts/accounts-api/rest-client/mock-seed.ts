import type { AccountDto, LedgerEntryDto } from "../types.ts";


const ACCOUNT_SEED: AccountDto[] = [
	{ id: 'a1', group: 'assets', name: 'Main Checking', money: { amount: '8420.18', currency: 'USD' }, created_at: '2026-06-01T09:00:00-05:00', updated_at: null },
	{ id: 'a2', group: 'assets', name: 'Emergency Fund', money: { amount: '9800.32', currency: 'USD' }, created_at: '2026-06-02T09:00:00-05:00', updated_at: null },
	{ id: 'a3', group: 'assets', name: 'Stocks Brokerage', money: { amount: '880.20', currency: 'USD' }, created_at: '2026-06-03T09:00:00-05:00', updated_at: null },
	{ id: 'a4', group: 'liabilities', name: 'Amex Gold', money: { amount: '-640.20', currency: 'USD' }, created_at: '2026-06-04T09:00:00-05:00', updated_at: null },
	{ id: 'a5', group: 'equity', name: 'Opening Balance', money: { amount: '12768.21', currency: 'USD' }, created_at: '2026-06-05T09:00:00-05:00', updated_at: null },
	{ id: 'a6', group: 'equity', name: 'Retained Earnings', money: { amount: '5472.09', currency: 'USD' }, created_at: '2026-06-06T09:00:00-05:00', updated_at: null },
];

const LEDGER_ENTRY_SEED: LedgerEntryDto[] = [
	{
		id: 'le1',
		title: 'Acme Corp Salary',
		debit: true,
		created_at: '2026-06-17T09:00:00-05:00',
		source_transaction: '9f1c2f8e-0f3a-4c9b-9a1e-2f7b4c5d6e70',
		icon: '💼',
		money: { amount: '4200.00', currency: 'USD' },
	},
	{
		id: 'le2',
		title: 'Whole Foods Market',
		debit: false,
		created_at: '2026-06-18T18:24:00-05:00',
		source_transaction: '9f1c2f8e-0f3a-4c9b-9a1e-2f7b4c5d6e71',
		icon: '🛒',
		money: { amount: '53.50', currency: 'USD' },
	},
	{
		id: 'le3',
		title: 'Blue Bottle Coffee',
		debit: false,
		created_at: '2026-06-18T08:12:00-05:00',
		source_transaction: '9f1c2f8e-0f3a-4c9b-9a1e-2f7b4c5d6e72',
		icon: '☕',
		money: { amount: '4.80', currency: 'USD' },
	},
	{
		id: 'le4',
		title: 'Metro Transit',
		debit: false,
		created_at: '2026-06-16T07:45:00-05:00',
		source_transaction: '9f1c2f8e-0f3a-4c9b-9a1e-2f7b4c5d6e73',
		icon: '🚇',
		money: { amount: '58.30', currency: 'USD' },
	},
];

export { ACCOUNT_SEED, LEDGER_ENTRY_SEED };
