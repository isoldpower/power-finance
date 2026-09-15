import { useMemo } from "react";
import { useDebounce } from "@internal/shared";

import { useAutomationsSearch } from "../data-presenters";

import type { AutomationSearchQuery } from "@entity/assistance";
import type { AutomationsBrowseSetup } from "./types.ts";


const ALL = 'all';
const ACTIVE = 'active';

const enabledFilter = (statusFilter: string): boolean | undefined => {
	if (statusFilter === ALL) return undefined;

	return statusFilter === ACTIVE;
};

const useAutomationsBrowser = (setup: AutomationsBrowseSetup) => {
	const needle = useDebounce(setup.search.search?.trim() ?? '');
	const query = useMemo<AutomationSearchQuery>(() => ({
		name: needle === '' ? undefined : needle,
		enabled: enabledFilter(setup.filters.statusFilter),
	}), [needle, setup.filters.statusFilter]);
	const { rules, total, isPending, isError } = useAutomationsSearch(query);

	const searchResults = useMemo(() => ({
		rules,
		total,
		totalCount: total,
	}), [rules, total]);

	return { searchResults, isPending, isError };
}

export { useAutomationsBrowser };
