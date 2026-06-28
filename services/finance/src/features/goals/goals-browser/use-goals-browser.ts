import { useState } from "react";

import { useGoals } from "../data-presenters/use-goals.ts";

// Goals card behaviour: search + status filtering and pagination over the goals list. The page
// size is supplied by the planning widget that owns the config.
const useGoalsBrowser = (pageSize: number) => {
	const { goals, isPending } = useGoals();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');

	const normalizedQuery = query.trim().toLowerCase();
	const filteredGoals = goals.filter((goal) => {
		const matchesQuery = normalizedQuery === '' || goal.name.toLowerCase().includes(normalizedQuery);
		const matchesStatus = status === 'all' || (status === 'reached' ? goal.percent >= 100 : goal.percent < 100);
		return matchesQuery && matchesStatus;
	});

	const pageCount = Math.max(1, Math.ceil(filteredGoals.length / pageSize));
	const safePage = Math.min(page, pageCount - 1);
	const pagedGoals = filteredGoals.slice(safePage * pageSize, safePage * pageSize + pageSize);

	return {
		isPending,
		totalCount: goals.length,
		filteredGoals,
		pagedGoals,
		page: safePage,
		setPage,
		query,
		setQuery,
		status,
		setStatus,
	};
};

export { useGoalsBrowser };
