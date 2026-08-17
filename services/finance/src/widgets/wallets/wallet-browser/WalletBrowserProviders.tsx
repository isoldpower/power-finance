import {
	KeepWalletSelected,
	useWalletsBrowser,
	useWalletsFiltersContext,
	WalletsFiltersContextProvider,
	WalletsPaginationContextProvider,
} from "@feature/wallets";

import type { FC, ReactNode } from "react";


interface WalletBrowserContextProviderProps {
	children: ReactNode;
}

const WalletBrowserProvider: FC<WalletBrowserContextProviderProps> = ({ children }) => {
	return (
		<WalletsFiltersContextProvider>
			<WalletBrowserInternalContext>
				{ children }
			</WalletBrowserInternalContext>
		</WalletsFiltersContextProvider>
	);
}

interface WalletBrowserInternalContextProps {
	children: ReactNode;
}

const WalletBrowserInternalContext: FC<WalletBrowserInternalContextProps> = ({ children }) => {
	const { sortBy, sortDirection, typeFilter, search, caseSensitive } = useWalletsFiltersContext();
	const { searchResults: { wallets, total } } = useWalletsBrowser({
		search: { search, caseSensitive },
		filters: { typeFilter },
		ordering: { field: sortBy, direction: sortDirection },
	});

	return (
		<WalletsPaginationContextProvider
			pageSize={5}
			total={total}
			wallets={wallets}
		>
			<KeepWalletSelected wallets={wallets} />
			{children}
		</WalletsPaginationContextProvider>
	);
}

export { WalletBrowserProvider };
