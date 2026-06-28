// Chart-of-accounts fixtures. Account balances are stored in USD; the UI converts to the user's
// main currency. TODO wire to backend when a ledger/accounts model lands.

import type { Tone } from "@shared/utils";

interface MockAccount {
	id: string;
	name: string;
	kind: string;
	balanceUsd: number;
	balanceTone: Tone;
	accountType: string;
}

interface MockAccountCategory {
	id: string;
	label: string;
	color: string;
	totalUsd: number;
	accounts: MockAccount[];
}

const MOCK_ACCOUNT_CATEGORIES: MockAccountCategory[] = [
	{
		id: 'assets', label: 'Assets', color: 'var(--pos)', totalUsd: 18880.50,
		accounts: [
			{ id: 'a1', name: 'Main Checking', kind: 'Cash & equivalents', balanceUsd: 8420.18, balanceTone: 'pos', accountType: 'asset' },
			{ id: 'a2', name: 'Emergency Fund', kind: 'Savings', balanceUsd: 9800.32, balanceTone: 'pos', accountType: 'asset' },
			{ id: 'a3', name: 'Stocks Brokerage', kind: 'Investment', balanceUsd: 880.20, balanceTone: 'pos', accountType: 'asset' },
		],
	},
	{
		id: 'liabilities', label: 'Liabilities', color: 'var(--neg)', totalUsd: 640.20,
		accounts: [
			{ id: 'a4', name: 'Amex Gold', kind: 'Credit card', balanceUsd: -640.20, balanceTone: 'neg', accountType: 'liability' },
		],
	},
	{
		id: 'equity', label: 'Equity', color: 'var(--viol)', totalUsd: 18240.30,
		accounts: [
			{ id: 'a5', name: 'Opening Balance', kind: 'Equity', balanceUsd: 12768.21, balanceTone: 'neutral', accountType: 'equity' },
			{ id: 'a6', name: 'Retained Earnings', kind: 'Equity', balanceUsd: 5472.09, balanceTone: 'neutral', accountType: 'equity' },
		],
	},
];

const MOCK_ACCOUNT_HISTORY = [
	{ id: 'h1', icon: '💼', iconClass: 'bg-pos-soft text-pos', description: 'Acme Corp Salary', date: 'Jun 17', side: 'DR', sideTone: 'pos' as Tone, amountUsd: 4200.00, amountTone: 'pos' as Tone },
	{ id: 'h2', icon: '🛒', iconClass: 'bg-[var(--viol-soft)] text-viol', description: 'Whole Foods Market', date: 'Jun 18', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -53.50, amountTone: 'neg' as Tone },
	{ id: 'h3', icon: '☕', iconClass: 'bg-[var(--warn-soft)] text-warn', description: 'Blue Bottle Coffee', date: 'Jun 18', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -4.80, amountTone: 'neg' as Tone },
	{ id: 'h4', icon: '🚇', iconClass: 'bg-[var(--accent-soft)] text-primary', description: 'Metro Transit', date: 'Jun 16', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -58.30, amountTone: 'neg' as Tone },
];

export { MOCK_ACCOUNT_CATEGORIES, MOCK_ACCOUNT_HISTORY };
export type { MockAccount, MockAccountCategory };
