import type { FC } from "react";

import type { PanelMode, PanelWallet } from "@feature/wallets";
import { AddTransactionForm } from "@widget/transactions/transaction-entry/AddTransactionForm.tsx";
import { ScanReceiptForm } from "@widget/transactions/transaction-entry/ScanReceiptForm.tsx";
import { TransferForm } from "@widget/transactions/transaction-entry/TransferForm.tsx";

type TransactionEntryMode = 'add' | 'scan' | 'transfer';

interface TransactionEntryPanelProps {
	mode: TransactionEntryMode;
	wallet?: PanelWallet;
	onClose: () => void;
	onSwitch: (mode: PanelMode) => void;
}

const TransactionEntryPanel: FC<TransactionEntryPanelProps> = ({ mode, wallet, onClose, onSwitch }) => {
	return (
		<>
			{mode === 'add' ? <AddTransactionForm onSwitch={onSwitch} onClose={onClose} /> : null}
			{mode === 'scan' ? <ScanReceiptForm onClose={onClose} /> : null}
			{mode === 'transfer' ? <TransferForm wallet={wallet} onClose={onClose} /> : null}
		</>
	);
};

TransactionEntryPanel.displayName = 'TransactionEntryPanel';

export { TransactionEntryPanel };
export type { TransactionEntryPanelProps, TransactionEntryMode };
