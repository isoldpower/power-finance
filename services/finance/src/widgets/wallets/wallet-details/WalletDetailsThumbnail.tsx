import {Wallet, walletTypeLabel} from "@entity/wallets";
import {SlideOverTrigger} from "@shared/components";
import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";


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
			<div
				className="h-11 w-16 flex-none rounded-[9px] shadow-[var(--shadow)]"
				style={{ background: wallet.color }}
			/>
			<div className="min-w-0 flex-1">
				<div className="truncate font-display text-lg font-semibold">
					{wallet.name}
				</div>
				<div className="text-[12.5px] text-text-3">
					{walletTypeLabel(wallet)} · {wallet.balance.currency}
					{wallet.updatedAt ? ` · updated ${new Date(wallet.updatedAt).toLocaleDateString()}` : null}
				</div>
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