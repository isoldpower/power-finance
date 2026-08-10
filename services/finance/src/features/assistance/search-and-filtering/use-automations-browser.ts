import { useMemo } from "react";

import { useAutomations } from "../data-presenters";

import type { AutomationsBrowseSetup } from "./types.ts";
import type { AutomationRule } from "../automations-api";


function matchesSearch(rule: AutomationRule, search: string): boolean {
	if (search === '') {
		return true;
	}

	return rule.name.toLowerCase().includes(search)
		|| rule.trigger.toLowerCase().includes(search)
		|| rule.action.toLowerCase().includes(search);
}

function matchesStatus(rule: AutomationRule, statusFilter: string): boolean {
	if (statusFilter === 'all') {
		return true;
	}

	return statusFilter === 'active' ? rule.enabled : !rule.enabled;
}

const useAutomationsBrowser = (setup: AutomationsBrowseSetup) => {
	const { rules, isPending, isError } = useAutomations();

	const searchResults = useMemo(() => {
		const search = setup.search.search?.trim().toLowerCase() ?? '';
		const filtered = rules.filter((rule) => {
			return matchesSearch(rule, search) && matchesStatus(rule, setup.filters.statusFilter);
		});

		return { rules: filtered, total: filtered.length, totalCount: rules.length };
	}, [rules, setup.filters.statusFilter, setup.search.search]);

	return { searchResults, isPending, isError };
}

export { useAutomationsBrowser };
