import type { CategoryRef } from "@entity/spending";
import type { Money } from "@entity/shell";
import type { LedgerSide } from "@entity/filters";


interface WalletRef {
	id: string;
	name: string;
	color: string;
}

interface TransactionBrief {
	id: string;
	name: string;
	createdAt: string;
	side: LedgerSide;
	category: CategoryRef | null;
	wallet: WalletRef;
	money: Money;
	converted: Money;
}

interface Counterparty {
	name: string;
	category: CategoryRef | null;
	amount: Money;
	share: number;
	transactionsCount: number;
	average: Money;
	lastSeenAt: string;
}

interface CounterpartyRanking {
	counterparties: Counterparty[];
	totalCounterparties: number;
}

interface DrillTransactions {
	transactions: TransactionBrief[];
	total: number;
	totalInflow: Money;
	totalOutflow: Money;
}

type TransactionsOrder = 'amount_desc' | 'created_desc';

interface TransactionsFilter {
	side?: LedgerSide;
	categoryIds?: (string | null)[];
	name?: string;
}

export type {
	Counterparty,
	CounterpartyRanking,
	DrillTransactions,
	TransactionBrief,
	TransactionsFilter,
	TransactionsOrder,
	WalletRef,
};
