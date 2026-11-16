import { useShallow } from "zustand/react/shallow";
import { SkeletonText } from "@internal/shared";
import { WalletChip } from "@entity/filters";
import { ProtectDimensionsPending, useAnalyticsFilters } from "@feature/filters";

import type { FC } from "react";


const ALL_WALLETS_COLOR = 'var(--accent-grad)';

const WalletFilter: FC = () => {
	const { walletIds, toggleWallet, clearWallets } = useAnalyticsFilters(useShallow((state) => ({
		walletIds: state.walletIds,
		toggleWallet: state.toggleWallet,
		clearWallets: state.clearWallets,
	})));

	return (
		<ProtectDimensionsPending fallback={<SkeletonText size="12" width="w-56" />}>
			{(dimensions) => (
				<div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Wallets">
					<WalletChip
						name="All wallets"
						color={ALL_WALLETS_COLOR}
						selected={walletIds.length === 0}
						onToggle={clearWallets}
					/>
					{dimensions.wallets.map((wallet) => (
						<WalletChip
							key={wallet.id}
							name={wallet.name}
							color={wallet.color}
							selected={walletIds.includes(wallet.id)}
							onToggle={() => { toggleWallet(wallet.id); }}
						/>
					))}
				</div>
			)}
		</ProtectDimensionsPending>
	);
};

WalletFilter.displayName = 'WalletFilter';

export { WalletFilter };
