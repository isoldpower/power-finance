import type { OrderingType } from "@shared/data";

interface TransactionsSearch {
	search?: string;
	caseSensitive: boolean;
}

interface TransactionsFiltering {
	walletFilter: string;
}

interface TransactionsOrdering {
	field: string;
	direction: OrderingType;
}

interface TransactionsBrowseSetup {
	search: TransactionsSearch;
	filters: TransactionsFiltering;
	ordering: TransactionsOrdering;
}

export type {
	TransactionsSearch,
	TransactionsFiltering,
	TransactionsOrdering,
	TransactionsBrowseSetup,
};
