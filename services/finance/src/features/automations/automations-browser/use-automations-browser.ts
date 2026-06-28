import { useState } from "react";

import { useAutomations } from "../data-presenters/use-automations.ts";
import { useToggleAutomation } from "../data-presenters/use-toggle-automation.ts";

// Automations card behaviour: search + status filtering, pagination, and the enable/disable
// toggle. The page size is supplied by the planning widget that owns the config.
const useAutomationsBrowser = (pageSize: number) => {
	const { rules, isPending } = useAutomations();
	const toggle = useToggleAutomation();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');

	const normalizedQuery = query.trim().toLowerCase();
	const filteredRules = rules.filter((rule) => {
		const matchesQuery = normalizedQuery === ''
			|| rule.name.toLowerCase().includes(normalizedQuery)
			|| rule.trigger.toLowerCase().includes(normalizedQuery)
			|| rule.action.toLowerCase().includes(normalizedQuery);
		const matchesStatus = status === 'all' || (status === 'active' ? rule.enabled : !rule.enabled);
		return matchesQuery && matchesStatus;
	});

	const pageCount = Math.max(1, Math.ceil(filteredRules.length / pageSize));
	const safePage = Math.min(page, pageCount - 1);
	const pagedRules = filteredRules.slice(safePage * pageSize, safePage * pageSize + pageSize);

	return {
		isPending,
		togglePending: toggle.isPending,
		setEnabled: (id: string, enabled: boolean) => { toggle.mutate({ id, enabled }); },
		totalCount: rules.length,
		filteredRules,
		pagedRules,
		page: safePage,
		setPage,
		query,
		setQuery,
		status,
		setStatus,
	};
};

export { useAutomationsBrowser };
