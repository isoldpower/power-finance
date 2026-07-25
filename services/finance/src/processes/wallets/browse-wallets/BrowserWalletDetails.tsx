import {FinanceCard} from "@internal/ui-library";

import {useWallet} from "@feature/wallets";

import { WalletDetailsFx } from "@feature/wallets/fetch-experience/WalletDetailsFx.tsx";
import { BackgroundGlow } from "@entity/wallets/wallet-list/BackgroundGlow.tsx";
import { WalletDetailsThumbnail } from "@widget/wallets/wallet-details/WalletDetailsThumbnail.tsx";
import { ProtectSelectedNone } from "@feature/wallets/wallet-browser/ProtectSelectedNone.tsx";
import { WalletRecentTransactions } from "@widget/wallets/wallet-details/WalletRecentTransactions.tsx";
import { WalletBalanceDetails } from "@widget/wallets/wallet-details/WalletBalanceDetails.tsx";
import { WalletsRecentTitle } from "@entity/wallets/wallet-list/WalletsRecentTitle.tsx";
import { useWalletsSelectionContext } from "@feature/wallets/search-and-filtering/WalletsSelectionContext.tsx";
import { useMemo } from "react";


interface BrowserWalletDetailsProps {
	editWalletPanel: string;
	transferPanel: string;
}

const BrowserWalletDetails = ({ 
	editWalletPanel,
	transferPanel,
}: BrowserWalletDetailsProps) => {
	const { selectedWalletId } = useWalletsSelectionContext();
	const selectedWalletProtected = useMemo(() => selectedWalletId ?? 'none', [selectedWalletId]);
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
							<WalletsRecentTitle>Recent in this wallet</WalletsRecentTitle>
							<WalletRecentTransactions wallet={wallet} />
						</FinanceCard>
					</div>
				)}
			</WalletDetailsFx>
		</ProtectSelectedNone>
	);
}

export { BrowserWalletDetails };
export type { BrowserWalletDetailsProps };
