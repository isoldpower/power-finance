import { createContext, use, useCallback, useMemo, useState } from "react";

import type { OrderingType } from "./types.ts";
import type { FC, ReactNode } from "react";


interface WalletsFiltersContextType {
	typeFilter: string;
	setTypeFilter: (typeFilter: string | null) => void;
	sortBy: string;
	setSortBy: (sortBy: string | null) => void;
	sortDirection: OrderingType;
	setSortDirection: (direction: OrderingType) => void;
	search: string;
	setSearch: (search: string) => void;
	caseSensitive: boolean;
	setCaseSensitive: (caseSensitive: boolean) => void;
}

const WalletsFiltersContext = createContext<WalletsFiltersContextType | null>(null);


interface WalletsFiltersContextProviderProps {
	children: ReactNode;
}

const WalletsFiltersContextProvider: FC<WalletsFiltersContextProviderProps> = ({ 
	children,
}) => {
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [sortBy, setSortBy] = useState<string>('name');
	const [sortDirection, setSortDirection] = useState<OrderingType>('ASC');
	const [search, setSearch] = useState<string>('');
	const [caseSensitive, setCaseSensitive] = useState<boolean>(false);

	const setTypeFilterProtected = useCallback((newType: string | null) => {
		setTypeFilter(newType ?? 'all');
	}, []);
	const setSortByProtected = useCallback((sortBy: string | null) => {
		setSortBy(sortBy ?? 'name');
	}, []);
	
	const filterValues = useMemo<WalletsFiltersContextType>(() => ({
		typeFilter,
		sortBy,
		sortDirection,
		search,
		caseSensitive,
		setSearch,
		setCaseSensitive,
		setSortDirection,
		setTypeFilter: setTypeFilterProtected,
		setSortBy: setSortByProtected,
	}), [caseSensitive, search, setSortByProtected, setTypeFilterProtected, sortBy, sortDirection, typeFilter]);
	
	return (
		<WalletsFiltersContext value={filterValues}>
			{children}
		</WalletsFiltersContext>
	);
}

const useWalletsFiltersContext = () => {
	const context = use(WalletsFiltersContext);
	
	if (!context) {
		throw new Error('useWalletsFiltersContext must be used within the context');
	}
	
	return context;
}

export { WalletsFiltersContextProvider, useWalletsFiltersContext };