import { createContext, use, useCallback, useMemo, useState } from "react";
import { useOnValuesChange } from "@shared/data";

import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";


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
	resetKey: string;
}

const WalletsPaginationContextProvider: FC<WalletsPaginationContextProviderProps> = ({ 
	children,
	pageSize,
	total,
	wallets,
	resetKey,
}) => {
	const [page, setPage] = useState<number>(1);

	const resetToFirstPage = useCallback(() => {
		setPage(1);
	}, []);
	
	useOnValuesChange([resetKey], resetToFirstPage);
	
	const pageCount = useMemo(() => {
		return Math.max(1, Math.ceil(wallets.length / pageSize));
	}, [pageSize, wallets.length]);
	const pageNumber = useMemo(() => {
		return Math.min(page, pageCount);
	}, [page, pageCount]);

	const scrollForward = useCallback(() => {
		setPage((previous) => Math.min(pageCount, previous + 1));
	}, [pageCount]);
	const scrollBackward = useCallback(() => {
		setPage((previous) => Math.max(1, previous - 1));
	}, []);

	const startIndex = useMemo(() => {
		return (pageNumber - 1) * pageSize;
	}, [pageNumber, pageSize]);
	const endIndex = useMemo(() => {
		return pageNumber * pageSize - 1;
	}, [pageNumber, pageSize]);
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
		pageNumber,
		from: startIndex,
		to: endIndex,
	}), [
		scrollBackward,
		scrollForward,
		paginatedWallets,
		total,
		pageSize,
		pageCount,
		pageNumber,
		startIndex,
		endIndex,
	]);
	
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