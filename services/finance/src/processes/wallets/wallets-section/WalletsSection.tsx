import type { FC } from "react";

import { useWalletsBrowser } from "@feature/wallets";
import type { PanelMode, PanelWallet } from "@feature/wallets";
import { useViewWalletTransactions } from "@feature/transactions";
import { SectionHeader } from "@shared/components";
import { WalletDirectory } from "@widget/wallets/directory/WalletDirectory.tsx";
import { WalletDetailCard } from "@widget/wallets/detail/WalletDetailCard.tsx";
import { WALLET_RECENT_SLOTS } from "@widget/wallets/config.ts";
import { TRANSACTIONS_SECTION_ID } from "@widget/transactions/config.ts";

interface WalletsSectionProps {
	onOpenPanel: (mode: PanelMode, wallet?: PanelWallet) => void;
	className?: string;
}

const WalletsSection: FC<WalletsSectionProps> = ({ onOpenPanel, className }) => {
	const {
		isPending,
		convert,
		formatCurrency,
		query,
		setQuery,
		typeFilter,
		setTypeFilter,
		sort,
		setSort,
		pins,
		togglePin,
		types,
		wallets,
		selected,
		setSelectedId,
		recent,
		monthFlow,
		total,
		recentSlots,
	} = useWalletsBrowser(WALLET_RECENT_SLOTS);

	const seeAllInTransactions = useViewWalletTransactions(TRANSACTIONS_SECTION_ID);

	return (
		<section className={className}>
			<SectionHeader
				title="Wallets"
				caption={`${total.toString()} accounts`}
				action={
					<button type="button" onClick={() => { onOpenPanel('wallet'); }} className="text-xs font-semibold text-primary hover:underline">
						＋ New wallet
					</button>
				}
			/>
			<div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[340px_1fr]">
				<WalletDirectory
					isPending={isPending}
					wallets={wallets}
					query={query}
					setQuery={setQuery}
					typeFilter={typeFilter}
					setTypeFilter={setTypeFilter}
					types={types}
					sort={sort}
					setSort={setSort}
					selectedId={selected?.id}
					pins={pins}
					togglePin={togglePin}
					convert={convert}
					formatCurrency={formatCurrency}
					onSelect={setSelectedId}
				/>
				<WalletDetailCard
					selected={selected}
					isPending={isPending}
					convert={convert}
					formatCurrency={formatCurrency}
					monthFlow={monthFlow}
					recent={recent}
					recentSlots={recentSlots}
					onTransfer={() => { if (selected) onOpenPanel('transfer', selected); }}
					onEdit={() => { if (selected) onOpenPanel('edit', selected); }}
					onSeeAll={() => { if (selected) seeAllInTransactions(selected.id); }}
				/>
			</div>
		</section>
	);
};

WalletsSection.displayName = 'WalletsSection';

export { WalletsSection };
export type { WalletsSectionProps };
