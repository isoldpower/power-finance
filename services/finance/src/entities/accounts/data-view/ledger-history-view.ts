import type { LedgerEntry } from "../types.ts";
import type { AccountHistoryView } from "./types.ts";


const toLedgerHistoryView = (entry: LedgerEntry): AccountHistoryView => ({
	id: `${entry.sourceTransaction}-${entry.debit ? 'debit' : 'credit'}`,
	icon: entry.icon,
	description: entry.title,
	date: new Date(entry.createdAt).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	}),
	debit: entry.debit,
	amountUsd: entry.money.amount,
});

export { toLedgerHistoryView };
