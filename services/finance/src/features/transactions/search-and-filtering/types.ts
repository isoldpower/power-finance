import type { SearchOrder } from "@shared/api";

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
	direction: SearchOrder;
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
