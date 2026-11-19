import { describe, expect, test } from 'vitest';
import { ApiError } from "@internal/shared";

import { LedgerMockRESTApiClient } from './mock-server.ts';
import { MockLedger, parseLedgerQuery } from './mock-ledger';


describe('LedgerMockRESTApiClient', () => {
	test('lists the seeded wallets with favorites first and both category vocabularies', async () => {
		const response = await new LedgerMockRESTApiClient().getDimensions({ params: { currency: 'USD' } });

		expect(response.data.wallets.length).toBeGreaterThan(0);
		expect(response.data.wallets[0].name).toBe('Everyday');
		expect(response.data.categories.expense).toContainEqual({ id: 'seed-transaction-rent', name: 'Rent', is_global: false });
		expect(response.data.categories.expense).toContainEqual(
			{ id: 'builtin-transaction-groceries', name: 'Groceries', is_global: true },
		);
		expect(response.data.categories.income.map((category) => category.name)).toContain('Salary');
		expect(response.data.first_transaction_at).not.toBeNull();
	});

	test('rejects an inverted window and an unknown wallet', () => {
		const ledger = new MockLedger();
		const until = new Date().toISOString();

		expect(() => parseLedgerQuery({ since: until, until }, ledger)).toThrow(ApiError);
		expect(() => parseLedgerQuery({ wallet_id: ['nope'] }, ledger)).toThrow(ApiError);
	});
});
