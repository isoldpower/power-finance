import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { Button, Icons } from "@internal/ui-library";
import type { FC } from "react";

import { useWalletsList } from "@feature/wallet";


type WalletsListNavigationHeaderProps = {
}

const WalletsListNavigationHeader: FC<WalletsListNavigationHeaderProps> = () => {
	const { status, wallets } = useWalletsList();

	return (
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-xl font-bold text-gray-900">
				Your Wallets <span className="text-gray-400">
				({ status === 'pending' ? "?" : wallets.length })
			</span>
			</h2>
			<Button variant="link" asChild>
				<Link to={getFinanceRoute('wallets')} className="text-sm flex items-center">
					View all
					<Icons.ChevronRight size={16} className="ml-1" />
				</Link>
			</Button>
		</div>
	)
}

WalletsListNavigationHeader.displayName = 'WalletsListNavigationHeader';

export { WalletsListNavigationHeader };
export type { WalletsListNavigationHeaderProps };