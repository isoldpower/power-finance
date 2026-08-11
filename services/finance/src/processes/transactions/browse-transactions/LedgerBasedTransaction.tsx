import { cn } from "@internal/ui-library";
import { useMemo } from "react";
import { useTransactionsSelection } from "@feature/transactions";
import { useShallow } from "zustand/react/shallow";
import { LedgerTransactionRow, TransactionLedgerEntries } from "@widget/transactions";

import type { FC } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface LedgerBasedTransactionProps {
	transaction: TransactionPreviewDto;
}

const LedgerBasedTransaction: FC<LedgerBasedTransactionProps> = ({ transaction }) => {
	const { selectedTransactionId, selectTransaction } = useTransactionsSelection(
		useShallow((state) => ({
			selectedTransactionId: state.selectedTransactionId,
			selectTransaction: state.selectTransaction,
		}))
	);

	const expanded = useMemo(() => {
		return selectedTransactionId === transaction.id;
	}, [selectedTransactionId, transaction.id]);

	return (
		<div className={cn("border-b border-border last:border-b-0", expanded && "bg-secondary")}>
			<LedgerTransactionRow
				transaction={transaction}
				expanded={expanded}
				onToggle={() => { selectTransaction(expanded ? null : transaction.id); }}
			/>
			{expanded ? (
				<TransactionLedgerEntries transaction={transaction} />
			) : null}
		</div>
	);
}

export { LedgerBasedTransaction };
export type { LedgerBasedTransactionProps };
