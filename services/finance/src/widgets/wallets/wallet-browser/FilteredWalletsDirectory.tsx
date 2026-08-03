import { ProtectBrowseSpace, ProtectEmptyBrowse, useWalletsPaginationContext } from "@feature/wallets";
import { List } from "@shared/components";

import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";


interface FilteredWalletsDirectoryProps {
	children: (wallet: Wallet) => ReactNode;
}

const FilteredWalletsDirectory: FC<FilteredWalletsDirectoryProps> = ({ children }) => {
	const { paginatedWallets, from, to } = useWalletsPaginationContext();
	const pageSize = to - from + 1;

	return (
		<div className="h-[264px] overflow-y-auto">
			<ProtectEmptyBrowse wallets={paginatedWallets}>
				<List className="divide-y divide-border">
					{paginatedWallets.map((wallet) => children(wallet))}
				</List>
				<ProtectBrowseSpace resources={paginatedWallets} pageSize={pageSize}>
					This is all we found.
				</ProtectBrowseSpace>
			</ProtectEmptyBrowse>
		</div>
	);
}

export { FilteredWalletsDirectory };
