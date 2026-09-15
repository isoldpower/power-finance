import { walletGradient } from "@entity/wallets";
import { FinanceButton } from "@internal/ui-library";
import { Caption, DisplayText } from "@shared/pure-components/typography";
import { SlideOverTrigger } from "@shared/overlays";
import { WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { ShowWhenUpdated } from "@feature/wallets";

import type { FC } from "react";
import type { Wallet } from "@entity/wallets";


interface WalletDetailsThumbnailProps {
	wallet: Wallet;
	transferPanelId: string;
	editWalletPanelId: string;
	disabled?: boolean;
}

const WalletDetailsThumbnail: FC<WalletDetailsThumbnailProps> = ({ 
	wallet,
	transferPanelId,
	editWalletPanelId,
	disabled = false,
}) => {
	return (
		<div className="flex items-start gap-3.5">
			<WalletSwatch size='lg' color={walletGradient(wallet.color)} />
			<div className="min-w-0 flex-1">
				<DisplayText size="lg" truncate>
					{wallet.name}
				</DisplayText>
				<Caption>
					{walletTypeLabel(wallet)} · {wallet.balance.currency}
					<ShowWhenUpdated wallet={wallet}>
						{(updatedAt) => {
							return `· updated ${updatedAt.toLocaleDateString()}`;
						}}
					</ShowWhenUpdated>
				</Caption>
			</div>
			<div className="flex gap-2">
				<SlideOverTrigger asChild={true} panelId={transferPanelId}>
					<FinanceButton variant="outline" size="sm" disabled={disabled}>
						Transfer
					</FinanceButton>
				</SlideOverTrigger>
				<SlideOverTrigger asChild={true} panelId={editWalletPanelId}>
					<FinanceButton variant="outline" size="sm" disabled={disabled}>
						Edit
					</FinanceButton>
				</SlideOverTrigger>
			</div>
		</div>
	);
}

export { WalletDetailsThumbnail };