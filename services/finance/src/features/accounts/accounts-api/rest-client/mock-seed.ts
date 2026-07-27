import type { AccountPreview, LedgerEntry } from "../types.ts";


const ACCOUNT_SEED: AccountPreview[] = [
	{ id: 'a1', name: 'Main Checking', kind: 'Cash & equivalents', type: 'asset', balance: { amount: 8420.18, currency: 'USD' } },
	{ id: 'a2', name: 'Emergency Fund', kind: 'Savings', type: 'asset', balance: { amount: 9800.32, currency: 'USD' } },
	{ id: 'a3', name: 'Stocks Brokerage', kind: 'Investment', type: 'asset', balance: { amount: 880.20, currency: 'USD' } },
	{ id: 'a4', name: 'Amex Gold', kind: 'Credit card', type: 'liability', balance: { amount: -640.20, currency: 'USD' } },
	{ id: 'a5', name: 'Opening Balance', kind: 'Equity', type: 'equity', balance: { amount: 12768.21, currency: 'USD' } },
	{ id: 'a6', name: 'Retained Earnings', kind: 'Equity', type: 'equity', balance: { amount: 5472.09, currency: 'USD' } },
];

const LEDGER_ENTRY_SEED: LedgerEntry[] = [
	{ id: 'h1', occurred_at: '2026-06-17', description: 'Acme Corp Salary', icon: '💼', side: 'DR', amount: { amount: 4200.00, currency: 'USD' } },
	{ id: 'h2', occurred_at: '2026-06-18', description: 'Whole Foods Market', icon: '🛒', side: 'CR', amount: { amount: -53.50, currency: 'USD' } },
	{ id: 'h3', occurred_at: '2026-06-18', description: 'Blue Bottle Coffee', icon: '☕', side: 'CR', amount: { amount: -4.80, currency: 'USD' } },
	{ id: 'h4', occurred_at: '2026-06-16', description: 'Metro Transit', icon: '🚇', side: 'CR', amount: { amount: -58.30, currency: 'USD' } },
];

export { ACCOUNT_SEED, LEDGER_ENTRY_SEED };
