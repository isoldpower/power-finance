import {cn, FinanceMoney} from "@internal/ui-library";

import { useCallback } from "react";
import { WalletPinButton, WalletSwatch, walletTypeLabel } from "@entity/wallets";
import { useWalletsPinsContext } from "@feature/wallets/search-and-filtering/WalletsPinsContext.tsx";
import { useWalletsSelectionContext } from "@feature/wallets/search-and-filtering/WalletsSelectionContext.tsx";
import { useLocaleCurrency } from "@shared/utils";
import type { Wallet } from "@entity/wallets";
import { FC, MouseEvent } from "react";


interface PinnableWalletRowProps {
	wallet: Wallet;
}

const PinnableWalletRow: FC<PinnableWalletRowProps> = ({ wallet }) => {
	const { selectedWalletId, selectWallet } = useWalletsSelectionContext();
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
				<div className="truncate text-[13.5px] font-semibold">
					{wallet.name}
				</div>
				<div className="text-[11px] text-text-3">
					{walletTypeLabel(wallet)} · {wallet.balance.currency}
				</div>
			</div>
			<FinanceMoney
				size="sm"
				tone={wallet.balance.amount < 0 ? 'neg' : 'neutral'}
				className="text-[13.5px]"
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
