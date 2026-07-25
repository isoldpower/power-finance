import {WalletBrowserFilters} from "@widget/wallets/wallet-browser/WalletBrowserFilters.tsx";
import {FilteredWalletsDirectory} from "@widget/wallets/wallet-browser/FilteredWalletsDirectory.tsx";
import {PinnableWalletRow} from "@widget/wallets/wallet-browser/PinnableWalletRow.tsx";
import {WalletsBrowserPagination} from "@widget/wallets/wallet-browser/WalletsBrowserPagination.tsx";


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