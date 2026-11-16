import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdjustableTransactions } from "../../adjustable-transactions";

import type { Transaction } from "@entity/transactions";


interface UseAdjustedPickerParams {
	disabled?: boolean;
	onSelect: (transaction: Transaction | null) => void;
}

interface UseAdjustedPickerReturn {
	open: boolean;
	query: string;
	transactions: Transaction[];
	isFetching: boolean;
	setQuery: (query: string) => void;
	handleOpenChange: (open: boolean) => void;
	choose: (transaction: Transaction | null) => void;
}

const useAdjustedPicker = ({ disabled = false, onSelect }: UseAdjustedPickerParams): UseAdjustedPickerReturn => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState('');
	const { transactions, isFetching } = useAdjustableTransactions(query, open);

	useEffect(() => {
		if (!open) {
			setQuery('');
		}
	}, [open]);

	const handleOpenChange = useCallback((nextOpen: boolean) => {
		if (!disabled) {
			setOpen(nextOpen);
		}
	}, [disabled]);

	const choose = useCallback((transaction: Transaction | null) => {
		onSelect(transaction);
		setOpen(false);
	}, [onSelect]);

	return useMemo(() => ({
		open,
		query,
		transactions,
		isFetching,
		setQuery,
		handleOpenChange,
		choose,
	}), [open, query, transactions, isFetching, handleOpenChange, choose]);
};

export { useAdjustedPicker };
export type { UseAdjustedPickerParams, UseAdjustedPickerReturn };
