import type { FC } from "react";

import type { PanelWallet } from "@feature/wallets";
import { CreateWalletForm } from "@widget/wallets/wallet-entry/CreateWalletForm.tsx";
import { EditWalletForm } from "@widget/wallets/wallet-entry/EditWalletForm.tsx";

type WalletEntryMode = 'wallet' | 'edit';

interface WalletEntryPanelProps {
	mode: WalletEntryMode;
	wallet?: PanelWallet;
	onClose: () => void;
}

const WalletEntryPanel: FC<WalletEntryPanelProps> = ({ mode, wallet, onClose }) => {
	return (
		<>
			{mode === 'wallet' ? <CreateWalletForm onClose={onClose} /> : null}
			{mode === 'edit' && wallet ? <EditWalletForm wallet={wallet} onClose={onClose} /> : null}
		</>
	);
};

WalletEntryPanel.displayName = 'WalletEntryPanel';

export { WalletEntryPanel };
export type { WalletEntryPanelProps, WalletEntryMode };
