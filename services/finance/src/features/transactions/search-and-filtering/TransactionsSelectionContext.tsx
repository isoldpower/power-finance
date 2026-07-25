import {createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSearchProtected} from "@feature/navigation";
import {z} from "zod";
import {TransactionPreviewDto} from "@entity/transactions";


interface TransactionsSelectionContextType {
	selectedTransactionId: string | null;
	selectTransaction: (id: string | null) => void;
}

const TransactionsSelectionContext = createContext<TransactionsSelectionContextType | null>(null);

const searchParams = z.object({
	transaction: z.string().min(1).default('none'),
});
type SearchParams = z.infer<typeof searchParams>;

interface TransactionsSelectionContextProviderProps {
	children: ReactNode;
	transactionsRegistry: TransactionPreviewDto[];
}

const TransactionsSelectionContextProvider: FC<TransactionsSelectionContextProviderProps> = ({
	children,
	transactionsRegistry,
}) => {
	const [selectedTransactionId, selectTransaction] = useState<string | null>(null);
	const [search, setSearch] = useSearchProtected<SearchParams>(searchParams);
	const hydratedFromUrl = useRef(false);

	const selectTransactionCallback = useCallback((newTransactionId: string | null) => {
		const protectedTransactionId = newTransactionId && transactionsRegistry.find((transaction) => transaction.id === newTransactionId)
			? newTransactionId
			: 'none';

		selectTransaction(protectedTransactionId);
		setSearch({ transaction: protectedTransactionId });
	}, [setSearch, transactionsRegistry]);

	const selectionValues = useMemo<TransactionsSelectionContextType>(() => ({
		selectedTransactionId,
		selectTransaction: selectTransactionCallback,
	}), [selectTransactionCallback, selectedTransactionId]);

	useEffect(() => {
		if (hydratedFromUrl.current || transactionsRegistry.length === 0) {
			return;
		}

		hydratedFromUrl.current = true;
		selectTransactionCallback(search.transaction === 'none' ? null : search.transaction);
	}, [search.transaction, selectTransactionCallback, transactionsRegistry]);

	return (
		<TransactionsSelectionContext value={selectionValues}>
			{children}
		</TransactionsSelectionContext>
	);
}

const useTransactionsSelectionContext = () => {
	const context = use(TransactionsSelectionContext);

	if (!context) {
		throw new Error('useTransactionsSelectionContext must be used within the context');
	}

	return context;
}

export { TransactionsSelectionContextProvider, useTransactionsSelectionContext };
