import {createContext, FC, ReactNode, use, useCallback, useMemo, useState} from "react";
import { Wallet } from "@entity/wallets";


interface WalletsPaginationContextType {
	from: number;
	to: number;
	total: number;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	scrollForward: () => void;
	scrollBackward: () => void;
	paginatedWallets: Wallet[];
}

const WalletsPaginationContext = createContext<WalletsPaginationContextType | null>(null);

interface WalletsPaginationContextProviderProps {
	children: ReactNode;
	pageSize: number;
	total: number;
	wallets: Wallet[];
}

const WalletsPaginationContextProvider: FC<WalletsPaginationContextProviderProps> = ({ 
	children,
	pageSize,
	total,
	wallets,
}) => {
	const [page, setPage] = useState<number>(1);
	
	const scrollForward = useCallback(() => {
		const totalPagesAvailable = Math.ceil(total / pageSize);
		setPage((previous) => Math.min(totalPagesAvailable, previous + 1));
	}, [pageSize, total]);
	const scrollBackward = useCallback(() => {
		setPage((previous) => Math.max(0, previous - 1));
	}, []);
	
	const startIndex = useMemo(() => {
		return (page - 1) * pageSize;
	}, [page, pageSize]);
	const endIndex = useMemo(() => {
		return page * pageSize - 1;
	}, [page, pageSize]);
	const pageCount = useMemo(() => {
		return Math.ceil(wallets.length / pageSize);
	}, [pageSize, wallets.length]);
	const paginatedWallets = useMemo(() => {
		return wallets.slice(startIndex, endIndex + 1);
	}, [endIndex, startIndex, wallets]);
	
	const paginationValues = useMemo<WalletsPaginationContextType>(() => ({
		scrollBackward,
		scrollForward,
		paginatedWallets,
		total,
		pageSize,
		pageCount,
		pageNumber: page,
		from: startIndex,
		to: endIndex,
	}), [scrollBackward, scrollForward, paginatedWallets, total, pageSize, pageCount, page, startIndex, endIndex]);
	
	return (
		<WalletsPaginationContext value={paginationValues}>
			{children}
		</WalletsPaginationContext>
	);
}

const useWalletsPaginationContext = () => {
	const context = use(WalletsPaginationContext);
	
	if (!context) {
		throw new Error('useWalletsPaginationContext must be used within the context');
	}
	
	return context;
}

export { WalletsPaginationContextProvider, useWalletsPaginationContext };