import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import {
	useWalletsFiltersContext,
	WalletsFiltersContextProvider
} from "@feature/wallets/search-and-filtering/WalletsFiltersContext.tsx";
import {
	WalletsPaginationContextProvider
} from "@feature/wallets/search-and-filtering/WalletsPaginationContext.tsx";
import {
	useWalletsPinsContext,
	WalletsPinsContextProvider
} from "@feature/wallets/search-and-filtering/WalletsPinsContext.tsx";
import {
	WalletsSelectionContextProvider
} from "@feature/wallets/search-and-filtering/WalletsSelectionContext.tsx";
import {useWalletsBrowser} from "@feature/wallets/search-and-filtering/use-wallets-browser.ts";


interface WalletBrowserContextProviderProps {
	children: ReactNode;
}

const WalletBrowserContextProvider: FC<WalletBrowserContextProviderProps> = ({ children }) => {
	return (
		<WalletsFiltersContextProvider>
			<WalletsPinsContextProvider>
				<WalletBrowserInternalContext>
					{ children }
				</WalletBrowserInternalContext>
			</WalletsPinsContextProvider>
		</WalletsFiltersContextProvider>
	);
}

interface WalletBrowserInternalContextProps {
	children: ReactNode;
}

const WalletBrowserInternalContext: FC<WalletBrowserInternalContextProps> = ({ children }) => {
	const { sortBy, sortDirection, typeFilter, search, caseSensitive } = useWalletsFiltersContext();
	const { isPinned } = useWalletsPinsContext();
	const { searchResults: { wallets, total } } = useWalletsBrowser({
		search: { search, caseSensitive },
		filters: { typeFilter },
		ordering: { field: sortBy, direction: sortDirection },
	});

	const pinnedFirstWallets = useMemo(() => {
		return [...wallets].sort((first, second) => {
			return (isPinned(second.id) ? 1 : 0) - (isPinned(first.id) ? 1 : 0)
		});
	}, [isPinned, wallets]);

	return (
		<WalletsSelectionContextProvider walletsRegistry={wallets}>
			<WalletsPaginationContextProvider 
				pageSize={5}
				total={total}
				wallets={pinnedFirstWallets}
			>
				{children}
			</WalletsPaginationContextProvider>
		</WalletsSelectionContextProvider>
	);
}

export { WalletBrowserContextProvider };
