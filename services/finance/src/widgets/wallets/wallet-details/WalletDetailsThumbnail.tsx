import { walletGradient } from "@entity/wallets";
import { FinanceButton } from "@internal/ui-library";
import { Caption, DisplayText } from "@shared/pure-components/typography";
import { SlideOverTrigger } from "@shared/overlays";
import { WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { ShowWhenUpdated } from "@feature/wallets";

import type { FC, ReactNode } from "react";
import type { Wallet } from "@entity/wallets";


interface WalletDetailsThumbnailProps {
	wallet: Wallet;
	transferPanelId: string;
	editWalletPanelId: string;
	disabled?: boolean;
	children?: ReactNode;
}

const WalletDetailsThumbnail: FC<WalletDetailsThumbnailProps> = ({ 
	wallet,
	transferPanelId,
	editWalletPanelId,
	disabled = false,
	children,
}) => {
	return (
		<div className="flex flex-wrap items-start gap-3.5 sm:flex-nowrap">
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
			<div className="flex w-full gap-2 sm:w-auto [&_button]:flex-1 sm:[&_button]:flex-none">
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
				{children}
			</div>
		</div>
	);
}

export { WalletDetailsThumbnail };