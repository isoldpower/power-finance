import { useCallback } from "react";
import { useState } from "react";
import type { FC, ReactNode } from "react";

import { SlideOver, AiBadge } from "@shared/components";
import { ManagementHeader } from "@widget/transactions";
import { LedgerBand } from "@widget/metrics";
import { WalletsSection, WalletEntryPanel } from "@process/wallets";
import { TransactionsSection, TransactionEntryPanel } from "@process/transactions";
import { ChartOfAccountsSection } from "@process/accounts";
import { RevealMotion } from "@shared/interactions";
import type { PanelMode, PanelWallet } from "@feature/wallets";

const PANEL_TITLES: Record<PanelMode, ReactNode> = {
	add: 'New transaction',
	scan: <span className="flex items-center gap-2">Scan receipt <AiBadge /></span>,
	wallet: 'New wallet',
	transfer: 'Transfer money',
	edit: 'Edit wallet',
};


const ManagementPage: FC = () => {
	const [panel, setPanel] = useState<{ mode: PanelMode; wallet?: PanelWallet } | null>(null);

	const openPanel = useCallback((mode: PanelMode, wallet?: PanelWallet) => {
		setPanel({ mode, wallet });
	}, []);
	const closePanel = useCallback(() => {
		setPanel(null);
	}, [])
	const switchPanel = useCallback((mode: PanelMode) => {
		setPanel({ mode });
	}, []);

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-[22px] pb-[70px] pt-[22px]">
			<RevealMotion delay={0.05}>
				<ManagementHeader onOpenPanel={openPanel} />
			</RevealMotion>
			<RevealMotion delay={0.12}>
				<LedgerBand />
			</RevealMotion>
			<RevealMotion delay={0.18}>
				<WalletsSection onOpenPanel={openPanel} />
			</RevealMotion>
			<RevealMotion delay={0.24}>
				<TransactionsSection onOpenPanel={openPanel} />
			</RevealMotion>
			<RevealMotion delay={0.3}>
				<ChartOfAccountsSection />
			</RevealMotion>
			<SlideOver open={panel !== null} onClose={closePanel} title={panel ? PANEL_TITLES[panel.mode] : null}>
				{panel && (panel.mode === 'add' || panel.mode === 'scan' || panel.mode === 'transfer') ? (
					<TransactionEntryPanel mode={panel.mode} wallet={panel.wallet} onClose={closePanel} onSwitch={switchPanel} />
				) : null}
				{panel && (panel.mode === 'wallet' || panel.mode === 'edit') ? (
					<WalletEntryPanel mode={panel.mode} wallet={panel.wallet} onClose={closePanel} />
				) : null}
			</SlideOver>
		</div>
	);
};

ManagementPage.displayName = 'ManagementPage';

export { ManagementPage };
export default ManagementPage;
