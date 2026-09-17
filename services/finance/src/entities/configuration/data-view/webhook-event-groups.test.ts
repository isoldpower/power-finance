import { describe, expect, test } from 'vitest';

import { webhookEventGroups } from './webhook-event-groups.ts';

import type { WebhookEventType } from '../types.ts';


const eventType = (event: string, subject: string): WebhookEventType => ({
	event,
	subject,
	description: `${event} happened`,
});

describe('webhookEventGroups', () => {
	test('gathers events under their subject', () => {
		const groups = webhookEventGroups([
			eventType('transaction.created', 'transaction'),
			eventType('wallet.created', 'wallet'),
			eventType('transaction.updated', 'transaction'),
		]);

		expect(groups).toEqual([
			{
				subject: 'transaction',
				events: [
					eventType('transaction.created', 'transaction'),
					eventType('transaction.updated', 'transaction'),
				],
			},
			{ subject: 'wallet', events: [eventType('wallet.created', 'wallet')] },
		]);
	});

	test('orders subjects by where each one first appears', () => {
		const groups = webhookEventGroups([
			eventType('goal.reached', 'goal'),
			eventType('wallet.created', 'wallet'),
			eventType('goal.missed', 'goal'),
		]);

		expect(groups.map((group) => group.subject)).toEqual(['goal', 'wallet']);
	});

	test('returns nothing for an empty catalogue', () => {
		expect(webhookEventGroups([])).toEqual([]);
	});

	test('leaves the caller array untouched', () => {
		const catalogue = [eventType('wallet.created', 'wallet')];

		webhookEventGroups(catalogue);

		expect(catalogue).toHaveLength(1);
	});
});
