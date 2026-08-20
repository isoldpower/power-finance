import { useWalletsPaginationContext } from "@feature/wallets";
import { CardTitle, MetaText } from "@shared/pure-components/typography";

import type { FC } from "react";


const WalletsListHeader: FC = () => {
	const { total } = useWalletsPaginationContext();

	return (
		<div className="flex items-center border-b border-border px-4 py-3.5">
			<CardTitle as="h3" className="flex-1">
				All wallets
			</CardTitle>
			<MetaText size="10">
				{total} shown
			</MetaText>
		</div>
	);
};

WalletsListHeader.displayName = 'WalletsListHeader';

export { WalletsListHeader };
