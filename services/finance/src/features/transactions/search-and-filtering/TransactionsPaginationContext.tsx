import { createContext, FC, ReactNode, use, useMemo } from "react";
import { Transaction } from "@entity/transactions";


interface TransactionsPaginationContextType {
	from: number;
	to: number;
	total: number;
	pageSize: number;
	pageNumber: number;
	hasNext: boolean;
	hasPrev: boolean;
	scrollForward: () => void;
	scrollBackward: () => void;
	paginatedTransactions: Transaction[];
}

const TransactionsPaginationContext = createContext<TransactionsPaginationContextType | null>(null);

interface TransactionsPaginationContextProviderProps {
	children: ReactNode;
	pageSize: number;
	pageNumber: number;
	total: number;
	transactions: Transaction[];
	hasNext: boolean;
	hasPrev: boolean;
	onNext: () => void;
	onPrev: () => void;
}

const TransactionsPaginationContextProvider: FC<TransactionsPaginationContextProviderProps> = ({
	children,
	pageSize,
	pageNumber,
	total,
	transactions,
	hasNext,
	hasPrev,
	onNext,
	onPrev,
}) => {
	const startIndex = useMemo(() => {
		return (pageNumber - 1) * pageSize;
	}, [pageNumber, pageSize]);
	const endIndex = useMemo(() => {
		return startIndex + Math.max(0, transactions.length - 1);
	}, [startIndex, transactions.length]);

	const paginationValues = useMemo<TransactionsPaginationContextType>(() => ({
		scrollBackward: onPrev,
		scrollForward: onNext,
		paginatedTransactions: transactions,
		total,
		pageSize,
		pageNumber,
		hasNext,
		hasPrev,
		from: startIndex,
		to: endIndex,
	}), [onPrev, onNext, transactions, total, pageSize, pageNumber, hasNext, hasPrev, startIndex, endIndex]);

	return (
		<TransactionsPaginationContext value={paginationValues}>
			{children}
		</TransactionsPaginationContext>
	);
}

const useTransactionsPaginationContext = () => {
	const context = use(TransactionsPaginationContext);

	if (!context) {
		throw new Error('useTransactionsPaginationContext must be used within the context');
	}

	return context;
}

export { TransactionsPaginationContextProvider, useTransactionsPaginationContext };
