import { describe, expect, test } from 'vitest';

import { describeApiOperation } from './describe-operation.ts';


describe('describeApiOperation', () => {
	test('reads a plain collection key as a load', () => {
		expect(describeApiOperation('transactions')).toEqual({
			pending: 'Loading transactions…',
			success: 'Transactions loaded',
			error: "Couldn't load transactions",
		});
	});

	test('splits a camel case mutation key into verb and subject', () => {
		expect(describeApiOperation('createTransactionChain')).toEqual({
			pending: 'Creating transaction chain…',
			success: 'Transaction chain created',
			error: "Couldn't create transaction chain",
		});
	});

	test('splits a kebab case mutation key into verb and subject', () => {
		expect(describeApiOperation('rotate-webhook-secret')).toEqual({
			pending: 'Rotating webhook secret…',
			success: 'Webhook secret rotated',
			error: "Couldn't rotate webhook secret",
		});
	});

	test('keeps a verb-shaped noun as the subject when it stands alone', () => {
		expect(describeApiOperation('actions')).toEqual({
			pending: 'Loading actions…',
			success: 'Actions loaded',
			error: "Couldn't load actions",
		});
	});

	test('prefers an override over the derived wording', () => {
		expect(describeApiOperation('transactionsSearch')).toEqual({
			pending: 'Searching transactions…',
			success: 'Transactions found',
			error: "Couldn't search transactions",
		});
	});

	test('falls back to a generic subject for an unnamed request', () => {
		expect(describeApiOperation('')).toEqual({
			pending: 'Loading data…',
			success: 'Data loaded',
			error: "Couldn't load data",
		});
	});
});
