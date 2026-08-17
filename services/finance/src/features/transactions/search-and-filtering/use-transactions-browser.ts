import { useMemo } from "react";
import { useTransactionsSearch } from "../data-presenters";

import type { Transaction, TransactionQuery } from "@entity/transactions";
import type { TransactionsBrowseSetup } from "./types.ts";


const matchesNeedle = (
	transaction: Transaction,
	needle: string,
	caseSensitive: boolean,
): boolean => {
	const haystack = [transaction.name, transaction.category ?? '', transaction.wallet.name].join(' ');

	return caseSensitive
		? haystack.includes(needle)
		: haystack.toLowerCase().includes(needle.toLowerCase());
};

const narrowTransactions = (
	transactions: Transaction[],
	setup: TransactionsBrowseSetup
): Transaction[] => {
	const needle = setup.search.search;

	return transactions.filter((transaction) => {
		if (needle && !matchesNeedle(transaction, needle, setup.search.caseSensitive)) return false;
		if (setup.filters.categoryFilter !== 'all' && transaction.category !== setup.filters.categoryFilter) return false;
		if (setup.filters.typeFilter !== 'all' && transaction.type !== setup.filters.typeFilter) return false;

		return true;
	});
};

const useTransactionsBrowser = (
	setup: TransactionsBrowseSetup,
) => {
	const query = useMemo<TransactionQuery>(() => ({
		walletIds: setup.filters.walletFilter === 'all' ? undefined : [setup.filters.walletFilter],
	}), [setup.filters.walletFilter]);

	const { transactions, total, nextCursor, prevCursor, isPending } = useTransactionsSearch(query, {
		order: setup.ordering.direction,
		limit: setup.page.pageSize,
		cursor: setup.page.cursor ?? undefined,
	});

	const narrowed = useMemo(() => narrowTransactions(transactions, setup), [transactions, setup]);

	const searchResults = useMemo(() => ({
		transactions: narrowed,
		total,
		nextCursor,
		prevCursor,
	}), [narrowed, total, nextCursor, prevCursor]);

	return { searchResults, isPending };
};

export { useTransactionsBrowser };
