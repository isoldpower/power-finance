import { useMemo } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";

import type { TransactionsBrowseSetup } from "./types.ts";
import { useTransactionsList } from "../data-presenters";


function matchesSearch(transaction: TransactionPreviewDto, setup: TransactionsBrowseSetup): boolean {
	if (!setup.search.search) {
		return true;
	}

	const needle = setup.search.caseSensitive
		? setup.search.search
		: setup.search.search.toLowerCase();
	const haystack = `${transaction.amount} ${transaction.currency_code}`;
	const normalizedHaystack = setup.search.caseSensitive ? haystack : haystack.toLowerCase();

	return normalizedHaystack.includes(needle);
}

function matchesWallet(transaction: TransactionPreviewDto, setup: TransactionsBrowseSetup): boolean {
	return setup.filters.walletFilter === 'all'
		|| transaction.source_wallet.id === setup.filters.walletFilter;
}

function compareBy(field: string, first: TransactionPreviewDto, second: TransactionPreviewDto): number {
	if (field === 'amount') {
		return Number(first.amount) - Number(second.amount);
	}

	return first.created_at.localeCompare(second.created_at);
}

const useTransactionsBrowser = (setup: TransactionsBrowseSetup) => {
	const { transactions, isPending } = useTransactionsList();

	const searchResults = useMemo(() => {
		const filtered = transactions.filter((transaction) => {
			return matchesSearch(transaction, setup) && matchesWallet(transaction, setup);
		});

		const ordered = [...filtered].sort((first, second) => {
			const comparison = compareBy(setup.ordering.field, first, second);
			return setup.ordering.direction === 'ASC' ? comparison : -comparison;
		});

		return { transactions: ordered, total: filtered.length };
	}, [transactions, setup]);

	return { searchResults, isPending };
}

export { useTransactionsBrowser };
