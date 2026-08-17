import { useCallback } from "react";
import { useOnValuesChange } from "@shared/data";
import { useTransactionsFiltersContext, useTransactionsPaginationContext } from "../search-and-filtering";
import { useTransactionsSelection } from "./use-transactions-selection.ts";

import type { FC } from "react";


const ResetTransactionOnBrowse: FC = () => {
	const {
		search,
		caseSensitive,
		walletFilter,
		categoryFilter,
		typeFilter,
		sortBy,
		sortDirection,
	} = useTransactionsFiltersContext();
	const { pageNumber } = useTransactionsPaginationContext();
	const selectTransaction = useTransactionsSelection((state) => {
		return state.selectTransaction;
	});
	const clearChecked = useTransactionsSelection((state) => {
		return state.clearChecked;
	});

	const resetSelection = useCallback(() => {
		selectTransaction(null);
		clearChecked();
	}, [clearChecked, selectTransaction]);

	useOnValuesChange(
		[search, caseSensitive, walletFilter, categoryFilter, typeFilter, sortBy, sortDirection, pageNumber],
		resetSelection
	);

	return null;
}

ResetTransactionOnBrowse.displayName = 'ResetTransactionOnBrowse';

export { ResetTransactionOnBrowse };
