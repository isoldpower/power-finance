import {useWalletsPaginationContext} from "@feature/wallets/search-and-filtering/WalletsPaginationContext.tsx";
import {Wallet} from "@entity/wallets";
import {FC, ReactNode} from "react";
import {List} from "@shared/components";


interface FilteredWalletsDirectoryProps {
	children: (wallet: Wallet) => ReactNode;
}

const FilteredWalletsDirectory: FC<FilteredWalletsDirectoryProps> = ({ children }) => {
	const { paginatedWallets, from, to } = useWalletsPaginationContext();
	const pageSize = to - from + 1;

	if (paginatedWallets.length === 0) {
		return (
			<div className="px-4 py-[26px] text-center text-[13px] text-text-3">
				No wallets match your filters.
			</div>
		);
	}

	return (
		<div className="h-[264px] overflow-y-auto">
			<List className="divide-y divide-border">
				{paginatedWallets.map((wallet) => children(wallet))}
			</List>
			{paginatedWallets.length < pageSize && (
				<div className="border-t border-border px-4 py-3 text-center text-[11px] text-text-3">
					This is all we found.
				</div>
			)}
		</div>
	);
}

export { FilteredWalletsDirectory };
