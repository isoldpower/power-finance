interface TransactionsSearch {
	search?: string;
	caseSensitive: boolean;
}

interface TransactionsFiltering {
	walletFilter: string;
}

type OrderingType = 'ASC' | 'DESC';

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
	OrderingType,
	TransactionsBrowseSetup,
};
