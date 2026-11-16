import { useMemo } from "react";
import { useDebounce } from "@internal/shared";
import { isOptimisticTransactionId, useTransactionsSearch } from "../data-presenters";

import type { Transaction } from "@entity/transactions";


const ADJUSTABLE_PAGE_SIZE = 20;

interface UseAdjustableTransactionsReturn {
	transactions: Transaction[];
	isFetching: boolean;
}

const isAdjustable = (transaction: Transaction): boolean => (
	transaction.deletedAt === null && !isOptimisticTransactionId(transaction.id)
);

const useAdjustableTransactions = (search: string, enabled: boolean): UseAdjustableTransactionsReturn => {
	const needle = useDebounce(search.trim());
	const query = useMemo(() => (needle ? { search: needle } : {}), [needle]);
	const { transactions, isFetching } = useTransactionsSearch(
		query,
		{ limit: ADJUSTABLE_PAGE_SIZE },
		{ enabled },
	);

	return useMemo(() => ({
		transactions: transactions.filter(isAdjustable),
		isFetching,
	}), [transactions, isFetching]);
};

export { useAdjustableTransactions };
export type { UseAdjustableTransactionsReturn };
