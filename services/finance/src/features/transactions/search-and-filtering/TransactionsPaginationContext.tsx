import {createContext, FC, ReactNode, use, useCallback, useMemo, useState} from "react";
import { TransactionPreviewDto } from "@entity/transactions";


interface TransactionsPaginationContextType {
	from: number;
	to: number;
	total: number;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	scrollForward: () => void;
	scrollBackward: () => void;
	goToPage: (page: number) => void;
	paginatedTransactions: TransactionPreviewDto[];
}

const TransactionsPaginationContext = createContext<TransactionsPaginationContextType | null>(null);

interface TransactionsPaginationContextProviderProps {
	children: ReactNode;
	pageSize: number;
	total: number;
	transactions: TransactionPreviewDto[];
}

const TransactionsPaginationContextProvider: FC<TransactionsPaginationContextProviderProps> = ({
	children,
	pageSize,
	total,
	transactions,
}) => {
	const [page, setPage] = useState<number>(1);

	const scrollForward = useCallback(() => {
		const totalPagesAvailable = Math.ceil(total / pageSize);
		setPage((previous) => Math.min(totalPagesAvailable, previous + 1));
	}, [pageSize, total]);
	const scrollBackward = useCallback(() => {
		setPage((previous) => Math.max(0, previous - 1));
	}, []);

	const goToPage = useCallback((nextPage: number) => {
		const totalPagesAvailable = Math.max(1, Math.ceil(total / pageSize));
		setPage(Math.min(totalPagesAvailable, Math.max(1, nextPage)));
	}, [pageSize, total]);

	const startIndex = useMemo(() => {
		return (page - 1) * pageSize;
	}, [page, pageSize]);
	const endIndex = useMemo(() => {
		return page * pageSize - 1;
	}, [page, pageSize]);
	const pageCount = useMemo(() => {
		return Math.ceil(transactions.length / pageSize);
	}, [pageSize, transactions.length]);
	const paginatedTransactions = useMemo(() => {
		return transactions.slice(startIndex, endIndex + 1);
	}, [endIndex, startIndex, transactions]);

	const paginationValues = useMemo<TransactionsPaginationContextType>(() => ({
		scrollBackward,
		scrollForward,
		goToPage,
		paginatedTransactions,
		total,
		pageSize,
		pageCount,
		pageNumber: page,
		from: startIndex,
		to: endIndex,
	}), [scrollBackward, scrollForward, goToPage, paginatedTransactions, total, pageSize, pageCount, page, startIndex, endIndex]);

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
