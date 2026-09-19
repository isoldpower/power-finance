import { walletGradient } from "@entity/wallets";
import { isNegativeAmount } from "@shared/api";
import { cn, FinanceMoney } from "@internal/ui-library";
import {useCallback, useMemo} from "react";
import { WalletPinButton, WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { isOptimisticWalletId, useWalletFavorite, useWalletsSelection } from "@feature/wallets";
import { useShallow } from "zustand/react/shallow";
import { useLocaleCurrency } from "@shared/formatting";
import { pendingClass } from "@shared/pure-components/feedback";
import { Caption, RowTitle, textClass } from "@shared/pure-components/typography";

import type { FC, MouseEvent } from "react";
import type { Wallet } from "@entity/wallets";


interface PinnableWalletRowProps {
	wallet: Wallet;
}

const PinnableWalletRow: FC<PinnableWalletRowProps> = ({ wallet }) => {
	const format = useLocaleCurrency();
	const { toggleFavorite } = useWalletFavorite();
	const { selectedWalletId, selectWallet } = useWalletsSelection(
		useShallow((state) => ({
			selectedWalletId: state.selectedWalletId,
			selectWallet: state.selectWallet,
		}))
	);

	const selected = useMemo(() => {
		return wallet.id === selectedWalletId;
	}, [selectedWalletId, wallet.id]);
	const unsaved = useMemo(() => {
		return isOptimisticWalletId(wallet.id);
	}, [wallet.id]);

	const handleSelect = useCallback(() => {
		if (unsaved) return;

		selectWallet(wallet.id);
	}, [unsaved, selectWallet, wallet.id]);
	const handleTogglePin = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		if (unsaved) return;

		toggleFavorite(wallet);
	}, [unsaved, toggleFavorite, wallet]);

	return (
		<div
			onClick={handleSelect}
			className={cn(
				"flex cursor-pointer items-center gap-[11px] border-l-[3px] px-3.5 py-[11px] transition-colors",
				selected
					? "border-l-primary bg-[var(--accent-soft)]"
					: "border-l-transparent hover:bg-surface-2",
				unsaved && "pointer-events-none",
				pendingClass(wallet.pending)
			)}
		>
			<WalletSwatch size='md' color={walletGradient(wallet.color)} />
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
				tone={isNegativeAmount(wallet.balance.amount) ? 'neg' : 'neutral'}
				className={textClass({ size: '13.5' })}
			>
				{format(wallet.balance.amount, wallet.balance.currency)}
			</FinanceMoney>
			<WalletPinButton 
				pinned={wallet.favorite}
				onClick={handleTogglePin}
			/>
		</div>
	);
}

export { PinnableWalletRow };
export type { PinnableWalletRowProps };
