// TODO wire to backend — Management screen is fully presentational for now.

export type Tone = 'pos' | 'neg' | 'neutral' | 'muted';

export type PanelMode = 'add' | 'scan' | 'wallet' | 'transfer' | 'edit';

export interface PanelWallet {
	id: string;
	name: string;
	currency: string;
	credit: boolean;
	gradient: string;
	balance: { amount: number; currency: string };
}

export interface MockWallet {
	id: string;
	name: string;
	type: string;
	currency: string;
	balance: string;
	balanceTone: Tone;
	gradient: string;
	pinned: boolean;
	updated: string;
	inMonth: string;
	outMonth: string;
}

export interface MockLedgerLine {
	type: 'DR' | 'CR';
	account: string;
	side: string;
	amount: string;
}

export interface MockTransaction {
	id: string;
	date: string;
	time: string;
	icon: string;
	iconClass: string;
	description: string;
	scanned: boolean;
	walletId: string;
	walletName: string;
	category: string;
	type: 'expense' | 'income' | 'transfer';
	amount: string;
	amountTone: Tone;
	kind: string;
	lines: MockLedgerLine[];
	provenance: string;
}

export interface MockAccount {
	id: string;
	name: string;
	kind: string;
	// Account balances are stored in USD; the UI converts to the user's main currency.
	balanceUsd: number;
	balanceTone: Tone;
	accountType: string;
}

export interface MockAccountCategory {
	id: string;
	label: string;
	color: string;
	totalUsd: number;
	accounts: MockAccount[];
}

export const MOCK_LEDGER = {
	assets: '$18,880.50',
	liabilities: '$640.20',
	equity: '$18,240.30',
};

export const MOCK_WALLETS: MockWallet[] = [
	{
		id: 'w1', name: 'Main Checking', type: 'Debit card', currency: 'USD', balance: '$8,420.18',
		balanceTone: 'neutral', gradient: 'linear-gradient(135deg,#4f46e5,#8b5cf6)', pinned: true,
		updated: '2h ago', inMonth: '$5,120.00', outMonth: '$2,140.30',
	},
	{
		id: 'w2', name: 'Amex Gold', type: 'Credit card', currency: 'USD', balance: '−$640.20',
		balanceTone: 'neg', gradient: 'linear-gradient(135deg,#0ca678,#1098ad)', pinned: true,
		updated: '5h ago', inMonth: '$0.00', outMonth: '$880.10',
	},
	{
		id: 'w3', name: 'Emergency Fund', type: 'Savings', currency: 'USD', balance: '$9,800.32',
		balanceTone: 'pos', gradient: 'linear-gradient(135deg,#e8920c,#f76707)', pinned: false,
		updated: '1d ago', inMonth: '$300.00', outMonth: '$0.00',
	},
	{
		id: 'w4', name: 'Travel Cash', type: 'Cash', currency: 'EUR', balance: '€420.00',
		balanceTone: 'neutral', gradient: 'linear-gradient(135deg,#8b5cf6,#6366f1)', pinned: false,
		updated: '3d ago', inMonth: '€0.00', outMonth: '€120.00',
	},
	{
		id: 'w5', name: 'Stocks Brokerage', type: 'Savings', currency: 'USD', balance: '$880.20',
		balanceTone: 'pos', gradient: 'linear-gradient(135deg,#1098ad,#0ca678)', pinned: false,
		updated: '1w ago', inMonth: '$0.00', outMonth: '$0.00',
	},
];

export const MOCK_WALLET_TYPES = ['Debit card', 'Savings', 'Credit card', 'Cash'];
export const MOCK_CURRENCIES = ['USD', 'EUR', 'GBP'];

export const MOCK_TRANSACTIONS: MockTransaction[] = [
	{
		id: 't1', date: 'Jun 18', time: '10:42', icon: '🛒', iconClass: 'bg-[var(--viol-soft)] text-viol',
		description: 'Whole Foods Market', scanned: true, walletId: 'w1', walletName: 'Main Checking',
		category: 'Groceries', type: 'expense', amount: '−$53.50', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Groceries', side: 'debit', amount: '$53.50' },
			{ type: 'CR', account: 'Main Checking', side: 'credit', amount: '$53.50' },
		],
		provenance: 'Imported · matched to receipt · Jun 18 10:42',
	},
	{
		id: 't2', date: 'Jun 18', time: '08:14', icon: '☕', iconClass: 'bg-[var(--warn-soft)] text-warn',
		description: 'Blue Bottle Coffee', scanned: false, walletId: 'w1', walletName: 'Main Checking',
		category: 'Dining', type: 'expense', amount: '−$4.80', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Dining', side: 'debit', amount: '$4.80' },
			{ type: 'CR', account: 'Main Checking', side: 'credit', amount: '$4.80' },
		],
		provenance: 'Manual entry · Jun 18 08:14',
	},
	{
		id: 't3', date: 'Jun 17', time: '09:00', icon: '💼', iconClass: 'bg-pos-soft text-pos',
		description: 'Acme Corp Salary', scanned: false, walletId: 'w1', walletName: 'Main Checking',
		category: 'Income', type: 'income', amount: '+$4,200.00', amountTone: 'pos', kind: 'Income',
		lines: [
			{ type: 'DR', account: 'Main Checking', side: 'debit', amount: '$4,200.00' },
			{ type: 'CR', account: 'Salary', side: 'credit', amount: '$4,200.00' },
		],
		provenance: 'Recurring · payroll · Jun 17 09:00',
	},
	{
		id: 't4', date: 'Jun 16', time: '18:21', icon: '🚇', iconClass: 'bg-[var(--accent-soft)] text-primary',
		description: 'Metro Transit', scanned: false, walletId: 'w1', walletName: 'Main Checking',
		category: 'Transport', type: 'expense', amount: '−$58.30', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Transport', side: 'debit', amount: '$58.30' },
			{ type: 'CR', account: 'Main Checking', side: 'credit', amount: '$58.30' },
		],
		provenance: 'Manual entry · Jun 16 18:21',
	},
	{
		id: 't5', date: 'Jun 15', time: '12:05', icon: '🍽', iconClass: 'bg-[var(--warn-soft)] text-warn',
		description: 'Tartine Bakery', scanned: true, walletId: 'w2', walletName: 'Amex Gold',
		category: 'Dining', type: 'expense', amount: '−$32.10', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Dining', side: 'debit', amount: '$32.10' },
			{ type: 'CR', account: 'Amex Gold', side: 'credit', amount: '$32.10' },
		],
		provenance: 'Imported · matched to receipt · Jun 15 12:05',
	},
	{
		id: 't6', date: 'Jun 14', time: '14:30', icon: '↔', iconClass: 'bg-[var(--accent-soft)] text-primary',
		description: 'Transfer to Emergency Fund', scanned: false, walletId: 'w1', walletName: 'Main Checking',
		category: 'Transfer', type: 'transfer', amount: '−$300.00', amountTone: 'neg', kind: 'Transfer',
		lines: [
			{ type: 'DR', account: 'Emergency Fund', side: 'debit', amount: '$300.00' },
			{ type: 'CR', account: 'Main Checking', side: 'credit', amount: '$300.00' },
		],
		provenance: 'Manual transfer · Jun 14 14:30',
	},
	{
		id: 't7', date: 'Jun 13', time: '20:11', icon: '🎬', iconClass: 'bg-[var(--viol-soft)] text-viol',
		description: 'Netflix', scanned: false, walletId: 'w2', walletName: 'Amex Gold',
		category: 'Bills', type: 'expense', amount: '−$15.99', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Bills', side: 'debit', amount: '$15.99' },
			{ type: 'CR', account: 'Amex Gold', side: 'credit', amount: '$15.99' },
		],
		provenance: 'Recurring · subscription · Jun 13 20:11',
	},
	{
		id: 't8', date: 'Jun 12', time: '11:48', icon: '🛍', iconClass: 'bg-[var(--accent-soft)] text-primary',
		description: 'Uniqlo', scanned: true, walletId: 'w1', walletName: 'Main Checking',
		category: 'Shopping', type: 'expense', amount: '−$74.20', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Shopping', side: 'debit', amount: '$74.20' },
			{ type: 'CR', account: 'Main Checking', side: 'credit', amount: '$74.20' },
		],
		provenance: 'Imported · matched to receipt · Jun 12 11:48',
	},
	{
		id: 't9', date: 'Jun 11', time: '07:32', icon: '⛽', iconClass: 'bg-[var(--warn-soft)] text-warn',
		description: 'Shell Station', scanned: false, walletId: 'w2', walletName: 'Amex Gold',
		category: 'Transport', type: 'expense', amount: '−$48.00', amountTone: 'neg', kind: 'Expense',
		lines: [
			{ type: 'DR', account: 'Transport', side: 'debit', amount: '$48.00' },
			{ type: 'CR', account: 'Amex Gold', side: 'credit', amount: '$48.00' },
		],
		provenance: 'Manual entry · Jun 11 07:32',
	},
];

export const MOCK_TXN_CATEGORIES = ['Groceries', 'Dining', 'Transport', 'Bills', 'Shopping', 'Income'];
export const MOCK_TXN_TYPES: MockTransaction['type'][] = ['expense', 'income', 'transfer'];

export const MOCK_ACCOUNT_CATEGORIES: MockAccountCategory[] = [
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

export const MOCK_ACCOUNT_HISTORY = [
	{ id: 'h1', icon: '💼', iconClass: 'bg-pos-soft text-pos', description: 'Acme Corp Salary', date: 'Jun 17', side: 'DR', sideTone: 'pos' as Tone, amountUsd: 4200.00, amountTone: 'pos' as Tone },
	{ id: 'h2', icon: '🛒', iconClass: 'bg-[var(--viol-soft)] text-viol', description: 'Whole Foods Market', date: 'Jun 18', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -53.50, amountTone: 'neg' as Tone },
	{ id: 'h3', icon: '☕', iconClass: 'bg-[var(--warn-soft)] text-warn', description: 'Blue Bottle Coffee', date: 'Jun 18', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -4.80, amountTone: 'neg' as Tone },
	{ id: 'h4', icon: '🚇', iconClass: 'bg-[var(--accent-soft)] text-primary', description: 'Metro Transit', date: 'Jun 16', side: 'CR', sideTone: 'neg' as Tone, amountUsd: -58.30, amountTone: 'neg' as Tone },
];
