import {FinanceCard} from "@internal/ui-library";

import { 
	BackgroundGlow,
	WalletsRecentTitle,
} from "@entity/wallets";
import {
	useWallet,
	WalletDetailsFx,
	ProtectSelectedNone,
	useWalletsSelection,
} from "@feature/wallets";
import {
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
	const { wallet, isError, isPending } = useWallet(selectedWalletProtected, { 
		enabled: selectedWalletProtected !== 'none'
	});

	return (
		<ProtectSelectedNone selectedWallet={selectedWalletProtected}>
			<WalletDetailsFx isError={isError} isPending={isPending} wallet={wallet}>
				{(wallet) => (
					<div className="relative">
						<BackgroundGlow size={200} />
						<FinanceCard className="overflow-hidden">
							<div className="border-b border-border px-6 py-[22px]">
								<WalletDetailsThumbnail
									wallet={wallet}
									transferPanelId={transferPanel}
									editWalletPanelId={editWalletPanel}
								/>
								<WalletBalanceDetails wallet={wallet} />
							</div>
							<WalletsRecentTitle>
								Recent in this wallet
							</WalletsRecentTitle>
							<WalletRecentTransactions wallet={wallet} />
						</FinanceCard>
					</div>
				)}
			</WalletDetailsFx>
		</ProtectSelectedNone>
	);
}

export { SelectedWalletDetails };
export type { BrowserWalletDetailsProps };
