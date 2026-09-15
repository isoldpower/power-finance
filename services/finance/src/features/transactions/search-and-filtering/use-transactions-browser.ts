import { useMemo } from "react";
import { useDebounce } from "@internal/shared";
import { useTransactionsSearch } from "../data-presenters";

import type { TransactionQuery, TransactionType } from "@entity/transactions";
import type { TransactionsBrowseSetup, TransactionsFiltering } from "./types.ts";


const ALL = 'all';

const toQuery = (
	filters: TransactionsFiltering,
	search: string,
	caseSensitive: boolean
): TransactionQuery => ({
	...(filters.walletFilter === ALL
		? {}
		: { walletIds: [filters.walletFilter] }),
	...(filters.categoryFilter === ALL
		? {}
		: { categories: [filters.categoryFilter] }),
	...(filters.typeFilter === ALL
		? {}
		: { types: [filters.typeFilter as TransactionType] }),
	...(search === ''
		? {}
		: { search, caseSensitive }),
});

const useTransactionsBrowser = (
	setup: TransactionsBrowseSetup,
) => {
	const { walletFilter, categoryFilter, typeFilter } = setup.filters;
	const { caseSensitive } = setup.search;
	const search = useDebounce(setup.search.search?.trim() ?? '');

	const query = useMemo<TransactionQuery>(
		() => toQuery({ walletFilter, categoryFilter, typeFilter }, search, caseSensitive),
		[walletFilter, categoryFilter, typeFilter, search, caseSensitive]
	);

	const { transactions, total, nextCursor, prevCursor, isPending } = useTransactionsSearch(query, {
		limit: setup.page.pageSize,
		cursor: setup.page.cursor ?? undefined,
		order: setup.ordering.direction,
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
