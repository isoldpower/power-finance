import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import type { TransactionPreviewDto } from "@entity/transactions";
import type { Wallet } from "@entity/wallets";


const transactions: TransactionPreviewDto[] = [];

vi.mock("@feature/transactions", () => ({
	useTransactionsList: () => ({ transactions }),
}));

const { useWalletsPeriodFlow } = await import("./use-wallets-period-flow.ts");

const WALLET = { id: 'w1', name: 'Main', color: '', balance: { amount: 0, currency: 'USD' }, credit: false } as Wallet;

const transaction = (amount: string, occurredAt: string, walletId = 'w1'): TransactionPreviewDto => ({
	id: `${walletId}-${occurredAt}-${amount}`,
	amount,
	currency_code: 'USD',
	direction: amount.startsWith('-') ? 'out' : 'in',
	merchant: 'Whole Foods',
	category: 'Groceries',
	occurred_at: occurredAt,
	created_at: occurredAt,
	origin: 'manual',
	scanned: false,
	entries: [],
	source_wallet: { id: walletId, name: 'Main', color: '' },
});

const setTransactions = (next: TransactionPreviewDto[]): void => {
	transactions.splice(0, transactions.length, ...next);
};

describe('useWalletsPeriodFlow', () => {
	it('sums the running month when the wallet has activity in it', () => {
		const now = new Date();
		const thisMonth = new Date(now.getFullYear(), now.getMonth(), 2).toISOString();

		setTransactions([
			transaction('120.00', thisMonth),
			transaction('-45.50', thisMonth),
		]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(120);
		expect(result.current.out).toBe(-45.5);
	});

	it('falls back to the latest active month instead of reporting zero', () => {
		const now = new Date();
		const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 5);

		setTransactions([
			transaction('300.00', twoMonthsAgo.toISOString()),
			transaction('-20.00', twoMonthsAgo.toISOString()),
			transaction('-999.00', new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString()),
		]);

		const { result } = renderHook(() => useWalletsPeriodFlow(WALLET));

		expect(result.current.in).toBe(300);
		expect(result.current.out).toBe(-20);
		expect(result.current.periodLabel).toBe(twoMonthsAgo.toLocaleDateString(undefined, { month: 'long' }));
	});

	it('ignores transactions of other wallets and unparsable dates', () => {
		const now = new Date();
		const thisMonth = new Date(now.getFullYear(), now.getMonth(), 3).toISOString();

		setTransactions([
			transaction('75.00', thisMonth),
			transaction('500.00', thisMonth, 'w2'),
			transaction('900.00', 'not-a-date'),
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
