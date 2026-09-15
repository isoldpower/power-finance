import { cn, FinanceCard } from "@internal/ui-library";
import { pendingClass } from "@shared/pure-components/feedback";
import { WalletsRecentTitle } from "@entity/wallets";
import {
	useWallet,
	WalletDetailsFx,
	ProtectSelectedNone,
	useWalletsSelection,
} from "@feature/wallets";
import {
	WalletRecentSkeleton,
	WalletRecentTransactions,
	WalletBalanceDetails,
	WalletDetailsThumbnail,
} from "@widget/wallets";
import { useMemo } from "react";


interface BrowserWalletDetailsProps {
	editWalletPanel: string;
	transferPanel: string;
}

const SelectedWalletDetails = ({ 
	editWalletPanel,
	transferPanel,
}: BrowserWalletDetailsProps) => {
	const selectedWalletId = useWalletsSelection((state) => state.selectedWalletId);
	const selectedWalletProtected = useMemo(() => {
		return selectedWalletId ?? 'none';
	}, [selectedWalletId]);
	const { wallet, recent, period, isError, isPending, isPlaceholderData } = useWallet(selectedWalletProtected, { 
		enabled: selectedWalletProtected !== 'none'
	});

	return (
		<ProtectSelectedNone selectedWallet={selectedWalletProtected}>
			<WalletDetailsFx isError={isError} isPending={isPending} wallet={wallet}>
				{(wallet) => (
					<div className="relative">
						<FinanceCard className="overflow-hidden">
							<div className={cn("border-b border-border px-6 py-[22px]", pendingClass(wallet.pending))}>
								<WalletDetailsThumbnail
									wallet={wallet}
									transferPanelId={transferPanel}
									editWalletPanelId={editWalletPanel}
									disabled={isPlaceholderData}
								/>
								<WalletBalanceDetails wallet={wallet} period={period} />
							</div>
							<WalletsRecentTitle>
								Recent in this wallet
							</WalletsRecentTitle>
							{isPlaceholderData
								? <WalletRecentSkeleton />
								: <WalletRecentTransactions transactions={recent} />}
						</FinanceCard>
					</div>
				)}
			</WalletDetailsFx>
		</ProtectSelectedNone>
	);
}

export { SelectedWalletDetails };
export type { BrowserWalletDetailsProps };
