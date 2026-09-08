interface TransactionsSearch {
	search?: string;
	caseSensitive: boolean;
}

interface TransactionsFiltering {
	walletFilter: string;
	categoryFilter: string;
	typeFilter: string;
}

interface TransactionsPaging {
	pageSize: number;
	cursor: string | null;
}

interface TransactionsBrowseSetup {
	search: TransactionsSearch;
	filters: TransactionsFiltering;
	page: TransactionsPaging;
}

export type {
	TransactionsSearch,
	TransactionsFiltering,
	TransactionsPaging,
	TransactionsBrowseSetup,
};
