import { useMemo } from "react";
import { useTransactionsSearch } from "../data-presenters";

import type { TransactionQuery, TransactionType } from "@entity/transactions";
import type { TransactionsBrowseSetup } from "./types.ts";


const ALL = 'all';

const toQuery = (setup: TransactionsBrowseSetup): TransactionQuery => ({
	...(setup.filters.walletFilter === ALL
		? {}
		: { walletIds: [setup.filters.walletFilter] }),
	...(setup.filters.categoryFilter === ALL
		? {}
		: { categories: [setup.filters.categoryFilter] }),
	...(setup.filters.typeFilter === ALL
		? {}
		: { types: [setup.filters.typeFilter as TransactionType] }),
	...(setup.search.search
		? { search: setup.search.search, caseSensitive: setup.search.caseSensitive }
		: {}),
});

const useTransactionsBrowser = (
	setup: TransactionsBrowseSetup,
) => {
	const query = useMemo<TransactionQuery>(() => toQuery(setup), [setup]);

	const { transactions, total, nextCursor, prevCursor, isPending } = useTransactionsSearch(query, {
		order: setup.ordering.direction,
		limit: setup.page.pageSize,
		cursor: setup.page.cursor ?? undefined,
	});

	const searchResults = useMemo(() => ({
		transactions,
		total,
		nextCursor,
		prevCursor,
	}), [transactions, total, nextCursor, prevCursor]);

	return { searchResults, isPending };
};

export { useTransactionsBrowser };
