import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { UiButton, Icons } from "@internal/ui-library";
import { FC, useMemo } from "react";

import { useWalletsList } from "@feature/wallet";


type WalletsListNavigationHeaderProps = object;

const WalletsListNavigationHeader: FC<WalletsListNavigationHeaderProps> = () => {
	const { status, wallets } = useWalletsList();
	const countSummary = useMemo(() => ({
		pending: '...',
		error: 'X',
		success: wallets.length
	}), [wallets]);

	return (
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-xl font-bold">
				Your Wallets <span className="text-gray-400">
				({ countSummary[status] })
			</span>
			</h2>
			<UiButton variant="link" asChild>
				<Link to={getFinanceRoute('wallets')} className="text-sm flex items-center">
					View all
					<Icons.ChevronRight size={16} className="ml-1" />
				</Link>
			</UiButton>
		</div>
	)
}

WalletsListNavigationHeader.displayName = 'WalletsListNavigationHeader';

export { WalletsListNavigationHeader };
export type { WalletsListNavigationHeaderProps };