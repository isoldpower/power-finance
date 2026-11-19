import { useTransaction, useTransactionsSelection } from "@feature/transactions";
import { CreateTransaction } from "../transaction-entry";

import type { FC } from "react";


interface AdjustTransactionProps {
	scanPanelId: string;
}

const AdjustTransaction: FC<AdjustTransactionProps> = ({ scanPanelId }) => {
	const selectedTransactionId = useTransactionsSelection((state) => state.selectedTransactionId);
	const adjusts = selectedTransactionId ?? undefined;
	const { transaction } = useTransaction(adjusts ?? '', { enabled: adjusts !== undefined });

	return (
		<CreateTransaction
			scanPanelId={scanPanelId}
			title="Adjust transaction"
			adjusts={adjusts}
			adjustedWalletId={transaction?.wallet.id}
			adjustedCategory={transaction?.category}
		/>
	);
};

AdjustTransaction.displayName = 'AdjustTransaction';

export { AdjustTransaction };
export type { AdjustTransactionProps };
