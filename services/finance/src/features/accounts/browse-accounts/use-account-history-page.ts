import { useCallback, useEffect, useMemo, useState } from "react";

import type { AccountHistoryView } from "@entity/accounts";


const HISTORY_PAGE_SIZE = 5;

const useAccountHistoryPage = (history: AccountHistoryView[], resetKey: string) => {
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		setPage(1);
	}, [resetKey]);

	const pageCount = useMemo(() => {
		return Math.max(1, Math.ceil(history.length / HISTORY_PAGE_SIZE));
	}, [history.length]);
	const from = useMemo(() => (page - 1) * HISTORY_PAGE_SIZE, [page]);
	const to = useMemo(() => page * HISTORY_PAGE_SIZE - 1, [page]);
	const paginatedHistory = useMemo(() => {
		return history.slice(from, to + 1);
	}, [from, history, to]);

	const goToPage = useCallback((nextPage: number) => {
		setPage(Math.min(pageCount, Math.max(1, nextPage)));
	}, [pageCount]);

	return {
		paginatedHistory,
		total: history.length,
		pageNumber: page,
		pageCount,
		from,
		to,
		goToPage,
	};
};

export { useAccountHistoryPage, HISTORY_PAGE_SIZE };
