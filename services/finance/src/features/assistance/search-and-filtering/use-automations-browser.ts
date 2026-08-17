import { useMemo } from "react";

import { automationSummary } from "@entity/assistance";
import { useAutomations } from "../data-presenters";

import type { Automation } from "@entity/assistance";
import type { AutomationsBrowseSetup } from "./types.ts";


function matchesSearch(rule: Automation, search: string): boolean {
	if (search === '') {
		return true;
	}

	const summary = automationSummary(rule);

	return rule.name.toLowerCase().includes(search)
		|| summary.when.toLowerCase().includes(search)
		|| summary.then.toLowerCase().includes(search);
}

function matchesStatus(rule: Automation, statusFilter: string): boolean {
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
