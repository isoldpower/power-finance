import { describe, expect, test } from 'vitest';

import { toChainBound } from './transaction-chain-view.ts';

import type { Transaction } from '../types.ts';
import type { Chainable } from './types.ts';


const buildTransaction = (
	id: string,
	chainId: string | null = null,
	size = 2,
): Transaction => ({
	id,
	name: `Entry ${id}`,
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	money: { amount: '10.00', currency: 'USD' },
	type: 'expense',
	origin: 'manual',
	wallet: { id: 'w1', name: 'Everyday' },
	category: null,
	chain: chainId === null ? null : { id: chainId, size },
});

const positionsOf = (transactions: Transaction[]): string[] => (
	toChainBound<Transaction>(transactions).map((entry) => entry.position)
);

describe('toChainBound', () => {
	test('leaves standalone transactions unbound', () => {
		expect(positionsOf([buildTransaction('t1'), buildTransaction('t2')]))
			.toEqual(['single', 'single']);
	});

	test('marks the ends and middle of a run that shares a chain', () => {
		const run = [
			buildTransaction('t1', 'c1', 3),
			buildTransaction('t2', 'c1', 3),
			buildTransaction('t3', 'c1', 3),
		];

		expect(positionsOf(run)).toEqual(['start', 'middle', 'end']);
	});

	test('binds a two-entry transfer as start and end', () => {
		expect(positionsOf([buildTransaction('t1', 'c1'), buildTransaction('t2', 'c1')]))
			.toEqual(['start', 'end']);
	});

	test('reports how many members are visible and where each one sits', () => {
		const bound = toChainBound<Transaction>([
			buildTransaction('t1', 'c1'),
			buildTransaction('t2', 'c1'),
		]);

		expect(bound.map((entry) => entry.visible)).toEqual([2, 2]);
		expect(bound.map((entry) => entry.index)).toEqual([0, 1]);
	});

	test('keeps two different chains apart even when adjacent', () => {
		expect(positionsOf([
			buildTransaction('t1', 'c1'),
			buildTransaction('t2', 'c1'),
			buildTransaction('t3', 'c2'),
			buildTransaction('t4', 'c2'),
		])).toEqual(['start', 'end', 'start', 'end']);
	});

	test('never joins a run across an unrelated transaction', () => {
		expect(positionsOf([
			buildTransaction('t1', 'c1'),
			buildTransaction('t2'),
			buildTransaction('t3', 'c1'),
		])).toEqual(['single', 'single', 'single']);
	});

	test('leaves a genuine one-member chain unbound', () => {
		const bound = toChainBound<Transaction>([buildTransaction('t1', 'c1', 1)]);

		expect(bound[0]?.position).toBe('single');
		expect(bound[0]?.truncated).toBe(false);
	});

	test('never groups transactions that carry no chain at all', () => {
		const bound = toChainBound<Transaction>([buildTransaction('t1'), buildTransaction('t2')]);

		expect(bound.map((entry) => entry.chain)).toEqual([null, null]);
		expect(bound.map((entry) => entry.visible)).toEqual([1, 1]);
	});

	test('returns nothing for an empty page', () => {
		expect(toChainBound<Transaction>([])).toEqual([]);
	});
});

describe('a wire payload that omits the chain instead of nulling it', () => {
	interface LooseRow extends Chainable {
		id: string;
	}

	const omitted = (id: string): LooseRow => ({ id }) as unknown as LooseRow;

	const chained = (id: string, chainId: string): LooseRow => ({
		id,
		chain: { id: chainId, size: 2 },
	});

	test('treats a missing chain the same as an absent one', () => {
		const bound = toChainBound<LooseRow>([omitted('t1'), omitted('t2')]);

		expect(bound.map((entry) => entry.position)).toEqual(['single', 'single']);
	});

	test('normalises the missing chain to null on the bound entry', () => {
		expect(toChainBound<LooseRow>([omitted('t1')])[0]?.chain).toBeNull();
	});

	test('still binds real chains when unchained neighbours omit the field', () => {
		const bound = toChainBound<LooseRow>([
			omitted('t1'),
			chained('t2', 'c1'),
			chained('t3', 'c1'),
		]);

		expect(bound.map((entry) => entry.position)).toEqual(['single', 'start', 'end']);
	});
});

describe('the size the server reports', () => {
	test('rides on every bound member so the badge can show the whole chain', () => {
		const bound = toChainBound<Transaction>([
			buildTransaction('t1', 'c1', 3),
			buildTransaction('t2', 'c1', 3),
		], { continuesAfter: true });

		expect(bound.map((entry) => entry.chain?.size)).toEqual([3, 3]);
		expect(bound.map((entry) => entry.visible)).toEqual([2, 2]);
	});

	test('marks a run truncated when fewer members are visible than the chain holds', () => {
		const bound = toChainBound<Transaction>([buildTransaction('t1', 'c1', 3)]);

		expect(bound[0]?.truncated).toBe(true);
	});

	test('never marks a fully visible chain truncated', () => {
		const bound = toChainBound<Transaction>([
			buildTransaction('t1', 'c1'),
			buildTransaction('t2', 'c1'),
		]);

		expect(bound.map((entry) => entry.truncated)).toEqual([false, false]);
	});
});

describe('a chain split across a page boundary', () => {
	test('opens the rail downward when the run ends the page and another follows', () => {
		const page = [buildTransaction('t9'), buildTransaction('t10', 'c1')];

		const bound = toChainBound<Transaction>(page, { continuesAfter: true });

		expect(bound.map((entry) => entry.position)).toEqual(['single', 'start']);
		expect(bound[1]?.truncated).toBe(true);
	});

	test('opens the rail upward when the run starts the next page', () => {
		const page = [buildTransaction('t11', 'c1'), buildTransaction('t12')];

		const bound = toChainBound<Transaction>(page, { continuesBefore: true });

		expect(bound.map((entry) => entry.position)).toEqual(['end', 'single']);
		expect(bound[0]?.truncated).toBe(true);
	});

	test('runs the rail clean through a page that holds only middle members', () => {
		const bound = toChainBound<Transaction>(
			[buildTransaction('t11', 'c1', 3)],
			{ continuesBefore: true, continuesAfter: true }
		);

		expect(bound[0]?.position).toBe('middle');
	});

	test('leaves a complete chain closed even when it sits at the page edge', () => {
		const bound = toChainBound<Transaction>(
			[buildTransaction('t9', 'c1'), buildTransaction('t10', 'c1')],
			{ continuesAfter: true }
		);

		expect(bound.map((entry) => entry.position)).toEqual(['start', 'end']);
	});

	test('never opens a rail for a run sitting in the page interior', () => {
		const bound = toChainBound<Transaction>(
			[buildTransaction('t1'), buildTransaction('t2', 'c1', 3), buildTransaction('t3')],
			{ continuesBefore: true, continuesAfter: true }
		);

		expect(bound[1]?.position).toBe('single');
	});

	test('never opens a rail for unchained rows at the page edges', () => {
		const bound = toChainBound<Transaction>(
			[buildTransaction('t1'), buildTransaction('t2')],
			{ continuesBefore: true, continuesAfter: true }
		);

		expect(bound.map((entry) => entry.position)).toEqual(['single', 'single']);
		expect(bound.map((entry) => entry.truncated)).toEqual([false, false]);
	});
});

describe('toChainBound over row views', () => {
	interface RowLike {
		id: string;
		chain: { id: string; size: number } | null;
	}

	const buildRow = (id: string, chainId: string | null = null, size = 2): RowLike => ({
		id,
		chain: chainId === null ? null : { id: chainId, size },
	});

	test('binds anything that carries a chain, not just domain transactions', () => {
		const bound = toChainBound<RowLike>([
			buildRow('r1', 'c1'),
			buildRow('r2', 'c1'),
			buildRow('r3'),
		]);

		expect(bound.map((entry) => entry.position)).toEqual(['start', 'end', 'single']);
		expect(bound.map((entry) => entry.item.id)).toEqual(['r1', 'r2', 'r3']);
	});

	test('keeps the bound item reachable for rendering', () => {
		const row = buildRow('r1', 'c1');

		expect(toChainBound<RowLike>([row])[0]?.item).toBe(row);
	});
});
