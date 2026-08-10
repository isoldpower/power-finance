interface AutomationsSearch {
	search?: string;
}

interface AutomationsFiltering {
	statusFilter: string;
}

interface AutomationsBrowseSetup {
	search: AutomationsSearch;
	filters: AutomationsFiltering;
}

export type {
	AutomationsSearch,
	AutomationsFiltering,
	AutomationsBrowseSetup,
};
