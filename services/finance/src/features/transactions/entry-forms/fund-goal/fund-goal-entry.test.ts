import { describe, expect, test, vi } from 'vitest';

import { submitEntry } from '../submit/submit-entry.ts';
import { fundGoalSchema } from './fund-goal-schema.ts';

import type { TransactionChainDraft, TransactionChainEntryDraft } from '@entity/transactions';
import type {
	CreateTransactionChainResponse,
	CreateTransactionResponse,
} from '../../transactions-api';
import type { FundGoalSchema } from './fund-goal-schema.ts';


const GOAL_ID = 'goal-1';
const WALLET_ID = 'wallet-1';

const fundingEntry = (overrides: Partial<FundGoalSchema> = {}): FundGoalSchema => ({
	type: 'transfer',
	name: 'Emergency fund',
	amount: '250.00',
	receiveAmount: '250.00',
	fromWallet: WALLET_ID,
	toWallet: GOAL_ID,
	...overrides,
});

const submitFunding = async (entry: FundGoalSchema, toCurrency = 'USD') => {
	const chains: TransactionChainDraft[] = [];
	const createTransaction = vi.fn(() => Promise.resolve({} as CreateTransactionResponse));
	const createTransactionChain = vi.fn((draft: TransactionChainDraft) => {
		chains.push(draft);

		return Promise.resolve({} as CreateTransactionChainResponse);
	});

	await submitEntry(
		entry,
		{ fromCurrency: 'USD', toCurrency },
		{ createTransaction, createTransactionChain },
	);

	const entries: TransactionChainEntryDraft[] = chains[0]?.entries ?? [];

	return { createTransaction, entries };
};

describe('funding a goal', () => {
	test('moves money out of the wallet and into the goal', async () => {
		const [out, into] = (await submitFunding(fundingEntry())).entries;

		expect(out).toMatchObject({ walletId: WALLET_ID, type: 'expense' });
		expect(into).toMatchObject({ walletId: GOAL_ID, type: 'income' });
	});

	test('titles the transfer after the goal rather than the generic default', async () => {
		const [out] = (await submitFunding(fundingEntry())).entries;

		expect(out.name).toBe('Emergency fund');
	});

	test('leaves the category unset, since the goal is not a spending category', async () => {
		const [out] = (await submitFunding(fundingEntry())).entries;

		expect(out.category).toBeNull();
	});

	test('denominates each leg in its own container currency', async () => {
		const entry = fundingEntry({ amount: '100.00', receiveAmount: '86.40' });
		const [out, into] = (await submitFunding(entry, 'EUR')).entries;

		expect(out).toMatchObject({ currency: 'USD', amount: '100.00' });
		expect(into).toMatchObject({ currency: 'EUR', amount: '86.40' });
	});

	test('never falls back to a single-sided transaction', async () => {
		const { createTransaction } = await submitFunding(fundingEntry());

		expect(createTransaction).not.toHaveBeenCalled();
	});
});

describe('the funding form', () => {
	test('accepts a wallet paying into a goal', () => {
		expect(fundGoalSchema.safeParse(fundingEntry()).success).toBe(true);
	});

	test('will not submit without a source wallet', () => {
		const entry = fundingEntry({ fromWallet: '' });

		expect(fundGoalSchema.safeParse(entry).success).toBe(false);
	});

	test('will not submit a zero contribution', () => {
		const entry = fundingEntry({ amount: '0', receiveAmount: '0' });

		expect(fundGoalSchema.safeParse(entry).success).toBe(false);
	});

	test('will not let a goal pay into itself', () => {
		const entry = fundingEntry({ fromWallet: GOAL_ID });

		expect(fundGoalSchema.safeParse(entry).success).toBe(false);
	});
});
