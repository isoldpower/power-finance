import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import type { Transaction } from "@entity/transactions";
import type { Wallet } from "@entity/wallets";


const transactions: Transaction[] = [];

vi.mock("@feature/transactions", () => ({
	useTransactionsSearch: () => ({ transactions }),
}));

const { useWalletsPeriodFlow } = await import("./use-wallets-period-flow.ts");

const WALLET: Wallet = {
	id: 'w1',
	name: 'Main',
	createdAt: '2026-01-01T00:00:00+00:00',
	updatedAt: null,
	deletedAt: null,
	category: 'Cash',
	currency: 'USD',
	balance: { amount: 0, currency: 'USD' },
	zeroBalance: { amount: 0, currency: 'USD' },
	favorite: false,
	color: '',
};

const transaction = (amount: number, type: 'income' | 'expense', createdAt: string, walletId = 'w1'): Transaction => ({
	id: `${walletId}-${createdAt}-${amount.toString()}`,
	name: 'Whole Foods',
	createdAt,
	updatedAt: null,
	deletedAt: null,
	money: { amount, currency: 'USD' },
	type,
	origin: 'manual',
	wallet: { id: walletId, name: 'Main' },
	category: 'Groceries',
	chainId: null,
});

const setTransactions = (next: Transaction[]): void => {
	transactions.splice(0, transactions.length, ...next);
};

describe('useWalletsPeriodFlow', () => {
	it('sums the running month when the wallet has activity in it', () => {
		const now = new Date();
		const thisMonth = new Date(now.getFullYear(), now.getMonth(), 2).toISOString();

		setTransactions([
			transaction(120, 'income', thisMonth),
			transaction(45.5, 'expense', thisMonth),
		]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(120);
		expect(result.current.out).toBe(-45.5);
	});

	it('falls back to the latest active month instead of reporting zero', () => {
		const now = new Date();
		const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 5);

		setTransactions([
			transaction(300, 'income', twoMonthsAgo.toISOString()),
			transaction(20, 'expense', twoMonthsAgo.toISOString()),
			transaction(999, 'expense', new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString()),
		]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(300);
		expect(result.current.out).toBe(-20);
		expect(result.current.periodLabel).toBe(twoMonthsAgo.toLocaleDateString(undefined, { month: 'long' }));
	});

	it('ignores transactions with unparsable dates', () => {
		const now = new Date();
		const thisMonth = new Date(now.getFullYear(), now.getMonth(), 3).toISOString();

		setTransactions([
			transaction(75, 'income', thisMonth),
			transaction(900, 'income', 'not-a-date'),
		]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(75);
		expect(result.current.out).toBe(0);
	});

	it('reports zero for a wallet without any transactions', () => {
		setTransactions([]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(0);
		expect(result.current.out).toBe(0);
	});
});
