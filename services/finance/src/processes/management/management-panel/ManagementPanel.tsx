import type { FC, ReactNode } from "react";

import { SlideOver } from "@shared/components";
import { AddTransactionForm, ScanReceiptForm, TransferForm } from "@feature/transaction";
import { CreateWalletForm, EditWalletForm } from "@feature/wallet";
import type { PanelMode, PanelWallet } from "@feature/management";

interface ManagementPanelProps {
	mode: PanelMode | null;
	wallet?: PanelWallet;
	onClose: () => void;
	onSwitch: (mode: PanelMode) => void;
}

const TITLES: Record<PanelMode, ReactNode> = {
	add: 'New transaction',
	scan: <span className="flex items-center gap-2">Scan receipt <span className="rounded-[4px] bg-primary px-1.5 py-0.5 font-numeric text-[9px] font-semibold text-white">AI</span></span>,
	wallet: 'New wallet',
	transfer: 'Transfer money',
	edit: 'Edit wallet',
};

// Orchestrates the management slide-over: drives the shared drawer shell and switches between
// the transaction/wallet entry feature forms by mode.
const ManagementPanel: FC<ManagementPanelProps> = ({ mode, wallet, onClose, onSwitch }) => {
	return (
		<SlideOver open={mode !== null} onClose={onClose} title={mode ? TITLES[mode] : null}>
			{mode === 'add' ? <AddTransactionForm onSwitch={onSwitch} onClose={onClose} /> : null}
			{mode === 'scan' ? <ScanReceiptForm onClose={onClose} /> : null}
			{mode === 'wallet' ? <CreateWalletForm onClose={onClose} /> : null}
			{mode === 'edit' && wallet ? <EditWalletForm wallet={wallet} onClose={onClose} /> : null}
			{mode === 'transfer' ? <TransferForm wallet={wallet} onClose={onClose} /> : null}
		</SlideOver>
	);
};

ManagementPanel.displayName = 'ManagementPanel';

export { ManagementPanel };
export type { ManagementPanelProps };
