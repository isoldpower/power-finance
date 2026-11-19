import { convertAmount } from "./rates.ts";

import type { MockLedger } from "./mock-ledger.ts";
import type { LedgerQuery, LedgerRow, LedgerRowSide, LedgerWindow } from "./types.ts";


interface FlowSelection {
	side?: LedgerRowSide;
	window?: LedgerWindow;
	ignoreCategories?: boolean;
}

const isTransfer = (row: LedgerRow): boolean => row.chainId !== null;

const inWindow = (row: LedgerRow, window: LedgerWindow): boolean => {
	return row.createdAt >= window.since && row.createdAt < window.until;
};

const matchesWallets = (row: LedgerRow, walletIds: string[] | null): boolean => {
	return walletIds === null || walletIds.includes(row.walletId);
};

const matchesCategories = (row: LedgerRow, categories: (string | null)[] | null): boolean => {
	return categories === null || categories.includes(row.category?.id ?? null);
};

const selectFlows = (ledger: MockLedger, query: LedgerQuery, selection: FlowSelection = {}): LedgerRow[] => {
	const window = selection.window ?? query;

	return ledger.rows().filter((row) => (
		!isTransfer(row)
		&& inWindow(row, window)
		&& matchesWallets(row, query.walletIds)
		&& (selection.ignoreCategories === true || matchesCategories(row, query.categories))
		&& (selection.side === undefined || row.side === selection.side)
	));
};

const convertRow = (row: LedgerRow, currency: string): number => convertAmount(row.amount, row.currency, currency);

const sumConverted = (rows: LedgerRow[], currency: string, side?: LedgerRowSide): number => {
	const matching = side === undefined ? rows : rows.filter((row) => row.side === side);

	return matching.reduce((sum, row) => sum + convertRow(row, currency), 0);
};

export { convertRow, isTransfer, selectFlows, sumConverted };
export type { FlowSelection };
