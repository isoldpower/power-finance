import { createContext, useContext } from "react";
import { useAccountsCategorySelection } from "./use-accounts-category-selection.ts";

import { FC, ReactNode } from "react";
import type { BrowseAccountsContextType } from "./types.ts";


const BrowseAccountsContext = createContext<BrowseAccountsContextType | null>(null);

interface BrowseAccountsContextProviderProps {
	children: ReactNode;
}

const BrowseAccountsContextProvider: FC<BrowseAccountsContextProviderProps> = ({ children }) => {
	const accountsSelection = useAccountsCategorySelection();
	
	return (
		<BrowseAccountsContext value={accountsSelection}>
			{children}
		</BrowseAccountsContext>
	);
}

const useAccountsBrowser = () => {
	const context = useContext(BrowseAccountsContext);
	
	if (!context) {
		throw new Error('useAccountsBrowser must be used within the context');
	}
	
	return context;
}

export { BrowseAccountsContext, useAccountsBrowser, BrowseAccountsContextProvider };