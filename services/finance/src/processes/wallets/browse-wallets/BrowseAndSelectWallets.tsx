import {
	WalletBrowserFilters,
	FilteredWalletsDirectory,
	PinnableWalletRow,
	WalletsBrowserPagination,
} from "@widget/wallets";


const BrowseAndSelectWallets = () => {
	return (
		<>
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