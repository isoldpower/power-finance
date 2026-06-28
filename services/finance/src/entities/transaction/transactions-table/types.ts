import type { Tone } from "@shared/utils";

interface LedgerLine {
	type: 'DR' | 'CR';
	account: string;
	side: string;
	amount: string;
}

// Presentation contract for a decorated transaction row, produced by the transaction adapters.
interface TransactionRowView {
	id: string;
	amount: number;
	currency: string;
	walletId: string;
	walletName: string;
	createdAt: string;
	date: string;
	time: string;
	icon: string;
	iconClass: string;
	tone: Tone;
	category: string;
	kind: string;
	lines: LedgerLine[];
	provenance: string;
}

export type { LedgerLine, TransactionRowView };
