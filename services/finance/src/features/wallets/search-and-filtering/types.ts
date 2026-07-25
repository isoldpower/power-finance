interface WalletsSearch {
	search?: string;
	caseSensitive: boolean;
}

interface WalletsFiltering {
	typeFilter: string;
}

type OrderingType = 'ASC' | 'DESC';

interface WalletsOrdering {
	field: string;
	direction: OrderingType;
}

interface WalletsBrowseSetup {
	search: WalletsSearch;
	filters: WalletsFiltering;
	ordering: WalletsOrdering;
}

export type {
	WalletsSearch,
	WalletsFiltering,
	WalletsOrdering,
	OrderingType,
	WalletsBrowseSetup,
};
