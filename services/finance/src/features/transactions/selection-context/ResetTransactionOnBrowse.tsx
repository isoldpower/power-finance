import { useCallback } from "react";

import { useOnValuesChange } from "@shared/data";

import { useTransactionsFiltersContext, useTransactionsPaginationContext } from "../search-and-filtering";
import { useTransactionsSelection } from "./use-transactions-selection.ts";

import type { FC } from "react";


const ResetTransactionOnBrowse: FC = () => {
	const { search, caseSensitive, walletFilter, sortBy, sortDirection } = useTransactionsFiltersContext();
	const { pageNumber } = useTransactionsPaginationContext();
	const selectTransaction = useTransactionsSelection((state) => state.selectTransaction);

	const resetSelection = useCallback(() => {
		selectTransaction(null);
	}, [selectTransaction]);

	useOnValuesChange(
		[search, caseSensitive, walletFilter, sortBy, sortDirection, pageNumber],
		resetSelection
	);

	return null;
}

ResetTransactionOnBrowse.displayName = 'ResetTransactionOnBrowse';

export { ResetTransactionOnBrowse };
