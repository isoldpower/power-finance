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

interface GoalsSearch {
	search?: string;
}

interface GoalsFiltering {
	statusFilter: string;
}

interface GoalsBrowseSetup {
	search: GoalsSearch;
	filters: GoalsFiltering;
}

export type {
	WalletsSearch,
	WalletsFiltering,
	WalletsOrdering,
	OrderingType,
	WalletsBrowseSetup,
	GoalsSearch,
	GoalsFiltering,
	GoalsBrowseSetup,
};
