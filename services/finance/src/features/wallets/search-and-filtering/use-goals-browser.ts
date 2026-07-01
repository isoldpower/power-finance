import { useMemo, useState } from "react";

import { useGoals } from "../data-presenters";


const useGoalsBrowser = (pageSize: number) => {
	const { goals, isPending } = useGoals();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');

	const filteredGoals = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		
		return goals.filter((goal) => {
			const matchesQuery = normalizedQuery === '' || goal.name.toLowerCase().includes(normalizedQuery);
			const matchesStatus = status === 'all' || (status === 'reached' ? goal.percent >= 100 : goal.percent < 100);
			
			return matchesQuery && matchesStatus;
		});
	}, [goals, query, status]);

	const pageCount = useMemo(() => {
		return Math.max(1, Math.ceil(filteredGoals.length / pageSize));
	}, [filteredGoals.length, pageSize]);
	const safePage = useMemo(() => {
		return Math.min(page, pageCount - 1);
	}, [page, pageCount]);
	const pagedGoals = useMemo(() => {
		return filteredGoals.slice(safePage * pageSize, safePage * pageSize + pageSize);
	}, [filteredGoals, pageSize, safePage]);

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
