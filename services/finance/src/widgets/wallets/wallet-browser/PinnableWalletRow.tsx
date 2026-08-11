import {cn, FinanceMoney} from "@internal/ui-library";

import { useCallback } from "react";
import { WalletPinButton, WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { useWalletsPinsContext, useWalletsSelection } from "@feature/wallets";
import { useShallow } from "zustand/react/shallow";
import { useLocaleCurrency } from "@shared/formatting";
import type { Wallet } from "@entity/wallets";
import { FC, MouseEvent } from "react";
import { Caption, RowTitle, textClass } from "@shared/pure-components/typography";


interface PinnableWalletRowProps {
	wallet: Wallet;
}

const PinnableWalletRow: FC<PinnableWalletRowProps> = ({ wallet }) => {
	const { selectedWalletId, selectWallet } = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectWallet: state.selectWallet,
		}))
	);
	const { isPinned, togglePin } = useWalletsPinsContext();
	const format = useLocaleCurrency();

	const selected = wallet.id === selectedWalletId;
	const pinned = isPinned(wallet.id);

	const handleSelect = useCallback(() => {
		selectWallet(wallet.id);
	}, [selectWallet, wallet.id]);
	const handleTogglePin = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		togglePin(wallet.id);
	}, [togglePin, wallet.id]);

	return (
		<div
			onClick={handleSelect}
			className={cn(
				"flex cursor-pointer items-center gap-[11px] border-l-[3px] px-3.5 py-[11px] transition-colors",
				selected
					? "border-l-primary bg-[var(--accent-soft)]"
					: "border-l-transparent hover:bg-surface-2"
			)}
		>
			<WalletSwatch size='md' color={wallet.color} />
			<div className="min-w-0 flex-1">
				<RowTitle size="13.5" truncate>
					{wallet.name}
				</RowTitle>
				<Caption size="11">
					{walletTypeLabel(wallet)} · {wallet.balance.currency}
				</Caption>
			</div>
			<FinanceMoney
				size="sm"
				tone={wallet.balance.amount < 0 ? 'neg' : 'neutral'}
				className={textClass({ size: '13.5' })}
			>
				{format(wallet.balance.amount, wallet.balance.currency)}
			</FinanceMoney>
			<WalletPinButton 
				pinned={pinned}
				onClick={handleTogglePin}
			/>
		</div>
	);
}

export { PinnableWalletRow };
export type { PinnableWalletRowProps };
