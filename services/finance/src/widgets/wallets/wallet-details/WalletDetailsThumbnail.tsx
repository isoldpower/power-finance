import { FinanceButton } from "@internal/ui-library";
import { WalletDetailsTitle, WalletDetailsParagraph, WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { SlideOverTrigger } from "@shared/components";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";
import {ShowWhenUpdated} from "@feature/wallets";


interface WalletDetailsThumbnailProps {
	wallet: Wallet;
	transferPanelId: string;
	editWalletPanelId: string;
}

const WalletDetailsThumbnail: FC<WalletDetailsThumbnailProps> = ({ 
	wallet,
	transferPanelId,
	editWalletPanelId,
}) => {
	return (
		<div className="flex items-start gap-3.5">
			<WalletSwatch size='lg' color={wallet.color} />
			<div className="min-w-0 flex-1">
				<WalletDetailsTitle>
					{wallet.name}
				</WalletDetailsTitle>
				<WalletDetailsParagraph>
					{walletTypeLabel(wallet)} · {wallet.balance.currency}
					<ShowWhenUpdated wallet={wallet}>
						{(updatedAt) => {
							return `· updated ${updatedAt.toLocaleDateString()}`;
						}}
					</ShowWhenUpdated>
				</WalletDetailsParagraph>
			</div>
			<div className="flex gap-2">
				<SlideOverTrigger asChild={true} panelId={transferPanelId}>
					<FinanceButton variant="outline" size="sm">
						Transfer
					</FinanceButton>
				</SlideOverTrigger>
				<SlideOverTrigger asChild={true} panelId={editWalletPanelId}>
					<FinanceButton variant="outline" size="sm">
						Edit
					</FinanceButton>
				</SlideOverTrigger>
			</div>
		</div>
	);
}

export { WalletDetailsThumbnail };