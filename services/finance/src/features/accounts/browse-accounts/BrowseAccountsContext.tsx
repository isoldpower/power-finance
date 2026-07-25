import {createContext, FC, ReactNode, useContext} from "react";
import {useAccountsCategorySelection} from "@feature/accounts";
import {BrowseAccountsContextType} from "@feature/accounts/browse-accounts/types.ts";


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