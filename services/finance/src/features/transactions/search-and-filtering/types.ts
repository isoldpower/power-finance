import type { OrderingType } from "@shared/data";


interface TransactionsSearch {
	search?: string;
	caseSensitive: boolean;
}

interface TransactionsFiltering {
	walletFilter: string;
	categoryFilter: string;
	typeFilter: string;
}

interface TransactionsOrdering {
	direction: OrderingType;
}

interface TransactionsPaging {
	pageSize: number;
	cursor: string | null;
}

interface TransactionsBrowseSetup {
	search: TransactionsSearch;
	filters: TransactionsFiltering;
	ordering: TransactionsOrdering;
	page: TransactionsPaging;
}

export type {
	TransactionsSearch,
	TransactionsFiltering,
	TransactionsOrdering,
	TransactionsPaging,
	TransactionsBrowseSetup,
};
