import {
	WalletBrowserFilters,
	FilteredWalletsDirectory,
	PinnableWalletRow,
	WalletsBrowserPagination,
	WalletsListHeader,
} from "@widget/wallets";


const BrowseAndSelectWallets = () => {
	return (
		<>
			<WalletsListHeader />
			<WalletBrowserFilters />
			<FilteredWalletsDirectory>
				{(wallet) => (
					<PinnableWalletRow 
						wallet={wallet}
						key={wallet.id} 
					/>
				)}
			</FilteredWalletsDirectory>
			<WalletsBrowserPagination />
		</>
	);
}

export { BrowseAndSelectWallets };