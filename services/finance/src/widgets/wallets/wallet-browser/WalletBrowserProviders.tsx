import { useMemo } from "react";

import {
	KeepWalletSelected,
	useWalletsBrowser,
	useWalletsFiltersContext,
	useWalletsPinsContext,
	WalletsFiltersContextProvider,
	WalletsPaginationContextProvider,
	WalletsPinsContextProvider,
} from "@feature/wallets";

import type { FC, ReactNode } from "react";


interface WalletBrowserContextProviderProps {
	children: ReactNode;
}

const WalletBrowserProvider: FC<WalletBrowserContextProviderProps> = ({ children }) => {
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
		<WalletsPaginationContextProvider
			pageSize={5}
			total={total}
			wallets={pinnedFirstWallets}
		>
			<KeepWalletSelected wallets={pinnedFirstWallets} />
			{children}
		</WalletsPaginationContextProvider>
	);
}

export { WalletBrowserProvider };
