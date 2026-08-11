import type { LedgerEntryDto } from "../types.ts";
import type { AccountHistoryView } from "./types.ts";


const toLedgerHistoryView = (entry: LedgerEntryDto): AccountHistoryView => ({
	id: entry.id,
	icon: entry.icon,
	description: entry.description,
	date: new Date(entry.occurredAt).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	}),
	side: entry.side,
	amountUsd: entry.amount.amount,
});

export { toLedgerHistoryView };
